import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }} // Durasi fade in/out diperpanjang
      aria-label="Loading Spinner"
      role="status"
    >
      {/* Overlay Background */}
      <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm" />

      {/* Spinner Container */}
      <motion.div
        className="flex flex-col items-center z-10"
        initial={{ y: -30 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 80,
          delay: 0.3,
        }}
      >
        {/* Spinner */}
        <motion.div
          animate={{ rotate: [0, 180, 360] }}
          transition={{
            repeat: Infinity,
            duration: 4, // Lebih lambat
            ease: "linear",
          }}
        >
          <HashLoader color="#3B82F6" size={60} speedMultiplier={0.4} />
        </motion.div>

        {/* Floating Dots */}
        <motion.div className="flex gap-2 mt-6">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 bg-blue-400 rounded-full"
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;
