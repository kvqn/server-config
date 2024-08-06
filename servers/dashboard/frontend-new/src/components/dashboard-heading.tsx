"use client"
import { usePathname } from "@/hooks/pathname"

export function DashboardHeading() {
  const pathname = usePathname()

  if (pathname == "/battery") return <h1>Battery</h1>
  if (pathname == "/cpu") return <h1>CPU</h1>

  return <h1>Welcome</h1>
}
