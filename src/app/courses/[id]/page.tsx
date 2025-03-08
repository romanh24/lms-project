"use client";

import { useState, use } from "react";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { mockCourses } from "@/lib/data/courses";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "@/lib/context/auth-context";
import { toast } from "sonner";
import Image from "next/image";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useAuth();
  const courseId = use(params);
  const [isLoading, setIsLoading] = useState(false);
  const course = mockCourses.find(c => c.id === courseId.id);
  const isEnrolled = user?.enrolledCourses.includes(courseId.id);

  const handleEnrollment = async () => {
    if (!user) {
      toast.error("Please sign in to enroll in courses");
      return;
    }

    if (isEnrolled) {
      toast.info("You are already enrolled in this course");
      return;
    }

    try {
      setIsLoading(true);
      const stripe = await stripePromise;
      
      if (!stripe) throw new Error("Stripe failed to initialize");

      // Create Stripe checkout session
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: course?.id,
          price: course?.price,
          title: course?.title,
          userId: user.id,
        }),
      });

      const { sessionId } = await response.json();
      
      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to process enrollment");
    } finally {
      setIsLoading(false);
    }
  };

  if (!course) return null;

  return (
    <MainLayout>
      <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="mb-6">
          <Link href="/courses" className="text-muted-foreground hover:text-foreground flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Courses
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-muted-foreground mb-4">by {course.instructor}</p>
            
            {course.isFeatured && (
              <div className="inline-block bg-blue-500 text-white text-sm px-2 py-1 rounded-md mb-4">
                Featured
              </div>
            )}

            <Card className="overflow-hidden mb-6">
              <div className="relative w-full h-[400px]">
                <Image 
                  src={course?.image || ""} 
                  alt={course?.title || "Course image"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Card>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">About this course</h2>
                <p className="text-muted-foreground">{course.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">What you&apos;ll learn</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Comprehensive understanding of key concepts</li>
                  <li>Practical skills applicable to real-world scenarios</li>
                  <li>Advanced techniques for problem-solving</li>
                  <li>Industry best practices and standards</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <Card className="p-6 sticky top-24 z-50">
              <div className="space-y-4">
                <div>
                  <span className="text-3xl font-bold">${course.price}</span>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleEnrollment}
                  disabled={isLoading || isEnrolled}
                >
                  {isLoading ? "Processing..." : isEnrolled ? "Already Enrolled" : "Enroll Now"}
                </Button>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Students</span>
                    <span className="font-medium">{course.students} enrolled</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{course.category}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 