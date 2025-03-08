"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/context/auth-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, GraduationCap, BarChart, Star, Award, Clock } from "lucide-react";
import { mockUserDashboardStats } from "@/lib/data/user-dashboard";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const { user } = useAuth();
  const stats = mockUserDashboardStats;

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Welcome back, {user?.name || "User"}!</h2>
            <p className="text-muted-foreground">
              Here&apos;s an overview of your learning progress and activities.
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Enrolled Courses
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.enrolledCourses[0]?.count || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Courses you&apos;re currently taking
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Courses
                </CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedCourses[0]?.count || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Courses you&apos;ve successfully completed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Overall Progress
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.overallProgress.percentage}%</div>
                <Progress value={stats.overallProgress.percentage} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Your average completion rate
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.overallProgress.streak} days</div>
                <p className="text-xs text-muted-foreground">Keep up the momentum!</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hours Spent</CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.overallProgress.totalHoursSpent}h</div>
                <p className="text-xs text-muted-foreground">Total learning time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Certificates</CardTitle>
                <Award className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedCourses[0]?.count || 0}</div>
                <p className="text-xs text-muted-foreground">Earned certificates</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="enrolled" className="w-full">
            <TabsList className="grid w-full grid-cols-3 p-1 mb-4 bg-muted/10 rounded-lg border">
              <TabsTrigger 
                value="enrolled" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md py-1.5"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Enrolled Courses
              </TabsTrigger>
              <TabsTrigger 
                value="recommended" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md py-1.5"
              >
                <Star className="h-4 w-4 mr-2" />
                Recommended
              </TabsTrigger>
              <TabsTrigger 
                value="achievements" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md py-1.5"
              >
                <Award className="h-4 w-4 mr-2" />
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="enrolled">
              <div className="grid gap-4">
                {stats.enrolledCourses[0]?.courses.length ? (
                  stats.enrolledCourses[0].courses.map((course) => (
                    <Card key={course.id}>
                      <CardHeader>
                        <CardTitle>{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Last accessed: {course.lastAccessed}</span>
                          <span className="font-medium">{course.duration} remaining</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>No Enrolled Courses</CardTitle>
                      <CardDescription>You haven&apos;t enrolled in any courses yet.</CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="recommended">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Courses</CardTitle>
                  <CardDescription>Based on your interests and learning history</CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <div className="grid gap-4">
                {stats.completedCourses[0]?.courses.length ? (
                  stats.completedCourses[0].courses.map((course) => (
                    <Card key={course.id}>
                      <CardHeader>
                        <CardTitle>{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Completed: {course.completedAt}</span>
                          <span className="font-medium">Certificate: {course.certificate}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>No Achievements Yet</CardTitle>
                      <CardDescription>Complete courses to earn certificates and achievements.</CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
} 