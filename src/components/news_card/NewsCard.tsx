import React, { useState, useEffect } from "react"
import {
  Paper,
  Text,
  Image,
  useMantineTheme,
  createStyles,
} from "@mantine/core"
import { motion, AnimatePresence } from "framer-motion"
import { IArticle } from "../types"
import { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { addArticles, removeArticles } from "../../redux/features/articlesSlice"
import { IconBadge } from "@tabler/icons-react"

export const NewsCard = ({ article }: { article: IArticle }) => {
  const [isArticleSelected, setIsArticleSelected] = useState(false)
  const { classes } = useStyles()
  const { colors, colorScheme } = useMantineTheme()
  const { urlToImage, title, description, url, author, publishedAt } = article
  const dispatch = useDispatch()

  const handleAddOrRemove = () => {
    if (isArticleSelected) {
      dispatch(removeArticles(article))
      setIsArticleSelected(false)
    } else {
      dispatch(addArticles(article))
      setIsArticleSelected(true)
    }
  }

  const articles = useSelector((state: RootState) => state.articles)

  useEffect(() => {
    const articleExists = articles.find(
      (a) => a.description === article.description,
    )
    setIsArticleSelected(!!articleExists)
  }, [article.description, articles])

  return (
    <AnimatePresence>
      <motion.div
        transition={{ duration: 0.1 }}
        whileHover={{ scale: 1.005 }}
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <Paper
          p="sm"
          shadow="xs"
          style={{
            background:
              colorScheme === "dark" ? colors.dark[7] : colors.gray[0],
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Image
            src={urlToImage}
            alt={title}
            width="100%"
            height={200}
            fit="cover"
            radius="sm"
            style={{ marginBottom: "1rem" }}
          />
          <Text align="center" weight={700} size="xl">
            {title}
          </Text>
          <Text size="sm" style={{ marginTop: "1rem" }}>
            {description}
          </Text>
          <Text size="xs" style={{ marginTop: "1rem" }}>
            Author: {author === null ? "Unknown" : author}
          </Text>
          <Text size="xs">
            Published at: {new Date(publishedAt).toLocaleDateString()}
          </Text>
          <div
            style={{
              marginTop: "auto",
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <motion.a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                textDecoration: "none",
              }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  cursor: "pointer",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Text size="sm" className={classes.link}>
                  Read more
                </Text>
              </motion.div>
            </motion.a>
            <div style={{ cursor: "pointer" }} onClick={handleAddOrRemove}>
              {isArticleSelected ? <IconBadge fill="#fff" /> : <IconBadge />}
            </div>
          </div>
        </Paper>
      </motion.div>
    </AnimatePresence>
  )
}
const useStyles = createStyles((theme) => ({
  link: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    fontWeight: 600,

    "&:hover": {
      color:
        theme.colorScheme === "dark"
          ? theme.colors.blue[7]
          : theme.colors.gray[0],
    },
  },
}))
