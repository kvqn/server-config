// before and after

// last 2 hour, 6 hours, 12 hour, 1 day, 2 day
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { env } from "@/env"
import { useEffect, useState } from "react"
import urlJoin from "url-join"

export function BatteryDashboard() {
  const [hours, setHours] = useState(2)
  const [image, setImage] = useState<string>()

  useEffect(() => {
    setImage(urlJoin(env.VITE_BACKEND_URL, "battery", `?hours=${hours}`))
  }, [hours])
  return (
    <div className="">
      <div>
        <Select
          onValueChange={(value) => {
            setHours(parseInt(value))
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue defaultValue="2" placeholder="2 Hours" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2 Hours</SelectItem>
            <SelectItem value="6">6 Hours</SelectItem>
            <SelectItem value="12">12 Hours</SelectItem>
            <SelectItem value="24">1 Day</SelectItem>
            <SelectItem value="48">2 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <img src={image} />
      </div>
    </div>
  )
}
