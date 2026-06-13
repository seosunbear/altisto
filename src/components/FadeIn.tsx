'use client';

import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 24,
}: FadeInProps) {
  const initial: Record<string, number> = { opacity: 0 };
  if (direction === 'up')    initial.y =  distance;
  if (direction === 'down')  initial.y = -distance;
  if (direction === 'left')  initial.x =  distance;
  if (direction === 'right') initial.x = -distance;

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
