import React from "react"
import { Paper, Text, Col, Image, Grid, useMantineTheme } from "@mantine/core"
import { motion, AnimatePresence } from "framer-motion"
import { IArticle } from "./types"

export const NewsCard: React.FC<{ article: IArticle }> = ({ article }) => {
  const { urlToImage, title, description, url, author, publishedAt } = article
  const theme = useMantineTheme()
  return (
    <AnimatePresence>
      <motion.div
        initial={{ rotateY: 180 }}
        animate={{ rotateY: 0 }}
        exit={{ rotateY: 180 }}
        transition={{ duration: 0.1 }}
        whileHover={{ scale: 1.005 }}
      >
        <Paper
          p="md"
          shadow="xs"
          style={{
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
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
          <Text size="xs" color="gray" style={{ marginTop: "1rem" }}>
            Author: {author}
          </Text>
          <Text size="xs" color="gray">
            Published at: {new Date(publishedAt).toLocaleDateString()}
          </Text>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Text size="xs" color="blue" style={{ marginTop: "1rem" }}>
              Read more
            </Text>
          </a>
        </Paper>
      </motion.div>
    </AnimatePresence>
  )
}
