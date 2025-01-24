import { AxiosRequestConfig } from "axios"

type getApiMethod = <T = BookResponse>(path: string, config?: AxiosRequestConfig) => Promise<T>;
type getAllApiMethod = <T = ListResponse>(config?: AxiosRequestConfig) => Promise<T>

export interface ApiClient {
  get: getApiMethod
  getAll: getAllApiMethod
}

export interface Book {
    id: number
    title: string
}

export interface Tag {
    name: string
}

export interface BookShelf {
    name: string
}

export interface AuthorResponse {
    name: string
    birth_year: number
    death_year: number
}

export interface BookResponse {
  id: number
  title: string
  subjects: string[]
  authors: AuthorResponse[]
  translators: AuthorResponse[]
  bookshelves: string[]
  languages: string[]
  copyright: boolean | null
  media_type: string
  summaries: string[]
  formats: TypeResponse
  download_count: number
}

export interface ListResponse {
  count: number
  next?: string
  previous?: string
  results: BookResponse[]
}

type TypeResponse = Partial<{
    'text/html': string
    'application/epub+zip': string
    'application/x-mobipocket-ebook': string
    'application/rdf+xml': string
    'image/jpeg': string
    'text/plain; charset=us-ascii': string
    'application/octet-stream': string
  }>

export interface Author {
    name: string
}

export interface Detail extends Book {
    authors: Author[]
    imageUrl?: string
    tags?: Tag[]
    bookshelves?: BookShelf[]
}