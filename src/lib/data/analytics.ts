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

// Mock analytics data
export const mockAnalytics: Analytics = {
  monthlyEnrollments: [
    { month: "Jan", enrollments: 245 },
    { month: "Feb", enrollments: 312 },
    { month: "Mar", enrollments: 458 },
    { month: "Apr", enrollments: 387 },
    { month: "May", enrollments: 524 },
    { month: "Jun", enrollments: 623 },
    { month: "Jul", enrollments: 589 },
    { month: "Aug", enrollments: 678 },
    { month: "Sep", enrollments: 745 },
    { month: "Oct", enrollments: 689 },
    { month: "Nov", enrollments: 824 },
    { month: "Dec", enrollments: 756 }
  ],
  coursePopularity: [
    { courseId: "1", enrollments: 1245 },
    { courseId: "2", enrollments: 842 },
    { courseId: "3", enrollments: 1032 },
    { courseId: "4", enrollments: 756 },
    { courseId: "5", enrollments: 925 }
  ],
  userActivity: [
    { date: "2024-01-01", activeUsers: 2450 },
    { date: "2024-01-02", activeUsers: 2680 },
    { date: "2024-01-03", activeUsers: 2890 },
    { date: "2024-01-04", activeUsers: 2760 },
    { date: "2024-01-05", activeUsers: 3120 },
    { date: "2024-01-06", activeUsers: 2980 },
    { date: "2024-01-07", activeUsers: 3240 }
  ],
  platformStats: {
    totalRevenue: 158750.00,
    averageRating: 4.8,
    completionRate: 0.85,
    activeStudents: 10245
  }
}; 