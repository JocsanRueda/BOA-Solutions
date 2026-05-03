import { memo } from "react";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { IconTooltip } from "./icon-tooltip";
import { useTheme } from "./theme-provider";
import { getDynamicColor } from "@/utils/styles.utils";
import { skillType } from "@/data/skills/types/skill.type.data";

type CardProps = skillType & {

  className?: string;

};

const CardSkill = memo(function CardSkill({
  icon,
  title,
  subtitle,
  description,
  footer,
  lineColor = "blue",
  className = "",
  stack,
}: CardProps) {

  const { theme } = useTheme();

  const Icon = (icon as LucideIcon | IconType) || null;
  return (
    <div className={cn("bg-white/40 dark:bg-black/40 backdrop-blur-md text-gray-900 dark:text-white p-6 max-w-sm flex flex-col gap-5 justify-between border border-gray-200 dark:border-white/10 rounded-2xl transition-all duration-300", className)}>
      <CardHeader className="flex flex-row items-center gap-3">

        {Icon && <Icon size={36} />}
        <div className="flex flex-col">
          <CardTitle className="flex flex-col"><p className="z-10 text-2xl">{title}</p> <span className={cn("p-1.5 rounded shadow -mt-3 z-0  ",
            getDynamicColor(lineColor, theme)
          )}></span></CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-400 border-l-2 border-gray-300 dark:border-gray-500 pl-3">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 ">
        <p className="text-gray-700 dark:text-gray-300">{footer}</p>
        <div className="flex flex-wrap  gap-2.5">
          {
            stack?.map((item) => (
              <IconTooltip item={item} key={item.icon.name} classNameIcon={item.classNameIcon} />
            ))
          }
        </div>
      </CardFooter>
    </div>
  );
});

export default CardSkill;