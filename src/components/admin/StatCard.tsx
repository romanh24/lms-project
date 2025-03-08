"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  percentChange: number;
  color: {
    from: string;
    to: string;
    text: string;
  };
  isLoaded: boolean;
  counterDuration?: number;
  delay?: number;
  suffix?: string;
  progressBar?: boolean;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  percentChange,
  color,
  isLoaded,
  counterDuration = 1000,
  delay = 100,
  suffix = "",
  progressBar = false
}: StatCardProps) {
  return (
    <Card 
      className={`group overflow-hidden border-none shadow-md transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-${color.from} to-${color.to} group-hover:w-2 transition-all duration-300`}></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className={`rounded-full bg-${color.from}-50 p-2 group-hover:bg-${color.from}-100 transition-all duration-300`}>
          <Icon className={`h-4 w-4 text-${color.text} group-hover:animate-[pulse_1.5s_ease-in-out_infinite]`} />
        </div>
      </CardHeader>
      <CardContent>
        {progressBar ? (
          <div className="flex items-center gap-2">
            <div className={`text-2xl font-bold text-${color.text}`}>
              {isLoaded ? <Counter end={value} duration={counterDuration} /> : 0}{suffix}
            </div>
            <div className={`h-2 w-full bg-${color.from}-50 rounded-full overflow-hidden`}>
              <div 
                className={`h-full bg-gradient-to-r from-${color.from} to-${color.to} rounded-full transition-all duration-1000 ease-out ${isLoaded ? '' : 'w-0'}`}
                style={{ width: isLoaded ? `${value}%` : '0%' }}
              ></div>
            </div>
          </div>
        ) : (
          <div className={`text-2xl font-bold text-${color.text}`}>
            {isLoaded ? <Counter end={value} duration={counterDuration} /> : 0}{suffix}
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          <span className="text-green-500 font-medium">↑ {percentChange}%</span> from last month
        </p>
      </CardContent>
    </Card>
  );
}

// Counter component for animated numbers
function Counter({ end, duration = 1000, className = "" }: { end: number; duration?: number; className?: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (end === 0) {
      setCount(0);
      return;
    }
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      countRef.current = Math.floor(percentage * end);
      setCount(countRef.current);
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration]);
  
  return <span className={className}>{count.toLocaleString()}</span>;
} 