import { DashboardHeading } from "@/components/dashboard-heading"
import { DashboardOptions } from "@/components/dashboard-options"
import { DashboardSelect } from "@/components/dashboard-select"
import { ThemeSwitch } from "@/components/theme-switch"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen w-screen">
      <ResizablePanel
        className="flex h-screen flex-col divide-y"
        defaultSize={25}
      >
        <div className="flex h-12 items-center px-4">
          <DashboardSelect />
        </div>
        <div className="flex flex-grow flex-col items-center p-4">
          <DashboardOptions />
          <div className="flex flex-grow items-end">
            <ThemeSwitch />
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel className="flex flex-col divide-y" defaultSize={75}>
        <div className="flex h-12 items-center px-4">
          <DashboardHeading />
        </div>
        <div className="p-2">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
