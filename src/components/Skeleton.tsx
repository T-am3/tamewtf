import React from 'react';

interface SkeletonProps {
  className?: string;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', lines = 1 }) => {
  if (lines === 1) {
    return (
      <div className={`animate-pulse bg-gray-700/30 rounded ${className}`} />
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-gray-700/30 rounded ${className}`}
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
};

export const BlogPostSkeleton: React.FC = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <div className="space-y-2 mt-6">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
);

export const ProjectSkeleton: React.FC = () => (
  <div className="space-y-4">
    <Skeleton className="h-64 w-full rounded-lg" />
    <Skeleton className="h-6 w-2/3" />
    <Skeleton className="h-4 w-full" lines={3} />
    <div className="flex space-x-2 mt-4">
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-14" />
    </div>
  </div>
);