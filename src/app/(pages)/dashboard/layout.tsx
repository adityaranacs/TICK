"use client"

import type React from "react"
import { Suspense } from "react"
import { usePathname } from "next/navigation"
import { SidebarProvider as AppSidebarProvider } from "@/components/ui/sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import { UserMenu } from "@/components/user-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bell, HelpCircle, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/logo"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// ✅ Dynamic Breadcrumb Component
function DynamicBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  // Optional readable name mapping
  const nameMap: Record<string, string> = {
    dashboard: "Dashboard",
    employees: "Employees",
    attendance: "Attendance",
    payroll: "Payroll",
    settings: "Settings",
    overview: "Overview",
    reports: "Reports",
  }

  const formatSegment = (seg: string) =>
    nameMap[seg] ||
    seg
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/")
          const isLast = index === segments.length - 1

          return (
            <BreadcrumbItem key={href}>
              {isLast ? (
                <span className="text-muted-foreground">{formatSegment(segment)}</span>
              ) : (
                <>
                  <BreadcrumbLink href={href}>
                    {formatSegment(segment)}
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

// ✅ Main Layout
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppSidebarProvider
      defaultOpen={true}
      style={{ "--sidebar-width": "19rem" } as React.CSSProperties}
    >
      <Suspense fallback={null}>
        <div className="relative flex h-screen w-full overflow-hidden">
          {/* ✅ Navbar */}
          <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center gap-3 border-b bg-background/95 px-4 shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-3">
              {/* Logo stays unchanged */}
              <Logo size="lg" clickable className="transition-all duration-300" />

              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />

              {/* ✅ Dynamic Breadcrumb */}
              <DynamicBreadcrumb />
            </div>

            {/* Search Bar */}
            <div className="flex flex-1 items-center px-2 md:px-4">
              <div className="relative w-full max-w-md">
                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search employees, attendance, payroll..."
                  className="pl-9"
                />
              </div>
            </div>

            {/* Right icons */}
            <div className="ml-auto flex items-center gap-2">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                    <Badge
                      variant="destructive"
                      className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                    >
                      3
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 z-[60]">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">New leave request</p>
                      <p className="text-muted-foreground text-xs">
                        John Doe submitted a leave request for next week
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">Payroll reminder</p>
                      <p className="text-muted-foreground text-xs">
                        Monthly payroll processing due in 2 days
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">AI Analysis Ready</p>
                      <p className="text-muted-foreground text-xs">
                        Employee sentiment analysis report is ready
                      </p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Help icon */}
              <Button variant="ghost" size="icon" aria-label="Help">
                <HelpCircle className="h-5 w-5" />
              </Button>

              {/* User menu */}
              <UserMenu />
            </div>
          </header>

          {/* ✅ Sidebar below navbar */}
          <div className="relative z-40">
            <AppSidebar />
          </div>

          {/* ✅ Main Content Area */}
          <SidebarInset className="relative z-30 flex flex-1 flex-col pt-16 overflow-y-auto">
            <main className="flex-1 w-full px-6 py-4">
              <div className="w-full max-w-none mx-0">{children}</div>
            </main>
          </SidebarInset>
        </div>
      </Suspense>
    </AppSidebarProvider>
  )
}
