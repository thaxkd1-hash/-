import { motion } from 'motion/react';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-4 inline-block">
              Get in Touch
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12 leading-tight">
              <span className="text-accent">뉴비졔졔</span>와 함께 가치 있는<br />
              결과를 만들어볼까요?
            </h2>
            <p className="text-lg text-white/60 font-light leading-relaxed mb-12">
              프로젝트 문의나 협업 제안은 언제든 환영합니다.<br />
              빠르게 확인 후 답변드리겠습니다.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:design@example.com"
                className="flex items-center gap-6 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Email</p>
                  <p className="text-xl font-medium">design@example.com</p>
                </div>
              </a>
              <a
                href="tel:010-1234-5678"
                className="flex items-center gap-6 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Phone</p>
                  <p className="text-xl font-medium">010-1234-5678</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="p-12 rounded-3xl bg-card border border-white/5"
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Name</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-accent focus:outline-none transition-colors"
                    placeholder="성함을 입력해주세요"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Email</label>
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-accent focus:outline-none transition-colors"
                    placeholder="이메일을 입력해주세요"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Message</label>
                <textarea
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-accent focus:outline-none transition-colors resize-none"
                  placeholder="문의 내용을 입력해주세요"
                />
              </div>
              <button
                type="submit"
                className="w-full group flex items-center justify-center gap-3 bg-accent text-white px-8 py-5 rounded-xl font-bold hover:bg-accent/80 transition-all duration-300"
              >
                메시지 보내기
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
