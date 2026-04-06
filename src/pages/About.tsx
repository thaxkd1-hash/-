import { motion } from 'motion/react';
import AboutSection from '../components/AboutSection';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-20"
    >
      <AboutSection />
    </motion.div>
  );
}
