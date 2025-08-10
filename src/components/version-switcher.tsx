"use client"

import * as React from "react"
import {
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function VersionSwitcher() {

  return (
    <SidebarMenuButton
      size="sm"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <div className="flex flex-col gap-0.5 leading-none">
        <span className="text-sm font-semibold">Gloss Card Manager</span>
      </div>
    </SidebarMenuButton>
    )
}
