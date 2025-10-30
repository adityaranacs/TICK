"use client"

import { useState, useEffect } from "react"
import { api } from "@/trpc/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Clock from "react-clock"
import 'react-clock/dist/Clock.css';
import './clock.css'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Clock as ClockIcon, Play, Square, Coffee, Timer, Calendar, User } from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

const statusConfig = {
  clocked_out: {
    label: "Clocked Out",
    color: "bg-gray-100 text-gray-800",
    icon: Square,
  },
  clocked_in: {
    label: "Clocked In",
    color: "bg-green-100 text-green-800",
    icon: Play,
  },
  break_start: {
    label: "On Break",
    color: "bg-yellow-100 text-yellow-800",
    icon: Coffee,
  },
  break_end: {
    label: "Break Ended",
    color: "bg-blue-100 text-blue-800",
    icon: Timer,
  },
} as const

export function AttendanceClockCard() {
  const [showClockDialog, setShowClockDialog] = useState(false)
  const [clockAction, setClockAction] = useState<"in" | "out">("in")
  const [notes, setNotes] = useState("")
  const [now, setNow] = useState<Date>(new Date())
  const utils = api.useUtils()
  const [value, setValue] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setValue(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const statusQuery = api.attendance.getCurrentStatus.useQuery(undefined, {
    refetchInterval: 30000,
  })

  const clockInMutation = api.attendance.clockIn.useMutation({
    onSuccess: () => {
      toast.success("Clocked in successfully!")
      setShowClockDialog(false)
      setNotes("")
      void statusQuery.refetch()
      void utils.attendance.getHistory.invalidate()
      void utils.attendance.getSummary.invalidate()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const clockOutMutation = api.attendance.clockOut.useMutation({
    onSuccess: () => {
      toast.success("Clocked out successfully!")
      setShowClockDialog(false)
      setNotes("")
      void statusQuery.refetch()
      void utils.attendance.getHistory.invalidate()
      void utils.attendance.getSummary.invalidate()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const startBreakMutation = api.attendance.startBreak.useMutation({
    onSuccess: () => {
      toast.success("Break started!")
      void statusQuery.refetch()
      void utils.attendance.getHistory.invalidate()
      void utils.attendance.getSummary.invalidate()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const endBreakMutation = api.attendance.endBreak.useMutation({
    onSuccess: () => {
      toast.success("Break ended!")
      void statusQuery.refetch()
      void utils.attendance.getHistory.invalidate()
      void utils.attendance.getSummary.invalidate()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleClockAction = () => {
    if (clockAction === "in") {
      clockInMutation.mutate({ notes: notes || undefined })
    } else {
      clockOutMutation.mutate({ notes: notes || undefined })
    }
  }

  const handleBreakAction = () => {
    if (statusQuery.data?.status === "clocked_in") {
      startBreakMutation.mutate()
    } else if (statusQuery.data?.status === "break_start") {
      endBreakMutation.mutate()
    }
  }

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const tag = (target.tagName || "").toLowerCase()
      if (tag === "input" || tag === "textarea" || target.isContentEditable) return

      if (e.key.toLowerCase() === "i" && statusQuery.data?.status === "clocked_out") {
        setClockAction("in")
        setShowClockDialog(true)
      } else if (e.key.toLowerCase() === "o" && statusQuery.data?.status === "clocked_in") {
        setClockAction("out")
        setShowClockDialog(true)
      } else if (
        e.key.toLowerCase() === "b" &&
        (statusQuery.data?.status === "clocked_in" || statusQuery.data?.status === "break_start")
      ) {
        handleBreakAction()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [statusQuery.data?.status])

  if (statusQuery.isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5" /> Attendance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (statusQuery.isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5" /> Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-red-600">Failed to load attendance status</div>
        </CardContent>
      </Card>
    )
  }

  const { activeRecord, status, employee } = statusQuery.data ?? {}
  const statusInfo = statusConfig[status!]

  const formatDuration = (startTime: Date, endTime?: Date) => {
    const end = endTime ?? now
    const diffInMinutes = Math.floor((end.getTime() - startTime.getTime()) / (1000 * 60))
    const hours = Math.floor(diffInMinutes / 60)
    const minutes = diffInMinutes % 60
    return `${hours}h ${minutes}m`
  }

  return (
    <>
      <div aria-live="polite" className="sr-only">{statusInfo.label}</div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5" /> Attendance
            </span>
            <span className="text-muted-foreground text-sm">
              {format(now, "EEE, MMM dd")} · {format(now, "HH:mm")}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Employee Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <User className="text-primary h-4 w-4" />
              </div>
              <div>
<div className="font-medium">{(employee as any)?.user?.name ?? "Employee"}</div>
                <div className="text-muted-foreground text-sm capitalize">
                  {employee?.designation.replace("_", " ")}
                </div>
              </div>
            </div>
            <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
          </div>

          {/* Current Status / Extra Info */}
          {activeRecord && (
            <div className="bg-muted/50 space-y-2 rounded-lg p-3">
              {/* Clock In */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Clock In Time</span>
                <span className="font-medium">{format(activeRecord.clockInTime, "HH:mm")}</span>
              </div>

              {/* Total Worked Time */}
              {status === "clocked_in" && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Working Time</span>
                  <span className="font-medium text-green-600">{formatDuration(activeRecord.clockInTime)}</span>
                </div>
              )}

              {status === "clocked_out" && activeRecord.clockOutTime && (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last Clock Out</span>
                    <span className="font-medium">{format(activeRecord.clockOutTime, "HH:mm")}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Worked Time</span>
                    <span className="font-medium text-green-600">
                      {formatDuration(activeRecord.clockInTime, activeRecord.clockOutTime)}
                    </span>
                  </div>
                  {activeRecord.breakStartTime && activeRecord.breakEndTime && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Break Duration</span>
                      <span className="font-medium text-yellow-600">
                        {formatDuration(activeRecord.breakStartTime, activeRecord.breakEndTime)}
                      </span>
                    </div>
                  )}
                  <div className="text-center text-gray-500 text-sm mt-2">
                    You finished your work for today!
                  </div>
                </>
              )}

              {/* Break Info for active */}
              {status === "break_start" && activeRecord.breakStartTime && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Break Started</span>
                  <span className="font-medium text-yellow-600">
                    {formatDistanceToNow(activeRecord.breakStartTime, { addSuffix: true })}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span>{format(activeRecord.clockInTime, "MMM dd, yyyy")}</span>
              </div>
            </div>
          )}

          {/* Clock + Buttons */}
          <div className={`flex flex-col md:flex-row items-center justify-center gap-20 mt-4 ${status === "clocked_out" ? "pt-10" : ""}`}>
            <Clock value={value} size={150} renderNumbers={false} renderSecondHand={true} />

            <div className="flex flex-col gap-3">
              {status === "clocked_out" && (
                <Button
                  onClick={() => { setClockAction("in"); setShowClockDialog(true) }}
                  className="w-32 h-10 text-sm bg-blue-500 text-white hover:bg-blue-600 shadow-sm"
                  disabled={clockInMutation.isPending}
                >
                  <Play className="mr-2 h-4 w-4" /> Clock In
                </Button>
              )}

              {status === "clocked_in" && (
                <>
                  <Button
                    onClick={() => { setClockAction("out"); setShowClockDialog(true) }}
                    className="w-32 h-10 text-sm bg-red-500 text-white hover:bg-red-600 shadow-sm"
                    disabled={clockOutMutation.isPending}
                  >
                    <Square className="mr-2 h-4 w-4" /> Clock Out
                  </Button>

                  <Button
                    onClick={handleBreakAction}
                    variant="outline"
                    className="w-32 h-10 text-sm border border-blue-400 hover:border-blue-500 hover:bg-muted/20 shadow-sm"
                    disabled={startBreakMutation.isPending}
                  >
                    <Coffee className="mr-2 h-4 w-4" /> Start Break
                  </Button>
                </>
              )}

              {status === "break_start" && (
                <Button
                  onClick={handleBreakAction}
                  variant="outline"
                  className="w-32 h-10 text-sm border border-yellow-                  border-yellow-400 hover:border-yellow-500 hover:bg-muted/20 shadow-sm"
                  disabled={endBreakMutation.isPending}
                >
                  <Timer className="mr-2 h-4 w-4" /> End Break
                </Button>
              )}
            </div>
          </div>

          {/* Date / Quick Info */}
          <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm mt-4">
            <Calendar className="h-4 w-4" /> {format(now, "EEEE, MMM dd")}
          </div>
        </CardContent>
      </Card>

      {/* Clock In/Out Dialog */}
      <Dialog open={showClockDialog} onOpenChange={setShowClockDialog}>
        <DialogContent className="dialog-content">
          <DialogHeader>
            <DialogTitle>{clockAction === "in" ? "Confirm Clock In" : "Confirm Clock Out"}</DialogTitle>
            <DialogDescription>
              {clockAction === "in"
                ? "Optionally add a note, then start your work day."
                : "Optionally add a note, then end your work day."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{format(new Date(), "HH:mm:ss")}</div>
              <div className="text-muted-foreground text-sm">{format(new Date(), "EEEE, MMMM dd, yyyy")}</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder={`Any notes about your ${clockAction === "in" ? "start" : "end"} of work...`}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClockDialog(false)}>Cancel</Button>
            <Button
              onClick={handleClockAction}
              disabled={clockInMutation.isPending || clockOutMutation.isPending}
              className={clockAction === "in" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {clockInMutation.isPending || clockOutMutation.isPending
                ? "Processing..."
                : clockAction === "in" ? "Clock In" : "Clock Out"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

