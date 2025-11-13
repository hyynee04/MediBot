import { type ReactNode } from 'react';
interface FeatureCardProps {
    title: string;
    description: string;
    icon: ReactNode; // Sử dụng ReactNode cho icon (vì nó là JSX)
}
const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
    <div className="p-6 bg-white rounded-lg shadow-lg text-center">
        <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-background-white text-primary-purple">
            {icon}
        </div>
        <h3 className="text-lg font-semibold text-primary-black mb-2">{title}</h3>
        <p className="text-sm text-primary-grey">{description}</p>
    </div>
);

export default FeatureCard