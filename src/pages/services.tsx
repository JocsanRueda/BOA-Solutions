import CardSkill from "@/components/card-skill";
import { data } from "@/data/skills/skills.data";
import { motion } from "framer-motion";

export function Services() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="h-full w-full max-w-6xl mx-auto flex flex-col justify-center gap-10 my-10 md:my-32 px-5">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center md:text-left mb-8 text-gray-900 dark:text-white"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Servicios</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
          Soluciones tecnológicas de vanguardia diseñadas para potenciar y escalar tu negocio mediante la automatización y la inteligencia artificial.
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
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
                className="h-full opacity-90 hover:opacity-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-500/10"
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