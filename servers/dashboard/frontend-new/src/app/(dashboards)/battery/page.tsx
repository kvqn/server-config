"use client"

import { TimeframeOptions, type TimeframeType } from "@/components/timeframe"
import { Button } from "@/components/ui/button"
import { createContext, useContext, useRef, useState } from "react"
import cloneDeep from "lodash.clonedeep"

export default function Page() {
  const { options } = useBatteryOptions()

  return (
    <div>
      battery dashboard
      {JSON.stringify(options)}
    </div>
  )
}

export function BatteryOptions() {
  const { options, setOptions } = useBatteryOptions()
  const optionsRef = useRef(options)

  return (
    <div className="flex w-full flex-col">
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
