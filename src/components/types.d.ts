export interface INews {
  status: string
  totalResults: number
  articles: IArticle[]
}
interface IArticle {
  source: ISource
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}
interface ISource {
  id: string
  name: string
}
