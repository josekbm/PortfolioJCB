import self from '../img/self.webp';
import mock1 from '../img/mock1.webp';
import mock2 from '../img/mock2.webp';
import mock3 from '../img/mock3.webp';
import mock4 from '../img/mock4.webp';
import mock6 from '../img/mock6.webp';
import mock7 from '../img/mock7.webp';
import { CV_URL } from './links';

export interface Social {
  label: string;
  link: string;
  icon: 'github' | 'linkedin' | 'mail' | 'cv';
}

export type ProjectCategory = 'Frontend' | 'Backend' | 'Landing';

export interface CodePreview {
  file: string;
  language: string;
  lines: string[];
}

export interface Project {
  title: string;
  description: string;
  category: ProjectCategory;
  role: string;
  highlights: string[];
  tech: string[];
  image?: string;
  imagePosition?: string;
  code?: CodePreview;
  live?: string;
  source?: string;
  featured?: boolean;
}

export type ServiceIcon =
  | 'code'
  | 'automation'
  | 'backend'
  | 'infra'
  | 'product';

export interface Service {
  icon: ServiceIcon;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ServicePackage {
  icon: ServiceIcon;
  title: string;
  description: string;
  includes: string[];
  bestFor: string;
  featured?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceInfo {
  availability: string;
  intro: string;
  services: Service[];
  packages: ServicePackage[];
  process: ProcessStep[];
  faq: FaqItem[];
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
  services: ServiceInfo;
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
      link: CV_URL,
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
      title: 'JM Sánchez · Cortador de Jamón',
      description:
        'A one-page site for a professional ham cutter in Seville, with services, a custom quote flow, gallery and WhatsApp contact.',
      category: 'Landing',
      role: 'Design & development',
      highlights: [
        'Editorial one-page design with a custom black and gold identity',
        'Astro, handcrafted CSS and no client-side frameworks',
        'Accessible gallery lightbox, WhatsApp quote flow and structured SEO',
        'Docker deployment behind Nginx Proxy Manager with HTTPS',
      ],
      tech: ['Astro', 'TypeScript', 'CSS'],
      featured: true,
      image: mock7,
      imagePosition: '20% center',
      live: 'https://jmsanchez-cortadordejamon.es',
    },
    {
      title: "Gamer's Nest",
      description:
        'A community hub for gamers to discover, review and share their favorite titles.',
      category: 'Frontend',
      role: 'Design & development',
      highlights: [
        'Discovery views for popular, upcoming and new releases',
        'Search experience with a responsive game grid',
        'Static deployment on GitHub Pages',
      ],
      tech: ['React', 'TypeScript', 'CSS Modules'],
      image: mock6,
      live: 'https://josekbm.github.io/gamers_nest/',
      source: 'https://github.com/josekbm/gamers_nest',
    },
    {
      title: "Miranda's Dashboard",
      description:
        'An admin dashboard for hotel management with data tables, filters and a polished UI.',
      category: 'Frontend',
      role: 'Frontend development',
      highlights: [
        'Admin login with a protected dashboard shell',
        'KPI overview and an auto-playing review carousel',
        'Reusable tables, filters and a desktop-first Sass layout',
      ],
      tech: ['React', 'JavaScript', 'Sass'],
      image: mock4,
      source: 'https://github.com/josekbm/dashboard-miranda',
    },
    {
      title: "Miranda's Backend",
      description:
        'REST API powering the hotel dashboard, handling rooms, bookings and users.',
      category: 'Backend',
      role: 'Backend development',
      highlights: [
        'REST endpoints for rooms, bookings and users',
        'MongoDB models for the hotel domain',
        'API consumed by the React admin dashboard',
      ],
      tech: ['Node.js', 'Express', 'MongoDB'],
      code: {
        file: 'src/controllers/bookingsController.ts',
        language: 'TypeScript',
        lines: [
          'export const createBookingController = (',
          '  req: Request, res: Response',
          ') => {',
          '  const result = validationResult(req);',
          '',
          '  if (!result.isEmpty()) {',
          '    res.status(422).send({',
          '      errors: result.array(),',
          '    });',
          '    return;',
          '  }',
          '',
          '  const created = createBooking(newBooking);',
          '  res.status(201).send({',
          '    status: "201", data: created,',
          '  });',
          '};',
        ],
      },
      source: 'https://github.com/josekbm/Miranda-Backend',
    },
    {
      title: 'OXYGENShop',
      description:
        'A responsive e-commerce landing page with a modern layout and a cart experience.',
      category: 'Landing',
      role: 'Frontend development',
      highlights: [
        'Responsive storefront built without a framework',
        'Product cards and cart interactions',
        'Mobile-first layout across the whole flow',
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      image: mock1,
      live: 'https://josekbm.github.io/OXYGENShop/',
      source: 'https://github.com/josekbm/OXYGENShop',
    },
    {
      title: 'Photo Dash',
      description:
        'A photo discovery app powered by Unsplash, with search, likes and downloads.',
      category: 'Frontend',
      role: 'Frontend development',
      highlights: [
        'Unsplash API integration with live search',
        'Like and download flows for every image',
        'Responsive editorial layout',
      ],
      tech: ['JavaScript', 'CSS3', 'REST API'],
      image: mock2,
      live: 'https://josekbm.github.io/proyecto-fotos/',
      source: 'https://github.com/josekbm/proyecto-fotos',
    },
    {
      title: 'Hotel Miranda',
      description:
        'A multi-page marketing site for a boutique hotel with a sophisticated look.',
      category: 'Landing',
      role: 'Frontend development',
      highlights: [
        'Multi-page marketing site with a shared layout',
        'Responsive navigation and content sections',
        'Semantic HTML, CSS and vanilla JavaScript',
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      image: mock3,
      live: 'https://josekbm.github.io/Hotel-Miranda-HTML/',
      source: 'https://github.com/josekbm/Hotel-Miranda-HTML',
    },
    {
      title: 'API REST in .NET',
      description:
        'A lightweight REST API built with C# and .NET to explore backend fundamentals.',
      category: 'Backend',
      role: 'Backend development',
      highlights: [
        'CRUD endpoints with C# and .NET',
        'Layered project structure',
        'Focused on REST conventions and backend fundamentals',
      ],
      tech: ['C#', '.NET', 'REST'],
      code: {
        file: 'Controllers/EmpleadosController.cs',
        language: 'C#',
        lines: [
          '[Authorize]',
          '[ApiController]',
          '[Route("/empleados")]',
          'public class EmpleadosController',
          '    : ControllerBase',
          '{',
          '    private readonly DataContext _context;',
          '',
          '    [HttpGet(Name = "GetEmpleados")]',
          '    public async Task<ActionResult<',
          '        IEnumerable<Empleado>>> GetEmpleados()',
          '    {',
          '        return await _context',
          '            .Empleados.ToListAsync();',
          '    }',
          '',
          '    [HttpPost]',
          '    public async Task<ActionResult<Empleado>>',
          '        Post(Empleado empleado)',
          '    {',
          '        _context.Empleados.Add(empleado);',
          '        await _context.SaveChangesAsync();',
          '',
          '        return new CreatedAtRouteResult(',
          '            "GetEmpleado",',
          '            new { UPN = empleado.UPN },',
          '            empleado);',
          '    }',
          '}',
        ],
      },
      source: 'https://github.com/josekbm/PruebaM',
    },
  ],
  services: {
    availability: 'Available for new projects',
    intro:
      'I help founders and small teams ship web products — and automate the manual work around them. From the interface to the API to the deployment, you get one person who owns the whole path.',
    services: [
      {
        icon: 'code',
        title: 'Full-stack web apps',
        tagline: 'Interfaces that feel fast. Backends that hold up.',
        description:
          'Customer-facing products and internal tools built with React and TypeScript, backed by Node.js, Python or native PHP — whatever fits your stack.',
        deliverables: [
          'Product UI and reusable component systems',
          'Auth, dashboards and data-heavy views',
          'API integration and end-to-end flows',
        ],
      },
      {
        icon: 'automation',
        title: 'AI & process automation',
        tagline: 'Let the repetitive work run itself.',
        description:
          'I map the manual steps in your operation and turn them into reliable workflows with n8n, APIs and LLM integrations — including local models when data cannot leave your servers.',
        deliverables: [
          'Workflow audits and automation blueprints',
          'n8n, webhook and API pipelines',
          'LLM integrations with Ollama or vLLM',
        ],
      },
      {
        icon: 'backend',
        title: 'Backends & APIs',
        tagline: 'The quiet part that has to be right.',
        description:
          'REST APIs, data models and integrations designed to keep your product dependable as it grows. Comfortable across Python, Node.js, PHP and SQL.',
        deliverables: [
          'REST API design and implementation',
          'Database modelling in MySQL or PostgreSQL',
          'Third-party and ERP integrations',
        ],
      },
      {
        icon: 'infra',
        title: 'Infrastructure & delivery',
        tagline: 'Ship without surprises.',
        description:
          'Containerised environments and deployment workflows that make releases repeatable — from a single VPS upwards.',
        deliverables: [
          'Dockerised development and production setups',
          'Linux and Nginx server configuration',
          'Deployment and backup workflows',
        ],
      },
    ],
    packages: [
      {
        icon: 'code',
        title: 'Launch',
        description:
          'A focused site that explains the product and turns visitors into conversations.',
        includes: [
          'Landing page or small marketing site',
          'Responsive build with SEO basics',
          'Contact or lead form, analytics and deployment',
        ],
        bestFor: 'Product launches, freelance services and campaigns.',
      },
      {
        icon: 'product',
        title: 'Product',
        description:
          'A full-stack application from the first screen to a production deployment.',
        includes: [
          'React and TypeScript product interface',
          'API, authentication and database',
          'Third-party integrations and deployment',
        ],
        bestFor: 'Internal tools, dashboards and MVPs that need to work end to end.',
        featured: true,
      },
      {
        icon: 'automation',
        title: 'Automate',
        description:
          'A manual workflow turned into a reliable pipeline your team can trust.',
        includes: [
          'Workflow audit and automation map',
          'n8n, webhook and API implementation',
          'LLM integration where it adds real value',
        ],
        bestFor: 'Operations, reporting and document-heavy processes.',
      },
    ],
    process: [
      {
        title: 'Brief',
        description:
          'A short call or email to understand the goal, the constraints and the deadline.',
      },
      {
        title: 'Scope',
        description:
          'A written proposal with deliverables, milestones and a fixed quote before we start.',
      },
      {
        title: 'Build',
        description:
          'Short feedback loops, regular demos and direct communication throughout.',
      },
      {
        title: 'Handover',
        description:
          'Deployment, documentation and a support window after launch.',
      },
    ],
    faq: [
      {
        question: 'How much does a project cost?',
        answer:
          'It depends on scope. After a short brief I send a written proposal with a fixed quote, so you know the total before we start. No hourly surprises.',
      },
      {
        question: 'How long does it take?',
        answer:
          'Landing pages usually take a few weeks. Full-stack apps and automations depend on the integrations and the feedback loop. You get a milestone plan with the proposal.',
      },
      {
        question: 'Can you work with my existing stack or team?',
        answer:
          'Yes. I can join an existing React, Node.js, Python or PHP codebase, integrate with your tools, or hand the project over to your team after launch.',
      },
      {
        question: 'Do you offer ongoing support?',
        answer:
          'Yes. Monthly retainers cover maintenance, new features and automation improvements. Many projects start fixed-scope and move to a retainer after launch.',
      },
      {
        question: 'Can you keep our data on our own servers?',
        answer:
          'Yes. I deploy local models with Ollama or vLLM and design automations that run on your own infrastructure when data cannot leave your network.',
      },
      {
        question: 'How do we start?',
        answer:
          'Send a short email with the problem, the deadline and any constraints. I will reply with next steps and, if it is a fit, a proposal.',
      },
    ],
  },
};
