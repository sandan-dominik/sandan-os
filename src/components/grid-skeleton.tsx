import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function GridSkeleton() {
  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map(
        (
          _,
          i, // Render 8 skeleton cards
        ) => (
          <Card key={i} className="pt-0">
            <Skeleton className="rounded-t-lg w-full h-40" />
            <CardContent className="space-y-2 p-4">
              <Skeleton className="w-3/4 h-4" />
              <Skeleton className="w-1/2 h-3" />
              <div className="flex flex-wrap gap-1">
                <Skeleton className="rounded-full w-12 h-5" />
                <Skeleton className="rounded-full w-16 h-5" />
              </div>
              <div className="flex justify-between items-center text-xs">
                <Skeleton className="w-20 h-3" />
                <Skeleton className="w-4 h-3" />
              </div>
            </CardContent>
          </Card>
        ),
      )}
    </div>
  )
}
