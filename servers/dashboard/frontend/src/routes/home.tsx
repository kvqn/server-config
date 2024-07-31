import { Dashboards } from "@/components/dashboards"
import { ThemeToggle } from "@/components/theme-toggle"
import { Outlet } from "react-router-dom"

export function Home() {
  return (
    <div className="flex h-screen flex-col p-2 font-geist-sans text-black dark:text-white">
      <div className="flex justify-between p-2">
        <Dashboards />
        <ThemeToggle />
      </div>
      <div className="flex flex-grow flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900">
        <Outlet />
      </div>
    </div>
  )
}

export function Welcome() {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <h2>Select a dashboard</h2>
    </div>
  )
}
