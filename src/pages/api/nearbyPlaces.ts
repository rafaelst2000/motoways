import axios from 'axios'

import type { NextApiRequest, NextApiResponse } from 'next'

type Error = {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Error>,
) {
  try {
    const { lat, lng, category } = req.query

    if (!lat || !lng || !category) {
      throw new Error('Missing placeId parameter')
    }

    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      {
        params: {
          location: `${lat},${lng}`,
          radius: 5000,
          type: category,
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
        },
      },
    )
    const places = response.data.results
    res.json(places)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
