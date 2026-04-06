import { motion } from 'motion/react';
import { Layout, Globe, Image, Video } from 'lucide-react';
import { SKILLS } from '../constants';

const ICON_MAP: Record<string, any> = {
  Layout,
  Globe,
  Image,
  Video,
};

export default function SkillSection() {
  return (
    <section id="skills" className="py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-4 inline-block">
            Expertise
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            실무 중심의 <span className="text-accent">차별화된</span> 역량
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((skill, index) => {
            const Icon = ICON_MAP[skill.icon];
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group p-10 rounded-3xl border border-white/5 bg-card hover:border-accent/30 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
                <p className="text-white/50 font-light leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
