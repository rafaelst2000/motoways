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
    const { lat1, lng1, lat2, lng2 } = req.query

    if (!lat1 || !lat2) {
      throw new Error('Missing locations parameters')
    }

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${lat1},${lng1}&destination=${lat2},${lng2}&key=${
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
      }`,
    )
    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
