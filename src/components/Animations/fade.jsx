/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const FadeAnimation = ({
  children,
  duration = 0.5,
  delay = 0,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeAnimation;
