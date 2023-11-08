import { motion } from "framer-motion";
import React from "react";

interface AnimatedWord {
  word: string;
  delay: number;
}

interface AnimatedTextProps {
  content: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ content }) => {
  const getAnimatedWords = (content: string): AnimatedWord[] => {
    const wordArray = content.split(" ");
    return wordArray.map((word, idx) => ({
      word,
      delay: idx * 0.0001,
    }));
  };

  const animatedWords = getAnimatedWords(content);

  return (
    <>
      {animatedWords.map((w, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: w.delay }}
        >
          {w.word}{" "}
        </motion.span>
      ))}
    </>
  );
};

export default AnimatedText;
