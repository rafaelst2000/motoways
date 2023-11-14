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
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      {
        params: {
          input: req.query.input,
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
        },
      },
    )
    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
