import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Project } from '../types';
import { getProject } from '../services/firebaseService';
import ReactMarkdown from 'react-markdown';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getProject(id).then((data) => {
        setProject(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Project not found</h1>
          <Link to="/" className="text-accent hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-accent transition-colors mb-12 uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-3xl">
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-4 inline-block">
                {project.category}
              </span>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                {project.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed">
                {project.overview}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-32 border border-white/5">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-32">
          <div className="lg:col-span-4 space-y-16">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-6">Problem</h3>
              <p className="text-lg text-white/80 font-light leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-6">Goal</h3>
              <p className="text-lg text-white/80 font-light leading-relaxed">
                {project.goal}
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-8 space-y-24">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-8">Design Process</h3>
              <div className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown>{project.process}</ReactMarkdown>
              </div>
            </div>
            
            <div className="p-12 rounded-3xl bg-accent/5 border border-accent/20">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-8">The Result</h3>
              <p className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                {project.result}
              </p>
            </div>

            {/* Project Gallery */}
            {project.images && project.images.length > 0 && (
              <div className="space-y-12 pt-12">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-8">Project Gallery</h3>
                <div className="grid grid-cols-1 gap-12">
                  {project.images.map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="rounded-3xl overflow-hidden border border-white/5 bg-white/5"
                    >
                      <img src={img} alt={`${project.title} gallery ${idx + 1}`} className="w-full h-auto" referrerPolicy="no-referrer" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="pt-20 border-t border-white/5 flex items-center justify-between">
          <button className="text-white/40 hover:text-white transition-colors flex items-center gap-4 group">
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
            <span className="text-sm uppercase tracking-[0.2em]">Previous Project</span>
          </button>
          <button className="text-white/40 hover:text-white transition-colors flex items-center gap-4 group">
            <span className="text-sm uppercase tracking-[0.2em]">Next Project</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
