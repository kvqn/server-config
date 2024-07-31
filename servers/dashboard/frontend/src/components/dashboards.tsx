import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Dashboards() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Dashboard" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="battery">Battery</SelectItem>
        <SelectItem value="cpu">CPU</SelectItem>
        <SelectItem value="ram">RAM</SelectItem>
      </SelectContent>
    </Select>
  )
}
