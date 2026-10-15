import self from '../img/self.webp';
import mock1 from '../img/mock1.webp';
import mock2 from '../img/mock2.webp';
import mock3 from '../img/mock3.webp';
import mock4 from '../img/mock4.webp';
import mock5 from '../img/mock5.webp';
import mock6 from '../img/mock6.webp';

export interface Social {
  label: string;
  link: string;
  icon: 'github' | 'linkedin' | 'mail' | 'cv';
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  live?: string;
  source: string;
}

export interface MiniBio {
  emoji: string;
  text: string;
}

export interface Hobby {
  label: string;
  emoji: string;
}

export interface Info {
  firstName: string;
  lastName: string;
  initials: string;
  role: string;
  selfPortrait: string;
  email: string;
  location: string;
  bio: string;
  miniBio: MiniBio[];
  socials: Social[];
  skills: {
    proficientWith: string[];
    exposedTo: string[];
  };
  hobbies: Hobby[];
  projects: Project[];
}

export const info: Info = {
  firstName: 'Jose Carlos',
  lastName: 'Blanco',
  initials: 'JCB',
  role: 'Full Stack & Process Automation Engineer',
  selfPortrait: self,
  email: 'jcblanco.dev@gmail.com',
  location: 'Seville, Spain',
  bio: "I'm Jose Carlos, a Full Stack & Process Automation Engineer from Seville with 3+ years of experience. I build web applications and integrate AI to automate complex workflows end to end — from deploying local LLMs (Ollama, vLLM) and orchestrating AI agents with n8n, to architecting ERP systems and containerized infrastructure with Docker and Linux. I work across Python, native PHP and the JavaScript/TypeScript ecosystem (React, Node.js), and I hold a C2-certified level of English.",
  miniBio: [
    { emoji: '📍', text: 'based in Seville' },
    { emoji: '🤖', text: 'Full Stack & AI Automation' },
    { emoji: '📧', text: 'jcblanco.dev@gmail.com' },
  ],
  socials: [
    { label: 'GitHub', link: 'https://github.com/josekbm', icon: 'github' },
    {
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/in/jose-carlos-blanco-mira-59ab5980',
      icon: 'linkedin',
    },
    { label: 'Email', link: 'mailto:jcblanco.dev@gmail.com', icon: 'mail' },
    {
      label: 'Curriculum',
      link: './CV_Jose_Carlos_Blanco.pdf',
      icon: 'cv',
    },
  ],
  skills: {
    proficientWith: [
      'Python',
      'PHP',
      'JavaScript',
      'TypeScript',
      'React',
      'Redux',
      'Node.js',
      'HTML5',
      'CSS3',
      'SQL',
      'Docker',
      'Ollama',
      'MySQL',
      'Linux',
      'Nginx',

    ],
    exposedTo: [
      'n8n',
      'Java',
      'Bootstrap',
      'Sass',
      'PostgreSQL',
      'MongoDB',
      
    ],
  },
  hobbies: [
    { label: 'reading', emoji: '📖' },
    { label: 'video games', emoji: '🎮' },
    { label: 'movies', emoji: '🎥' },
    { label: 'cooking', emoji: '🌶️' },
  ],
  projects: [
    {
      title: "Gamer's Nest",
      description:
        'A community hub for gamers to discover, review and share their favorite titles.',
      tech: ['React', 'TypeScript', 'CSS Modules'],
      image: mock6,
      live: 'https://josekbm.github.io/gamers_nest/',
      source: 'https://github.com/josekbm/gamers_nest',
    },
    {
      title: "Miranda's Dashboard",
      description:
        'An admin dashboard for hotel management with data tables, filters and a polished UI.',
      tech: ['React', 'JavaScript', 'Sass'],
      image: mock4,
      live: 'https://josekbm.github.io/dashboard-miranda/',
      source: 'https://github.com/josekbm/dashboard-miranda',
    },
    {
      title: "Miranda's Backend",
      description:
        'REST API powering the hotel dashboard, handling rooms, bookings and users.',
      tech: ['Node.js', 'Express', 'MongoDB'],
      image: mock5,
      source: 'https://github.com/josekbm/Miranda-Backend',
    },
    {
      title: 'OXYGENShop',
      description:
        'A responsive e-commerce landing page with a modern layout and a cart experience.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      image: mock1,
      live: 'https://josekbm.github.io/OXYGENShop/',
      source: 'https://github.com/josekbm/OXYGENShop',
    },
    {
      title: 'Photo Dash',
      description:
        'A photography portfolio with an image gallery and a clean, editorial design.',
      tech: ['JavaScript', 'CSS3', 'REST API'],
      image: mock2,
      live: 'https://josekbm.github.io/proyecto-fotos/',
      source: 'https://github.com/josekbm/proyecto-fotos',
    },
    {
      title: 'Hotel Miranda',
      description:
        'A multi-page marketing site for a boutique hotel with a sophisticated look.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      image: mock3,
      live: 'https://josekbm.github.io/Hotel-Miranda-HTML/',
      source: 'https://github.com/josekbm/Hotel-Miranda-HTML',
    },
    {
      title: 'API REST in .NET',
      description:
        'A lightweight REST API built with C# and .NET to explore backend fundamentals.',
      tech: ['C#', '.NET', 'REST'],
      image: mock5,
      source: 'https://github.com/josekbm/PruebaM',
    },
  ],
};
