"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type MutableRefObject, useState } from "react"
import { DatePicker } from "./date-picker"

export type TimeframeType =
  | { type: "simple"; hours: number }
  | { type: "precise"; after: Date; before: Date }

export function TimeframeOptions({
  options,
}: {
  options: MutableRefObject<{ timeframe: TimeframeType }>
}) {
  const [tab, setTab] = useState("simple")

  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border-2 p-4">
      <h3 className="font-semibold">Timeframe</h3>
      <Tabs
        value={tab}
        onValueChange={(newTab) => {
          if (newTab == "simple")
            options.current.timeframe = { type: "simple", hours: 2 }
          if (newTab == "precise") {
            const afterDate = new Date()
            afterDate.setHours(0, 0, 0, 0)
            afterDate.setDate(afterDate.getDate() - 1)

            const beforeDate = new Date()
            beforeDate.setHours(0, 0, 0, 0)
            options.current.timeframe = {
              type: "precise",
              after: afterDate,
              before: beforeDate,
            }
          }
          setTab(newTab)
        }}
        className="flex flex-col items-center"
      >
        <TabsList>
          <TabsTrigger value="simple">Simple</TabsTrigger>
          <TabsTrigger value="precise">Precise</TabsTrigger>
        </TabsList>
        <TabsContent value="simple" className="w-full">
          <Select
            onValueChange={(value) => {
              options.current.timeframe = {
                type: "simple",
                hours: parseInt(value),
              }
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
                  if (options.current.timeframe.type == "precise")
                    options.current.timeframe.after = date
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-16">Before</label>
              <DatePicker
                onDateChange={(date) => {
                  if (options.current.timeframe.type == "precise")
                    options.current.timeframe.before = date
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
