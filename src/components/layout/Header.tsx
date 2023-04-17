import { createStyles, Container, Tabs, Burger, rem } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useRouter } from "next/router"
import { MantineDrawer } from "../Drawer"
import Link from "next/link"

interface HeaderTabsProps {
  tabs: string[]
}

export function HeaderTabsColored({ tabs }: HeaderTabsProps) {
  const { query } = useRouter()

  const { classes, theme } = useStyles()

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
            defaultValue={query.category as string}
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
        categories={tabs}
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
