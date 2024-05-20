import React from "react";
import AnimatedCounter from "./AnimatedCounter";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <motion.div
        className="flex flex-row text-4xl font-semibold"
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 1, delay: 0.5 },
        }}
        viewport={{ once: true }}
      >
        Welcome to{" "}
        <span className="text-slate-600 dark:text-yellow-300 ml-2">OMDb</span>
      </motion.div>
      <motion.div
        className="flex flex-row xl:text-xl text-center items-center font-semibold mt-6"
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 1, delay: 0.5 },
        }}
        viewport={{ once: true }}
      >
        Browse through
        <AnimatedCounter
          count={100}
          classNameText="text-xl text-slate-600 dark:text-yellow-300 mx-2 font-semibold"
          classNameDiv="flex flex-row justify-end items-end"
          delayAmount={2}
        />
        of your favourite movies
      </motion.div>
    </div>
  );
};

export default HeroSection;
