import { routeEnum } from "@/common/enum/route.enum";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/context/active-section.context";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { scroller } from "react-scroll";
import { IconTooltip } from "./icon-tooltip";

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
    <div className="min-h-screen flex items-center justify-center p-4 dark:text-white">
      <div className="max-w-2xl">
        <p className="text-sm consolas-font dark:text-teal-300">
          Tecnología al alcance de tu empresa
          <motion.span
            className="inline-block"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.9,
            }}
          >
            _
          </motion.span>
        </p>

        <h1 className="text-5xl lg:text-8xl font-bold mt-2 tracking-tighter">BOA Solutions</h1>

        <div className="text-balance">
          <p className="lg:text-2xl mt-2 dark:text-gray-400">
            Ayudamos a tu negocio a crecer con <span className="inline-block dark:text-teal-300">automatización práctica</span> y soluciones de IA a medida.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="mt-6 flex flex-wrap gap-6">
          <div className="text-center">
            <motion.p
              className="text-3xl font-bold dark:text-teal-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              100%
            </motion.p>
            <p className="text-sm dark:text-gray-400">Dedicación al cliente</p>
          </div>

          <div className="text-center">
            <motion.p
              className="text-3xl font-bold dark:text-teal-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            >
              A medida
            </motion.p>
            <p className="text-sm dark:text-gray-400">Cada solución</p>
          </div>

          <div className="text-center">
            <motion.p
              className="text-3xl font-bold dark:text-teal-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.4 }}
            >
              Ágil
            </motion.p>
            <p className="text-sm dark:text-gray-400">Nuestro proceso</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <Button
            className="bg-teal-400 text-black font-bold hover:bg-teal-500 dark:bg-teal-300 border-none px-8 py-6 text-lg"
            onClick={() => handleClick(routeEnum.SERVICES)}
            name="services-button"
          >
            Ver Servicios
          </Button>

          <div className="flex gap-1 items-center">

            <a className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-teal-500 transition-colors cursor-pointer" onClick={() => handleClick(routeEnum.CONTACT)}>
              <IconTooltip item={{ icon: Mail, name: "Contáctanos", color: "teal" }} classNameIcon="mt-1" hoveredActive={false} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}