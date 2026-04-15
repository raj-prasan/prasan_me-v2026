"use client"
import React from "react"
import ReactTimeAgo from "react-time-ago"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

import { cn } from "@/lib/utils"

TimeAgo.addDefaultLocale(en)

export default function LastUpdated({ date, className }: { date: Date | number, className?: string }) {
  return (
    <div className={cn("font-medium text-emerald-300 mt-8", className)}>
      <ReactTimeAgo date={date} locale="en-US"/>
    </div>
  )
}