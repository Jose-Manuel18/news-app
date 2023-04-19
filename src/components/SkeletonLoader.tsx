import React from "react"
import { Grid, Paper, useMantineTheme, Skeleton } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { motion, AnimatePresence } from "framer-motion"

export const NewsCardSkeleton = () => {
  const { colorScheme, colors } = useMantineTheme()
  const large = useMediaQuery("(min-width: 74em)")
  const medium = useMediaQuery("(min-width: 48em)")
  const small = useMediaQuery("(min-width: 30em)")

  const getColumnSpan = () => {
    if (large) return 4
    if (medium) return 5
    if (small) return 6
    return 12
  }

  return (
    <Grid.Col span={getColumnSpan()}>
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
            <Skeleton height={200} />
            <Skeleton height={24} style={{ marginTop: "1rem" }} />
            <Skeleton height={16} style={{ marginTop: "1rem" }} />
            <Skeleton height={12} style={{ marginTop: "1rem" }} />
            <Skeleton height={12} />
            <div
              style={{
                marginTop: "auto",
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Skeleton height={12} width={70} />
              <Skeleton height={24} width={24} />
            </div>
          </Paper>
        </motion.div>
      </AnimatePresence>
    </Grid.Col>
  )
}

export const SkeletonArticleList = ({ count = 6 }) => {
  const skeletons = new Array(count).fill(null)

  return (
    <Grid style={{ display: "flex", justifyContent: "center" }}>
      {skeletons.map((_, index) => (
        <NewsCardSkeleton key={index} />
      ))}
    </Grid>
  )
}
