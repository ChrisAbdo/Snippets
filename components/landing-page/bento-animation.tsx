"use client";

import { motion } from "framer-motion";
import React from "react";
import { Bento } from "./bento";

export default function BentoAnimation() {
  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.6,
          },
        },
      }}
    >
      <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
        <Bento />
      </motion.div>
    </motion.div>
  );
}
