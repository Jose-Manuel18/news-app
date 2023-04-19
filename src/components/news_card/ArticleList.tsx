import { Grid, createStyles } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { NewsCard } from "./NewsCard"
import { IArticle } from "../types"

export const ArticleList = ({ newsData }: { newsData: IArticle[] }) => {
  const large = useMediaQuery("(min-width: 74em)")
  const small = useMediaQuery("(min-width: 30em)")
  const medium = useMediaQuery("(min-width: 48em)")
  const { classes } = useStyles()

  return (
    <Grid className={classes.grid}>
      {newsData.map((article) => (
        <Grid.Col
          span={large ? 4 : medium ? 5 : small ? 0 : 0}
          key={article.title}
        >
          <NewsCard key={article.title} article={article} />
        </Grid.Col>
      ))}
    </Grid>
  )
}
const useStyles = createStyles(() => ({
  grid: {
    display: "flex",
    justifyContent: "center",
  },
}))
