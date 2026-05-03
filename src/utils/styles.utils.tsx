import { ColorType } from "@/common/types/color.type";

export function getDynamicColor(
  lineColor: ColorType,
  theme: string
) {
  const colors = {
    blue: theme === "light" ? "bg-blue-500" : "bg-blue-900",
    red: theme === "light" ? "bg-red-500" : "bg-red-900",
    green: theme === "light" ? "bg-green-500" : "bg-green-900",
    yellow: theme === "light" ? "bg-yellow-500" : "bg-yellow-900",
    purple: theme === "light" ? "bg-purple-500" : "bg-purple-900",
    orange: theme === "light" ? "bg-orange-500" : "bg-orange-900",
    pink: theme === "light" ? "bg-pink-500" : "bg-pink-900",
    teal: theme === "light" ? "bg-teal-500" : "bg-teal-900",
  };

  return colors[lineColor] || "bg-gray-600"; 
}