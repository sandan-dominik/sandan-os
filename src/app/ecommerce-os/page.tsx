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
        <SiteHeader title="Ecommerce OS" />
        <div className="flex flex-col justify-center space-y-8 mx-auto p-6 max-w-4xl h-full container">
          <div className="space-y-6 text-center">
            <div className="mb-10">
              <h1 className="bg-clip-text bg-gradient-to-r from-primary to-green-600 font-bold text-transparent text-5xl">Ecommerce OS</h1>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-xl">Optimize your ecommerce operations with AI-powered tools and automation</p>
            </div>

            <div className="space-y-12">
              <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
                <div className="hover:shadow-lg p-6 border hover:border-primary/50 border-border/50 rounded-xl transition-colors duration-300">
                  <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full w-12 h-12">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h3 className="mb-3 font-semibold text-xl">Reviews AI</h3>
                  <p className="text-muted-foreground">Automatically analyze and manage customer reviews with AI-powered insights.</p>
                </div>

                <div className="hover:shadow-lg p-6 border hover:border-primary/50 border-border/50 rounded-xl transition-colors duration-300">
                  <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full w-12 h-12">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="mb-3 font-semibold text-xl">Inventory Optimization</h3>
                  <p className="text-muted-foreground">Smart inventory management with predictive analytics and demand forecasting.</p>
                </div>

                <div className="hover:shadow-lg p-6 border hover:border-primary/50 border-border/50 rounded-xl transition-colors duration-300">
                  <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full w-12 h-12">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="mb-3 font-semibold text-xl">Price Optimization</h3>
                  <p className="text-muted-foreground">Dynamic pricing strategies powered by market analysis and competitor tracking.</p>
                </div>

                <div className="hover:shadow-lg p-6 border hover:border-primary/50 border-border/50 rounded-xl transition-colors duration-300">
                  <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full w-12 h-12">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="mb-3 font-semibold text-xl">Performance Analytics</h3>
                  <p className="text-muted-foreground">Comprehensive analytics dashboard for tracking sales and store performance.</p>
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
