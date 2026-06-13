'use client';

import { motion } from 'framer-motion';

const altiStats = [
  { value: '1,000+', label: '등록 크리에이터' },
  { value: '5,000+', label: '완료 프로젝트' },
  { value: '98%',    label: '고객 만족도' },
  { value: '24h',    label: '평균 매칭 시간' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  show:   { opacity: 1, y: 0,  scale: 1 },
};

const valueVariants = {
  hidden: { opacity: 0, y: 6 },
  show:   { opacity: 1, y: 0 },
};

export default function AltiStatsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-[#e5e7eb] bg-white p-7"
    >
      <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9ca3af]">
        플랫폼 현황
      </p>

      <div className="grid grid-cols-2 gap-4">
        {altiStats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.5,
              delay: 0.18 + i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-xl bg-white border border-[#e5e7eb] p-4"
          >
            <motion.p
              variants={valueVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: 0.32 + i * 0.09 }}
              className="text-[1.7rem] font-bold tracking-tight text-[#0d1117] leading-none mb-1.5"
            >
              {s.value}
            </motion.p>
            <p className="text-[11px] text-[#6b7280] font-medium">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, delay: 0.62 }}
        className="mt-5 rounded-xl bg-white border border-[#e5e7eb] p-4"
      >
        <p className="text-[12px] font-semibold text-[#1d4ed8] mb-1">매칭 속도 보장</p>
        <p className="text-[11px] leading-[1.7] text-[#4b5563]">
          요청 접수 후 영업일 기준 24시간 이내 크리에이터 매칭을 완료합니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
