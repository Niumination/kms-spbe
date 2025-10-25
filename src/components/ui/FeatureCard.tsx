import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
};

export function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  return (
    <article className="text-center">
      <div 
        className={`${colorClasses[color]} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </article>
  );
}
