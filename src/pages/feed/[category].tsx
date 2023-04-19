import { Layout } from "@/components/layout/Layout"
import { IArticle } from "@/components/types"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { ArticleList } from "@/components/news_card/ArticleList"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { SkeletonArticleList } from "@/components/SkeletonLoader"

const categories = [
  "Business",
  "Entertainment",
  "General",
  "Health",
  "Science",
  "Sports",
  "Technology",
]

export default function Category({ newsData }: { newsData: IArticle[] }) {
  const { events } = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      console.log("Route change starts:", url)
      setIsLoading(true)
    }

    const handleRouteChangeComplete = (url: string) => {
      console.log("Route change completes:", url)
      setIsLoading(false)
    }

    events.on("routeChangeStart", handleRouteChangeStart)
    events.on("routeChangeComplete", handleRouteChangeComplete)

    return () => {
      events.off("routeChangeStart", handleRouteChangeStart)
      events.off("routeChangeComplete", handleRouteChangeComplete)
    }
  }, [events])
  return (
    <>
      <Head>
        <title>News</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout categories={categories}>
        {isLoading && <SkeletonArticleList />}

        <ArticleList newsData={newsData} />
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = categories.map((category) => ({
    params: { category },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category
  const result = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API}`,
  )

  const jsonData = await result.json()
  return {
    revalidate: 60,
    props: {
      newsData: jsonData.articles,
    },
  }
}
