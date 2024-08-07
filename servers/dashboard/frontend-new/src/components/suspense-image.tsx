/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function SuspenseImage({ src }: { src?: string }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("set loading to true")
    setLoading(true)
  }, [src])

  return (
    <div>
      <div
        className={cn(
          "hidden h-64 w-full items-center justify-center",
          loading && "flex",
        )}
      >
        Loading..
      </div>
      <img
        className={cn("block", loading && "hidden")}
        src={src}
        onLoad={() => {
          setLoading(false)
        }}
      />
    </div>
  )
}
