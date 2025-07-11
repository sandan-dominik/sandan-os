'use client'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export function SiteHeader({ title }: { title?: string }) {

  const { theme, setTheme } = useTheme()

  return (
    <header className="flex items-center gap-2 border-b h-(--header-height) group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) transition-[width,height] ease-linear shrink-0">
      <div className="flex items-center gap-1 lg:gap-2 px-4 lg:px-6 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="font-medium text-base">{title}</h1>
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const newTheme = theme === "dark" ? "light" : "dark"
              console.log(`Attempting to set theme to: ${newTheme}`)
              setTheme(newTheme)
            }}
            className="p-0 w-8 h-8 hover:cursor-pointer"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
