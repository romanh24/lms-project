"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Course } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface CourseManagementProps {
  courses: Course[];
}

export function CourseManagement({ courses }: CourseManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter courses based on search query
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Management</CardTitle>
        <CardDescription>
          Manage your courses, lessons, and content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link href="/admin/courses/new">
            <Button className="bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600">
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </Link>
        </div>
        
        {filteredCourses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Title</th>
                  <th className="text-left py-3 px-4 font-medium">Instructor</th>
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Level</th>
                  <th className="text-left py-3 px-4 font-medium">Price</th>
                  <th className="text-left py-3 px-4 font-medium">Students</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{course.title}</td>
                    <td className="py-3 px-4">{course.instructor}</td>
                    <td className="py-3 px-4">{course.category}</td>
                    <td className="py-3 px-4">
                      <Badge variant={
                        course.level === "Beginner" ? "outline" : 
                        course.level === "Intermediate" ? "secondary" : "default"
                      }>
                        {course.level}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">${course.price}</td>
                    <td className="py-3 px-4">{course.students}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/courses/${course.id}`}>
                          <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Link href={`/admin/courses/${course.id}/edit`}>
                          <Button variant="outline" size="sm" className="hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200">
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No courses found. Try a different search or add a new course.
          </div>
        )}
      </CardContent>
    </Card>
  );
} 