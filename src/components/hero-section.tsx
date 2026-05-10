import { routeEnum } from "@/common/enum/route.enum";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/context/active-section.context";
import { m } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { scroller } from "react-scroll";

export default function HeroSection() {
  const { setActiveSection } = useActiveSection();

  const handleClick = (section: string) => {
    const newActiveSection = {
      activeSection: section,
      previousSection: routeEnum.HOME,
    };
    setActiveSection(newActiveSection);

    scroller.scrollTo(section, {
      duration: 500,
      smooth: true,
      offset: -41,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 dark:text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/10 dark:bg-teal-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center relative z-10">

        {/* Content */}
        <m.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 w-fit">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <p className="text-sm font-medium text-teal-700 dark:text-teal-300">
              Tecnología al alcance de tu empresa
            </p>
          </div>

          <h1 className="text-5xl lg:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 leading-[1.1] pb-2">
            BOA Solutions
          </h1>

          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Impulsa el crecimiento de tu negocio con soluciones de IA a medida y procesos optimizados, sin fricciones.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Button
              className="bg-teal-500 text-white font-semibold hover:bg-teal-600 dark:bg-teal-400 dark:text-black dark:hover:bg-teal-300 rounded-md px-8 py-6 text-lg transition-[background-color,box-shadow] shadow-lg hover:shadow-teal-500/25 flex items-center gap-2 group"
              onClick={() => { handleClick(routeEnum.SERVICES); }}
              type="button" 
            >
              Descubrir Servicios
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <button
              onClick={() => { handleClick(routeEnum.CONTACT); }}
              className="p-4 rounded-md bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-[background-color,opacity]"
              aria-label="Contáctanos"
            >
              <Mail className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 pt-8 border-t border-gray-200 dark:border-white/10 w-full max-w-2xl">
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">100%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Dedicación al cliente</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">A medida</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Cada solución</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">Ágil</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Nuestro proceso</p>
            </div>
          </div>
        </m.div>

      </div>
    </div>
  );
}