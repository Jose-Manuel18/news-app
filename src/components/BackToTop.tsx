import { useState, useEffect } from "react"

import { ActionIcon } from "@mantine/core"
import { motion, AnimatePresence } from "framer-motion"
import { IconArrowBadgeUp } from "@tabler/icons-react"

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const buttonVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 20 },
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={buttonVariants}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 100,
          }}
        >
          <ActionIcon
            variant="filled"
            size="xl"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <IconArrowBadgeUp />
          </ActionIcon>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
