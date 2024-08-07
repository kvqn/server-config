"use client"

import { TimeframeOptions, type TimeframeType } from "@/components/timeframe"
import { Button } from "@/components/ui/button"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import cloneDeep from "lodash.clonedeep"
import { useTheme } from "@/hooks/theme"
import { SuspenseImage } from "@/components/suspense-image"
import axios, { type AxiosResponse } from "axios"

type BatteryChartResponse = {
  heartbeats: number
  fig: string
}

export default function Page() {
  const { options } = useBatteryOptions()
  const { theme } = useTheme()
  console.log("theme", theme)

  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined)
  const [heartbeats, setHeartbeats] = useState<number | undefined>(undefined)

  useEffect(() => {
    void (async () => {
      setImageSrc(undefined)
      const resp: AxiosResponse<BatteryChartResponse> =
        options.timeframe.type == "simple"
          ? await axios.get("/api/charts/battery/by-hours", {
              params: {
                hours: options.timeframe.hours,
                theme: theme,
              },
            })
          : await axios.get("/api/charts/battery/by-range", {
              params: {
                before: options.timeframe.before.toISOString(),
                after: options.timeframe.after.toISOString(),
                theme: theme,
              },
            })

      setImageSrc("data:image/png;base64, " + resp.data.fig)
      setHeartbeats(resp.data.heartbeats)
    })()
  }, [options, theme])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <SuspenseImage src={imageSrc} />
      {heartbeats && <p>{heartbeats} Heartbeats</p>}
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
