
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  delay?: string;
}

const FeatureCard = ({ icon: Icon, title, description, gradient, delay = '0s' }: FeatureCardProps) => {
  return (
    <div 
      className="nami-card p-8 group animate-fade-in" 
      style={{ animationDelay: delay }}
    >
      <div className={`w-16 h-16 ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-600 text-lg leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
