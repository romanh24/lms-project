"use client";

import { useState, useEffect, use } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { mockCourses } from "@/lib/data/courses";

export default function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    level: "Beginner",
    category: "",
    price: "",
    duration: "",
    image: ""
  });

  const courseId = use(params);

  useEffect(() => {
    // In a real app, you would fetch the course data from an API
    const fetchCourse = async () => {
      setIsLoadingCourse(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const course = mockCourses.find(c => c.id === courseId.id);
        
        if (course) {
          setFormData({
            title: course.title,
            description: course.description || "",
            instructor: course.instructor,
            level: course.level,
            category: course.category,
            price: course.price.toString(),
            duration: course.duration || "",
            image: course.image
          });
        } else {
          toast.error("Course not found");
          router.push("/admin");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        toast.error("Failed to load course data");
      } finally {
        setIsLoadingCourse(false);
      }
    };
    
    fetchCourse();
  }, [courseId.id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Course updated successfully!");
      router.push("/admin");
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingCourse) {
    return (
      <ProtectedRoute adminOnly>
        <MainLayout>
          <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading course data...</p>
              </div>
            </div>
          </div>
        </MainLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute adminOnly>
      <MainLayout>
        <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Edit Course</h1>
            <Link href="/admin">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
                <CardDescription>
                  Update the details of this course.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter course title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input
                      id="instructor"
                      name="instructor"
                      placeholder="Enter instructor name"
                      value={formData.instructor}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      placeholder="Enter course category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <select
                      id="level"
                      name="level"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={formData.level}
                      onChange={handleChange}
                      required
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Enter course price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      placeholder="e.g. 8 weeks"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      name="image"
                      placeholder="Enter image URL"
                      value={formData.image}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Enter course description"
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-4 pt-6 mt-4 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/admin")}
                  className="min-w-[100px]"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="min-w-[150px]"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Save className="mr-2 h-4 w-4" />
                      Update Course
                    </span>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
} 