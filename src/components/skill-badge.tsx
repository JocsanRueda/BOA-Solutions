import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Skill {
  name: string;
  description?: string;
  color?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SkillBadgeProps {
  skill: Skill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm
                      ${skill.color ?? "bg-gray-800 text-gray-300"} 
                      hover:opacity-90 transition-opacity cursor-default`}>
            {skill.icon && <skill.icon className="h-3.5 w-3.5 mr-1" />}
            {skill.name}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{skill.description ?? `Habilidad: ${skill.name}`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}