export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  images: string[];
  overview: string;
  problem: string;
  goal: string;
  process: string;
  result: string;
  tools: string[];
  featured: boolean;
  createdAt: number;
}

export interface Skill {
  name: string;
  description: string;
  icon: string;
}
