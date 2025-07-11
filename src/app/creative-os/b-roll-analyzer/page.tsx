"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Star, Trash2, Info } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";

const DEMO_PROJECT = {
  id: "demo-1",
  name: "Demo Project",
  avatar: "",
  syncActive: true,
  lastSynced: new Date().toISOString(),
  starred: false,
  googleDrive: {
    folderId: "",
    apiKey: "",
  },
};

type Project = typeof DEMO_PROJECT;

function getProjects() {
  if (typeof window === "undefined") return [DEMO_PROJECT];
  const stored = localStorage.getItem("broll-projects");
  if (!stored) return [DEMO_PROJECT];
  try {
    const arr = JSON.parse(stored);
    if (!Array.isArray(arr) || arr.length === 0) return [DEMO_PROJECT];
    return arr;
  } catch {
    return [DEMO_PROJECT];
  }
}

function saveProjects(projects: Project[]) {
  localStorage.setItem("broll-projects", JSON.stringify(projects));
}

export default function ProjectsGrid() {
  const [projects, setProjects] = useState([DEMO_PROJECT]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    avatar: "",
    syncActive: false,
    googleDrive: { folderId: "", apiKey: "" },
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const router = useRouter();

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleCreate = () => {
    const proj = {
      ...newProject,
      id: `proj-${Date.now()}`,
      lastSynced: new Date().toISOString(),
      starred: false,
    };
    const updated = [...projects, proj];
    setProjects(updated);
    saveProjects(updated);
    setSheetOpen(false);
    setNewProject({ name: "", avatar: "", syncActive: false, googleDrive: { folderId: "", apiKey: "" } });
  };

  const handleStar = (id: string) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, starred: !p.starred } : p
    );
    setProjects(updated);
    saveProjects(updated);
  };

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
        <h1 className="font-bold text-2xl">Projects</h1>
        <Button onClick={() => setSheetOpen(true)}>+ New Project</Button>
      </div>
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="group hover:shadow-lg transition cursor-pointer"
            onClick={() => router.push(`/creative-os/b-roll-analyzer/${project.id}`)}
          >
            <CardContent className="flex flex-col items-center">
              <div className="flex justify-between items-center gap-2 mb-4 w-full">
                <Avatar>
                  {project.avatar ? (
                    <AvatarImage src={project.avatar} alt={project.name} />
                  ) : (
                    <AvatarFallback>{project.name[0]}</AvatarFallback>
                  )}
                </Avatar>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={e => { e.stopPropagation(); handleStar(project.id); }}
                  aria-label={project.starred ? "Unstar" : "Star"}
                >
                  <Star className={project.starred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={e => {
                    e.stopPropagation();
                    setProjectToDelete(project);
                    setDeleteDialogOpen(true);
                  }}
                  aria-label="Delete Project"
                >
                  <Trash2 className="text-destructive" />
                </Button>
              </div>
              <div className="w-full text-left">
                <div className="mb-4 font-semibold text-lg">{project.name}</div>
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <span
                  className={`inline-block w-3 h-3 rounded-full ${project.syncActive ? "bg-green-500" : "bg-red-500"}`}
                  title={project.syncActive ? "Sync active" : "Sync inactive"}
                /> Last synced: {project.lastSynced ? new Date(project.lastSynced).toLocaleString() : "Never"}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create New Project</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 p-4">
            <Input
              placeholder="Project Name"
              value={newProject.name}
              onChange={e => setNewProject(p => ({ ...p, name: e.target.value }))}
            />
            <Input
              placeholder="Avatar URL (optional)"
              value={newProject.avatar}
              onChange={e => setNewProject(p => ({ ...p, avatar: e.target.value }))}
            />
            <div className="flex items-center gap-2">
              <span>Sync Active</span>
              <input
                type="checkbox"
                checked={newProject.syncActive}
                onChange={e => setNewProject(p => ({ ...p, syncActive: e.target.checked }))}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 font-semibold">Google Drive Config
                <Info className="w-4 h-4" />
              </div>
              <div className="flex flex-col items-center gap-4">
              <Input
                placeholder="Google Drive Folder ID"
                value={newProject.googleDrive.folderId}
                onChange={e => setNewProject(p => ({ ...p, googleDrive: { ...p.googleDrive, folderId: e.target.value } }))}
              />
              <Input
                placeholder="Google Drive API Key"
                value={newProject.googleDrive.apiKey}
                onChange={e => setNewProject(p => ({ ...p, googleDrive: { ...p.googleDrive, apiKey: e.target.value } }))}
              />
              </div>
              
            </div>
          </div>
          <SheetFooter>
            <Button onClick={handleCreate} disabled={!newProject.name}>Create</Button>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete the project <b>{projectToDelete?.name}</b>?</p>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                if (projectToDelete) {
                  const updated = projects.filter(p => p.id !== projectToDelete.id);
                  setProjects(updated);
                  saveProjects(updated);
                }
                setDeleteDialogOpen(false);
                setProjectToDelete(null);
              }}
            >
              Delete
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </SidebarInset>
    </SidebarProvider>
  );
} 