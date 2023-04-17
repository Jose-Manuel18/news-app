import {
  Drawer,
  ScrollArea,
  Divider,
  Button,
  Group,
  createStyles,
  rem,
  Text,
} from "@mantine/core"

import Link from "next/link"

interface IMantineDrawer {
  opened: boolean
  closed: () => void
  linksOpened: boolean
  toggleLinks: () => void
  categories: string[]
}
export const MantineDrawer = ({
  opened,
  closed,

  categories,
}: IMantineDrawer) => {
  const { classes, theme } = useStyles()
  const items = categories.map((tab) => (
    <Link
      key={tab}
      href={`/feed/${tab}`}
      className={classes.link}
      onClick={closed}
    >
      {tab}
    </Link>
  ))

  return (
    <Drawer
      opened={opened}
      onClose={closed}
      size="100%"
      padding="sm"
      title="Categories"
      className={classes.hiddenDesktop}
      zIndex={1000000}
    >
      <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
        <Divider
          my="sm"
          color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
        />
        <Text>{items}</Text>
        <Divider
          my="sm"
          color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
        />

        <Group position="center" grow pb="xl" px="md">
          <Button variant="default">Log in</Button>
          <Button>Sign up</Button>
        </Group>
      </ScrollArea>
    </Drawer>
  )
}
const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },
  hiddenDesktop: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
}))
