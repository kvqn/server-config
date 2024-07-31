import { Dashboards } from "@/components/dashboards"
import { ThemeToggle } from "@/components/theme-toggle"
import { Outlet } from "react-router-dom"

export function Home() {
  return (
    <div className="font-geist-sans flex h-screen flex-col p-2 text-black dark:text-white">
      <Dashboards />
      <div className="fixed right-2 top-2">
        <ThemeToggle />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  )
}
