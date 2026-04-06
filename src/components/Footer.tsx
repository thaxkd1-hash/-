import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <Link to="/" className="text-2xl font-bold tracking-tighter hover:text-accent transition-colors">
              뉴비졔졔<span className="text-accent">.</span>
            </Link>
            <p className="mt-4 text-sm text-white/40 font-light tracking-widest uppercase">
              © 2026 뉴비졔졔 PORTFOLIO. ALL RIGHTS RESERVED.
            </p>
          </div>

          <div className="flex items-center gap-12">
            <a href="#" className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-accent transition-colors">Instagram</a>
            <a href="#" className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-accent transition-colors">Behance</a>
            <a href="#" className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-accent transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
