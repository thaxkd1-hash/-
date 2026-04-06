import { motion } from 'motion/react';
import ContactSection from '../components/ContactSection';

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-20"
    >
      <ContactSection />
    </motion.div>
  );
}
