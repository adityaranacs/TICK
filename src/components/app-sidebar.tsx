"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useMemo } from "react"
import { getMenuItems } from "@/lib/menu"
import { useAbility } from "@/hooks/use-ability"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const pathname = usePathname()
  const ability = useAbility()
  const menuItems = useMemo(() => getMenuItems(ability), [ability])

  return (
    <Sidebar
      collapsible="none"
      variant="floating"
      className="bg-sidebar text-muted-foreground"
      style={{ "--sidebar-width": "16rem" } as React.CSSProperties}
    >
      <SidebarContent 
        className="text-sm flex-1 pt-20 overflow-y-auto"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <SidebarGroup className="pt-[10px]">
          <SidebarMenu>
            {menuItems
              .filter((item) => item.enabled !== false)
              .map((item) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href))

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "rounded-md transition-colors hover:bg-muted/60 hover:text-foreground",
                        isActive && "bg-muted text-foreground font-semibold"
                      )}
                    >
                      <Link href={item.href}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 shrink-0" />
                          <span>{item.title}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>

                  {(item.submenu?.length ?? 0) > 0 && (
  <div className="ml-6 mt-1 flex flex-col gap-1">
    {item.submenu
      ?.filter((sub) => sub.enabled !== false)
      .map((sub) => {
        const subActive = pathname === sub.href
        return (
          <Link
            key={sub.href}
            href={sub.href}
            className={cn(
              "px-2 py-1.5 rounded-md text-xs transition-colors hover:bg-muted/50 hover:text-foreground",
              subActive && "bg-muted text-foreground font-semibold"
            )}
          >
            {sub.title}
          </Link>
        )
      })}
  </div>
)}

                  </SidebarMenuItem>
                )
              })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />
    </Sidebar>
  )
}

export default AppSidebar