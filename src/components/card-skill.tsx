import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { skillType } from "@/data/skills/types/skill.type.data";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { memo } from "react";
import { IconType } from "react-icons/lib";
import { IconTooltip } from "./icon-tooltip";

type CardProps = skillType & {
  className?: string;
};

const CardSkill = memo(function CardSkill({
  icon,
  title,
  subtitle,
  description,
  footer,
  className = "",
  stack,
}: CardProps) {

  const Icon = icon as LucideIcon | IconType;
  return (
    <div className={cn(
      "group relative overflow-hidden bg-white/60 dark:bg-black/40 backdrop-blur-xl text-gray-900 dark:text-white p-8 max-w-sm flex flex-col gap-5 justify-between border border-gray-200 dark:border-white/10 rounded-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/10 dark:hover:border-white/20",
      className
    )}>
      {/* Background subtle gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <CardHeader className="flex flex-row items-center gap-4 relative z-10 p-0 mb-2">
        <div className="w-12 h-12 rounded-md bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-300">
          <Icon size={24} />
        </div>
        <div className="flex flex-col">
          <CardTitle className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
            {title}
          </CardTitle>
          <CardDescription className="text-sm font-medium text-teal-600/80 dark:text-teal-400/80 uppercase tracking-wider mt-1">
            {subtitle}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-0 relative z-10 flex-grow">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
          {description}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 p-0 relative z-10 border-t border-gray-100 dark:border-white/10 pt-5">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-300">
          {footer}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {stack.map((item) => (
            <IconTooltip item={item} key={item.icon.name} classNameIcon={item.classNameIcon} />
          ))}
        </div>
      </CardFooter>
    </div>
  );
});

export default CardSkill;