import { DashboardSelect } from "@/components/dashboard-select"

export default function HomePage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <div>
        <DashboardSelect />
      </div>
    </div>
  )
}
