import {
  Drawer,
  ScrollArea,
  Divider,
  createStyles,
  rem,
  Text,
} from "@mantine/core"

import Link from "next/link"
import { useRouter } from "next/router"

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
  const { classes, theme, cx } = useStyles()

  const { query, pathname } = useRouter()

  const links = categories.map((link) => {
    const isActive = query.category === link

    return (
      <Link
        className={cx(classes.link, {
          [classes.linkActive]: isActive,
        })}
        href={`/feed/${link}`}
        key={link}
        onClick={closed}
      >
        {link}
      </Link>
    )
  })

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
        <Text>{links}</Text>
        <Divider
          my="sm"
          color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
        />
        <Link
          href={"/bookmarks"}
          onClick={closed}
          className={cx(classes.bookmarks, {
            [classes.linkActive]: pathname === "/bookmarks",
          })}
        >
          <Text>Bookmarks</Text>
        </Link>
      </ScrollArea>
    </Drawer>
  )
}
const useStyles = createStyles((theme) => ({
  bookmarks: {
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
  linkActive: {
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,

    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[2],
  },
}))
