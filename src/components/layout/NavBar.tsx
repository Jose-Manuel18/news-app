import { createStyles, Navbar, Title, rem } from "@mantine/core"

import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const linksMockData = [{ name: "Bookmark", url: "/bookmarks" }]

export const NavigationBar = () => {
  const { pathname } = useRouter()
  const { classes, cx } = useStyles()
  const [activeLink, setActiveLink] = useState("")

  const links = linksMockData.map((link) => {
    const isActive = pathname === link.url
    return (
      <Link
        className={cx(classes.link, {
          [classes.linkActive]: isActive,
        })}
        href={link.url}
        key={link.name}
        onClick={() => {
          setActiveLink(link.name)
        }}
      >
        {link.name}
      </Link>
    )
  })

  return (
    <Navbar.Section grow className={classes.wrapper}>
      <div className={classes.main}>
        <Title order={4} className={classes.title}>
          {activeLink}
        </Title>
        <Navbar.Section>
          <div className={classes.navBar}>{links}</div>
        </Navbar.Section>
      </div>
    </Navbar.Section>
  )
}
const useStyles = createStyles((theme) => ({
  navBar: {
    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.blue[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
  wrapper: {
    display: "flex",
  },

  main: {
    flex: 1,
  },

  mainLink: {
    width: rem(44),
    height: rem(44),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    " &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },

  title: {
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: rem(18),
    height: rem(60),
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  link: {
    boxSizing: "border-box",
    display: "block",
    textDecoration: "none",
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: rem(44),
    lineHeight: rem(44),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    "&:hover": {
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      transform: "scale(1.03)",
    },
  },

  linkActive: {
    "&, &:hover": {
      borderLeftColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      color: theme.white,
    },
  },
}))
