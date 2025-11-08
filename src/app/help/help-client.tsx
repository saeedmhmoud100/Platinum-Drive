"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  UserPlus,
  LogIn,
  Home,
  FileText,
  Upload,
  Star,
  Share2,
  Search,
  Eye,
  Trash2,
  User,
  Settings,
  Shield,
  Bell,
  UserCog,
  Lightbulb,
} from "lucide-react";

import { IntroSection } from "./sections/intro";
import { RegisterSection } from "./sections/register";
import { LoginSection } from "./sections/login";
import { HomeSection } from "./sections/home";
import { FilesSection } from "./sections/files";
import { UploadSection } from "./sections/upload";
import { FavoritesSection } from "./sections/favorites";
import { SharedSection } from "./sections/shared";
import { SearchSection } from "./sections/search";
import { PreviewSection } from "./sections/preview";
import { TrashSection } from "./sections/trash";
import { ProfileSection } from "./sections/profile";
import { SettingsSection } from "./sections/settings";
import { SecuritySection } from "./sections/security";
import { NotificationsSection } from "./sections/notifications";
import { AdminSection } from "./sections/admin";
import { TipsSection } from "./sections/tips";

const sections = [
  { id: "intro", title: "مقدمة", icon: BookOpen, component: IntroSection },
  {
    id: "register",
    title: "إنشاء حساب",
    icon: UserPlus,
    component: RegisterSection,
  },
  { id: "login", title: "تسجيل الدخول", icon: LogIn, component: LoginSection },
  { id: "home", title: "الصفحة الرئيسية", icon: Home, component: HomeSection },
  {
    id: "files",
    title: "إدارة الملفات",
    icon: FileText,
    component: FilesSection,
  },
  {
    id: "upload",
    title: "رفع الملفات",
    icon: Upload,
    component: UploadSection,
  },
  {
    id: "favorites",
    title: "المفضلة",
    icon: Star,
    component: FavoritesSection,
  },
  {
    id: "shared",
    title: "الملفات المشتركة",
    icon: Share2,
    component: SharedSection,
  },
  { id: "search", title: "البحث", icon: Search, component: SearchSection },
  {
    id: "preview",
    title: "معاينة الملفات",
    icon: Eye,
    component: PreviewSection,
  },
  { id: "trash", title: "سلة المهملات", icon: Trash2, component: TrashSection },
  {
    id: "profile",
    title: "الملف الشخصي",
    icon: User,
    component: ProfileSection,
  },
  {
    id: "settings",
    title: "الإعدادات",
    icon: Settings,
    component: SettingsSection,
  },
  { id: "security", title: "الأمان", icon: Shield, component: SecuritySection },
  {
    id: "notifications",
    title: "الإشعارات",
    icon: Bell,
    component: NotificationsSection,
  },
  {
    id: "admin",
    title: "لوحة الإدارة",
    icon: UserCog,
    component: AdminSection,
  },
  {
    id: "tips",
    title: "نصائح وإرشادات",
    icon: Lightbulb,
    component: TipsSection,
  },
];

export function HelpClient() {
  const [activeSection, setActiveSection] = useState("intro");
  const ActiveComponent =
    sections.find((s) => s.id === activeSection)?.component || IntroSection;

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-right" dir="rtl">
          مركز المساعدة
        </h1>
        <p className="text-muted-foreground text-right mt-2" dir="rtl">
          دليلك الشامل لاستخدام منصة بلاتينيوم درايف
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:flex-1 md:order-1 p-6">
          <ScrollArea className="h-[calc(100vh-200px)] pr-4">
            <ActiveComponent />
          </ScrollArea>
        </Card>
        <Card className="md:w-1/4 md:order-2 p-4 h-fit">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    className="w-full justify-start text-right"
                    dir="rtl"
                    onClick={() => setActiveSection(section.id)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {section.title}
                  </Button>
                );
              })}
            </nav>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
