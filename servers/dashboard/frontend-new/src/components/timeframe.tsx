"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRef, useState } from "react"
import { DatePicker } from "./date-picker"

export function Timeframe() {
  const timeframe = useRef<
    | { type: "simple"; hours: number }
    | { type: "precise"; after: Date; before: Date }
  >({ type: "simple", hours: 2 })

  const [beforeDate, setBeforeDate] = useState(() => {
    const date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    return date
  })

  const [afterDate, setAfterDate] = useState(() => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    date.setHours(0)
    date.setMinutes(0)
    return date
  })

  const [tab, setTab] = useState("simple")

  const component = () => (
    <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-neutral-200 py-4">
      <h2>Timeframe</h2>
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="flex flex-col items-center"
      >
        <TabsList>
          <TabsTrigger value="simple">Simple</TabsTrigger>
          <TabsTrigger value="precise">Precise</TabsTrigger>
        </TabsList>
        <TabsContent value="simple" className="w-full">
          <Select
            onValueChange={(value) => {
              timeframe.current = { type: "simple", hours: parseInt(value) }
            }}
          >
            <SelectTrigger defaultValue="2" className="w-full">
              <SelectValue placeholder="2 Hours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 Hours</SelectItem>
              <SelectItem value="6">6 Hours</SelectItem>
              <SelectItem value="12">12 Hours</SelectItem>
              <SelectItem value="24">1 Day</SelectItem>
              <SelectItem value="48">2 Days</SelectItem>
            </SelectContent>
          </Select>
        </TabsContent>
        <TabsContent value="precise">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label className="w-16">After</label>
              <DatePicker
                onDateChange={(date) => {
                  timeframe.current = {
                    type: "precise",
                    after: date,
                    before: beforeDate,
                  }
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-16">Before</label>
              <DatePicker
                onDateChange={(date) => {
                  timeframe.current = {
                    type: "precise",
                    after: afterDate,
                    before: date,
                  }
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )

  return [timeframe, component] as const
}
