import { DashboardHeading } from "@/components/dashboard-heading"
import {
  DashboardOptions,
  OptionsProvider,
} from "@/components/dashboard-options"
import { DashboardSelect } from "@/components/dashboard-select"
import { ThemeSwitch } from "@/components/theme-switch"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export default function Layout({ children }: { children: React.ReactNode }) {
  const dashboardSelect = (
    <div className="fixed right-4 top-4 flex h-12 w-40 items-center px-4">
      <DashboardSelect />
    </div>
  )
  const dashboardOptions = (
    <div className="flex flex-grow flex-col items-center p-4">
      <DashboardOptions />
    </div>
  )

  const dashboardChildren = <div className="h-full p-2">{children}</div>

  return (
    <div>
      {dashboardSelect}
      <OptionsProvider>
        <div className="hidden md:block">
          <ResizablePanelGroup
            direction="horizontal"
            className="h-screen w-screen"
          >
            <ResizablePanel
              className="flex h-screen flex-grow flex-col divide-y"
              defaultSize={25}
            >
              {dashboardOptions}
              <div className="p-4">
                <ThemeSwitch />
              </div>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel className="flex flex-col divide-y" defaultSize={75}>
              {dashboardChildren}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <div className="flex h-screen items-center justify-center gap-4 md:hidden">
          {dashboardChildren}
          <Drawer>
            <DrawerTrigger>
              <Button className="fixed bottom-4 left-1/2 -translate-x-1/2">
                Open Drawer
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Adjust chart options</DrawerTitle>
                <DrawerDescription>
                  Hit the apply button to confirm your changes
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <div className="flex justify-center">
                  <ThemeSwitch />
                </div>
                {dashboardOptions}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </OptionsProvider>
    </div>
  )
}
