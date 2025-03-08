import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { mockCourses } from "@/lib/data/courses";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Home() {
  const featuredCourses = mockCourses.filter(course => course.isFeatured);
  
  return (
    <MainLayout>
      <section className="w-full py-6 md:py-12 lg:py-14 xl:py-14 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container px-4 md:px-8 lg:px-12 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                Welcome to LMS Platform
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-300">
                A modern learning management system for students and educators.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-4 md:py-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="container px-4 md:px-8 lg:px-12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Platform Statistics */}
            <div className="flex flex-col items-center text-center space-y-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Active Students</div>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Expert Instructors</div>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">1000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Available Courses</div>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Completion Rate</div>
            </div>
          </div>

          {/* Featured Courses Carousel */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  Featured Courses
                </h2>
                <p className="text-muted-foreground mt-1">
                  Explore our most popular and highly-rated courses
                </p>
              </div>
              <Link href="/courses">
                <Button variant="outline" className="hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200">
                  View All Courses
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <Link href={`/courses/${course.id}`} key={course.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative h-48 w-full bg-muted">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={true}
                      />
                      {course.isPopular && (
                        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-400">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={cn(
                          "bg-gradient-to-r bg-clip-text text-transparent",
                          course.level === "Beginner" ? "from-green-600 to-emerald-500" :
                          course.level === "Intermediate" ? "from-blue-600 to-indigo-500" :
                          "from-purple-600 to-indigo-500"
                        )}>
                          {course.level}
                        </Badge>
                        <Badge variant="outline" className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                          {course.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{course.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{course.students}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
