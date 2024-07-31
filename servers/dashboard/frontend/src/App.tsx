import { Dashboards } from "./components/dashboards"
import { ThemeToggle } from "./components/theme-toggle"

export default function App() {
  return (
    <div className="font-inter p-2 text-black dark:text-white">
      <Dashboards />
      <div className="fixed right-2 top-2">
        <ThemeToggle />
      </div>
    </div>
  )
}
