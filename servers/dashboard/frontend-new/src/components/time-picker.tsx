"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "./ui/button"
import { numberPad } from "@/lib/utils"

export function TimePicker({
  minutes,
  hours,
  setHours,
  setMinutes,
}: {
  minutes: number
  hours: number
  setHours: (hours: number) => void
  setMinutes: (minutes: number) => void
}) {
  const [hoursOpen, setHoursOpen] = useState(false)
  const [minutesOpen, setMinutesOpen] = useState(false)
  return (
    <div className="flex items-center gap-2 font-geist-mono">
      <Popover onOpenChange={setHoursOpen} open={hoursOpen}>
        <PopoverTrigger asChild>
          <Button variant={"outline"}>{numberPad(hours, 2)}</Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-fit flex-col items-center gap-4">
          Hours
          <ScrollArea className="h-40 w-fit">
            <div className="flex w-fit flex-col p-4 font-geist-mono">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  className="rounded-md px-4 py-2 text-center hover:bg-accent"
                  key={i}
                  onClick={() => {
                    setHours(i)
                    setHoursOpen(false)
                  }}
                >
                  {numberPad(i, 2)}
                </div>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      <span>:</span>

      <Popover onOpenChange={setMinutesOpen} open={minutesOpen}>
        <PopoverTrigger asChild>
          <Button variant={"outline"}>{numberPad(minutes, 2)}</Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-fit flex-col items-center gap-4">
          Hours
          <ScrollArea className="h-40 w-fit">
            <div className="flex w-fit flex-col p-4 font-geist-mono">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  className="rounded-md px-4 py-2 text-center hover:bg-accent"
                  key={i}
                  onClick={() => {
                    setMinutes(i)
                    setMinutesOpen(false)
                  }}
                >
                  {numberPad(i, 2)}
                </div>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  )
}
