"use client"

import {
  BatteryOptions,
  BatteryOptionsProvider,
} from "@/app/(dashboards)/battery/page"
import { CpuOptions, CpuOptionsProvider } from "@/app/(dashboards)/cpu/page"
import { usePathname } from "@/hooks/pathname"

export function DashboardOptions() {
  const pathname = usePathname()

  if (pathname == "/battery") return <BatteryOptions />
  if (pathname == "/cpu") return <CpuOptions />
  return <div className="flex-grow">some options</div>
}

export function OptionsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname == "/battery")
    return <BatteryOptionsProvider>{children}</BatteryOptionsProvider>

  if (pathname == "/cpu")
    return <CpuOptionsProvider>{children}</CpuOptionsProvider>

  return <>{children}</>
}
