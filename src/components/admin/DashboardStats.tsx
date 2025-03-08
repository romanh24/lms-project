"use client";

import { useState, useEffect } from "react";
import { Users, BookOpen, FileText, BarChart4 } from "lucide-react";
import { DashboardStats as DashboardStatsType } from "@/lib/types";
import { StatCard } from "./StatCard";

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-4 mb-8">
      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        icon={Users}
        percentChange={12}
        color={{ from: "indigo-600", to: "blue-500", text: "indigo-600" }}
        isLoaded={isLoaded}
        delay={100}
      />
      
      <StatCard
        title="Total Courses"
        value={stats.totalCourses}
        icon={BookOpen}
        percentChange={4}
        color={{ from: "blue-600", to: "blue-400", text: "blue-600" }}
        isLoaded={isLoaded}
        delay={200}
        counterDuration={800}
      />
      
      <StatCard
        title="Total Enrollments"
        value={stats.totalEnrollments}
        icon={FileText}
        percentChange={18}
        color={{ from: "sky-500", to: "blue-400", text: "sky-500" }}
        isLoaded={isLoaded}
        delay={300}
        counterDuration={1200}
      />
      
      <StatCard
        title="Completion Rate"
        value={stats.completionRate}
        icon={BarChart4}
        percentChange={5}
        color={{ from: "cyan-500", to: "blue-400", text: "cyan-500" }}
        isLoaded={isLoaded}
        delay={400}
        counterDuration={1500}
        suffix="%"
        progressBar={true}
      />
    </div>
  );
} 