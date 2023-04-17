interface LayoutProps {
  children: React.ReactNode
  categories: string[]
}

import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  useMantineTheme,
} from "@mantine/core"
import { HeaderTabsColored } from "./Header"

import { BackToTop } from "../BackToTop"

export function Layout({ children, categories }: LayoutProps) {
  const theme = useMantineTheme()

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
        navbar={
          <Navbar
            p="sm"
            hiddenBreakpoint="sm"
            hidden={true}
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
                <HeaderTabsColored tabs={categories} />
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
