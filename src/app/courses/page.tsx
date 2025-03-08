"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Clock, Star, Filter, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";
import { Course, mockCourses } from "@/lib/data/courses";
import Image from "next/image";

// Simple Badge component to avoid import issues
function Badge({ 
  children, 
  className, 
  variant = "default" 
}: { 
  children: React.ReactNode; 
  className?: string; 
  variant?: "default" | "secondary" | "outline"; 
}) {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold";
  const variantStyles = {
    default: "border-transparent bg-primary text-primary-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
    outline: "text-foreground",
  };
  
  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className || ""}`}>
      {children}
    </div>
  );
}

// Course Card Component
function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          priority={course.isFeatured}
        />
        {course.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-indigo-600 to-blue-500">
            Featured
          </Badge>
        )}
        {course.isPopular && (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-400">
            Popular
          </Badge>
        )}
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
            <p className="text-sm text-muted-foreground">by {course.instructor}</p>
          </div>
          <Badge variant={
            course.level === "Beginner" ? "outline" : 
            course.level === "Intermediate" ? "secondary" : "default"
          }>
            {course.level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 pb-2">
        <CardDescription className="line-clamp-2 h-10">
          {course.description}
        </CardDescription>
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-amber-500 mr-1" fill="currentColor" />
            <span>{course.rating}</span>
            <span className="text-muted-foreground ml-1">({course.students})</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-muted-foreground">{course.duration}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 flex items-center justify-between">
        <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          ${course.price}
        </div>
        <Link href={`/courses/${course.id}`}>
          <Button variant="primary" size="sm">View Course</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  
  // Get unique categories
  const categories = ["all", ...new Set(mockCourses.map(course => course.category))];
  const levels = ["all", "Beginner", "Intermediate", "Advanced"];

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setCourses(mockCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
  }, []);
  
  // Filter courses based on search query, category, and level
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading courses...</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Explore Courses</h1>
            <p className="text-muted-foreground mt-1">Discover our wide range of courses</p>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses..." 
              className="pl-10 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1 bg-muted/10 rounded-lg border">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setSelectedCategory("all")}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md py-1.5"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  All Courses
                </TabsTrigger>
                <TabsTrigger 
                  value="featured" 
                  onClick={() => setSelectedCategory("all")}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md py-1.5"
                >
                  <Star className="h-4 w-4 mr-2" fill="currentColor" />
                  Featured
                </TabsTrigger>
                <TabsTrigger 
                  value="popular" 
                  onClick={() => setSelectedCategory("all")}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md py-1.5"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Popular
                </TabsTrigger>
                <TabsTrigger 
                  value="new" 
                  onClick={() => setSelectedCategory("all")}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md py-1.5"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New
                </TabsTrigger>
              </TabsList>
              
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <select 
                    className="appearance-none bg-background border rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {categories.filter(cat => cat !== "all").map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                
                <div className="relative">
                  <select 
                    className="appearance-none bg-background border rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  >
                    <option value="all">All Levels</option>
                    {levels.filter(lvl => lvl !== "all").map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-6">
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="featured" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCourses.filter(course => course.isFeatured).map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCourses.filter(course => course.isPopular).map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="new" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Show the 3 most recent courses */}
                {mockCourses.slice(0, 3).map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}