'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const loadingContainer = 'flex space-x-1 justify-center items-center';
const loadingCircle = 'w-1 h-1 bg-current rounded-full';

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: '-50%',
  },
  end: {
    y: '50%',
  },
};

const loadingCircleTransition = {
  duration: 0.4,
  repeat: Infinity,
  repeatType: 'mirror' as const,
  ease: 'easeInOut',
};

export const ThreeDotsWave = ({ color }: { color?: string }) => {
  return (
    <motion.div
      className={loadingContainer}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.span
        className={cn(loadingCircle, color)}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        className={cn(loadingCircle, color)}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        className={cn(loadingCircle, color)}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  );
};
