import certguard from '../assets/certguard.png';
import medconnect from '../assets/medconnect.png';

import arc from '../assets/arc.png';

export const projects = [
  {
    id: 1,
    title: 'CertGuard',
    subtitle: 'Digital Certificate Platform',
    badge: 'Blockchain',
    description: 'Issues and verifies digital certificates on-chain. Role-based access for issuers, verifiers, and admins. Cloud document storage on AWS S3. Automated the entire verification pipeline — **cut manual effort by 85%.**',
    ghostText: '85%',
    stack: ['React.js', 'Node.js', 'AWS S3', 'Blockchain', 'MongoDB'],
    githubLink: 'https://github.com/VidyasagarAlajangi',
    liveLink: 'certguard-1.onrender.com',
    screenshot: certguard,
  },
  {
    id: 2,
    title: 'MedConnect',
    subtitle: 'Telehealth Platform',
    badge: 'AI · Healthcare',
    description: 'AI chatbot powered by Gemini API for symptom analysis and patient triage. Real-time video consultations via Agora SDK, automated appointment scheduling, and a clean patient dashboard. Chatbot hits **87% accuracy** on clinical queries.',
    ghostText: '87%',
    stack: ['React.js', 'Node.js', 'Gemini API', 'Agora SDK', 'MongoDB'],
    githubLink: 'https://github.com/VidyasagarAlajangi',
    liveLink: 'medconnect-ahup.onrender.com',
    screenshot: medconnect,
  },
  {
    id: 3,
    title: 'FoodFrenzy',
    subtitle: 'Restaurant Management Platform',
    badge: 'Java · Spring',
    description: 'Full-stack restaurant tool with menu browsing, cart, and ordering. Java Spring Boot MVC backend with clean RESTful APIs, MongoDB for persistence, and a React frontend styled with Tailwind. Fully debugged, Postman-tested, production-ready.',
    ghostText: 'MVC',
    stack: ['Java', 'Spring Boot', 'React.js', 'MongoDB', 'Tailwind'],

    githubLink: 'https://github.com/VidyasagarAlajangi',
  },
  {
    id: 4,
    title: 'ARC Trust',
    subtitle: 'Non profit organization website',
    badge: 'React.js - Node.js',
    description: 'A modern, responsive website for ARC Trust, a non-profit organization. Features include event management, donation tracking, and volunteer coordination. Built with React.js and Node.js, this platform streamlines operations and enhances community engagement.',
    ghostText: 'ARC',
    stack: ['React.js', 'Node.js', 'MongoDB', 'Tailwind'],
    githubLink: 'https://github.com/Arctrust',
    liveLink: 'arctrust.vercel.app',
    screenshot: arc,
  }
];
