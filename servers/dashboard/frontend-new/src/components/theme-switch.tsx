"use client"

import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    setIsChecked(theme == "dark")
  }, [theme])

  return (
    <div className="flex items-center gap-4">
      <Switch
        onClick={() => {
          if (theme == "light") setTheme("dark")
          else setTheme("light")
        }}
        checked={isChecked}
      />
      Dark Mode
    </div>
  )
}
