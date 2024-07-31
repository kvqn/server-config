import React from "react"
import ReactDOM from "react-dom/client"
import { Home, Welcome } from "./routes/home.tsx"
import "./index.css"
import { ThemeProvider } from "./contexts/theme.tsx"
import "unfonts.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { BatteryDashboard } from "./routes/battery.tsx"
import { ErrorPage } from "./components/error-page.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <Welcome />,
      },
      {
        path: "battery",
        element: <BatteryDashboard />,
      },
    ],
    errorElement: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
