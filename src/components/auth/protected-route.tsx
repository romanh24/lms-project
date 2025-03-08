"use client";

import { useAuth } from "@/lib/context/auth-context";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, loading, isAdmin } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        window.location.href = "/auth/login";
      } else if (adminOnly && !isAdmin) {
        window.location.href = "/dashboard";
      }
    }
  }, [user, loading, isAdmin, adminOnly]);

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center p-4">
        <Skeleton className="h-12 w-[250px] mb-4" />
        <Skeleton className="h-4 w-[300px] mb-2" />
        <Skeleton className="h-4 w-[270px] mb-2" />
        <Skeleton className="h-4 w-[290px]" />
      </div>
    );
  }

  // If not loading and we have a user (and admin if required), render the children
  if (user && (!adminOnly || isAdmin)) {
    return <>{children}</>;
  }

  // Otherwise, render nothing while redirecting
  return null;
} 