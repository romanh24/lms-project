"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/context/auth-context";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, Clock } from "lucide-react";
import { toast } from "sonner";
import { mockUserDashboardStats } from "@/lib/data/user-dashboard";
import { User } from "@/lib/types";
import { handleError } from "@/lib/types/errors";

export default function ProfilePage() {
  const { user } = useAuth();
  const stats = mockUserDashboardStats;

  const handleProfileUpdate = async (updatedData: Partial<User>) => {
    try {
      // Update profile logic would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log("Updating profile with:", updatedData);
      toast.success("Profile updated successfully!");
    } catch (error: unknown) {
      const appError = handleError(error);
      console.error("Profile update error:", appError);
      toast.error(appError.message);
    }
  };

  if (!user) return null;

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
          
          <div className="grid gap-6 md:grid-cols-7">
            <div className="md:col-span-4">
              <ProfileForm user={user} onSubmit={handleProfileUpdate} />
            </div>
            
            <div className="md:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Statistics</CardTitle>
                  <CardDescription>Your learning journey overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Overall Progress</span>
                      <span className="text-sm font-medium">{stats.overallProgress.percentage}%</span>
                    </div>
                    <Progress value={stats.overallProgress.percentage} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{stats.enrolledCourses[0]?.count || 0}</p>
                        <p className="text-xs text-muted-foreground">Active Courses</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">{stats.completedCourses[0]?.count || 0}</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">{stats.overallProgress.totalHoursSpent} hours</p>
                        <p className="text-xs text-muted-foreground">Total Learning Time</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">Receive updates about your courses</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="notifications" className="rounded border-gray-300" defaultChecked />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Learning Reminders</p>
                      <p className="text-xs text-muted-foreground">Daily reminders to continue learning</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="reminders" className="rounded border-gray-300" defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
} 