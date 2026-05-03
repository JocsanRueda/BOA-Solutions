import { motion } from "framer-motion";

export function AboutUs() {
  return (
    <div className="h-full w-full max-w-5xl mx-auto flex flex-col justify-center gap-10 my-10 md:my-32 px-5">
      <div className="text-center md:text-left text-gray-900 dark:text-white">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Quiénes Somos</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
          Somos un equipo joven y apasionado, comprometido en llevar tecnología práctica a empresas que quieren crecer sin complicarse.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/40 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-white/10 p-8 rounded-2xl hover:border-gray-300 dark:hover:border-white/20 transition-colors"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Nuestro Enfoque</h2>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
            Nos tomamos el tiempo de entender tu negocio antes de escribir una sola línea de código. Creemos que la mejor tecnología es la que resuelve problemas reales de manera simple y confiable.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-teal-50/40 dark:bg-teal-900/10 backdrop-blur-md border border-teal-200 dark:border-teal-500/20 p-8 rounded-2xl hover:border-teal-300 dark:hover:border-teal-500/40 transition-colors"
        >
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-4">Lo Que Ofrecemos</h2>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
            Desarrollamos <span className="text-teal-600 dark:text-teal-300">soluciones de automatización e IA</span> adaptadas a tu realidad: sin costos innecesarios, sin promesas vacías. Solo herramientas que realmente funcionan para tu equipo.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutUs;
