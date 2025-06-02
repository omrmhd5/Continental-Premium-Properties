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
import { SARSymbol } from "@/components/sar-symbol";
import Image from "next/image";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { projectApi } from "@/lib/api";
import { useLanguage } from "@/context/language-context";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { SuccessPopup } from "@/components/success-popup";
import { ErrorPopup } from "@/components/error-popup";

export default function AdminProjects() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const isArabic = language === "ar";
  const { toast } = useToast();
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState({
    title: "",
    description: "",
    action: null,
  });
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    title: "",
    description: "",
  });

  // Load projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const data = await projectApi.getAllProjects();
        setProjects(data);
      } catch (err) {
        if (err.message === "TOKEN_EXPIRED") {
          setErrorMessage({
            title: "Session Expired",
            description: "Your session has expired. Please log in again.",
          });
          setShowErrorPopup(true);
        } else {
          setErrorMessage({
            title: "Error",
            description: err.message || "Failed to fetch projects",
          });
          setShowErrorPopup(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle project operations
  const handleAddProject = async () => {
    try {
      const finalProject = {
        ...newProject,
        images: tempImages,
      };

      const addedProject = await projectApi.createProject(finalProject);
      setProjects([...projects, addedProject]);
      setIsAddDialogOpen(false);

      // Show success popup
      setSuccessMessage({
        title: isArabic ? "تمت الإضافة بنجاح" : "Success",
        description: isArabic
          ? "تم إضافة المشروع بنجاح إلى محفظتك"
          : "Project has been successfully added to your portfolio",
        action: (
          <Button
            onClick={() => {
              setShowSuccessPopup(false);
              router.push(`/projects/${addedProject._id}`);
            }}
            className="bg-green-600 hover:bg-green-700">
            {isArabic ? "عرض المشروع" : "View Project"}
          </Button>
        ),
      });
      setShowSuccessPopup(true);

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
      setTempImages([]);
    } catch (err) {
      if (err.message === "TOKEN_EXPIRED") {
        setErrorMessage({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
        });
        setShowErrorPopup(true);
      } else {
        setErrorMessage({
          title: isArabic ? "خطأ" : "Error",
          description: isArabic
            ? "حدث خطأ أثناء إضافة المشروع. يرجى المحاولة مرة أخرى."
            : "Failed to create project. Please try again.",
        });
        setShowErrorPopup(true);
      }
    }
  };

  const handleEditProject = async () => {
    try {
      const dataToSend = {
        ...currentProject,
        images: tempImages,
      };

      const updatedProject = await projectApi.updateProject(
        currentProject._id,
        dataToSend
      );

      setProjects(
        projects.map((p) => (p._id === currentProject._id ? updatedProject : p))
      );
      setIsEditDialogOpen(false);

      // Show success popup
      setSuccessMessage({
        title: isArabic ? "تم التحديث بنجاح" : "Success",
        description: isArabic
          ? "تم تحديث المشروع بنجاح"
          : "Project has been successfully updated",
        action: (
          <Button
            onClick={() => {
              setShowSuccessPopup(false);
              router.push(`/projects/${updatedProject._id}`);
            }}
            className="bg-green-600 hover:bg-green-700">
            {isArabic ? "عرض المشروع" : "View Project"}
          </Button>
        ),
      });
      setShowSuccessPopup(true);
    } catch (err) {
      if (err.message === "TOKEN_EXPIRED") {
        setErrorMessage({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
        });
        setShowErrorPopup(true);
      } else {
        setErrorMessage({
          title: isArabic ? "خطأ" : "Error",
          description: isArabic
            ? "حدث خطأ أثناء تحديث المشروع. يرجى المحاولة مرة أخرى."
            : "Failed to update project. Please try again.",
        });
        setShowErrorPopup(true);
      }
    }
  };

  const handleDeleteProject = async () => {
    try {
      await projectApi.deleteProject(currentProject._id);
      setProjects(projects.filter((p) => p._id !== currentProject._id));
      setIsDeleteDialogOpen(false);

      // Show success popup
      setSuccessMessage({
        title: isArabic ? "تم الحذف بنجاح" : "Success",
        description: isArabic
          ? "تم حذف المشروع بنجاح"
          : "Project has been successfully deleted",
      });
      setShowSuccessPopup(true);
    } catch (err) {
      if (err.message === "TOKEN_EXPIRED") {
        setErrorMessage({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
        });
        setShowErrorPopup(true);
      } else {
        setErrorMessage({
          title: isArabic ? "خطأ" : "Error",
          description: isArabic
            ? "حدث خطأ أثناء حذف المشروع. يرجى المحاولة مرة أخرى."
            : "Failed to delete project. Please try again.",
        });
        setShowErrorPopup(true);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);
    const uploadedImageUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_upload");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dllmcgx5k/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const rawText = await res.text();
        let data;
        try {
          data = JSON.parse(rawText);
        } catch (jsonErr) {
          alert("Invalid response from Cloudinary.");
          continue;
        }

        if (res.ok && data.secure_url) {
          uploadedImageUrls.push(data.secure_url);
        } else {
          alert(`Upload failed: ${data.error?.message || "Unknown error"}`);
        }
      } catch (err) {
        alert("Error uploading image. Please try again.");
      }

      // Update progress
      setUploadProgress(((i + 1) / files.length) * 100);
    }

    if (uploadedImageUrls.length > 0) {
      const updatedImages = [...tempImages, ...uploadedImageUrls];
      setTempImages(updatedImages);
      if (isAddDialogOpen) {
        setNewProject((prev) => ({
          ...prev,
          images: updatedImages,
        }));
      } else if (isEditDialogOpen && currentProject) {
        setCurrentProject((prev) => ({
          ...prev,
          images: updatedImages,
        }));
      }
    }

    setIsUploading(false);
    setUploadProgress(0);
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
            {isArabic ? "عقارات متاحة" : "Available Properties"}
          </Badge>
        );
      case "available-lands":
        return (
          <Badge className="bg-blue-500">
            {isArabic ? "أراضي متاحة" : "Available Lands"}
          </Badge>
        );
      case "coming":
        return (
          <Badge className="bg-yellow-500">
            {isArabic ? "قريباً" : "Coming Soon"}
          </Badge>
        );
      case "selling":
        return (
          <Badge className="bg-red-500">
            {isArabic ? "للبيع" : "For Sale"}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Add price formatting function
  const formatPrice = (value) => {
    // Convert to string and remove any non-digit characters
    const number = String(value || "").replace(/\D/g, "");
    // Add commas for thousands
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Add price parsing function
  const parsePrice = (value) => {
    // Convert to string, remove non-digits, and parse to integer
    return parseInt(String(value || "").replace(/\D/g, "")) || 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1
            className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${
              isArabic ? "font-arabic" : ""
            }`}>
            {isArabic ? "المشاريع" : "Projects"}
          </h1>
          <p
            className={`text-muted-foreground ${
              isArabic ? "font-arabic" : ""
            }`}>
            {isArabic
              ? "إدارة مشاريعك العقارية"
              : "Manage your real estate projects."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
            className="border-brand-gold/30 hover:bg-brand-gold/10 hover:text-brand-gold">
            {isArabic ? "English" : "العربية"}
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="border-brand-gold/30 hover:bg-brand-gold/10 hover:text-brand-gold">
              <Home className="h-4 w-4 mr-2" />
              {isArabic ? "الصفحة الرئيسية" : "Homepage"}
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-brand-gold/30 hover:bg-brand-gold/10 hover:text-brand-gold">
            <LogOut className="h-4 w-4 mr-2" />
            {isArabic ? "تسجيل الخروج" : "Logout"}
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {isArabic ? "إضافة مشروع" : "Add Project"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className={`absolute ${
              isArabic ? "right-2.5" : "left-2.5"
            } top-2.5 h-4 w-4 text-muted-foreground`}
          />
          <Input
            placeholder={
              isArabic ? "البحث عن المشاريع..." : "Search projects..."
            }
            className={isArabic ? "pr-8" : "pl-8"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue
                placeholder={isArabic ? "تصفية حسب الحالة" : "Filter by status"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {isArabic ? "جميع الحالات" : "All Statuses"}
              </SelectItem>
              <SelectItem value="available-properties">
                {isArabic ? "عقارات متاحة" : "Available Properties"}
              </SelectItem>
              <SelectItem value="available-lands">
                {isArabic ? "أراضي متاحة" : "Available Lands"}
              </SelectItem>
              <SelectItem value="coming">
                {isArabic ? "قريباً" : "Coming Soon"}
              </SelectItem>
              <SelectItem value="selling">
                {isArabic ? "للبيع" : "For Sale"}
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue
                placeholder={
                  isArabic ? "تصفية حسب الموقع" : "Filter by location"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {isArabic ? "جميع المواقع" : "All Locations"}
              </SelectItem>
              <SelectItem value="Riyadh">
                {isArabic ? "الرياض" : "Riyadh"}
              </SelectItem>
              <SelectItem value="Jeddah">
                {isArabic ? "جدة" : "Jeddah"}
              </SelectItem>
              <SelectItem value="Dammam">
                {isArabic ? "الدمام" : "Dammam"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border border-primary/20 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">
                {isArabic ? "المعرف" : "ID"}
              </TableHead>
              <TableHead className="whitespace-nowrap">
                {isArabic ? "العنوان" : "Title"}
              </TableHead>
              <TableHead className="whitespace-nowrap">
                {isArabic ? "الحالة" : "Status"}
              </TableHead>
              <TableHead className="whitespace-nowrap">
                {isArabic ? "الموقع" : "Location"}
              </TableHead>
              <TableHead className="whitespace-nowrap">
                {isArabic ? "السعر (ريال)" : "Price (SAR)"}
              </TableHead>
              <TableHead className="whitespace-nowrap">
                {isArabic ? "تاريخ الإضافة" : "Date Added"}
              </TableHead>
              <TableHead className="text-right whitespace-nowrap">
                {isArabic ? "الإجراءات" : "Actions"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {project._id}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {project.title}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getStatusBadge(project.status)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {project.location}
                  </TableCell>
                  <TableCell className="flex items-center whitespace-nowrap">
                    <SARSymbol className="h-3.5 w-3.5 mr-1" />
                    {project.price}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {project.date}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">
                            {isArabic ? "فتح القائمة" : "Open menu"}
                          </span>
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
                          <span>{isArabic ? "تعديل" : "Edit"}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setCurrentProject(project);
                            setIsDeleteDialogOpen(true);
                          }}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>{isArabic ? "حذف" : "Delete"}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/projects/${project._id}`}>
                            <Home className="mr-2 h-4 w-4" />
                            <span>{isArabic ? "عرض" : "View"}</span>
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
                  {isArabic ? "لم يتم العثور على مشاريع" : "No projects found."}
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
            <DialogTitle className={isArabic ? "font-arabic" : ""}>
              {isArabic ? "إضافة مشروع جديد" : "Add New Project"}
            </DialogTitle>
            <DialogDescription className={isArabic ? "font-arabic" : ""}>
              {isArabic
                ? "املأ التفاصيل لإضافة مشروع جديد إلى محفظتك"
                : "Fill in the details to add a new project to your portfolio."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="project-title"
                className={`text-right ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "العنوان" : "Title"}
              </Label>
              <Input
                id="project-title"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                className={`col-span-3 ${isArabic ? "text-right" : ""}`}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="project-status"
                className={`text-right ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "الحالة" : "Status"}
              </Label>
              <Select
                value={newProject.status}
                onValueChange={(value) =>
                  setNewProject({ ...newProject, status: value })
                }>
                <SelectTrigger id="project-status" className="col-span-3">
                  <SelectValue
                    placeholder={isArabic ? "اختر الحالة" : "Select status"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available-properties">
                    {isArabic ? "عقارات متاحة" : "Available Properties"}
                  </SelectItem>
                  <SelectItem value="available-lands">
                    {isArabic ? "أراضي متاحة" : "Available Lands"}
                  </SelectItem>
                  <SelectItem value="coming">
                    {isArabic ? "قريباً" : "Coming Soon"}
                  </SelectItem>
                  <SelectItem value="selling">
                    {isArabic ? "للبيع" : "For Sale"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="project-location"
                className={`text-right ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "الموقع" : "Location"}
              </Label>
              <Select
                value={newProject.location}
                onValueChange={(value) =>
                  setNewProject({ ...newProject, location: value })
                }>
                <SelectTrigger id="project-location" className="col-span-3">
                  <SelectValue
                    placeholder={isArabic ? "اختر الموقع" : "Select location"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Riyadh">
                    {isArabic ? "الرياض" : "Riyadh"}
                  </SelectItem>
                  <SelectItem value="Jeddah">
                    {isArabic ? "جدة" : "Jeddah"}
                  </SelectItem>
                  <SelectItem value="Dammam">
                    {isArabic ? "الدمام" : "Dammam"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="project-price"
                className={`text-right ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "السعر (ريال)" : "Price (SAR)"}
              </Label>
              <div className="col-span-3 relative">
                <div className="absolute left-2.5 top-2.5">
                  <SARSymbol className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="project-price"
                  value={formatPrice(newProject.price)}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      price: parsePrice(e.target.value),
                    })
                  }
                  className={`pl-8 ${isArabic ? "text-right" : ""}`}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label
                htmlFor="project-description-en"
                className={`text-right mt-2 ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "الوصف (إنجليزي)" : "Description (EN)"}
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
                className={`text-right mt-2 ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "الوصف (عربي)" : "Description (AR)"}
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
              <Label
                htmlFor="project-area"
                className={`text-right ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "المساحة (م²)" : "Area (m²)"}
              </Label>
              <Input
                id="project-area"
                value={newProject.area}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    area: Math.max(0, parseInt(e.target.value) || 0),
                  })
                }
                className={`col-span-3 ${isArabic ? "text-right" : ""}`}
                type="number"
                min="0"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="project-bedrooms"
                className={`text-right ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "غرف النوم" : "Bedrooms"}
              </Label>
              <Input
                id="project-bedrooms"
                value={newProject.bedrooms}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    bedrooms: Math.max(0, parseInt(e.target.value) || 0),
                  })
                }
                className={`col-span-3 ${isArabic ? "text-right" : ""}`}
                type="number"
                min="0"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="project-bathrooms"
                className={`text-right ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "الحمامات" : "Bathrooms"}
              </Label>
              <Input
                id="project-bathrooms"
                value={newProject.bathrooms}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    bathrooms: Math.max(0, parseInt(e.target.value) || 0),
                  })
                }
                className={`col-span-3 ${isArabic ? "text-right" : ""}`}
                type="number"
                min="0"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="project-floors"
                className={`text-right ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "الطوابق" : "Floors"}
              </Label>
              <Input
                id="project-floors"
                value={newProject.floors}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    floors: Math.max(0, parseInt(e.target.value) || 0),
                  })
                }
                className={`col-span-3 ${isArabic ? "text-right" : ""}`}
                type="number"
                min="0"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label
                htmlFor="project-images"
                className={`text-right mt-2 ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "الصور" : "Images"}
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
                    {isArabic ? "رفع الصور" : "Upload Images"}
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label
                htmlFor="project-features"
                className={`text-right mt-2 ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "المميزات" : "Features"}
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
                      placeholder={
                        isArabic ? "الميزة (إنجليزي)" : "Feature (EN)"
                      }
                      className="flex-1"
                    />
                    <Input
                      id={`feature-ar-${index}`}
                      value={feature.ar}
                      onChange={(e) =>
                        updateFeature(index, "ar", e.target.value)
                      }
                      placeholder={isArabic ? "الميزة (عربي)" : "Feature (AR)"}
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
                  {isArabic ? "إضافة ميزة" : "Add Feature"}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="flex items-baseline gap-5">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {isArabic ? "إلغاء" : "Cancel"}
            </Button>
            <Button
              onClick={handleAddProject}
              disabled={
                !newProject.title ||
                !newProject.price ||
                !newProject.description.en ||
                !newProject.description.ar ||
                !newProject.area ||
                !newProject.bedrooms ||
                !newProject.bathrooms ||
                !newProject.floors
              }>
              {isArabic ? "إضافة المشروع" : "Add Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className={isArabic ? "font-arabic" : ""}>
              {isArabic ? "تعديل المشروع" : "Edit Project"}
            </DialogTitle>
            <DialogDescription className={isArabic ? "font-arabic" : ""}>
              {isArabic
                ? "تحديث تفاصيل مشروعك"
                : "Update the details of your project."}
            </DialogDescription>
          </DialogHeader>
          {currentProject && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="edit-title"
                  className={`text-right ${isArabic ? "font-arabic" : ""}`}>
                  {isArabic ? "العنوان" : "Title"}
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
                  className={`col-span-3 ${isArabic ? "text-right" : ""}`}
                  placeholder={
                    isArabic ? "أدخل عنوان المشروع" : "Enter project title"
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="edit-status"
                  className={`text-right ${isArabic ? "font-arabic" : ""}`}>
                  {isArabic ? "الحالة" : "Status"}
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
                <Label
                  htmlFor="edit-location"
                  className={`text-right ${isArabic ? "font-arabic" : ""}`}>
                  {isArabic ? "الموقع" : "Location"}
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
                <Label
                  htmlFor="edit-price"
                  className={`text-right ${isArabic ? "font-arabic" : ""}`}>
                  {isArabic ? "السعر (ريال)" : "Price (SAR)"}
                </Label>
                <div className="col-span-3 relative">
                  <div className="absolute left-2.5 top-2.5">
                    <SARSymbol className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="edit-price"
                    value={formatPrice(currentProject.price)}
                    onChange={(e) =>
                      setCurrentProject({
                        ...currentProject,
                        price: parsePrice(e.target.value),
                      })
                    }
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label
                  htmlFor="edit-description-en"
                  className={`text-right mt-2 ${
                    isArabic ? "font-arabic" : ""
                  }`}>
                  {isArabic ? "الوصف (إنجليزي)" : "Description (EN)"}
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
                  className={`text-right mt-2 ${
                    isArabic ? "font-arabic" : ""
                  }`}>
                  {isArabic ? "الوصف (عربي)" : "Description (AR)"}
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
                <Label
                  htmlFor="edit-area"
                  className={`text-right ${isArabic ? "font-arabic" : ""}`}>
                  {isArabic ? "المساحة (م²)" : "Area (m²)"}
                </Label>
                <Input
                  id="edit-area"
                  value={currentProject.area || ""}
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      area: Math.max(0, parseInt(e.target.value) || 0),
                    })
                  }
                  className="col-span-3"
                  type="number"
                  min="0"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="edit-bedrooms"
                  className={`text-right ${isArabic ? "font-arabic" : ""}`}>
                  {isArabic ? "غرف النوم" : "Bedrooms"}
                </Label>
                <Input
                  id="edit-bedrooms"
                  value={currentProject.bedrooms || ""}
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      bedrooms: Math.max(0, parseInt(e.target.value) || 0),
                    })
                  }
                  className="col-span-3"
                  type="number"
                  min="0"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="edit-bathrooms"
                  className={`text-right ${isArabic ? "font-arabic" : ""}`}>
                  {isArabic ? "الحمامات" : "Bathrooms"}
                </Label>
                <Input
                  id="edit-bathrooms"
                  value={currentProject.bathrooms || ""}
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      bathrooms: Math.max(0, parseInt(e.target.value) || 0),
                    })
                  }
                  className="col-span-3"
                  type="number"
                  min="0"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="edit-floors"
                  className={`text-right ${isArabic ? "font-arabic" : ""}`}>
                  {isArabic ? "الطوابق" : "Floors"}
                </Label>
                <Input
                  id="edit-floors"
                  value={currentProject.floors || ""}
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      floors: Math.max(0, parseInt(e.target.value) || 0),
                    })
                  }
                  className="col-span-3"
                  type="number"
                  min="0"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label
                  htmlFor="edit-images"
                  className={`text-right mt-2 ${
                    isArabic ? "font-arabic" : ""
                  }`}>
                  {isArabic ? "الصور" : "Images"}
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
                      disabled={isUploading}
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        document.getElementById("edit-images").click()
                      }
                      className="w-full relative"
                      disabled={isUploading}>
                      {isUploading ? (
                        <>
                          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                            <div className="w-full max-w-[200px]">
                              <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary transition-all duration-300"
                                  style={{ width: `${uploadProgress}%` }}
                                />
                              </div>
                              <p className="text-xs text-center mt-2">
                                Uploading... {Math.round(uploadProgress)}%
                              </p>
                            </div>
                          </div>
                          <Upload className="mr-2 h-4 w-4 animate-pulse" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Images
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label
                  htmlFor="edit-features"
                  className={`text-right mt-2 ${
                    isArabic ? "font-arabic" : ""
                  }`}>
                  {isArabic ? "المميزات" : "Features"}
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
                        placeholder={
                          isArabic ? "الميزة (إنجليزي)" : "Feature (EN)"
                        }
                        className="flex-1"
                      />
                      <Input
                        id={`edit-feature-ar-${index}`}
                        value={feature.ar || ""}
                        onChange={(e) =>
                          updateFeature(index, "ar", e.target.value)
                        }
                        placeholder={
                          isArabic ? "الميزة (عربي)" : "Feature (AR)"
                        }
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
                    {isArabic ? "إضافة ميزة" : "Add Feature"}
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}>
              {isArabic ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleEditProject}>
              {isArabic ? "حفظ التغييرات" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className={isArabic ? "font-arabic" : ""}>
              {isArabic ? "هل أنت متأكد؟" : "Are you sure?"}
            </AlertDialogTitle>
            <AlertDialogDescription className={isArabic ? "font-arabic" : ""}>
              {isArabic
                ? `سيتم حذف المشروع "${currentProject?.title}" نهائياً. لا يمكن التراجع عن هذا الإجراء.`
                : `This will permanently delete the project "${currentProject?.title}". This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-baseline gap-5">
            <AlertDialogCancel>
              {isArabic ? "إلغاء" : "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              className="bg-red-600 hover:bg-red-700">
              {isArabic ? "حذف" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Add Success Popup */}
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        title={successMessage.title}
        description={successMessage.description}
        action={successMessage.action}
      />

      {/* Add Error Popup */}
      <ErrorPopup
        isOpen={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        title={errorMessage.title}
        description={errorMessage.description}
        isTokenError={errorMessage.title === "Session Expired"}
      />
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
