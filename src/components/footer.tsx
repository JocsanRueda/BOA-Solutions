import { Code2, Mail } from "lucide-react";
import { Link } from "react-scroll";
import { routeEnum } from "@/common/enum/route.enum";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-sm mt-20">
      <div className="max-w-6xl mx-auto px-5 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-teal-500" />
            <span className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white">
              BOA Solutions
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Automatización inteligente y soluciones IA de vanguardia.
          </p>
        </div>

        <div className="flex items-center gap-6">
          {/* <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a> */}
          <Link 
            to={routeEnum.CONTACT} 
            smooth={true} 
            duration={500}
            offset={35}
            className="text-gray-400 hover:text-teal-500 transition-opacity hover:opacity-80 cursor-pointer"
          >
            <Mail className="w-5 h-5" />
          </Link>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-white/10 py-6">
        <p className="text-center text-sm text-gray-500 dark:text-gray-500">
          © {currentYear} BOA Solutions. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
