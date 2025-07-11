"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconHelp,
  IconInnerShadowTop,
  IconMovie,
  IconRocket,
  IconSearch,
  IconSettings,
  IconMessageCircle,
  IconDashboard,
  IconStar,
} from "@tabler/icons-react"

import { NavCreativeOS } from "@/components/nav-creative-os"
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
import { NavPerformanceOS } from "./nav-performance-os"
import { NavOS } from "./nav-os"

const data = {
  user: {
    name: "Nico",
    email: "nico@sandan.ai",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
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
      url: "#",
      icon: IconDashboard,
      tag: [{
        label: "Get access",
        bgColor: "lightgray",
        textColor: "black",
      }],
    },
    {
      name: "Ad Fatigue Tracker",
      url: "#",
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
      url: "#",
      icon: IconMessageCircle,
      tag: [{
        label: "Get access",
        bgColor: "lightgray",
        textColor: "black",
      }],
    },
    {
      name: "GEO",
      url: "#",
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
      url: "#",
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
