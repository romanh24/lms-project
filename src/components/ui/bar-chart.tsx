"use client";

import { cn } from "@/lib/utils";

interface BarChartProps {
  data: { month: string; enrollments: number }[];
  className?: string;
}

export function BarChart({ data, className }: BarChartProps) {
  const maxEnrollment = Math.max(...data.map(item => item.enrollments));

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="relative h-[200px] w-full overflow-hidden">
        <div className="flex items-end gap-2 w-full">
          {data.map(item => (
            <div
              key={item.month}
              className="flex-1 group"
            >
              <div
                className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-purple-500 rounded-t-md transition-colors duration-300 group-hover:from-purple-500 group-hover:to-purple-400"
                style={{
                  height: `${(item.enrollments / maxEnrollment) * 100}%`,
                  width: `calc(100% / ${data.length} - 8px)`,
                }}
              />
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium">{item.enrollments}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        {data.map(item => (
          <div key={item.month} className="flex-1 text-center">
            <span className="text-sm text-muted-foreground">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 