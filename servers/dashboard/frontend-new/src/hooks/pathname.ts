import { usePathname as _usePathname } from "next/navigation"

export function usePathname() {
  "use client"
  const pathname = _usePathname()

  if (pathname == "/battery") return "/battery"
  if (pathname == "/cpu") return "/cpu"
  return "/"
}
