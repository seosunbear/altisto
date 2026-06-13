'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Feature {
  icon: ReactNode;
  text: string;
}

interface AnimatedFeatureGridProps {
  features: Feature[];
}

const itemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1 },
};

export default function AnimatedFeatureGrid({ features }: AnimatedFeatureGridProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-2.5 mb-8">
      {features.map((f, i) => (
        <motion.div
          key={f.text}
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.42,
            delay: i * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-center gap-2 px-4 py-3"
        >
          {f.icon}
          <span className="text-[12px] font-medium text-[#374151]">{f.text}</span>
        </motion.div>
      ))}
    </div>
  );
}
