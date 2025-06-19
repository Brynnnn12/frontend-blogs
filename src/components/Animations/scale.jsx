/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const ScaleAnimation = ({
  children,
  initialScale = 0.8,
  duration = 0.5,
  delay = 0,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      initial={{ scale: initialScale, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: initialScale, opacity: 0 }}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScaleAnimation;
