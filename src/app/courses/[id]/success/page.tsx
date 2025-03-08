"use client";

import { useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/context/auth-context";

export default function SuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const courseId =  use(params)
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const updateUserEnrollment = async () => {
      if (user && sessionId) {
        try {
          // Update user's enrolled courses in Firestore
          const userRef = doc(db, "users", user.id);
          await updateDoc(userRef, {
            enrolledCourses: arrayUnion(courseId.id)
          });
        } catch (error) {
          console.error("Error updating enrollment:", error);
        }
      }
    };

    updateUserEnrollment();
  }, [user, courseId, sessionId]);

  return (
    <MainLayout>
      <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Enrollment Successful!</CardTitle>
            <CardDescription>
              Thank you for enrolling in the course. You can now access all course materials.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Your enrollment has been confirmed and you can start learning right away.
              </p>
              <p className="text-sm text-muted-foreground">
                Check your email for additional information about the course.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => router.push(`/courses/${courseId.id}`)}
                variant="outline"
              >
                View Course
              </Button>
              <Button
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
} 