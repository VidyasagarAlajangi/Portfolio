import certguard from '../assets/certguard.png';
import medconnect from '../assets/medconnect.png';

import arc from '../assets/arc.png';

export const projects = [
  {
    id: 1,
    title: 'CertGuard',
    subtitle: 'Enterprise-Grade Blockchain Verification',
    badge: 'Blockchain',
    description: 'Engineered a decentralized certificate issuance system that leverages immutable ledgers to eliminate forgery. Integrated AWS S3 for scalable document management, reducing manual verification overhead by 85%.',
    ghostText: '85%',
    stack: ['React.js', 'Node.js', 'AWS S3', 'Blockchain', 'MongoDB'],
    githubLink: 'https://github.com/VidyasagarAlajangi',
    liveLink: 'certguard-1.onrender.com',
    screenshot: certguard,
  },
  {
    id: 2,
    title: 'MedConnect',
    subtitle: 'AI-Driven Healthcare Ecosystem',
    badge: 'AI · Healthcare',
    description: 'Built a comprehensive telehealth platform integrating Gemini AI for precise patient triage and Agora SDK for low-latency video consultations. Achieving 87% clinical query accuracy, this project bridges the gap between AI and patient care.',
    ghostText: '87%',
    stack: ['React.js', 'Node.js', 'Gemini API', 'Agora SDK', 'MongoDB'],
    githubLink: 'https://github.com/VidyasagarAlajangi',
    liveLink: 'medconnect-ahup.onrender.com',
    screenshot: medconnect,
  },
  {
    id: 3,
    title: 'FoodFrenzy',
    subtitle: 'Scalable Restaurant Infrastructure',
    badge: 'Java · Spring',
    description: 'Architected a high-concurrency ordering system using Spring Boot and MongoDB. Focused on clean code and RESTful standards, this platform handles complex menu hierarchies and real-time cart synchronization.',
    ghostText: 'MVC',
    stack: ['Java', 'Spring Boot', 'React.js', 'MongoDB', 'Tailwind'],

    githubLink: 'https://github.com/VidyasagarAlajangi',
  },
  {
    id: 4,
    title: 'ARC Trust',
    subtitle: 'Community Impact Platform',
    badge: 'Full-Stack',
    description: 'Designed and deployed a modern digital home for ARC Trust, coordinating volunteer efforts and donation tracking. This full-stack solution streamlined non-profit operations and boosted community engagement.',
    ghostText: 'ARC',
    stack: ['React.js', 'Node.js', 'MongoDB', 'Tailwind'],
    githubLink: 'https://github.com/Arctrust',
    liveLink: 'arctrust.vercel.app',
    screenshot: arc,
  }
];
