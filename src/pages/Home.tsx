import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import { Project } from '../types';
import { subscribeToProjects } from '../services/firebaseService';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToProjects((data) => {
      // Show only featured or first 3 projects on home
      setProjects(data.slice(0, 3));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      {/* Works Preview Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-24">
            <div className="max-w-2xl">
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-4 inline-block">
                Featured Works
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                문제 해결을 통한<br />
                <span className="text-accent">가치 있는</span> 디자인 결과물
              </h2>
            </div>
            <Link 
              to="/works"
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent hover:text-white transition-colors group"
            >
              View All Works
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-white/40">
              등록된 프로젝트가 없습니다.
            </div>
          )}
        </div>
      </section>

      {/* Quick About Link */}
      <section className="py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8">
            함께 더 나은 경험을 만들어갈<br />
            파트너를 찾고 계신가요?
          </h2>
          <Link
            to="/about"
            className="inline-flex items-center gap-3 bg-accent text-white px-10 py-4 rounded-full font-bold hover:bg-accent/80 transition-all"
          >
            뉴비졔졔에 대해 알아보기
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
