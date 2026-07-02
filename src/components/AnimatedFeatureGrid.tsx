'use client';

import { motion } from 'framer-motion';

interface AnimatedFeatureGridProps {
  features: string[];
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0 },
};

export default function AnimatedFeatureGrid({ features }: AnimatedFeatureGridProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-x-10 mb-12">
      {features.map((text, i) => (
        <motion.div
          key={text}
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.5,
            delay: i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-baseline border-t border-[#e5e7eb] py-3.5"
        >
          <span className="text-[14px] font-medium text-[#1f2937]">{text}</span>
        </motion.div>
      ))}
    </div>
  );
}
