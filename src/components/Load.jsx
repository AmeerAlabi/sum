import { BiLoaderCircle } from "react-icons/bi";
import { motion } from "framer-motion";

 export function Load() {
    return (
      <div className="flex justify-center items-center mt-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <BiLoaderCircle size={40} className="text-blue-500" />
        </motion.div>
      </div>
    );
  }
  