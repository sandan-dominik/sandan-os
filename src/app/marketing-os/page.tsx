"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

export default function PerformanceOS() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)", 
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Performance OS" />
        <div className="flex flex-col justify-center space-y-8 mx-auto p-6 max-w-4xl h-full container">
          <div className="space-y-6 text-center">
            <div className="mb-10">
              <h1 className="bg-clip-text bg-gradient-to-r from-primary to-orange-600 font-bold text-transparent text-5xl">Marketing OS</h1>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-xl">Enhance your marketing operations with AI-powered tools and automation</p>
            </div>

            <div className="space-y-12">
              <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
                <div className="hover:shadow-lg p-6 border hover:border-primary/50 border-border/50 rounded-xl transition-colors duration-300">
                  <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full w-12 h-12">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="mb-3 font-semibold text-xl">Comment Guard</h3>
                  <p className="text-muted-foreground">Automatically manage and moderate social media comments with AI-powered filtering.</p>
                </div>

                <div className="hover:shadow-lg p-6 border hover:border-primary/50 border-border/50 rounded-xl transition-colors duration-300">
                  <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full w-12 h-12">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="mb-3 font-semibold text-xl">GEO</h3>
                  <p className="text-muted-foreground">Optimize your marketing campaigns with location-based insights and targeting.</p>
                </div>

                <div className="hover:shadow-lg p-6 border hover:border-primary/50 border-border/50 rounded-xl transition-colors duration-300">
                  <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full w-12 h-12">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                  <h3 className="mb-3 font-semibold text-xl">Campaign Automation</h3>
                  <p className="text-muted-foreground">Streamline your marketing workflows with intelligent automation tools.</p>
                </div>

                <div className="hover:shadow-lg p-6 border hover:border-primary/50 border-border/50 rounded-xl transition-colors duration-300">
                  <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full w-12 h-12">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="mb-3 font-semibold text-xl">Analytics Dashboard</h3>
                  <p className="text-muted-foreground">Track and analyze your marketing performance with comprehensive analytics.</p>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <a href="mailto:sales@sandan.ai" className="inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary/90 hover:shadow-lg px-6 py-3 rounded-full font-medium text-primary-foreground hover:scale-105 transition-all duration-300">
                  Request Early Access
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
