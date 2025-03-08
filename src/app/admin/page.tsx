"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, BarChart4 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { mockDashboardStats, mockUsers } from "@/lib/data/admin";
import { mockCourses } from "@/lib/data/courses";
import { mockAnalytics } from "@/lib/data/analytics";

// Import our new components
import { DashboardStats } from "@/components/admin/DashboardStats";
import { CourseManagement } from "@/components/admin/CourseManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";

// Add this CSS keyframe animation for the pulse effect
const pulseAnimation = `
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
`;

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(mockDashboardStats);
  const [users, setUsers] = useState(mockUsers);
  const [courses, setCourses] = useState(mockCourses);
  const [analytics, setAnalytics] = useState(mockAnalytics);
  
  // Simulate loading data
  useEffect(() => {
    // In a real app, you would fetch data from an API here
    const timer = setTimeout(() => {
      setStats(mockDashboardStats);
      setUsers(mockUsers);
      setCourses(mockCourses);
      setAnalytics(mockAnalytics);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ProtectedRoute adminOnly>
      <MainLayout>
        <style jsx global>{pulseAnimation}</style>
        <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="flex gap-2">
              <Link href="/admin/courses/new">
                <Button className="bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600">
                  <BookOpen className="mr-2 h-4 w-4" />
                  New Course
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Dashboard Stats */}
          <DashboardStats stats={stats} />
          
          {/* Tabs Navigation */}
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-3 p-1 mb-4 bg-muted/10 rounded-lg border">
              <TabsTrigger 
                value="courses" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-violet-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md py-1.5"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Courses
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md py-1.5"
              >
                <Users className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md py-1.5"
              >
                <BarChart4 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>
            
            {/* Courses Tab */}
            <TabsContent value="courses" className="mt-6">
              <CourseManagement courses={courses} />
            </TabsContent>
            
            {/* Users Tab */}
            <TabsContent value="users" className="mt-6">
              <UserManagement users={users} />
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-6">
              <AnalyticsDashboard analytics={analytics} />
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
} 