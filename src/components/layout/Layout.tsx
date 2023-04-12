import { HeaderTabsColored, NavbarNested } from "@/index"

export function Layout({ children }: { children: React.ReactNode }) {
  const mockdata = {
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
  return (
    <div style={{ display: "flex" }}>
      <NavbarNested />
      <div style={{ flex: 1 }}>
        <HeaderTabsColored tabs={mockdata.tabs} user={mockdata.user}>
          {children}
        </HeaderTabsColored>
      </div>
    </div>
  )
}
