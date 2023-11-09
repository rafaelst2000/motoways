import { User } from 'next-auth'

export interface RouteStop {
  location: [string]
  name: string
  route_id: string
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
export interface Route {
  id: string
  description: string
  distance: number
  publish_at: string
  rate: number
  title: string
  user_id: string
  images: [string]
  uf: Uf
  user?: User
  route_stops?: RouteStop[]
  comments?: RouteComment[]
}
