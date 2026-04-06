import { Project, Skill } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-commerce Redesign',
    category: 'Web Design',
    thumbnail: 'https://picsum.photos/seed/ecommerce/1200/800',
    images: [],
    overview: 'A complete overhaul of a luxury fashion e-commerce platform.',
    problem: 'Low conversion rates and high bounce rates on mobile devices.',
    goal: 'Improve mobile UX and increase conversion by 20%.',
    process: 'User research, wireframing, high-fidelity prototyping, and A/B testing.',
    result: 'Conversion rate increased by 25% and mobile engagement doubled.',
    tools: ['Photoshop', 'Illustrator', 'Figma'],
    featured: true,
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'Game Intro Animation',
    category: 'Motion Graphics',
    thumbnail: 'https://picsum.photos/seed/game/1200/800',
    images: [],
    overview: 'Cinematic intro for an upcoming indie RPG.',
    problem: 'The previous intro lacked impact and didn\'t convey the game\'s atmosphere.',
    goal: 'Create a 30-second high-energy intro that captures the dark fantasy mood.',
    process: 'Storyboarding, asset creation, animation in After Effects, and sound design.',
    result: 'The intro received 100k+ views on YouTube and boosted pre-orders.',
    tools: ['After Effects', 'Premiere', 'Photoshop'],
    featured: true,
    createdAt: Date.now() - 10000,
  },
  {
    id: '3',
    title: 'Corporate Brand Identity',
    category: 'Graphic Design',
    thumbnail: 'https://picsum.photos/seed/brand/1200/800',
    images: [],
    overview: 'Rebranding for a tech startup focusing on sustainable energy.',
    problem: 'The brand felt outdated and didn\'t resonate with modern eco-conscious investors.',
    goal: 'Develop a modern, clean, and trustworthy brand identity.',
    process: 'Market analysis, mood boarding, logo design, and brand guidelines creation.',
    result: 'The new identity helped secure $5M in Series A funding.',
    tools: ['Illustrator', 'Photoshop'],
    featured: true,
    createdAt: Date.now() - 20000,
  },
  {
    id: '4',
    title: '(주)유니콘 박람회 홍보 카달로그',
    category: 'Graphic Design',
    thumbnail: 'https://picsum.photos/seed/unicorn/1200/800',
    images: [],
    overview: '강릉 소재 축산 보조제 전문 기업 (주)유니콘의 박람회 홍보용 카달로그 디자인입니다.',
    problem: '기존 축산 제품 카달로그의 딱딱한 이미지에서 벗어나, 젊고 혁신적인 기업 이미지를 전달해야 했습니다.',
    goal: '친근한 일러스트와 깔끔한 레이아웃을 통해 제품의 기능성을 효과적으로 전달하고 브랜드 신뢰도를 높이는 것.',
    process: '1. 컨셉 설정: "축산업계의 새로운 기준" 슬로건 시각화\n2. 비주얼 디자인: 친근한 가축 캐릭터 일러스트 및 현대적 타이포그래피 적용\n3. 정보 구조화: 복잡한 성분표를 도표와 아이콘으로 직관적 재구성\n4. 컬러 코딩: 제품군별 고유 컬러를 지정하여 정보 탐색 용이성 증대',
    result: '박람회 현장에서 세련된 디자인으로 주목받았으며, 기업의 전문성과 혁신성을 성공적으로 어필했습니다.',
    tools: ['Illustrator', 'InDesign', 'Photoshop'],
    featured: true,
    createdAt: Date.now(),
  },
];

export const SKILLS: Skill[] = [
  {
    name: 'UI Design',
    description: 'User-centered interfaces that balance aesthetics and usability.',
    icon: 'Layout',
  },
  {
    name: 'Web Design',
    description: 'Responsive and high-performance web layouts optimized for conversion.',
    icon: 'Globe',
  },
  {
    name: 'Banner & Ad Design',
    description: 'Eye-catching marketing materials that drive engagement.',
    icon: 'Image',
  },
  {
    name: 'Video Editing',
    description: 'Dynamic motion graphics and cinematic video production.',
    icon: 'Video',
  },
];

export const TOOLS = [
  { name: 'Illustrator', level: 95 },
  { name: 'Photoshop', level: 90 },
  { name: 'After Effects', level: 85 },
  { name: 'Premiere', level: 80 },
];
