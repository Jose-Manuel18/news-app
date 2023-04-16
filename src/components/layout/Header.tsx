import { useState } from "react"
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  ThemeIcon,
  Drawer,
  ScrollArea,
  Divider,
  Center,
  Box,
  Collapse,
  Button,
  SimpleGrid,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconChartPie3,
  IconNotification,
  IconBook,
} from "@tabler/icons-react"
import { MantineDrawer } from "../Drawer"
import Link from "next/link"

interface HeaderTabsProps {
  user: { name: string; image: string }
  tabs: string[]
}
const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
]
export function HeaderTabsColored({ user, tabs }: HeaderTabsProps) {
  const { classes, theme, cx } = useStyles()
  const [opened, { toggle }] = useDisclosure(false)
  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false)
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)

  const items = tabs.map((tab) => (
    <Link
      key={tab}
      style={{ textDecoration: "none", color: "inherit" }}
      href={`/feed/${tab}`}
    >
      <Tabs.Tab value={tab}>{tab}</Tabs.Tab>
    </Link>
  ))

  return (
    <>
      <div className={classes.header}>
        <Burger
          onClick={toggleDrawer}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
          opened={drawerOpened}
          className={classes.hiddenDesktop}
        />
        <Container>
          <Tabs
            defaultValue="general"
            variant="pills"
            classNames={{
              root: classes.tabs,
              tabsList: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List>{items}</Tabs.List>
          </Tabs>
        </Container>
      </div>
      <MantineDrawer
        opened={drawerOpened}
        closed={closeDrawer}
        linksOpened={linksOpened}
        toggleLinks={toggleLinks}
      />
    </>
  )
}
const useStyles = createStyles((theme) => ({
  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  header: {
    padding: rem(24),
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
    justifyContent: "center",
    alignItems: "center",
  },

  tab: {
    fontWeight: 500,
    height: rem(38),
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.blue[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}))
