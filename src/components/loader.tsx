import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-transparent">
      <div className="flex flex-col items-center gap-10">
        <div className="relative flex items-center justify-center w-24 h-24">
          {/* Ambient Glow */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-full h-full bg-teal-500/20 rounded-full blur-xl"
          />

          {/* Outer dashed ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute w-16 h-16 border border-dashed border-teal-500/40 rounded-full"
          />

          {/* Inner spinning arc */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute w-10 h-10 border-t-2 border-r-2 border-teal-400 rounded-full"
          />

          {/* Core dot */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 bg-teal-600 dark:bg-teal-300 rounded-full shadow-[0_0_10px_2px_rgba(45,212,191,0.6)]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-sm font-semibold tracking-[0.3em] text-gray-800 dark:text-gray-300 uppercase">
            Cargando
          </p>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-[1px] bg-teal-500 w-4"
            />

            <motion.div
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-[1px] bg-teal-500 w-4"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
