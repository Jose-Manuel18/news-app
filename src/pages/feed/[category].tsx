import { NewsCard } from "@/components/NewsCard"
import { Layout } from "@/components/layout/Layout"
import { INews } from "@/components/types"
import { Grid, createStyles } from "@mantine/core"

import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { useMediaQuery } from "@mantine/hooks"
const categories = [
  "Business",
  "Entertainment",
  "General",
  "Health",
  "Science",
  "Sports",
  "Technology",
]
interface CategoryProps {
  newsData: INews
}
export default function Category({ newsData }: CategoryProps) {
  const large = useMediaQuery("(min-width: 74em)")
  const small = useMediaQuery("(min-width: 30em)")
  const medium = useMediaQuery("(min-width: 48em)")
  const { classes } = useStyles()

  return (
    <>
      <Head>
        <title>News</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout categories={categories}>
        <Grid className={classes.grid}>
          {newsData.articles.map((article) => (
            <Grid.Col
              span={large ? 4 : medium ? 5 : small ? 0 : 0}
              key={article.title}
            >
              <NewsCard article={article} />
            </Grid.Col>
          ))}
        </Grid>
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
    props: {
      newsData: jsonData,
    },
  }
}

const useStyles = createStyles(() => ({
  grid: {
    display: "flex",
    justifyContent: "center",
  },
}))
