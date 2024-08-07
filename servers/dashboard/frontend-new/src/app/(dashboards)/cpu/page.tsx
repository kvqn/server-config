"use client"

import { TimeframeOptions, type TimeframeType } from "@/components/timeframe"
import { Button } from "@/components/ui/button"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import cloneDeep from "lodash.clonedeep"
import { useTheme } from "@/hooks/theme"
import { SuspenseImage } from "@/components/suspense-image"
import api from "@/lib/bindings"
import { Checkbox } from "@/components/ui/checkbox"
import { titleCase } from "@/lib/utils"

export default function Page() {
  const { options } = useCpuOptions()
  const { theme } = useTheme()
  console.log("theme", theme)

  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined)
  const [heartbeats, setHeartbeats] = useState<number | undefined>(undefined)

  useEffect(() => {
    void (async () => {
      setImageSrc(undefined)
      setHeartbeats(undefined)

      const resp =
        options.timeframe.type == "simple"
          ? await api.get.chart.cpu.byHours(
              options.cpus,
              options.timeframe.hours,
              theme,
            )
          : await api.get.chart.cpu.byRange(
              options.cpus,
              options.timeframe.before,
              options.timeframe.after,
              theme,
            )

      setImageSrc("data:image/png;base64, " + resp.fig)
      setHeartbeats(resp.heartbeats)
    })()
  }, [options, theme])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      {JSON.stringify(options)}
      <SuspenseImage src={imageSrc} />
      {heartbeats && <p>{heartbeats} Heartbeats</p>}
    </div>
  )
}

export function CpuOptions() {
  const { options, setOptions } = useCpuOptions()
  const optionsRef = useRef(options)

  function CpuToggle({ cpu, text }: { cpu: string; text?: string }) {
    return (
      <div className="flex items-center gap-2">
        <Checkbox
          onClick={() => {
            if (optionsRef.current.cpus.includes(cpu)) {
              optionsRef.current.cpus = optionsRef.current.cpus.filter(
                (c) => c !== cpu,
              )
            } else {
              optionsRef.current.cpus.push(cpu)
            }
          }}
          id={cpu}
          defaultChecked={optionsRef.current.cpus.includes(cpu)}
        />
        <label htmlFor={cpu}>{text ?? titleCase(cpu)}</label>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <TimeframeOptions options={optionsRef} />
      <div className="flex flex-col items-center gap-4 rounded-xl border-2 p-4">
        <h3 className="font-semibold">CPUs</h3>
        <CpuToggle cpu="all" text="All (Average)" />
        <div className="grid grid-cols-4 justify-center gap-4">
          <CpuToggle cpu="0" />
          <CpuToggle cpu="1" />
          <CpuToggle cpu="2" />
          <CpuToggle cpu="3" />
          <CpuToggle cpu="4" />
          <CpuToggle cpu="5" />
          <CpuToggle cpu="6" />
          <CpuToggle cpu="7" />
        </div>
      </div>
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

type CpuOptions = {
  timeframe: TimeframeType
  cpus: string[]
}

const CpuOptionsContext = createContext<{
  options: CpuOptions
  setOptions: (options: CpuOptions) => void
} | null>(null)

function useCpuOptions() {
  const context = useContext(CpuOptionsContext)
  if (!context) {
    throw new Error("useCpuOptions must be used within a CpuOptionsProvider")
  }
  return context
}

export function CpuOptionsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [options, setOptions] = useState<CpuOptions>({
    timeframe: { type: "simple", hours: 2 },
    cpus: ["all"],
  })

  return (
    <CpuOptionsContext.Provider value={{ options, setOptions }}>
      {children}
    </CpuOptionsContext.Provider>
  )
}
