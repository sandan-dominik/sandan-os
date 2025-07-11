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
              <h1 className="bg-clip-text bg-gradient-to-r from-primary to-purple-600 font-bold text-transparent text-5xl">Performance OS</h1>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-xl">Supercharge your ad performance with AI-powered insights and automation</p>
            </div>

            <div className="space-y-12">
              <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
                <div className="hover:shadow-lg p-6 border hover:border-primary/50 border-border/50 rounded-xl transition-colors duration-300">
                  <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full w-12 h-12">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="mb-3 font-semibold text-xl">Ad Fatigue Detection</h3>
                  <p className="text-muted-foreground">Automatically detect when your ads start losing effectiveness before performance drops.</p>
                </div>

                <div className="hover:shadow-lg p-6 border hover:border-primary/50 border-border/50 rounded-xl transition-colors duration-300">
                  <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full w-12 h-12">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="mb-3 font-semibold text-xl">Performance Analytics</h3>
                  <p className="text-muted-foreground">Get deep insights into your ad performance with advanced analytics and reporting.</p>
                </div>

                <div className="hover:shadow-lg p-6 border hover:border-primary/50 border-border/50 rounded-xl transition-colors duration-300">
                  <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full w-12 h-12">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="mb-3 font-semibold text-xl">Smart Optimization</h3>
                  <p className="text-muted-foreground">AI-powered recommendations to optimize your ad spend and targeting.</p>
                </div>

                <div className="hover:shadow-lg p-6 border hover:border-primary/50 border-border/50 rounded-xl transition-colors duration-300">
                  <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full w-12 h-12">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h3 className="mb-3 font-semibold text-xl">Automated Alerts</h3>
                  <p className="text-muted-foreground">Get notified instantly when important metrics change or thresholds are reached.</p>
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
