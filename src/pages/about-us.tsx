import { m } from "framer-motion";
import Lottie from "lottie-react";
import aboutLottie from "@/assets/lotties/about.json";

export function AboutUs() {

  return (
    <div className="h-full w-full max-w-7xl mx-auto flex flex-col justify-center gap-12 my-10 md:my-32 px-6 relative">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Text */}
        <div className="text-left text-gray-900 dark:text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-md bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 w-fit">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <p className="text-sm font-medium text-teal-700 dark:text-teal-300">
              Nuestro Propósito
            </p>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Quiénes <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">Somos</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl text-lg leading-relaxed">
            Somos un equipo joven y apasionado, comprometido en llevar tecnología práctica a empresas que quieren crecer sin complicarse.
          </p>
        </div>

        {/* Right Lottie */}
        <m.div
          className="flex justify-center items-center h-[300px] lg:h-[400px] relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Lottie
            animationData={aboutLottie}
            loop={true}
            className="w-full h-full max-w-[400px] drop-shadow-xl"
          />
        </m.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-gray-100 dark:border-white/10 p-10 rounded-md hover:border-gray-300 dark:hover:border-white/20 transition-all shadow-xl shadow-black/5 dark:shadow-none hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-md bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center mb-6">
            <span className="text-2xl text-teal-600 dark:text-teal-400">💡</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Nuestro Enfoque</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            Nos tomamos el tiempo de entender tu negocio antes de escribir una sola línea de código. Creemos que la mejor tecnología es la que resuelve problemas reales de manera simple y confiable.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-teal-50/80 to-cyan-50/80 dark:from-teal-900/20 dark:to-cyan-900/20 backdrop-blur-xl border border-teal-200 dark:border-teal-500/20 p-10 rounded-md hover:border-teal-300 dark:hover:border-teal-500/40 transition-all shadow-xl shadow-teal-500/5 hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-md bg-teal-500 dark:bg-teal-400 flex items-center justify-center mb-6 shadow-lg shadow-teal-500/30">
            <span className="text-2xl text-white dark:text-black">🚀</span>
          </div>
          <h2 className="text-3xl font-bold text-teal-800 dark:text-teal-300 mb-4">Lo Que Ofrecemos</h2>
          <p className="text-teal-900/80 dark:text-teal-100/70 leading-relaxed text-lg">
            Desarrollamos <strong className="font-semibold text-teal-700 dark:text-teal-200">soluciones de automatización e IA</strong> adaptadas a tu realidad: sin costos innecesarios, sin promesas vacías. Solo herramientas que realmente funcionan para tu equipo.
          </p>
        </m.div>
      </div>
    </div>
  );
}

export default AboutUs;
