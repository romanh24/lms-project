import { mockCourses } from "./courses";
import { User } from "@/lib/types";

// Admin dashboard statistics
export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  completionRate: number;
}

// Mock dashboard statistics
export const mockDashboardStats: DashboardStats = {
  totalUsers: 256,
  totalCourses: mockCourses.length,
  totalEnrollments: 1842,
  completionRate: 68
};

// Mock users for admin dashboard
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "user",
    createdAt: "2023-09-15",
    lastActive: "2024-02-15",
    enrolledCourses: ["1", "2", "3"],
    completedLessons: { "1": ["1.1", "1.2"], "2": ["2.1"] },
    progress: { "1": 40, "2": 20, "3": 0 },
    completedCourses: ["4", "5"]
  },
  {
    id: "2",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    role: "user",
    createdAt: "2023-08-22",
    lastActive: "2024-02-14",
    enrolledCourses: ["1", "2", "3", "4", "5"],
    completedLessons: { "1": ["1.1", "1.2", "1.3"], "2": ["2.1", "2.2"], "3": ["3.1"] },
    progress: { "1": 60, "2": 45, "3": 15, "4": 0, "5": 0 },
    completedCourses: ["6", "7", "8"]
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "user",
    createdAt: "2023-10-05",
    lastActive: "2024-02-13",
    enrolledCourses: ["1", "2"],
    completedLessons: { "1": ["1.1"], "2": [] },
    progress: { "1": 20, "2": 0 },
    completedCourses: []
  },
  {
    id: "4",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    role: "admin",
    createdAt: "2023-07-10",
    lastActive: "2024-02-15",
    enrolledCourses: [],
    completedLessons: {},
    progress: {},
    completedCourses: []
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "admin",
    createdAt: "2023-11-18",
    lastActive: "2024-02-12",
    enrolledCourses: ["4", "5"],
    completedLessons: { "4": ["4.1", "4.2", "4.3"], "5": ["5.1", "5.2"] },
    progress: { "4": 100, "5": 100 },
    completedCourses: ["1", "2", "3"]
  }
];

// Analytics data
export interface AnalyticsData {
  monthlyEnrollments: { month: string; count: number }[];
  coursePopularity: { courseId: string; enrollments: number }[];
  userActivity: { date: string; activeUsers: number }[];
}

// Mock analytics data
export const mockAnalytics: AnalyticsData = {
  monthlyEnrollments: [
    { month: "Jan", count: 120 },
    { month: "Feb", count: 145 },
    { month: "Mar", count: 165 },
    { month: "Apr", count: 190 },
    { month: "May", count: 210 },
    { month: "Jun", count: 235 },
    { month: "Jul", count: 255 },
    { month: "Aug", count: 280 },
    { month: "Sep", count: 310 },
    { month: "Oct", count: 340 },
    { month: "Nov", count: 360 },
    { month: "Dec", count: 390 }
  ],
  coursePopularity: mockCourses.map((course, index) => ({
    courseId: course.id,
    enrollments: 100 + (index * 50) + Math.floor(Math.random() * 30)
  })),
  userActivity: [
    { date: "2023-12-01", activeUsers: 85 },
    { date: "2023-12-08", activeUsers: 92 },
    { date: "2023-12-15", activeUsers: 88 },
    { date: "2023-12-22", activeUsers: 95 },
    { date: "2023-12-29", activeUsers: 105 },
    { date: "2024-01-05", activeUsers: 110 },
    { date: "2024-01-12", activeUsers: 115 },
    { date: "2024-01-19", activeUsers: 125 },
    { date: "2024-01-26", activeUsers: 130 }
  ]
};

export const mockAdminStats = {
  totalUsers: 1250,
  activeUsers: 850,
  totalCourses: 45,
  totalRevenue: 125000,
  recentActivity: [
    {
      id: "1",
      type: "enrollment",
      user: "John Doe",
      course: "Advanced TypeScript",
      date: "2024-03-06T10:30:00Z"
    },
    {
      id: "2",
      type: "completion",
      user: "Jane Smith",
      course: "React Fundamentals",
      date: "2024-03-06T09:15:00Z"
    }
  ]
}; 