// import { HeaderTabsColored, NavbarNested } from "@/index"
interface LayoutProps {
  children: React.ReactNode
  categories: string[]
}
// export function Layout({ children, categories }: LayoutProps) {
const mockData = {
  user: {
    name: "Jane Spoonfighter",
    email: "janspoon@fighter.dev",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
  },
  tabs: [
    "Home",
    "Orders",
    "Education",
    "Community",
    "Forums",
    "Support",
    "Account",
    "Helpdesk",
  ],
}

import { useState } from "react"
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Center,
} from "@mantine/core"
import { HeaderTabsColored } from "./Header"
import { NavbarNested } from "./NavBar"
import { BackToTop } from "../BackToTop"

export function Layout({ children, categories }: LayoutProps) {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  return (
    <>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        layout="alt"
        // navbarOffsetBreakpoint="xs"

        navbar={
          <Navbar
            p="sm"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Text>hey</Text>
          </Navbar>
        }
        header={
          <Header height={{ md: 80, sm: 100, xs: 50, base: 50 }} p="sm">
            <MediaQuery largerThan="sm" styles={{ justifyContent: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <HeaderTabsColored tabs={categories} user={mockData.user} />
              </div>
            </MediaQuery>
          </Header>
        }
      >
        {children}
        <BackToTop />
      </AppShell>
    </>
  )
}
