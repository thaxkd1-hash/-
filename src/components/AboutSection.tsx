import { motion } from 'motion/react';
import { TOOLS } from '../constants';

export default function AboutSection() {
  return (
    <section id="about" className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-4 inline-block">
              About Me
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">
              <span className="text-accent">뉴비졔졔</span>의 디자인은 문제 해결의 과정입니다.
            </h2>
            <div className="space-y-8 text-lg text-white/60 font-light leading-relaxed">
              <p>
                단순히 시각적으로 아름다운 결과물을 만드는 것에 그치지 않고, 
                사용자의 행동을 유도하고 비즈니스 목표를 달성하는 최적의 솔루션을 고민합니다.
              </p>
              <p>
                웹 디자인부터 영상 편집까지 폭넓은 실무 경험을 바탕으로, 
                브랜드의 가치를 가장 효과적으로 전달할 수 있는 다양한 매체를 자유롭게 활용합니다.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">5+</h4>
                <p className="text-sm text-white/40 uppercase tracking-widest">Years Experience</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">100+</h4>
                <p className="text-sm text-white/40 uppercase tracking-widest">Projects Completed</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="p-12 rounded-3xl bg-card border border-white/5 relative z-10">
              <h3 className="text-2xl font-bold mb-12">Technical Proficiency</h3>
              <div className="space-y-10">
                {TOOLS.map((tool) => (
                  <div key={tool.name}>
                    <div className="flex justify-between mb-4">
                      <span className="text-sm font-medium tracking-widest uppercase">{tool.name}</span>
                      <span className="text-sm text-accent font-mono">{tool.level}%</span>
                    </div>
                    <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tool.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="h-full bg-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
