import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useState } from "react";
import { iconItem } from "@/common/types/cards";
import { createPortal } from "react-dom";

export interface IconTooltipProps {
  item: iconItem;
  className?: string;
  classNameIcon?: string;
  hoveredActive?: boolean;
}

export function IconTooltip({item,className,classNameIcon,hoveredActive=true}:IconTooltipProps) {
  const IconComponent = item.icon;
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => { setHovered(true); };
  const handleMouseLeave = () => { setHovered(false); };
  const handleTouchStart = () => { setHovered(true); };
  const handleTouchEnd = () => { setHovered(false); };
  return<>
 
    <TooltipProvider >
      <Tooltip delayDuration={1} open={hovered}  >
        <TooltipTrigger onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd} className={cn(className)}><IconComponent className={cn("p-1 rounded transition-colors ",hoveredActive && " hover:text-white dartk:hover:text-white",
            hovered && item.color,classNameIcon,
          )} size={28} onMouseEnter={()=>{ setHovered(true); }} onMouseLeave={()=>{ setHovered(false); } } /></TooltipTrigger>
        {
          hovered && createPortal(
            <TooltipContent  side="top"
              sideOffset={6} >
              <p className="bg-sidebar border rounded px-1 font-light text-black dark:text-white ">{item.name}</p>
            </TooltipContent>,
            document.body
          )
        }
      </Tooltip>
    </TooltipProvider>

  </>
}