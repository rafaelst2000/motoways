export interface User {
  id: string
  email: string
  name: string
  image: string
  member_since: string
  favorite_routes: string[]
}

export interface RouteStop {
  index: number
  location: {
    lat: number
    lng: number
  }
  name: string
  route_id: string
  place_id: string
}

export interface RouteComment {
  id: string
  description: string
  publish_at: string
  rate: number
  route_id: string
  user: User
}

export type Uf =
  | 'ac'
  | 'al'
  | 'ap'
  | 'am'
  | 'ba'
  | 'ce'
  | 'df'
  | 'es'
  | 'go'
  | 'ma'
  | 'mt'
  | 'ms'
  | 'mg'
  | 'pa'
  | 'pb'
  | 'pr'
  | 'pe'
  | 'pi'
  | 'rj'
  | 'rn'
  | 'ro'
  | 'rr'
  | 'rs'
  | 'sc'
  | 'sp'
  | 'se'
  | 'to'
  | ''
export interface Route {
  id: string
  description: string
  distance: number
  duration: number
  publish_at: string
  rate: number
  title: string
  user_id: string
  images: [string]
  uf: Uf
  user?: User
  route_stops: RouteStop[]
  comments?: RouteComment[]
}

export interface NearbySearch {
  business_status: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  name: string
  place_id: string
  rating: number
  plus_code: {
    compound_code: string
  }
}
