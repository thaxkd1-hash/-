import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative"
    >
      <Link to={`/project/${project.id}`} className="block overflow-hidden rounded-2xl bg-card border border-white/5">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white text-bg flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
              <ArrowUpRight className="w-8 h-8" />
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              {project.category}
            </span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              {project.tools.join(', ')}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-white/60 font-light leading-relaxed line-clamp-2">
            {project.overview}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
