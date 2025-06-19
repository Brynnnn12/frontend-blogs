/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const ScrollReveal = ({
  children,
  threshold = 0.1,
  duration = 0.5,
  delay = 0,
  variant = "fade",
  distance = 50,
  className = "",
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold });
  const controls = useAnimation();

  const getVariants = () => {
    switch (variant) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case "slideUp":
        return {
          hidden: { y: distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case "slideDown":
        return {
          hidden: { y: -distance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case "slideLeft":
        return {
          hidden: { x: -distance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case "slideRight":
        return {
          hidden: { x: distance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case "scale":
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
