"use client"

import * as React from "react"
import {
  IconChartBar,
  IconInnerShadowTop,
  IconMovie,
  IconSearch,
  IconMessageCircle,
  IconDashboard,
  IconStar,
} from "@tabler/icons-react"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavOS } from "./nav-os"

const data = {
  user: {
    name: "Nico",
    email: "nico@sandan.ai",
    avatar: "/avatars/shadcn.jpg",
  },
  creativeOS: [
    {
      name: "B-Roll Analyzer",
      url: "/creative-os/b-roll-analyzer",
      icon: IconMovie,
      tag: [{
        label: "Preview",
        bgColor: "orange",
        textColor: "black",
      }],
    },
  ],
  performanceOS: [
    {
      name: "Dashboard",
      url: "/performance-os",
      icon: IconDashboard,
      tag: [{
        label: "Get access",
        bgColor: "lightgray",
        textColor: "black",
      }],
    },
    {
      name: "Ad Fatigue Tracker",
      url: "/performance-os",
      icon: IconChartBar,
      tag: [{
        label: "Get access",
        bgColor: "lightgray",
        textColor: "black",
      }],
    },
  ],
  marketingOS: [
    {
      name: "Comment Guard",
      url: "/marketing-os",
      icon: IconMessageCircle,
      tag: [{
        label: "Get access",
        bgColor: "lightgray",
        textColor: "black",
      }],
    },
    {
      name: "GEO",
      url: "/marketing-os",
      icon: IconSearch,
      tag: [{
        label: "Get access",
        bgColor: "lightgray",
        textColor: "black",
      }],
    },
  ],
  ecommerceOS: [
    {
      name: "Reviews AI",
      url: "/ecommerce-os",
      icon: IconStar,
      tag: [{
        label: "Get access",
        bgColor: "lightgray",
        textColor: "black",
      }],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="font-semibold text-base">Sandan</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
      <NavOS items={data.performanceOS} title="Performance OS" />
      <NavOS items={data.creativeOS} title="Creative OS" />
      <NavOS items={data.marketingOS} title="Marketing OS" />
      <NavOS items={data.ecommerceOS} title="Ecommerce OS" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
