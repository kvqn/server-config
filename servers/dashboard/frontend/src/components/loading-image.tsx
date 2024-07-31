import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Loader } from "./loader"

export function LoadingImage({
  src,
  className,
}: {
  src?: string
  className?: string
}) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
  }, [src])

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div
        className={cn("flex flex-col items-center justify-center gap-4 p-4", {
          hidden: loaded,
        })}
      >
        <Loader />
        Loading
      </div>
      <img
        src={src}
        onLoad={() => {
          setLoaded(true)
        }}
        className={cn(
          "border-2 border-black dark:border-white",
          !loaded && "hidden",
        )}
      />
    </div>
  )
}
