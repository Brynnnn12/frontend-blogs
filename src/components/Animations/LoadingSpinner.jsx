import { motion } from "framer-motion";

const LoadingSpinner = () => {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      },
    },
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [-5, 5, -5],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      {/* Spinner utama */}
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        variants={spinnerVariants}
        animate="animate"
      />

      {/* Text dengan animasi titik-titik */}
      <div className="flex items-center gap-1 text-gray-600">
        <span>Loading</span>
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            variants={dotVariants}
            initial="initial"
            animate="animate"
            custom={i}
            style={{ display: "inline-block" }}
          >
            .
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
