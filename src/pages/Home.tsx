import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import AboutSection from '../components/AboutSection';
import SkillSection from '../components/SkillSection';
import ContactSection from '../components/ContactSection';
import { Project } from '../types';
import { subscribeToProjects } from '../services/firebaseService';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToProjects((data) => {
      // Show all projects on home section
      setProjects(data);
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
      
      {/* Works Section */}
      <section id="works" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-24">
            <div className="max-w-2xl">
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-4 inline-block">
                Selected Works
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                문제 해결을 통한<br />
                <span className="text-accent">가치 있는</span> 디자인 결과물
              </h2>
            </div>
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

      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Skills Section */}
      <section id="skills">
        <SkillSection />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactSection />
      </section>
    </motion.div>
  );
}
