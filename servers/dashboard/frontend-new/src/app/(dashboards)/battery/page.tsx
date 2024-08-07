"use client"

import { TimeframeOptions, type TimeframeType } from "@/components/timeframe"
import { Button } from "@/components/ui/button"
import { createContext, useContext, useRef, useState } from "react"
import cloneDeep from "lodash.clonedeep"
import urljoin from "url-join"
import { useTheme } from "@/hooks/theme"
import { SuspenseImage } from "@/components/suspense-image"

export default function Page() {
  const { options } = useBatteryOptions()
  const { theme } = useTheme()
  console.log("theme", theme)

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <SuspenseImage
        src={urljoin(
          "/api/charts/battery",
          `?hours=${options.timeframe.type == "simple" ? options.timeframe.hours : 2}`,
          `?theme=${theme}`,
        )}
      />
    </div>
  )
}

export function BatteryOptions() {
  const { options, setOptions } = useBatteryOptions()
  const optionsRef = useRef(options)

  return (
    <div className="flex w-full flex-col gap-4">
      <TimeframeOptions options={optionsRef} />
      <Button
        onClick={() => {
          setOptions(cloneDeep(optionsRef.current))
        }}
      >
        Apply
      </Button>
    </div>
  )
}

type BatteryOptions = {
  timeframe: TimeframeType
}

const BatteryOptionsContext = createContext<{
  options: BatteryOptions
  setOptions: (options: BatteryOptions) => void
} | null>(null)

function useBatteryOptions() {
  const context = useContext(BatteryOptionsContext)
  if (!context) {
    throw new Error(
      "useBatteryOptionsContext must be used within a BatteryOptionsProvider",
    )
  }
  return context
}

export function BatteryOptionsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [options, setOptions] = useState<BatteryOptions>({
    timeframe: { type: "simple", hours: 2 },
  })

  return (
    <BatteryOptionsContext.Provider value={{ options, setOptions }}>
      {children}
    </BatteryOptionsContext.Provider>
  )
}
