import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from "react-router-dom"

export function Dashboards() {
  const navigate = useNavigate()
  return (
    <Select onValueChange={(value) => navigate(`/${value}`)}>
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
