// components/EmptyListMessage.js

import React from "react"
import { Text, Paper, Col, Container, Grid } from "@mantine/core"
import { motion } from "framer-motion"

export const EmptyListMessage = () => {
  const fadeIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  const bounce = {
    initial: { y: -20 },
    animate: {
      y: 0,
      transition: {
        yoyo: Infinity,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <Container>
      <Grid>
        <Col>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Paper
              p="xl"
              shadow="xs"
              style={{ textAlign: "center", marginTop: "2rem" }}
            >
              <motion.div variants={bounce} initial="initial" animate="animate">
                <Text align="center" size="xl">
                  📰
                </Text>
              </motion.div>
              <Text align="center" size="xl">
                Oops! The list is empty.
              </Text>
              <Text align="center" size="md">
                It looks like there are no articles yet. Please add some to see
                them here.
              </Text>
            </Paper>
          </motion.div>
        </Col>
      </Grid>
    </Container>
  )
}
