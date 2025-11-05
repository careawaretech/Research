import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from "@/hooks/useAdmin";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SectionTagBadgeProps {
  sectionTag: string;
  adminPath: string;
  enabled?: boolean;
}

export const SectionTagBadge = ({ 
  sectionTag, 
  adminPath, 
  enabled = true 
}: SectionTagBadgeProps) => {
  const { isAdmin, loading } = useAdmin();
  const navigate = useNavigate();

  if (loading || !isAdmin) {
    return null;
  }

  const handleClick = () => {
    if (enabled) {
      navigate(adminPath);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            onClick={handleClick}
            className={`
              absolute top-4 right-4 z-50 
              flex items-center gap-1.5 
              bg-primary/90 text-primary-foreground
              hover:bg-primary
              cursor-pointer
              transition-all duration-200
              hover:scale-105
              text-xs
              px-3 py-1.5
              ${!enabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <Pencil className="w-3 h-3" />
            <span>{sectionTag}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{enabled ? `Edit ${sectionTag}` : 'Admin panel coming soon'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
