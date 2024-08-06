"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TimePicker } from "./time-picker"
import { useEffect, useState } from "react"

export function DatePicker({
  onDateChange,
}: {
  onDateChange: (date: Date) => void
}) {
  const [date, setDate] = useState<Date>(new Date())
  const [pickerOpen, setPickerOpen] = useState(false)

  useEffect(() => {
    onDateChange(date)
  }, [date, onDateChange])
  return (
    <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd-MM-yy HH:mm") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col items-center divide-y p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        <div className="flex w-full items-center justify-center p-2">
          <TimePicker
            hours={date.getHours()}
            minutes={date.getMinutes()}
            setHours={(hours) => {
              const newDate = new Date(date)
              newDate.setHours(hours)
              setDate(newDate)
            }}
            setMinutes={(minutes) => {
              const newDate = new Date(date)
              newDate.setMinutes(minutes)
              setDate(newDate)
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
