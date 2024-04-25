import * as Dialog from '@radix-ui/react-dialog'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  CreateRouteDialogWrapper,
  ActionsContainer,
  AddContainer,
} from '@/styles/components/CreateRouteDialog'
import {
  Camera,
  Check,
  Flag,
  FlagCheckered,
  Lightbulb,
  MapPin,
  Plus,
  Timer,
  Trash,
  X,
} from 'phosphor-react'
import { ReactNode, useEffect, useState, ChangeEvent } from 'react'
import Image from 'next/image'
import Stars from './Stars'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Input } from './Input'
import { TextArea } from './TextArea'
import { Map } from './Map'
import { GooglePlaceInput, PlaceDetails } from './GooglePlaceInput'
import { v4 as uuidv4 } from 'uuid'
import { useSession } from 'next-auth/react'
import { createNewRoute } from '@/utils/routes'
import { formattedDistance } from '@/utils/format-distance'
import { formattedTimeToMinHours } from '@/utils/date-fns'
import { existsUf } from '@/utils/ufs'
import { NearbySearch } from '@/@types'

type CreateRouteDialogProps = {
  children: ReactNode
  onCreateRoute: () => void
}

type ImageFile = {
  url: string
  name: string
}

type Point = {
  lat: number
  lng: number
}

export const CreateRouteDialog = ({
  children,
  onCreateRoute,
}: CreateRouteDialogProps) => {
  const session = useSession()
  const user = session?.data?.user
  const [open, setOpen] = useState(false)
  const [currentRate, setCurrentRate] = useState(0)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(0)
  const [locations, setLocations] = useState<PlaceDetails[]>([
    { id: uuidv4(), index: 0 } as PlaceDetails,
    { id: uuidv4(), index: 999 } as PlaceDetails,
  ])
  const [uf, setUf] = useState('')

  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult>({} as google.maps.DirectionsResult)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<FileList>()
  const [previewUrls, setPreviewUrls] = useState<ImageFile[]>([])

  function addInput() {
    const newLocations = [...locations]
    const penultimateIndex = newLocations.length - 1

    if (penultimateIndex >= 0) {
      const newItem = { id: uuidv4(), index: penultimateIndex } as PlaceDetails
      newLocations.splice(penultimateIndex, 0, newItem)
      const orderedLocations = newLocations.map((item, index) => {
        return {
          ...item,
          index,
        }
      })
      setLocations(orderedLocations)
    }
  }

  function onAddLocation(location: PlaceDetails, uuid: string) {
    const newLocations = [...locations]
    const index = newLocations.findIndex((item) => item.id === uuid)
    const { id } = newLocations[index]
    newLocations[index] = { ...location, id, index }
    setLocations(newLocations)
  }

  function onRemoveLocation(uuid: string) {
    const newLocations = locations
      .filter((item) => item.id !== uuid)
      .map((item, index) => ({ ...item, index }))
    setLocations(newLocations)
  }

  async function handleCreateRoute() {
    setLoading(true)
    const id = uuidv4()
    const route = {
      id,
      title,
      description,
      distance,
      images: [],
      publish_at: new Date().toISOString(),
      rate: currentRate,
      uf,
      user_id: user?.id,
      duration,
    }
    const routeStops = locations.map((item) => {
      return {
        index: item.index,
        route_id: id,
        location: item.geometry.location,
        name: item.name,
        place_id: item.place_id,
      }
    })
    const filteredFiles = filterFilesByNames()
    await createNewRoute(route, routeStops, filteredFiles)
    clearDialog()
    await onCreateRoute()
    setOpen(false)
  }

  function filterFilesByNames() {
    if (!files) return []
    const fileNames = previewUrls.map((item) => item.name)

    const newFilesArray = Array.from(files)
    const filteredFiles = newFilesArray.filter((file) => {
      return fileNames.includes(file.name)
    })

    const newDataTransfer = new DataTransfer()
    filteredFiles.forEach((file) => {
      newDataTransfer.items.add(file)
    })

    return newDataTransfer.files
  }

  const disableButton =
    loading ||
    !currentRate ||
    !currentRate ||
    !description ||
    !locations[0].place_id ||
    !previewUrls.length ||
    !locations[locations.length - 1].place_id

  useEffect(() => {
    calculateRoute()
    // eslint-disable-next-line
  }, [locations])

  async function calculateRoute() {
    const selectedLocationsSize = locations
      .map((item) => item.place_id)
      .filter((item) => item).length

    if (
      selectedLocationsSize >= 2 &&
      locations[0].place_id &&
      locations[locations.length - 1].place_id
    ) {
      let waypoints = []

      locations[locations.length - 1].address_components.forEach((item) => {
        if (existsUf(item.short_name.toLowerCase()))
          setUf(item.short_name.toLowerCase())
      })

      waypoints = locations
        .filter(
          (item) =>
            item.index !== 0 &&
            item.index !== locations.length - 1 &&
            item.place_id,
        )
        .map((item) => {
          return {
            location: item.geometry.location,
            stopover: true,
          }
        })

      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        travelMode: google.maps.TravelMode.DRIVING,
        origin: locations[0].geometry.location,
        destination: locations[locations.length - 1].geometry.location,
        ...(waypoints.length > 0 && { waypoints }),
      })
      setDirectionsResponse(results)
      const distance = results.routes[0].legs.reduce(
        (acc, route) => acc + (route.distance?.value || 0),
        0,
      )
      const duration = results.routes[0].legs.reduce(
        (acc, route) => acc + (route.duration?.value || 0),
        0,
      )
      setDistance(distance)
      setDuration(duration)
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target.files) setFiles(event.target.files)
  }

  function clearDialog() {
    setCurrentRate(0)
    setTitle('')
    setDescription('')
    setDistance(0)
    setDuration(0)
    setLocations([
      { id: uuidv4(), index: 0 } as PlaceDetails,
      { id: uuidv4(), index: 999 } as PlaceDetails,
    ])
    setDirectionsResponse({} as google.maps.DirectionsResult)
    setLoading(false)
    setFiles(undefined)
    setPreviewUrls([])
  }

  function removePreviewImage(index: number) {
    if (!files) return
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index)
    setPreviewUrls(newPreviewUrls)
  }

  async function getNearbyPlaces(currentLocation: Point) {
    const { lat, lng } = currentLocation
    const categories = ['restaurant', 'gas_station', 'tourist_attraction']
    const nearbyPlaces: NearbySearch[] = []

    for (const category of categories) {
      const response = await fetch(
        `/api/nearbyPlaces?lat=${lat}&lng=${lng}&category=${category}`,
      )
      const data = await response.json()
      const bestPlaces = data
        .filter(
          (place: NearbySearch) =>
            place?.rating && place.business_status === 'OPERATIONAL',
        )
        .sort((a: NearbySearch, b: NearbySearch) => b.rating - a.rating)
        .slice(0, 2)
      nearbyPlaces.push(...bestPlaces)
    }
    return nearbyPlaces
  }

  async function suggestPlacesAlongRoute() {
    const startPoint = locations[0].geometry.location
    const endPoint = locations[locations.length - 1].geometry.location
    const response = await fetch(
      `/api/directions?lat1=${startPoint.lat}&lng1=${startPoint.lng}&lat2=${endPoint.lat}&lng2=${endPoint.lng}`,
    )
    const data = await response.json()
    const route = data.routes[0]
    const waypoints = route.legs.flatMap((leg: any) =>
      leg.steps.flatMap((step: any) => ({
        lat: step.end_location.lat,
        lng: step.end_location.lng,
      })),
    )
    const groupedRoute = groupPoints(waypoints)
    console.log('groupedRoute', groupedRoute)
    const places: NearbySearch[] = []
    for (const item of groupedRoute) {
      const nearbyPlaces = await getNearbyPlaces(item)
      places.push(...nearbyPlaces)
    }

    console.log('Places along the route:', places)
    return places
  }

  function groupPoints(route: Point[]) {
    const totalDistance = distance / 1000
    const numSegments = Math.floor(totalDistance / 100)
    const groupedPoints: Point[] = []
    const groupSize = Math.ceil(route.length / numSegments)

    for (let i = 0; i < numSegments; i++) {
      const startIndex = i * groupSize
      const endIndex = Math.min((i + 1) * groupSize, route.length)
      const group = route.slice(startIndex, endIndex)
      groupedPoints.push(group[0])
    }

    return groupedPoints
  }

  useEffect(() => {
    if (files) {
      const newFiles: ImageFile[] = []
      Array.from(files).forEach((file) => {
        newFiles.push({ name: file.name, url: URL.createObjectURL(file) })
      })
      if (newFiles.length > 0) setPreviewUrls(newFiles)
      else setPreviewUrls([])
    }
  }, [files])

  return (
    <Dialog.Root open={open} onOpenChange={clearDialog}>
      <Dialog.Trigger onClick={() => setOpen(true)} asChild>
        {children}
      </Dialog.Trigger>

      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogClose onClick={() => setOpen(false)}>
            <X size={24} />
          </DialogClose>

          <CreateRouteDialogWrapper>
            <h1>Novo roteiro</h1>
            <Input
              placeholder="Nome do roteiro"
              css={{ maxWidth: '100%', marginBottom: '12px' }}
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
            <GooglePlaceInput
              css={{ maxWidth: '100%', marginBottom: '12px' }}
              placeholder="Seu ponto de partida"
              onLocationSelected={(location) =>
                onAddLocation(location, locations[0].id)
              }
              icon={<Flag color="#8381d9" />}
            />

            <GooglePlaceInput
              css={{ maxWidth: '100%', marginBottom: '12px' }}
              placeholder="Seu destino"
              onLocationSelected={(location) =>
                onAddLocation(location, locations[locations.length - 1].id)
              }
              icon={<FlagCheckered color="#8381d9" />}
            />
            {locations.length > 2 &&
              locations.map(
                (item, index) =>
                  index > 0 &&
                  index < locations.length - 1 && (
                    <div className="input-stop" key={item.id}>
                      <GooglePlaceInput
                        css={{ maxWidth: '100%', marginBottom: '12px' }}
                        placeholder={`Parada ${index}`}
                        onLocationSelected={(location) =>
                          onAddLocation(location, item.id)
                        }
                        icon={<MapPin color="#8381d9" />}
                      />
                      <AddContainer>
                        <button
                          type="submit"
                          disabled={false}
                          onClick={() => onRemoveLocation(item.id)}
                        >
                          <Trash color="#F75A68" />
                        </button>
                      </AddContainer>
                    </div>
                  ),
              )}

            {locations.length < 10 && (
              <AddContainer>
                <button type="submit" disabled={false} onClick={addInput}>
                  <Plus color="#50b2c0" />
                </button>
              </AddContainer>
            )}

            {
              <>
                <h2>Sugestões de paradas</h2>
                <div className="suggestion-container">
                  <Input
                    disabled
                    css={{}}
                    icon={<Lightbulb color="#8381d9" />}
                  />

                  <AddContainer style={{ margin: 0 }}>
                    <button disabled={false} onClick={suggestPlacesAlongRoute}>
                      <Plus color="#50b2c0" />
                    </button>
                  </AddContainer>
                </div>
              </>
            }

            <h2>Sua avaliação</h2>
            <Stars rating={currentRate} size="md" setRating={setCurrentRate} />

            <TextArea
              placeholder="Escreva sua avaliação"
              maxLength={450}
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              css={{ marginTop: '12px' }}
            />

            <h2>Fotos</h2>
            <div className="imgs-container">
              <label htmlFor="upload-img" className="input-file">
                <Camera size={32} color={'#50B2C0'} />
                Adicionar fotos
              </label>
              <input
                id="upload-img"
                type="file"
                multiple={true}
                onChange={handleFileChange}
              />
              {previewUrls &&
                previewUrls.map((preview, index) => (
                  <div className="upload-img-preview" key={preview.name}>
                    <Image
                      src={preview.url}
                      alt=""
                      width="130"
                      height="130"
                      quality={85}
                    />
                    <div
                      onClick={() => removePreviewImage(index)}
                      className="overlay"
                    >
                      <Trash size={32} color={'#50B2C0'} />
                    </div>
                  </div>
                ))}
            </div>
            <h2>Vizualização</h2>
            <Map directions={directionsResponse} />
            <div className="route-info">
              <div className="route-info-item">
                <MapPin size={24} color={'#50B2C0'} />
                <div>
                  <p>Distância</p>
                  <h3>{formattedDistance(distance)}</h3>
                </div>
              </div>
              <div className="route-info-item">
                <Timer size={24} color={'#50B2C0'} />
                <div>
                  <p>Tempo estimado</p>
                  <h3>{formattedTimeToMinHours(duration)}</h3>
                </div>
              </div>
            </div>
            <ActionsContainer>
              <button
                onClick={handleCreateRoute}
                type="submit"
                disabled={disableButton}
              >
                <Check color="#50b2c0" />
              </button>
            </ActionsContainer>
          </CreateRouteDialogWrapper>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
