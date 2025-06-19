/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const AnimatedButton = ({
  children,
  className = "",
  hoverScale = 1.05,
  tapScale = 0.95,
  ...props
}) => {
  return (
    <motion.button
      className={className}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
