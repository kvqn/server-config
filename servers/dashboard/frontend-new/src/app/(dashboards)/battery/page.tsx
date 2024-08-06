import { Timeframe } from "@/components/timeframe"

export default function Page() {
  return <div>battery dashboard</div>
}

export function BatteryOptions() {
  const [timeframe, TimeframePicker] = Timeframe()
  return (
    <div className="flex w-full flex-col">
      <TimeframePicker />
    </div>
  )
}
