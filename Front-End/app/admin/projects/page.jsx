"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Home,
  LogOut,
  Upload,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
// Update import to use named import
import { SARSymbol } from "@/components/sar-symbol";
import Image from "next/image";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { projectApi } from "@/lib/api";

export default function AdminProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    status: "available-properties",
    location: "Riyadh",
    price: "",
    description: {
      en: "",
      ar: "",
    },
    area: "",
    bedrooms: "",
    bathrooms: "",
    floors: "",
    images: [],
    features: [{ en: "", ar: "" }],
  });
  const [tempImages, setTempImages] = useState([]);

  // Load projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const data = await projectApi.getAllProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
        console.error("Error loading projects:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle project operations
  const handleAddProject = async () => {
    try {
      const addedProject = await projectApi.createProject(newProject);
      setProjects([...projects, addedProject]);
      setIsAddDialogOpen(false);
      setNewProject({
        title: "",
        status: "available-properties",
        location: "Riyadh",
        price: "",
        description: { en: "", ar: "" },
        area: "",
        bedrooms: "",
        bathrooms: "",
        floors: "",
        images: [],
        features: [{ en: "", ar: "" }],
      });
    } catch (err) {
      console.error("Error adding project:", err);
      // Show error to user
      alert(err.message || "Failed to create project. Please try again.");
    }
  };

  const handleEditProject = async () => {
    try {
      const updatedProject = await projectApi.updateProject(
        currentProject.id,
        currentProject
      );
      setProjects(
        projects.map((p) => (p.id === currentProject.id ? updatedProject : p))
      );
      setIsEditDialogOpen(false);
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await projectApi.deleteProject(currentProject._id);
      setProjects(projects.filter((p) => p._id !== currentProject._id));
      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // In a real app, you would upload these files to a server
    // For this demo, we'll use the placeholder images
    const newImages = files.map(
      (_, index) =>
        `/placeholder.svg?height=600&width=800&text=Image ${
          tempImages.length + index + 1
        }`
    );

    setTempImages([...tempImages, ...newImages]);
  };

  const removeImage = (index) => {
    setTempImages(tempImages.filter((_, i) => i !== index));
  };

  const addFeatureField = () => {
    if (isAddDialogOpen) {
      setNewProject({
        ...newProject,
        features: [...newProject.features, { en: "", ar: "" }],
      });
    } else if (isEditDialogOpen && currentProject) {
      setCurrentProject({
        ...currentProject,
        features: [...currentProject.features, { en: "", ar: "" }],
      });
    }
  };

  const removeFeatureField = (index) => {
    if (isAddDialogOpen) {
      const updatedFeatures = [...newProject.features];
      updatedFeatures.splice(index, 1);
      setNewProject({
        ...newProject,
        features: updatedFeatures,
      });
    } else if (isEditDialogOpen && currentProject) {
      const updatedFeatures = [...currentProject.features];
      updatedFeatures.splice(index, 1);
      setCurrentProject({
        ...currentProject,
        features: updatedFeatures,
      });
    }
  };

  const updateFeature = (index, language, value) => {
    if (isAddDialogOpen) {
      const updatedFeatures = [...newProject.features];
      updatedFeatures[index] = {
        ...updatedFeatures[index],
        [language]: value,
      };
      setNewProject({
        ...newProject,
        features: updatedFeatures,
      });
    } else if (isEditDialogOpen && currentProject) {
      const updatedFeatures = [...currentProject.features];
      updatedFeatures[index] = {
        ...updatedFeatures[index],
        [language]: value,
      };
      setCurrentProject({
        ...currentProject,
        features: updatedFeatures,
      });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "available-properties":
        return (
          <Badge
            className="bg-green-500 
          inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            Available Properties
          </Badge>
        );
      case "available-lands":
        return <Badge className="bg-blue-500">Available Lands</Badge>;
      case "coming":
        return <Badge className="bg-yellow-500">Coming Soon</Badge>;
      case "selling":
        return <Badge className="bg-red-500">For Sale</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight">
            Projects
          </h1>
          <p className="text-muted-foreground">
            Manage your real estate projects.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="mr-2 border-brand-gold/30 hover:bg-brand-gold/10 hover:text-brand-gold">
              <Home className="h-4 w-4 mr-2" />
              Homepage
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="mr-2 border-brand-gold/30 hover:bg-brand-gold/10 hover:text-brand-gold">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="available-properties">
              Available Properties
            </SelectItem>
            <SelectItem value="available-lands">Available Lands</SelectItem>
            <SelectItem value="coming">Coming Soon</SelectItem>
            <SelectItem value="selling">For Sale</SelectItem>
          </SelectContent>
        </Select>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Riyadh">Riyadh</SelectItem>
            <SelectItem value="Jeddah">Jeddah</SelectItem>
            <SelectItem value="Dammam">Dammam</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border border-primary/20">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price (SAR)</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell className="font-medium">{project._id}</TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{getStatusBadge(project.status)}</TableCell>
                  <TableCell>{project.location}</TableCell>
                  <TableCell className="flex items-center">
                    <SARSymbol className="h-3.5 w-3.5 mr-1" />
                    {project.price}
                  </TableCell>
                  <TableCell>{project.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentProject(project);
                            setTempImages([...project.images]);
                            setIsEditDialogOpen(true);
                          }}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setCurrentProject(project);
                            setIsDeleteDialogOpen(true);
                          }}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/projects/${project._id}`}>
                            <Home className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Add Project Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogOverlay className="fixed inset-0 bg-black/50 z-[49]" />

        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto fixed top-[50%] left-[50%] z-[50] translate-x-[-50%] translate-y-[-50%] bg-background p-6 shadow-lg border rounded-lg">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new project to your portfolio.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-title" className="text-right">
                Title
              </Label>
              <Input
                id="project-title"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-status" className="text-right">
                Status
              </Label>
              <Select
                value={newProject.status}
                onValueChange={(value) =>
                  setNewProject({ ...newProject, status: value })
                }>
                <SelectTrigger id="project-status" className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available-properties">
                    Available Properties
                  </SelectItem>
                  <SelectItem value="available-lands">
                    Available Lands
                  </SelectItem>
                  <SelectItem value="coming">Coming Soon</SelectItem>
                  <SelectItem value="selling">For Sale</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-location" className="text-right">
                Location
              </Label>
              <Select
                value={newProject.location}
                onValueChange={(value) =>
                  setNewProject({ ...newProject, location: value })
                }>
                <SelectTrigger id="project-location" className="col-span-3">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Riyadh">Riyadh</SelectItem>
                  <SelectItem value="Jeddah">Jeddah</SelectItem>
                  <SelectItem value="Dammam">Dammam</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-price" className="text-right">
                Price (SAR)
              </Label>
              <div className="col-span-3 relative">
                <div className="absolute left-2.5 top-2.5">
                  <SARSymbol className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="project-price"
                  value={newProject.price}
                  onChange={(e) =>
                    setNewProject({ ...newProject, price: e.target.value })
                  }
                  className="pl-8"
                  placeholder="1,000,000"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label
                htmlFor="project-description-en"
                className="text-right mt-2">
                Description (EN)
              </Label>
              <Textarea
                id="project-description-en"
                value={newProject.description.en}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    description: {
                      ...newProject.description,
                      en: e.target.value,
                    },
                  })
                }
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label
                htmlFor="project-description-ar"
                className="text-right mt-2">
                Description (AR)
              </Label>
              <Textarea
                id="project-description-ar"
                value={newProject.description.ar}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    description: {
                      ...newProject.description,
                      ar: e.target.value,
                    },
                  })
                }
                className="col-span-3"
                rows={3}
                dir="rtl"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-area" className="text-right">
                Area (m²)
              </Label>
              <Input
                id="project-area"
                value={newProject.area}
                onChange={(e) =>
                  setNewProject({ ...newProject, area: e.target.value })
                }
                className="col-span-3"
                type="number"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-bedrooms" className="text-right">
                Bedrooms
              </Label>
              <Input
                id="project-bedrooms"
                value={newProject.bedrooms}
                onChange={(e) =>
                  setNewProject({ ...newProject, bedrooms: e.target.value })
                }
                className="col-span-3"
                type="number"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-bathrooms" className="text-right">
                Bathrooms
              </Label>
              <Input
                id="project-bathrooms"
                value={newProject.bathrooms}
                onChange={(e) =>
                  setNewProject({ ...newProject, bathrooms: e.target.value })
                }
                className="col-span-3"
                type="number"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-floors" className="text-right">
                Floors
              </Label>
              <Input
                id="project-floors"
                value={newProject.floors}
                onChange={(e) =>
                  setNewProject({ ...newProject, floors: e.target.value })
                }
                className="col-span-3"
                type="number"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="project-images" className="text-right mt-2">
                Images
              </Label>
              <div className="col-span-3">
                <div className="flex flex-wrap gap-2 mb-4">
                  {tempImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 rounded-md overflow-hidden border border-border">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-5 w-5 rounded-full"
                        onClick={() => removeImage(index)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    id="project-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      document.getElementById("project-images").click()
                    }
                    className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Images
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="project-features" className="text-right mt-2">
                Features
              </Label>
              <div className="col-span-3 space-y-3" id="project-features">
                {newProject.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      id={`feature-en-${index}`}
                      value={feature.en}
                      onChange={(e) =>
                        updateFeature(index, "en", e.target.value)
                      }
                      placeholder="Feature (EN)"
                      className="flex-1"
                    />
                    <Input
                      id={`feature-ar-${index}`}
                      value={feature.ar}
                      onChange={(e) =>
                        updateFeature(index, "ar", e.target.value)
                      }
                      placeholder="Feature (AR)"
                      className="flex-1"
                      dir="rtl"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFeatureField(index)}
                      disabled={newProject.features.length <= 1}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addFeatureField}
                  className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Feature
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="flex items-baseline gap-5">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddProject}
              disabled={!newProject.title || !newProject.price}>
              Add Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update the details of your project.
            </DialogDescription>
          </DialogHeader>
          {currentProject && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={currentProject.title}
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      title: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={currentProject.status}
                  onValueChange={(value) =>
                    setCurrentProject({ ...currentProject, status: value })
                  }>
                  <SelectTrigger id="edit-status" className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available-properties">
                      Available Properties
                    </SelectItem>
                    <SelectItem value="available-lands">
                      Available Lands
                    </SelectItem>
                    <SelectItem value="coming">Coming Soon</SelectItem>
                    <SelectItem value="selling">For Sale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right">
                  Location
                </Label>
                <Select
                  value={currentProject.location}
                  onValueChange={(value) =>
                    setCurrentProject({ ...currentProject, location: value })
                  }>
                  <SelectTrigger id="edit-location" className="col-span-3">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Riyadh">Riyadh</SelectItem>
                    <SelectItem value="Jeddah">Jeddah</SelectItem>
                    <SelectItem value="Dammam">Dammam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  Price (SAR)
                </Label>
                <div className="col-span-3 relative">
                  <div className="absolute left-2.5 top-2.5">
                    <SARSymbol className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="edit-price"
                    value={currentProject.price}
                    onChange={(e) =>
                      setCurrentProject({
                        ...currentProject,
                        price: e.target.value,
                      })
                    }
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label
                  htmlFor="edit-description-en"
                  className="text-right mt-2">
                  Description (EN)
                </Label>
                <Textarea
                  id="edit-description-en"
                  value={currentProject.description?.en || ""}
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      description: {
                        ...currentProject.description,
                        en: e.target.value,
                      },
                    })
                  }
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label
                  htmlFor="edit-description-ar"
                  className="text-right mt-2">
                  Description (AR)
                </Label>
                <Textarea
                  id="edit-description-ar"
                  value={currentProject.description?.ar || ""}
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      description: {
                        ...currentProject.description,
                        ar: e.target.value,
                      },
                    })
                  }
                  className="col-span-3"
                  rows={3}
                  dir="rtl"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-area" className="text-right">
                  Area (m²)
                </Label>
                <Input
                  id="edit-area"
                  value={currentProject.area || ""}
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      area: e.target.value,
                    })
                  }
                  className="col-span-3"
                  type="number"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-bedrooms" className="text-right">
                  Bedrooms
                </Label>
                <Input
                  id="edit-bedrooms"
                  value={currentProject.bedrooms || ""}
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      bedrooms: e.target.value,
                    })
                  }
                  className="col-span-3"
                  type="number"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-bathrooms" className="text-right">
                  Bathrooms
                </Label>
                <Input
                  id="edit-bathrooms"
                  value={currentProject.bathrooms || ""}
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      bathrooms: e.target.value,
                    })
                  }
                  className="col-span-3"
                  type="number"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-floors" className="text-right">
                  Floors
                </Label>
                <Input
                  id="edit-floors"
                  value={currentProject.floors || ""}
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      floors: e.target.value,
                    })
                  }
                  className="col-span-3"
                  type="number"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-images" className="text-right mt-2">
                  Images
                </Label>
                <div className="col-span-3">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tempImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative w-24 h-24 rounded-md overflow-hidden border border-border">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-5 w-5 rounded-full"
                          onClick={() => removeImage(index)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id="edit-images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        document.getElementById("edit-images").click()
                      }
                      className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Images
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-features" className="text-right mt-2">
                  Features
                </Label>
                <div className="col-span-3 space-y-3" id="edit-features">
                  {currentProject.features?.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        id={`edit-feature-en-${index}`}
                        value={feature.en || ""}
                        onChange={(e) =>
                          updateFeature(index, "en", e.target.value)
                        }
                        placeholder="Feature (EN)"
                        className="flex-1"
                      />
                      <Input
                        id={`edit-feature-ar-${index}`}
                        value={feature.ar || ""}
                        onChange={(e) =>
                          updateFeature(index, "ar", e.target.value)
                        }
                        placeholder="Feature (AR)"
                        className="flex-1"
                        dir="rtl"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFeatureField(index)}
                        disabled={(currentProject.features?.length || 0) <= 1}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addFeatureField}
                    className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feature
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProject}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the project "{currentProject?.title}
              ". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-baseline gap-5">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Label component
function Label({ className, htmlFor, ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  );
}
