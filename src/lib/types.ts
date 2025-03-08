// Course interface
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  rating: number;
  students: number;
  duration: string;
  price: number;
  image: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  progress?: number;
  lastAccessed?: string;
  completedAt?: string;
  certificate?: string;
}

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  lastActive: string;
  enrolledCourses: string[];
  completedLessons: Record<string, string[]>;
  progress: Record<string, number>;
  completedCourses: string[];
}

// Dashboard Stats interface
export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  completionRate: number;
}

// Analytics interface
export interface Analytics {
  monthlyEnrollments: {
    month: string;
    enrollments: number;
  }[];
  coursePopularity: {
    courseId: string;
    enrollments: number;
  }[];
  userActivity: {
    date: string;
    activeUsers: number;
  }[];
  platformStats: {
    totalRevenue: number;
    averageRating: number;
    completionRate: number;
    activeStudents: number;
  };
} 