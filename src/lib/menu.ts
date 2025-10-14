// src/lib/menu.ts
import type { AppAbility } from "@/lib/casl/types";
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  Clock,
  Building,
  Newspaper,
  Briefcase,
  FileText,
} from "lucide-react";

type MenuItem = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  enabled?: boolean;
  submenu?: {
    title: string;
    href: string;
    enabled?: boolean;
  }[];
};

export const getMenuItems = (ability: AppAbility) => {
  const MENU_ITEMS: MenuItem[] = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      enabled: true,
    },
    {
      title: "News",
      icon: Newspaper,
      href: "/dashboard/news",
      enabled: true,
    },
    {
      title: "Employees",
      icon: Users,
      href: "/dashboard/employees",
      enabled: true,
      submenu: [
        { title: "All Employees", href: "/dashboard/employees", enabled: true },
        { title: "Invitations", href: "/dashboard/employees/invitations", enabled: true },
      ],
    },
    {
      title: "Attendance",
      icon: Clock,
      href: "/dashboard/attendance",
      enabled: true,
      submenu: [
        { title: "My Attendance", href: "/dashboard/attendance", enabled: true },
        { title: "Manage Attendance", href: "/dashboard/attendance/manage", enabled: true },
      ],
    },
    {
      title: "Leave Management",
      icon: Calendar,
      href: "/dashboard/leaves",
      enabled: true,
      submenu: [
        { title: "My Leaves", href: "/dashboard/leaves", enabled: true },
        { title: "Manage Leaves", href: "/dashboard/leaves/manage", enabled: true },
        { title: "Leave Requests", href: "/dashboard/leaves/requests", enabled: true },
        { title: "Leave Policies", href: "/dashboard/leaves/policies", enabled: true },
      ],
    },
    {
      title: "Recruitment",
      icon: Briefcase,
      href: "/dashboard/recruitment/jobs",
      enabled: true,
      submenu: [
        { title: "Job Postings", href: "/dashboard/recruitment/jobs", enabled: true },
        { title: "Applications", href: "/dashboard/recruitment/applications", enabled: true },
      ],
    },
    
    {
      title: "Payroll",
      icon: DollarSign,
      href: "/dashboard/payroll",
      enabled: true,
      submenu: [
        { title: "Salary Management", href: "/dashboard/payroll", enabled: true },
        { title: "Salaries Information", href: "/dashboard/payroll/settings", enabled: true },
        { title: "My Payslips", href: "/dashboard/payroll/payslips", enabled: true },
      ],
    },
    {
      title: "Documents",
      icon: FileText,
      href: "/dashboard/documents",
      enabled: true,
    },
    {
      title: "Company",
      icon: Building,
      href: "/dashboard/company",
      enabled: true,
      submenu: [
        { title: "Departments", href: "/dashboard/company/departments", enabled: true },
        { title: "Policies", href: "/dashboard/company/policies", enabled: true },
        { title: "Announcements", href: "/dashboard/company/announcements", enabled: true },
      ],
    },
  ];

  return MENU_ITEMS;
};
