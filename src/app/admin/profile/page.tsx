"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { mockAnalytics } from "@/lib/data/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/context/auth-context";
import { Progress } from "@/components/ui/progress";
import { Users, BookOpen, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { User } from "@/lib/types";
import { handleError } from "@/lib/types/errors";

export default function AdminProfilePage() {
  const { user } = useAuth();
  const analytics = mockAnalytics;

  const handleProfileUpdate = async (data: Partial<User>) => {
    try {
      // Update profile logic would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log("Updating admin profile with:", data);
      toast.success("Profile updated successfully!");
    } catch (error: unknown) {
      const appError = handleError(error);
      console.error("Profile update error:", appError);
      toast.error(appError.message);
    }
  };

  if (!user) return null;

  return (
    <ProtectedRoute adminOnly>
      <MainLayout>
        <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className="text-3xl font-bold mb-6">Admin Profile</h1>
          
          <div className="grid gap-6 md:grid-cols-7">
            <div className="md:col-span-4">
              <ProfileForm user={user} onSubmit={handleProfileUpdate} />
            </div>
            
            <div className="md:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Overview</CardTitle>
                  <CardDescription>Quick stats about the platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Platform Rating</span>
                      <span className="text-sm font-medium">{analytics.platformStats.averageRating}/5.0</span>
                    </div>
                    <Progress 
                      value={analytics.platformStats.averageRating * 20} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{analytics.platformStats.activeStudents}</p>
                        <p className="text-xs text-muted-foreground">Active Students</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">${analytics.platformStats.totalRevenue.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Total Revenue</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">{(analytics.platformStats.completionRate * 100).toFixed(1)}%</p>
                        <p className="text-xs text-muted-foreground">Average Completion Rate</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Admin Settings</CardTitle>
                  <CardDescription>Manage your admin preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Course Updates</p>
                      <p className="text-xs text-muted-foreground">Notifications about new course submissions</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="courseUpdates" className="rounded border-gray-300" defaultChecked />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">User Reports</p>
                      <p className="text-xs text-muted-foreground">Weekly user activity reports</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="userReports" className="rounded border-gray-300" defaultChecked />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Revenue Alerts</p>
                      <p className="text-xs text-muted-foreground">Daily revenue milestone notifications</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="revenueAlerts" className="rounded border-gray-300" defaultChecked />
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