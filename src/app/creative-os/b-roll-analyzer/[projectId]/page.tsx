"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { useState, useMemo, useEffect } from "react"
import {
    CalendarIcon,
    Search,
    Filter,
    Play,
    ExternalLink,
    Grid3X3,
    List,
    Clock,
    Tag,
    CalendarPlus2Icon as CalendarIcon2,
    Save,
    Trash2,
    ArrowLeft,
    Cog,
    Star,
} from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { GridSkeleton } from "@/components/grid-skeleton"
import Image from 'next/image';
import Link from 'next/link';

// Parse German date format like "22.4.2025 7:56pm"
function parseGermanDate(dateStr: string): Date {
    const [datePart, timePart] = dateStr.split(" ");
    const [day, month, year] = datePart.split(".");
    const [time, period] = timePart ? [timePart.slice(0, -2), timePart.slice(-2)] : ["12:00", "pm"];
    const [hoursStr, minutesStr] = time.split(":");
    let hours = Number(hoursStr);
    const minutes = Number(minutesStr);
    if (period === "pm" && hours !== 12) hours += 12;
    if (period === "am" && hours === 12) hours = 0;
    return new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day), hours, minutes || 0);
}

// Real B-Roll clips data from CSV
const sampleClips = [
    {
        id: 1,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description:
            "Eine Frau hält einen Nagelpflege-Stift der Marke Health Routine in ihren Händen und drückt auf den Mechanismus, um die Flüssigkeit in den Pinsel zu befördern.",
        startTime: "00:00",
        endTime: "00:13",
        quote: "",
        tags: ["Nagelpflege", "Beauty", "Health Routine", "Maniküre", "Kosmetik"],
        videoUrl: "https://drive.google.com/file/d/1seuquCPnNc8MUHK49spRrFo8z3f5E_sT/view?usp=drivesdk",
        dateCreated: parseGermanDate("22.4.2025 7:56pm"),
    },
    {
        id: 2,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description: "A person puts a white comb on a wooden surface next to a tube of liquid.",
        startTime: "00:00",
        endTime: "00:01",
        quote: "",
        tags: ["comb", "wooden surface", "liquid", "hand", "furniture"],
        videoUrl: "https://drive.google.com/file/d/1YrXHf7x0TNuLGsEVqSPqy5t5Ql5hrkf7/view?usp=drivesdk",
        dateCreated: parseGermanDate("22.4.2025 7:56pm"),
    },
    {
        id: 3,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description: "The person picks up the comb and tube of liquid.",
        startTime: "00:01",
        endTime: "00:05",
        quote: "",
        tags: ["comb", "liquid", "hand", "picking up"],
        videoUrl: "https://drive.google.com/file/d/1YrXHf7x0TNuLGsEVqSPqy5t5Ql5hrkf7/view?usp=drivesdk",
        dateCreated: parseGermanDate("22.4.2025 7:56pm"),
    },
    {
        id: 4,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description: "The person puts the comb and liquid tube into their black purse.",
        startTime: "00:05",
        endTime: "00:10",
        quote: "",
        tags: ["black purse", "comb", "liquid", "putting in", "hand"],
        videoUrl: "https://drive.google.com/file/d/1YrXHf7x0TNuLGsEVqSPqy5t5Ql5hrkf7/view?usp=drivesdk",
        dateCreated: parseGermanDate("22.4.2025 7:56pm"),
    },
    {
        id: 5,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description: "A hand reaches for nail care products on a wooden surface with sunlight.",
        startTime: "00:00",
        endTime: "00:03",
        quote: "",
        tags: ["hand", "nail care", "wooden surface", "sunlight", "beauty", "cosmetics"],
        videoUrl: "https://drive.google.com/file/d/1b1uIGu-Qckai3IbyVAYNb0hrbvJu7h0l/view?usp=drivesdk",
        dateCreated: parseGermanDate("22.4.2025 7:56pm"),
    },
    {
        id: 6,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description: "Nahaufnahme von zwei Füßen, die auf einem Holzboden stehen, wobei sich die Zehen leicht bewegen.",
        startTime: "00:00",
        endTime: "00:10",
        quote: "",
        tags: ["Füße", "Zehen", "Holzbodenn", "Bewegung", "Nahaufnahme"],
        videoUrl: "https://drive.google.com/file/d/1M1SAJbxMkVOn9rdZPNxr5S703xNwHArv/view?usp=drivesdk",
        dateCreated: parseGermanDate("22.4.2025 7:57pm"),
    },
    {
        id: 7,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description: "Eine Frau im Bademantel sitzt auf der Toilette und lackiert sich die Fußnägel.",
        startTime: "00:00",
        endTime: "00:10",
        quote: "",
        tags: ["Frau", "Bademantel", "Toilette", "Fußnägel", "Lackieren", "Badezimmer"],
        videoUrl: "https://drive.google.com/file/d/1IR7fQtCKLyhZU2cPwDqBHXdC67sRmtOo/view?usp=drivesdk",
        dateCreated: parseGermanDate("22.4.2025 7:57pm"),
    },
    {
        id: 8,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description: "Eine Frau im Bademantel hält einen Nagelpflegestift und lächelt in die Kamera.",
        startTime: "00:00",
        endTime: "00:10",
        quote: "",
        tags: ["Frau", "Bademantel", "Nagelpflegestift", "Lächeln", "Badezimmer"],
        videoUrl: "https://drive.google.com/file/d/1-chr0EP7uwqX1dPrSeiRF8aFMoLUfLlY/view?usp=drivesdk",
        dateCreated: parseGermanDate("22.4.2025 7:57pm"),
    },
    {
        id: 9,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description:
            "Ein Mann mit Bart und Tattoos, der ein ärmelloses schwarzes Hemd trägt und auf einem Laufband in einem Fitnessstudio läuft.",
        startTime: "00:00",
        endTime: "00:05",
        quote: "",
        tags: ["Fitnessstudio", "Laufband", "Mann", "Sport", "Training"],
        videoUrl: "https://drive.google.com/file/d/1Hgsq0fcb0mHr6Abr3ZQ81wZh718jAmgG/view?usp=drivesdk",
        dateCreated: parseGermanDate("28.4.2025 10:36am"),
    },
    {
        id: 10,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description:
            "Ein Mann im schwarzen Hemd und Shorts und ein anderer Mann im weißen Hemd und Jogginghose arbeiten mit Kettlebells im Outdoor-Fitnessstudio.",
        startTime: "00:00",
        endTime: "00:42",
        quote: "Du musst parallel arbeiten, sonst sieht es dumm aus.",
        tags: [
            "Kettlebells",
            "Trainieren",
            "Outdoor-Fitnessstudio",
            "Schwung",
            "Kniebeuge",
            "Überkopfpresse",
            "Synchronisieren",
        ],
        videoUrl: "",
        dateCreated: parseGermanDate("28.4.2025 6:10pm"),
    },
    {
        id: 11,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description:
            "Ein Mann in einer Sportumgebung schaut in einen Spiegel und greift nach einer Hantel. Zuerst wirft er versehentlich ein anderes Gewicht ab.",
        startTime: "00:00",
        endTime: "00:11",
        quote: "",
        tags: ["Mann", "Spiegel", "Fitnessstudio", "Gewichte", "Hantel"],
        videoUrl: "",
        dateCreated: parseGermanDate("28.4.2025 6:11pm"),
    },
    {
        id: 12,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description:
            "Der Mann sitzt und führt Hantel-Curls abwechselnd mit beiden Armen aus und lächelt dabei in den Spiegel.",
        startTime: "00:11",
        endTime: "00:25",
        quote: "",
        tags: ["Hantel-Curls", "Bizeps", "Armübung", "Mann", "Fitnessstudio"],
        videoUrl: "",
        dateCreated: parseGermanDate("28.4.2025 6:11pm"),
    },
    {
        id: 13,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description:
            "Zwei Männer trainieren im Freien mit Kettlebells. Sie machen Übungen wie Kettlebell Swings, Goblet Squats und Overhead Presses, unter Anleitung einer Frau.",
        startTime: "00:00",
        endTime: "00:42",
        quote: "Müsst schon parallel machen, ne? Ja, sonst sieht das doof aus. Echt? Klar!",
        tags: ["Training", "Kettlebell", "Freiluft-Fitness", "Übung", "Synchron"],
        videoUrl: "",
        dateCreated: parseGermanDate("29.4.2025 11:20am"),
    },
    {
        id: 14,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description:
            "Mann bereitet sich mit einer Vorübung auf das Hanteltraining vor, nimmt dann die Hanteln in die Hand.",
        startTime: "00:00",
        endTime: "00:08",
        quote: "",
        tags: ["Mann", "Hanteltraining", "Fitnessstudio", "Aufwärmen", "Übung"],
        videoUrl: "",
        dateCreated: parseGermanDate("29.4.2025 11:21am"),
    },
    {
        id: 15,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description:
            "In der Nacht trainieren zwei Männer in einem Fitnessstudio im Freien mit Kettlebells. Sie führen abwechselnd Übungen wie Swings, Squats und Overhead-Pressen aus.",
        startTime: "00:00",
        endTime: "00:42",
        quote: "Müsst schon parallel machen, ne? Ja, sonst sieht das doof aus. Echt? Klar.",
        tags: ["Fitnessstudio im Freien", "Kettlebell-Übung", "Workout", "Nacht", "Männer"],
        videoUrl: "",
        dateCreated: parseGermanDate("29.4.2025 11:43am"),
    },
    {
        id: 16,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description: "Ein Mann trainiert im Fitnessstudio mit Kurzhanteln. Er lächelt, während he Bizeps-Curls macht.",
        startTime: "00:07",
        endTime: "00:37",
        quote: "",
        tags: ["Mann", "Fitnessstudio", "Kurzhanteln", "Training", "Bizeps-Curls", "Lächeln"],
        videoUrl: "",
        dateCreated: parseGermanDate("29.4.2025 11:44am"),
    },
    {
        id: 17,
        thumbnail: "/placeholder.svg?height=200&width=300",
        description:
            "Zwei muskulöse Männer trainieren in einem Outdoor-Fitnessstudio mit Kettlebells. Der Mann in Schwarz hat Tattoos an den Armen, der Mann in Weiß hat einen Bart.",
        startTime: "00:00",
        endTime: "00:42",
        quote: "Ja. Ihr müsst schon parallel machen, ne? Ja, sonst sieht das doof aus.",
        tags: ["Fitness", "Kettlebell", "Workout", "Gym", "Outdoor"],
        videoUrl: "",
        dateCreated: parseGermanDate("29.4.2025 12:41pm"),
    },
]

// Get all unique tags from the clips
const allTags = Array.from(new Set(sampleClips.flatMap((clip) => clip.tags))).sort()

type DateRange = { from: Date | undefined; to?: Date | undefined };
type ViewMode = "list" | "grid"
type Clip = (typeof sampleClips)[0]

interface SavedFilter {
    id: string
    name: string
    searchQuery: string
    selectedTags: string[]
    hasQuoteFilter: boolean
    hasVideoUrlFilter: boolean
    dateRange: DateRange
    dateCreated: Date
}

export default function Page() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [hasQuoteFilter, setHasQuoteFilter] = useState(false)
    const [hasVideoUrlFilter, setHasVideoUrlFilter] = useState(false)
    const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
    const [showFilters, setShowFilters] = useState(false) // Open by default
    const [viewMode, setViewMode] = useState<ViewMode>("grid") // Grid by default
    const [selectedClip, setSelectedClip] = useState<Clip | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false) // New loading state
    const [favoritedClipIds, setFavoritedClipIds] = useState<number[]>([]) // New state for favorited clips

    // Saved filters state
    const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([
        // Sample saved filters
        {
            id: "1",
            name: "Beauty & Nail Care",
            searchQuery: "",
            selectedTags: ["Beauty", "Nagelpflege", "Kosmetik"],
            hasQuoteFilter: false,
            hasVideoUrlFilter: true,
            dateRange: { from: undefined, to: undefined },
            dateCreated: new Date("2024-01-01"),
        },
        {
            id: "2",
            name: "Fitness Videos",
            searchQuery: "",
            selectedTags: ["Fitnessstudio", "Training", "Kettlebell"],
            hasQuoteFilter: false,
            hasVideoUrlFilter: false,
            dateRange: { from: undefined, to: undefined },
            dateCreated: new Date("2024-01-02"),
        },
    ])
    const [saveFilterDialogOpen, setSaveFilterDialogOpen] = useState(false)
    const [filterName, setFilterName] = useState("")

    // Filter clips based on all active filters
    const filteredClips = useMemo(() => {
        // Simulate a delay for filtering/fetching
        setIsLoading(true)
        setTimeout(
            () => {
                setIsLoading(false)
            },
            Math.random() * 1000 + 500,
        ) // 0.5 to 1.5 seconds delay

        return sampleClips.filter((clip) => {
            // Search query filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase()
                const matchesSearch =
                    clip.description.toLowerCase().includes(query) ||
                    clip.quote.toLowerCase().includes(query) ||
                    clip.tags.some((tag) => tag.toLowerCase().includes(query))
                if (!matchesSearch) return false
            }

            // Tags filter
            if (selectedTags.length > 0) {
                const hasAllTags = selectedTags.every((tag) => clip.tags.includes(tag))
                if (!hasAllTags) return false
            }

            // Has quote filter
            if (hasQuoteFilter && !clip.quote) return false

            // Has video URL filter
            if (hasVideoUrlFilter && !clip.videoUrl) return false

            // Date range filter
            if (dateRange.from && clip.dateCreated < dateRange.from) return false
            if (dateRange.to && clip.dateCreated > dateRange.to) return false

            return true
        })
    }, [searchQuery, selectedTags, hasQuoteFilter, hasVideoUrlFilter, dateRange])

    // Clear loading state if component unmounts or dependencies change rapidly
    useEffect(() => {
        setIsLoading(true);
        const timeout = setTimeout(
            () => {
                setIsLoading(false);
            },
            Math.random() * 1000 + 500,
        ); // 0.5 to 1.5 seconds delay
        return () => clearTimeout(timeout);
    }, [searchQuery, selectedTags, hasQuoteFilter, hasVideoUrlFilter, dateRange]);

    const handleTagToggle = (tag: string) => {
        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
    }

    const clearAllFilters = () => {
        setSearchQuery("")
        setSelectedTags([])
        setHasQuoteFilter(false)
        setHasVideoUrlFilter(false)
        setDateRange({ from: undefined, to: undefined })
    }

    const handleClipClick = (clip: Clip) => {
        setSelectedClip(clip)
        setSidebarOpen(true)
    }

    const handleFavoriteToggle = (clipId: number) => {
        setFavoritedClipIds((prev) => (prev.includes(clipId) ? prev.filter((id) => id !== clipId) : [...prev, clipId]))
    }

    const hasActiveFilters = () => {
        return (
            searchQuery || selectedTags.length > 0 || hasQuoteFilter || hasVideoUrlFilter || dateRange.from || dateRange.to
        )
    }

    const saveCurrentFilter = () => {
        if (!filterName.trim()) return

        const newFilter: SavedFilter = {
            id: Date.now().toString(),
            name: filterName.trim(),
            searchQuery,
            selectedTags: [...selectedTags],
            hasQuoteFilter,
            hasVideoUrlFilter,
            dateRange: { ...dateRange },
            dateCreated: new Date(),
        }

        setSavedFilters((prev) => [...prev, newFilter])
        setFilterName("")
        setSaveFilterDialogOpen(false)
    }

    const applySavedFilter = (filter: SavedFilter) => {
        setSearchQuery(filter.searchQuery)
        setSelectedTags(filter.selectedTags)
        setHasQuoteFilter(filter.hasQuoteFilter)
        setHasVideoUrlFilter(filter.hasVideoUrlFilter)
        setDateRange({ from: filter.dateRange.from ?? undefined, to: filter.dateRange.to })
    }

    const deleteSavedFilter = (filterId: string) => {
        setSavedFilters((prev) => prev.filter((f) => f.id !== filterId))
    }

    const GridView = () => (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredClips.map((clip) => {
                const isFavorited = favoritedClipIds.includes(clip.id)
                return (
                    <Card
                        key={clip.id}
                        className="hover:shadow-lg pt-0 transition-shadow cursor-pointer"
                        onClick={() => handleClipClick(clip)}
                    >
                        <div className="group relative">
                            <Image
                                src={clip.thumbnail || "/placeholder.svg"}
                                alt="Video thumbnail"
                                className="rounded-t-lg w-full h-40 object-cover"
                                width={300}
                                height={200}
                                priority={false}
                                unoptimized={clip.thumbnail?.startsWith("/")}
                            />
                            <div className="absolute inset-0 flex justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-t-lg transition-opacity">
                                <Play className="w-8 h-8 text-white" />
                            </div>
                            <div className="right-2 bottom-2 absolute bg-black/70 px-2 py-1 rounded text-white text-xs">
                                {clip.startTime} - {clip.endTime}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="top-2 right-2 absolute text-white hover:text-yellow-400"
                                onClick={(e) => {
                                    e.stopPropagation() // Prevent opening sidebar
                                    handleFavoriteToggle(clip.id)
                                }}
                                aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                            >
                                <Star className={isFavorited ? "fill-yellow-400 text-yellow-400" : "text-white"} />
                            </Button>
                        </div>
                        <CardContent className="p-4">
                            <h3 className="mb-2 font-medium text-sm line-clamp-2">{clip.description}</h3>
                            {clip.quote && <p className="mb-2 text-muted-foreground text-xs italic line-clamp-2">&quot;{clip.quote}&quot;</p>}
                            <div className="flex flex-wrap gap-1 mb-2">
                                {clip.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                                {clip.tags.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                        +{clip.tags.length - 2}
                                    </Badge>
                                )}
                            </div>
                            <div className="flex justify-between items-center text-muted-foreground text-xs">
                                <span>{format(clip.dateCreated, "MMM dd, yyyy")}</span>
                                {clip.videoUrl && <ExternalLink className="w-3 h-3" />}
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )

    const ListView = () => (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-32">Thumbnail</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="w-24">Start/End</TableHead>
                        <TableHead>Quote</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead className="w-20">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredClips.map((clip) => {
                        const isFavorited = favoritedClipIds.includes(clip.id)
                        return (
                            <TableRow
                                key={clip.id}
                                className="hover:bg-muted/50 cursor-pointer"
                                onClick={() => handleClipClick(clip)}
                            >
                                <TableCell>
                                    <div className="group relative">
                                        <Image
                                            src={clip.thumbnail || "/placeholder.svg"}
                                            alt="Video thumbnail"
                                            className="border rounded w-20 h-12 object-cover"
                                            width={80}
                                            height={48}
                                            priority={false}
                                            unoptimized={clip.thumbnail?.startsWith("/")}
                                        />
                                        <div className="absolute inset-0 flex justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100 rounded transition-opacity">
                                            <Play className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="max-w-xs">
                                        <p className="text-sm line-clamp-2">{clip.description}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-1 text-xs">
                                        <div>{clip.startTime}</div>
                                        <div>{clip.endTime}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="max-w-xs">
                                        {clip.quote ? (
                                            <p className="text-muted-foreground text-sm italic line-clamp-2">&quot;{clip.quote}&quot;</p>
                                        ) : (
                                            <span className="text-muted-foreground text-xs">No quote</span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {clip.tags.slice(0, 3).map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                        {clip.tags.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{clip.tags.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="p-0 w-8 h-8"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleClipClick(clip)
                                            }}
                                        >
                                            <Play className="w-3 h-3" />
                                        </Button>
                                        {clip.videoUrl && (
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="p-0 w-8 h-8"
                                                asChild
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <a href={clip.videoUrl} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </Button>
                                        )}
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="p-0 w-8 h-8"
                                            onClick={(e) => {
                                                e.stopPropagation() // Prevent opening sidebar
                                                handleFavoriteToggle(clip.id)
                                            }}
                                            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                                        >
                                            <Star className={isFavorited ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Card>
    )
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
                <SiteHeader title="B-Roll Analyzer" />
                <div className="space-y-6 mx-auto p-6 container">
                    <div className="flex justify-between items-center mb-8">
                        <Button variant="ghost" asChild className="gap-2">
                            <Link href="/creative-os/b-roll-analyzer/">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Projects
                            </Link>
                        </Button>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <div className="bg-green-500 rounded-full w-2 h-2" />
                                Last synced 2 minutes ago
                            </div>
                            <Button variant="outline" size="sm" className="gap-2">
                                Configure
                                <Cog className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="font-bold text-2xl">Demo Project</h1>
                        <p className="text-muted-foreground">Manage and browse your b-roll library</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-muted-foreground text-sm">
                            {filteredClips.length} of {sampleClips.length} clips
                        </div>
                        <div className="flex items-center p-1 border rounded-lg">
                            <Button
                                variant={viewMode === "list" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("list")}
                                className="p-0 w-8 h-8"
                            >
                                <List className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={viewMode === "grid" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className="p-0 w-8 h-8"
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Controls */}
                <Card>
                    <CardHeader className="">
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform" />
                                <Input
                                    placeholder="Search descriptions, quotes, and tags..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
                                <Filter className="w-4 h-4" />
                                Filters
                            </Button>
                            {hasActiveFilters() && (
                                <>
                                    <Button variant="ghost" onClick={clearAllFilters}>
                                        Clear All
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6 pt-4 border-t">
                        {/* Quick Filters - Always Visible, now inside the CardContent */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-lg">
                                {/* All/Clear Filter Tab */}
                                <Button
                                    variant={!hasActiveFilters() ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={clearAllFilters}
                                    className="px-3 rounded-md h-8 font-medium text-sm"
                                >
                                    All
                                </Button>

                                {/* Saved Filter Tabs */}
                                {savedFilters.map((filter) => {
                                    const isActive =
                                        JSON.stringify({
                                            searchQuery,
                                            selectedTags: selectedTags.sort(),
                                            hasQuoteFilter,
                                            hasVideoUrlFilter,
                                            dateRange,
                                        }) ===
                                        JSON.stringify({
                                            searchQuery: filter.searchQuery,
                                            selectedTags: filter.selectedTags.sort(),
                                            hasQuoteFilter: filter.hasQuoteFilter,
                                            hasVideoUrlFilter: filter.hasVideoUrlFilter,
                                            dateRange: filter.dateRange,
                                        })

                                    return (
                                        <div key={filter.id} className="group relative">
                                            <Button
                                                variant={isActive ? "secondary" : "ghost"}
                                                size="sm"
                                                onClick={() => applySavedFilter(filter)}
                                                className="px-3 pr-8 rounded-md h-8 font-medium text-sm"
                                            >
                                                {filter.name}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    deleteSavedFilter(filter.id)
                                                }}
                                                className="top-0 right-0 absolute opacity-0 group-hover:opacity-100 p-0 w-6 h-8 text-muted-foreground hover:text-destructive transition-opacity"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    )
                                })}

                                {/* Add New Filter Button */}
                                {hasActiveFilters() && (
                                    <Dialog open={saveFilterDialogOpen} onOpenChange={setSaveFilterDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="p-0 w-8 h-8 text-muted-foreground hover:text-foreground"
                                            >
                                                <Save className="w-4 h-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Save Current Filter</DialogTitle>
                                                <DialogDescription>Give your filter combination a name for quick access later.</DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="filter-name">Filter Name</Label>
                                                    <Input
                                                        id="filter-name"
                                                        placeholder="e.g., Beauty Products, Fitness Clips..."
                                                        value={filterName}
                                                        onChange={(e) => setFilterName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setSaveFilterDialogOpen(false)}>
                                                    Cancel
                                                </Button>
                                                <Button onClick={saveCurrentFilter} disabled={!filterName.trim()}>
                                                    Save Filter
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
                        </div>

                        {/* Main Filter Controls - only shown if showFilters is true */}
                        {showFilters && (
                            <>
                                <Separator /> {/* This separator is now between quick filters and main filters */}
                                <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                                    {/* Tags Filter */}
                                    <div className="space-y-2">
                                        <Label>Tags</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="justify-start bg-transparent w-full">
                                                    {selectedTags.length > 0 ? `${selectedTags.length} selected` : "Select tags"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-80">
                                                <ScrollArea className="h-60">
                                                    <div className="space-y-2">
                                                        {allTags.map((tag) => (
                                                            <div key={tag} className="flex items-center space-x-2">
                                                                <Checkbox
                                                                    id={tag}
                                                                    checked={selectedTags.includes(tag)}
                                                                    onCheckedChange={() => handleTagToggle(tag)}
                                                                />
                                                                <Label htmlFor={tag} className="font-normal text-sm">
                                                                    {tag}
                                                                </Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </ScrollArea>
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    {/* Date Range Filter */}
                                    <div className="space-y-2">
                                        <Label>Date Created</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="justify-start bg-transparent w-full">
                                                    <CalendarIcon className="mr-2 w-4 h-4" />
                                                    {dateRange.from ? (
                                                        dateRange.to ? (
                                                            <>
                                                                {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                                                            </>
                                                        ) : (
                                                            format(dateRange.from, "LLL dd, y")
                                                        )
                                                    ) : (
                                                        "Pick a date range"
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0 w-auto" align="start">
                                                <Calendar
                                                    initialFocus
                                                    mode="range"
                                                    defaultMonth={dateRange.from}
                                                    selected={dateRange}
                                                    onSelect={(value: DateRange | undefined) => setDateRange(value ?? { from: undefined, to: undefined })}
                                                    numberOfMonths={2}
                                                    required={false}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    {/* Has Quote Toggle */}
                                    <div className="space-y-2">
                                        <Label>Content Filters</Label>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="has-quote" checked={hasQuoteFilter} onCheckedChange={setHasQuoteFilter} />
                                            <Label htmlFor="has-quote" className="text-sm">
                                                Has Quote
                                            </Label>
                                        </div>
                                    </div>

                                    {/* Has Video URL Toggle */}
                                    <div className="space-y-2">
                                        <Label>&nbsp;</Label>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="has-url" checked={hasVideoUrlFilter} onCheckedChange={setHasVideoUrlFilter} />
                                            <Label htmlFor="has-url" className="text-sm">
                                                Has Video URL
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                                {/* Active Filters Display */}
                                {hasActiveFilters() && (
                                    <div className="pt-4 border-t">
                                        <div className="flex flex-wrap gap-2">
                                            {selectedTags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="cursor-pointer"
                                                    onClick={() => handleTagToggle(tag)}
                                                >
                                                    {tag} ×
                                                </Badge>
                                            ))}
                                            {hasQuoteFilter && (
                                                <Badge variant="secondary" className="cursor-pointer" onClick={() => setHasQuoteFilter(false)}>
                                                    Has Quote ×
                                                </Badge>
                                            )}
                                            {hasVideoUrlFilter && (
                                                <Badge variant="secondary" className="cursor-pointer" onClick={() => setHasVideoUrlFilter(false)}>
                                                    Has Video URL ×
                                                </Badge>
                                            )}
                                            {dateRange.from && (
                                                <Badge variant="secondary" className="cursor-pointer" onClick={() => setDateRange({ from: undefined, to: undefined })}>
                                                    Date Range ×
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Results */}
                {isLoading ? ( // Conditionally render skeleton based on isLoading
                    <GridSkeleton />
                ) : filteredClips.length === 0 ? (
                    <Card>
                        <div className="py-12 text-center">
                            <p className="text-muted-foreground">No clips match your current filters.</p>
                            <Button variant="ghost" onClick={clearAllFilters} className="mt-2">
                                Clear all filters
                            </Button>
                        </div>
                    </Card>
                ) : viewMode === "grid" ? (
                    <GridView />
                ) : (
                    <ListView />
                )}

                {/* Video Sidebar */}
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                    <SheetContent className="flex flex-col w-full sm:max-w-2xl">
                        <SheetHeader className="flex-shrink-0">
                            <SheetTitle>Clip Details</SheetTitle>
                        </SheetHeader>

                        {selectedClip && (
                            <div className="flex-1 p-4 overflow-hidden">
                                <ScrollArea className="h-full">
                                    <div className="space-y-6 p-1">
                                        {/* Video Player */}
                                        <div className="bg-black rounded-lg aspect-video overflow-hidden">
                                            {selectedClip.videoUrl ? (
                                                <div className="flex justify-center items-center w-full h-full text-white">
                                                    <div className="text-center">
                                                        <ExternalLink className="opacity-50 mx-auto mb-2 w-12 h-12" />
                                                        <p className="opacity-75 mb-4 text-sm">Google Drive Video</p>
                                                        <Button variant="outline" size="sm" asChild>
                                                            <a href={selectedClip.videoUrl} target="_blank" rel="noopener noreferrer">
                                                                Open Video in Google Drive
                                                            </a>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex justify-center items-center w-full h-full text-white">
                                                    <div className="text-center">
                                                        <Play className="opacity-50 mx-auto mb-2 w-12 h-12" />
                                                        <p className="opacity-75 text-sm">No video URL available</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Clip Information */}
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="mb-2 font-semibold">Description</h3>
                                                <p className="text-muted-foreground text-sm">{selectedClip.description}</p>
                                            </div>

                                            <Separator />

                                            <div className="gap-4 grid grid-cols-2">
                                                <div>
                                                    <h4 className="flex items-center gap-2 mb-2 font-medium">
                                                        <Clock className="w-4 h-4" />
                                                        Timing
                                                    </h4>
                                                    <div className="space-y-1 text-sm">
                                                        <div>Start: {selectedClip.startTime}</div>
                                                        <div>End: {selectedClip.endTime}</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="flex items-center gap-2 mb-2 font-medium">
                                                        <CalendarIcon2 className="w-4 h-4" />
                                                        Created
                                                    </h4>
                                                    <div className="text-sm">{format(selectedClip.dateCreated, "MMMM dd, yyyy")}</div>
                                                </div>
                                            </div>

                                            <Separator />

                                            {selectedClip.quote && (
                                                <>
                                                    <div>
                                                        <h4 className="mb-2 font-medium">Quote</h4>
                                                        <blockquote className="pl-4 border-muted border-l-4 text-muted-foreground text-sm italic">
                                                            &quot;{selectedClip.quote}&quot;
                                                        </blockquote>
                                                    </div>
                                                    <Separator />
                                                </>
                                            )}

                                            <div>
                                                <h4 className="flex items-center gap-2 mb-2 font-medium">
                                                    <Tag className="w-4 h-4" />
                                                    Tags
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedClip.tags.map((tag) => (
                                                        <Badge key={tag} variant="outline">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            {selectedClip.videoUrl && (
                                                <>
                                                    <Separator />
                                                    <div>
                                                        <h4 className="mb-2 font-medium">Video URL</h4>
                                                        <div className="flex items-center gap-2">
                                                            <Button variant="outline" size="sm" asChild>
                                                                <a href={selectedClip.videoUrl} target="_blank" rel="noopener noreferrer">
                                                                    <ExternalLink className="mr-2 w-4 h-4" />
                                                                    Open in Google Drive
                                                                </a>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {/* Add some bottom padding for better scrolling */}
                                            <div className="h-4" />
                                        </div>
                                    </div>
                                </ScrollArea>
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </div>
        </SidebarInset>
        </SidebarProvider>
    )
}
