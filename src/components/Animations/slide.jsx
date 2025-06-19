/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const SlideAnimation = ({
  children,
  direction = "left",
  distance = 50,
  duration = 0.5,
  delay = 0,
  className = "",
  ...props
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: -distance, opacity: 0 };
      case "right":
        return { x: distance, opacity: 0 };
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      default:
        return { x: -distance, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={getInitialPosition()}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default SlideAnimation;
