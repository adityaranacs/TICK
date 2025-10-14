"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useSidebar } from "@/components/ui/sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useMemo } from "react"
import { getMenuItems } from "@/lib/menu"
import { useAbility } from "@/hooks/use-ability"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const ability = useAbility()
  const menuItems = useMemo(() => getMenuItems(ability), [ability])

  return (
   <Sidebar
  variant="floating"
  collapsible="icon"
  className="bg-sidebar text-muted-foreground border-r border-border"
>

      {/* === Content === */}
      <SidebarContent className="text-sm">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wide text-muted-foreground/70">
            Menu
          </SidebarGroupLabel>

          <SidebarMenu>
            {menuItems
              .filter((item) => item.enabled !== false)
              .map((item) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href))

                const hasSubmenu =
                  !isCollapsed && item.submenu && item.submenu.length > 0

                return (
                  <SidebarMenuItem key={item.href}>
                    {hasSubmenu ? (
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={isActive}
                            size="lg"
                            tooltip={item.title}
                            className={cn(
                              "w-full flex items-center justify-between rounded-md transition-colors",
                              "hover:bg-muted/60 hover:text-foreground",
                              isActive &&
                                "bg-muted text-foreground font-semibold",
                              isCollapsed && "justify-center px-0"
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 shrink-0" />
                              {!isCollapsed && (
                                <span className="text-sm">{item.title}</span>
                              )}
                            </div>
                            {!isCollapsed && (
                              <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <div className="ml-6 mt-1 flex flex-col gap-0.5">
                            {item.submenu
                              .filter((sub) => sub.enabled !== false)
                              .map((sub) => {
                                const subActive = pathname === sub.href
                                return (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    className={cn(
                                      "px-2 py-1.5 rounded-md text-xs transition-colors",
                                      "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                                      subActive &&
                                        "bg-muted text-foreground font-semibold"
                                    )}
                                  >
                                    {sub.title}
                                  </Link>
                                )
                              })}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        size="lg"
                        tooltip={item.title}
                        className={cn(
                          "rounded-md transition-colors hover:bg-muted/60 hover:text-foreground",
                          isActive &&
                            "bg-muted text-foreground font-semibold",
                          isCollapsed && "justify-center px-0"
                        )}
                      >
                        <Link href={item.href}>
                          <Icon className="h-4 w-4 shrink-0" />
                          {!isCollapsed && (
                            <span className="text-sm">{item.title}</span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                )
              })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator className="border-border" />

     
    </Sidebar>
  )
}

export default AppSidebar
