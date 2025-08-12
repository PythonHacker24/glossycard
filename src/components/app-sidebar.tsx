import * as React from "react"
import { LayoutDashboard, QrCode, User, Wallet } from "lucide-react"

import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "#",
          isActive: true,
          icon: LayoutDashboard,
          view: 'analytics' as const,
        },
        {
          title: "Manage Cards",
          url: "#",
          icon: QrCode,
          view: 'manage' as const,
        },
        {
          title: "Manage Payments",
          url: "#",
          icon: Wallet,
          view: 'payments' as const,
        },
        {
          title: "Contacts",
          url: "#",
          icon: User,
          view: 'contacts' as const,
        },
      ],
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onViewChange?: (view: 'analytics' | 'manage' | 'payments' | 'contacts' ) => void;
  currentView?: 'analytics' | 'manage' | 'payments' | 'contacts';
}

export function AppSidebar({ onViewChange, currentView = 'analytics', ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            {/* <SidebarGroupLabel>{item.title}</SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={currentView === item.view}
                      onClick={() => onViewChange?.(item.view)}
                    >
                      <button className="flex items-center gap-2 w-full text-left">
                        {item.icon && <item.icon className="w-4 h-4" />}
                        {item.title}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
