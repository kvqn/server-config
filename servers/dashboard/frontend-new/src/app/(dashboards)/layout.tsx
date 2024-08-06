import { DashboardHeading } from "@/components/dashboard-heading"
import { DashboardOptions } from "@/components/dashboard-options"
import { DashboardSelect } from "@/components/dashboard-select"
import { ThemeSwitch } from "@/components/theme-switch"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col divide-y">
      <div className="flex divide-x">
        <div className="w-1/4 p-2">
          <DashboardSelect />
        </div>
        <div className="flex items-center p-2">
          <DashboardHeading />
        </div>
      </div>
      <div className="flex flex-grow divide-x">
        <div className="flex w-1/4 flex-col p-2">
          <div className="flex-grow">
            <DashboardOptions />
          </div>
          <div>
            <ThemeSwitch />
          </div>
        </div>
        <div className="p-2">{children}</div>
      </div>
    </div>
  )
}
