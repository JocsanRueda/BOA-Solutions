import CardSkill from "@/components/card-skill";
import { data } from "@/data/skills/skills.data";
import { motion, Variants } from "framer-motion";

export function Services() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemAnim: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="h-full w-full max-w-7xl mx-auto flex flex-col justify-center gap-12 my-10 md:my-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left mb-4 text-gray-900 dark:text-white"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-md bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 w-fit">
          <span className="w-2 h-2 rounded-full bg-cyan-500" />
          <p className="text-sm font-medium text-teal-700 dark:text-teal-300">
            Nuestras Soluciones
          </p>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">Servicios</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg leading-relaxed">
          Soluciones tecnológicas de vanguardia diseñadas para potenciar y escalar tu negocio mediante la automatización y la inteligencia artificial.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
      >
        {
          data.map((item) => (
            <motion.div key={item.title} variants={itemAnim} className="h-full">
              <CardSkill
                id={item.id}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                footer={item.footer}
                className="h-full transition-all duration-300"
                lineColor={item.lineColor}
                stack={item.stack}
              />
            </motion.div>
          ))
        }
      </motion.div>
    </div>
  );
}

export default Services;