"use client"
import React from "react"
import ReactTimeAgo from "react-time-ago"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

export default function LastUpdated({ date }: { date: Date | number }) {
  return (
    <div className="font-medium text-emerald-400 mt-8">
      Updated <ReactTimeAgo date={date} locale="en-US"/>
    </div>
  )
}