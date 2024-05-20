"use client";
import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface AnimatedCounterProps {
  count: number,
  classNameText: string,
  classNameDiv: string,
  delayAmount: number,
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  count,
  classNameText,
  classNameDiv,
  delayAmount,
}) => {
  const countValue = useMotionValue(0);
  const rounded = useTransform(countValue, Math.round);

  useEffect(() => {
    const animation = animate(countValue, count, {
      duration: 2, delay:delayAmount
    });

    return () => {
      animation.stop();
    };
  }, [count, countValue, delayAmount]);

  return (
    <div className={classNameDiv}>
        <motion.h1 className={classNameText}>
          {rounded} 
        </motion.h1>
    </div>
  );
};

export default AnimatedCounter;
