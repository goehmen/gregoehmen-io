interface ServiceCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
  }
  
  export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
    return (
      <div className="group p-6 bg-card rounded-xl border border-white/10 hover:border-accent-teal/50 transition-all duration-300">
        {icon && (
          <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-gradient-to-br from-accent-teal/20 to-accent-blue/20 text-accent-teal">
            {icon}
          </div>
        )}
        
        <h3 className="text-xl font-semibold mb-3 group-hover:text-accent-teal transition-colors">
          {title}
        </h3>
        
        <p className="text-foreground-secondary leading-relaxed">
          {description}
        </p>
      </div>
    );
  }