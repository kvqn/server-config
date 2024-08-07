import { useThemeContext } from "@/contexts/theme"
import HashLoader from "react-spinners/HashLoader"

export function Loader() {
  const { theme } = useThemeContext()
  return <HashLoader color={theme === "dark" ? "white" : "black"} />
}
