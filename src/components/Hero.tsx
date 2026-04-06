import { motion } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-semibold tracking-[0.2em] uppercase text-accent mb-8">
            Web & Graphic Designer
          </span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
            사용자 경험과 전환을<br />
            <span className="text-accent">디자인하는 뉴비졔졔</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-light leading-relaxed mb-12">
            단순히 아름다운 디자인을 넘어, 비즈니스 문제를 해결하고<br className="hidden md:block" />
            실질적인 결과를 만들어내는 전략적 디자인을 추구합니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#works"
              className="group flex items-center gap-3 bg-white text-bg px-8 py-4 rounded-full font-semibold hover:bg-accent hover:text-white transition-all duration-300"
            >
              대표 작업물 보기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-semibold">
              <Download className="w-5 h-5" />
              포트폴리오 PDF
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">Scroll</span>
        <div className="w-[1px] h-12 bg-linear-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
}
