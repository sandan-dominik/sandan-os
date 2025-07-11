"use client"

import {
  type Icon,
} from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavOS({
  items,
  title,
}: {
  items: {
    name: string
    url: string
    icon: Icon
    tag?: {
      label: string
      bgColor: string
      textColor: string
    }[]
  }[]
  title: string
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span className="flex justify-between w-full">{item.name} {item.tag && item.tag.map((tag) => (
                  <span key={tag.label} className="inline-flex items-center px-2 py-0.5 rounded-xs font-medium text-xs" style={{ backgroundColor: tag.bgColor, color: tag.textColor }}>{tag.label}</span>
                ))}</span>
                
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
} 