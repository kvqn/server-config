import { Classic } from "@theme-toggles/react"
import "@theme-toggles/react/css/Classic.css"
import { useThemeContext } from "../contexts/theme"

export function ThemeToggle() {
  const { theme, setTheme } = useThemeContext()
  return (
    <div className="text-4xl">
      <Classic
        duration={750}
        onClickCapture={() => {
          if (theme == "light") setTheme("dark")
          if (theme == "dark") setTheme("light")
        }}
        toggled={theme == "dark"}
      />
    </div>
  )
}
