"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname } from "@/hooks/pathname"
import { useRouter } from "next/navigation"

export function DashboardSelect() {
  const router = useRouter()
  const pathname = usePathname()

  const placeholder = pathname === "/battery" ? "Battery" : "Select a dashboard"
  const defaultValue = pathname === "/battery" ? "battery" : undefined

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => {
        if (value == "battery") router.push("/battery")
        if (value == "cpu") router.push("/cpu")
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="battery">Battery</SelectItem>
        <SelectItem value="cpu">CPU</SelectItem>
      </SelectContent>
    </Select>
  )
}
