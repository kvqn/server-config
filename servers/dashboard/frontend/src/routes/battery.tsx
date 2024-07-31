import { LoadingImage } from "@/components/loading-image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useThemeContext } from "@/contexts/theme"
import { env } from "@/env"
import { useEffect, useState } from "react"
import urlJoin from "url-join"

export function BatteryDashboard() {
  const [hours, setHours] = useState(2)
  const [image, setImage] = useState<string>()
  const { theme } = useThemeContext()

  useEffect(() => {
    const url = urlJoin(
      env.VITE_BACKEND_URL,
      "battery",
      `?hours=${hours}`,
      `?theme=${theme}`,
    )
    console.log(url)
    setImage(url)
  }, [hours, theme])
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Battery percentage over time</h1>
      <LoadingImage src={image} className="" />
      <div className="py-8">
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
    </div>
  )
}
