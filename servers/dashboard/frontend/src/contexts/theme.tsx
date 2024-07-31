import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext<{
  theme: "light" | "dark"
  setTheme: (newTheme: "light" | "dark") => void
} | null>(null)

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context)
    throw Error("You can only use useThemeContext inside of ThemeProvider")
  return context
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, _setTheme] = useState<"light" | "dark">("light")

  function setTheme(theme: "light" | "dark") {
    localStorage.setItem("theme", theme)
    if (theme == "dark") document.body.classList.add("dark")
    else document.body.classList.remove("dark")
    _setTheme(theme)
  }

  useEffect(() => {
    const localTheme = localStorage.getItem("theme")
    if (localTheme && (localTheme == "light" || localTheme == "dark"))
      setTheme(localTheme)
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <div className={theme == "dark" ? "dark" : ""}>{children}</div>
    </ThemeContext.Provider>
  )
}
