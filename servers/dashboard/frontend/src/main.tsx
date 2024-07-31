import React from "react"
import ReactDOM from "react-dom/client"
import { Home } from "./routes/home.tsx"
import "./index.css"
import { ThemeProvider } from "./contexts/theme.tsx"
import "unfonts.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { BatteryDashboard } from "./routes/battery.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "battery",
        element: <BatteryDashboard />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
