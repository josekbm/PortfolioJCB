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
  /** Stable, URL-safe identifier used by `/projects/<slug>/`. */
  slug: string;
  /** One-line summary used by the project index, previews and related cases. */
  summary: string;
  /** Per-project metadata for the static detail page. */
  seoTitle: string;
  seoDescription: string;
  /** Optional; intentionally left unset until delivery years are confirmed. */
  year?: number;
  /** Case-study narrative. */
  problem: string;
  solution: string;
  results: string[];
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

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface EducationItem {
  title: string;
  institution: string;
  period: string;
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
  experience: ExperienceItem[];
  education: EducationItem[];
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
  bio: "I'm Jose Carlos, a Full Stack & Process Automation Engineer from Seville with 3+ years of experience. I build web applications and integrate AI to automate complex workflows end to end — from deploying local LLMs (Ollama, vLLM) and orchestrating AI agents with n8n, to architecting ERP systems and containerised infrastructure with Docker and Linux. I work across Python, native PHP and the JavaScript/TypeScript ecosystem (React, Node.js), and I hold a C2-certified level of English.",
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
  experience: [
    {
      role: 'Full Stack & Process Automation Engineer',
      company: 'AMETEL',
      period: 'Feb 2024 — Present',
      location: 'Seville, Spain',
      summary: 'Corporate ERP, internal automation and local AI infrastructure.',
      highlights: [
        'Design, build and maintain the corporate ERP across HR, finance, training and labour-management modules with native PHP 8.2, React and vanilla JavaScript.',
        'Automate internal processes and API integrations with PHP and Python.',
        'Deploy local LLMs with Ollama and build AI agents with Python and n8n.',
        'Run containerised services with Docker and Portainer on Ubuntu Server.',
      ],
    },
    {
      role: 'Full Stack Developer',
      company: 'Oxygen Coworking',
      period: 'Mar 2023 — Aug 2023',
      location: 'Seville, Spain',
      summary: 'Internal hotel management dashboard and corporate website.',
      highlights: [
        'Built the hotel dashboard and corporate site with React, TypeScript, Redux, Sass and MongoDB.',
        'Designed modular component architectures and managed global state across admin panels.',
      ],
    },
    {
      role: 'Front-End Developer',
      company: 'INNN',
      period: 'Oct 2022 — Feb 2023',
      location: 'Seville, Spain',
      summary: 'Internal project-management interface.',
      highlights: [
        'Built the interface for an internal project-management app with Bootstrap 5, vanilla JavaScript, HTML5 and CSS3.',
        'Worked with Git, GitHub and Asana in an agile team.',
      ],
    },
  ],
  education: [
    {
      title: 'Higher Technician in Web Application Development (DAW)',
      institution: 'Ilerna',
      period: '2021 — 2023',
    },
    {
      title: 'Full Stack Developer Training',
      institution: 'Oxygen Academy',
      period: '2023',
    },
    {
      title: 'EF SET English Certificate — C2 Proficient',
      institution: 'EF Standard English Test',
      period: 'Mar 2023',
    },
  ],
  projects: [
    {
      title: 'JM Sánchez · Cortador de Jamón',
      slug: 'jm-sanchez',
      summary: 'Multi-page Astro site for a professional ham cutter in Seville.',
      seoTitle: 'JM Sánchez · Cortador de Jamón — Astro Case Study',
      seoDescription:
        'How I built a fast, accessible multi-page Astro site for a ham cutter in Seville, with service pages, structured SEO and WhatsApp quotes.',
      problem:
        'JM Sánchez needed more than a digital business card: a credible site that explained his event services, showed the quality of his work and turned visits into quote requests without a CMS to maintain.',
      solution:
        'I designed a black-and-gold editorial identity and built a multi-page Astro site around the booking journey: home, dedicated pages for weddings, companies, vacuum packing and tastings, pricing, about and legal pages. The gallery uses an accessible lightbox, the quote flow opens WhatsApp with the event details prefilled, and ProfessionalService structured data plus per-page metadata make the site easy to find.',
      results: [
        'Nine crawlable pages, including four service pages and a pricing page',
        'Static Astro output with no client-side framework',
        'Accessible gallery, WhatsApp quote flow and ProfessionalService schema',
        'Docker deployment behind Nginx Proxy Manager with HTTPS',
      ],
      description:
        'A multi-page site for a professional ham cutter in Seville: editorial design, service pages, gallery and a WhatsApp quote flow.',
      category: 'Landing',
      role: 'Design & development',
      highlights: [
        'Client project: editorial black-and-gold identity across nine pages',
        'Astro, handcrafted CSS and no client-side frameworks',
        'Service pages for weddings, companies, vacuum packing and tastings',
        'WhatsApp quote flow, accessible gallery and structured SEO',
      ],
      tech: ['Astro', 'TypeScript', 'CSS'],
      featured: true,
      image: mock7,
      imagePosition: '20% center',
      live: 'https://jmsanchez-cortadordejamon.es',
    },
    {
      title: "Gamer's Nest",
      slug: 'gamers-nest',
      summary: 'React app to browse, search and explore games with the RAWG API.',
      seoTitle: "Gamer's Nest — React Game Discovery App | blancodev",
      seoDescription:
        'A React and RAWG API app to discover popular, upcoming and new games, with live search, platform and genre browsing, and detailed game pages.',
      problem:
        'Game discovery is fragmented: release calendars, store pages and ratings live in different places. The goal was one interface to explore what is popular, what is coming and what just launched, then drill into a game without opening five tabs.',
      solution:
        'I built a React 18 app on the RAWG API with routes for home, search and game details. It covers the top 10 popular, upcoming and recently released games, browses by platform, genre and publisher, and renders each game with its description, rating, stores, video and a screenshot lightbox. Material UI provides the component layer, React Router handles navigation and DOMPurify sanitises the HTML returned by the API.',
      results: [
        'Top 10 views for popular, upcoming and new releases',
        'Live search plus browsing by platform, genre and publisher',
        'Game pages with description, video, stores and screenshot gallery',
        'Static deployment on GitHub Pages',
      ],
      description:
        'A React app to discover games through the RAWG API, with release views, live search, platform and genre browsing, and detailed game pages.',
      category: 'Frontend',
      role: 'Design & development',
      highlights: [
        'Top 10 views for popular, upcoming and recently released games',
        'Live search and browsing by platform, genre and publisher',
        'Game detail pages with video, stores and a screenshot lightbox',
        'Sanitised API content and a static GitHub Pages deployment',
      ],
      tech: ['React', 'JavaScript', 'Material UI', 'RAWG API'],
      image: mock6,
      live: 'https://josekbm.github.io/gamers_nest/',
      source: 'https://github.com/josekbm/gamers_nest',
    },
    {
      title: "Miranda's Dashboard",
      slug: 'mirandas-dashboard',
      summary: 'React admin dashboard for hotel operations.',
      seoTitle: "Miranda's Dashboard — Hotel Admin UI | blancodev",
      seoDescription:
        'A React admin dashboard for hotel operations with protected routes, KPI cards, reusable tables, filters, Redux Toolkit state and Cypress tests.',
      problem:
        'Room, booking, contact and user data were spread across separate views and spreadsheets. The goal was one protected dashboard where the hotel team could review each area, filter the records and move between tasks without losing context.',
      solution:
        'I built a React admin shell with a demo login, protected routes, a KPI overview and reusable tables for rooms, bookings, contacts and users. Redux Toolkit holds the domain state, styled-components keeps the interface consistent, and a review carousel covers the public-facing side. Cypress tests check the login and route protection flows.',
      results: [
        'Protected admin shell with login, logout and routed views',
        'Redux Toolkit state for rooms, bookings, contacts and users',
        'Reusable tables, filters, KPI cards and a review carousel',
        'Cypress end-to-end tests for login and protected routes',
      ],
      description:
        'A React admin dashboard for hotel operations with protected routes, KPI cards, reusable tables, filters and a review carousel.',
      category: 'Frontend',
      role: 'Frontend development',
      highlights: [
        'Demo login with protected routes and a logout flow',
        'KPI cards and a review carousel for the public site',
        'Reusable tables and filters backed by Redux Toolkit',
        'Cypress tests for login and route protection',
      ],
      tech: ['React', 'Redux Toolkit', 'styled-components', 'Cypress'],
      image: mock4,
      source: 'https://github.com/josekbm/dashboard-miranda',
    },
    {
      title: "Miranda's Backend",
      slug: 'mirandas-backend',
      summary: 'Typed Express API for the hotel dashboard, with JWT auth.',
      seoTitle: "Miranda's Backend — Node.js REST API | blancodev",
      seoDescription:
        'A TypeScript and Express REST API for a hotel dashboard, with JWT authentication, request validation and a layered routes-services structure.',
      problem:
        'The hotel dashboard needed a single source of truth for rooms, bookings, contacts and users, plus authentication so only signed-in staff could read or change records.',
      solution:
        'I designed a typed Express API split into routes, controllers, services and validators. Passport handles email/password login and JWT protects every /api route; express-validator checks payloads before they reach the service layer, and a small data-access module persists changes to a JSON store so the API is easy to run and inspect during development.',
      results: [
        'JWT-protected REST endpoints for rooms, bookings, contacts and users',
        'Layered routes → controllers → services → validators',
        'Request validation and explicit error handling',
        'Typed interfaces shared across the hotel domain',
      ],
      description:
        'A TypeScript and Express REST API for the hotel dashboard, with JWT authentication, request validation and a layered structure.',
      category: 'Backend',
      role: 'Backend development',
      highlights: [
        'JWT authentication with Passport on every /api route',
        'Routes, controllers, services and validators in separate layers',
        'Express-validator schemas for incoming payloads',
        'JSON-backed data store behind a small access module',
      ],
      tech: ['TypeScript', 'Express', 'JWT', 'Passport'],
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
      slug: 'oxygenshop',
      summary: 'Responsive e-commerce landing with Sass and vanilla JavaScript.',
      seoTitle: 'OXYGENShop — Responsive E-commerce Landing | blancodev',
      seoDescription:
        'A responsive e-commerce landing built with HTML, Sass and vanilla JavaScript, with pricing plans, a live currency selector, modal and slider interactions.',
      problem:
        'The brief was a storefront landing that had to feel like a real product while staying framework-free: clear pricing, a currency selector, promotional interactions and a layout that holds from 320 px upwards.',
      solution:
        'I built a mobile-first landing in semantic HTML and Sass, with three pricing plans, a currency selector that converts prices from a live exchange-rate API, a timed and scroll-triggered modal, a slider and a newsletter form. The responsive menu and interactions use vanilla JavaScript, and the styles are organised as reusable components rather than page-specific one-offs.',
      results: [
        'Responsive layout tested down to 320 px',
        'Currency selector with live exchange rates for EUR, USD and GBP',
        'Modal, slider and newsletter interactions in vanilla JavaScript',
        'Sass component styles with no framework dependencies',
      ],
      description:
        'A responsive e-commerce landing built with HTML, Sass and vanilla JavaScript, with pricing plans, a currency selector and promotional interactions.',
      category: 'Landing',
      role: 'Frontend development',
      highlights: [
        'Mobile-first storefront that holds down to 320 px',
        'Pricing plans and a currency selector with live exchange rates',
        'Modal, slider and newsletter interactions in vanilla JavaScript',
        'Sass component styles with no framework dependencies',
      ],
      tech: ['HTML5', 'Sass', 'JavaScript'],
      image: mock1,
      live: 'https://josekbm.github.io/OXYGENShop/',
      source: 'https://github.com/josekbm/OXYGENShop',
    },
    {
      title: 'Photo Dash',
      slug: 'photo-dash',
      summary: 'React and Redux photo app powered by the Unsplash API.',
      seoTitle: 'Photo Dash — Unsplash Photo App | blancodev',
      seoDescription:
        'A React and Redux app powered by the Unsplash API, with live search, persistent favourites, editing and downloads in a responsive grid.',
      problem:
        'Unsplash is a great image library, but not a focused browsing tool: there is no personal collection to return to and no quick way to keep a photo. The goal was a small client that made search, save and download feel like one flow.',
      solution:
        'I built a React app with Redux Toolkit slices for search and favourites. Search runs against the Unsplash API, results render in a responsive grid, and favourites persist in localStorage with add, edit and delete actions. MUI and styled-components provide the interface, and every photo can be downloaded from its detail modal.',
      results: [
        'Live search against the Unsplash API',
        'Favourites persisted in localStorage with edit and delete',
        'Download flow from every photo detail modal',
        'Responsive grid with a dedicated empty state',
      ],
      description:
        'A React and Redux photo app powered by the Unsplash API, with live search, persistent favourites and downloads.',
      category: 'Frontend',
      role: 'Frontend development',
      highlights: [
        'Unsplash API integration with live search',
        'Favourites saved in localStorage and editable from the collection',
        'Download flow and photo detail modal',
        'Responsive grid with a dedicated empty state',
      ],
      tech: ['React', 'Redux Toolkit', 'Unsplash API', 'MUI'],
      image: mock2,
      live: 'https://josekbm.github.io/proyecto-fotos/',
      source: 'https://github.com/josekbm/proyecto-fotos',
    },
    {
      title: 'Hotel Miranda',
      slug: 'hotel-miranda',
      summary: 'Six-page marketing site for a boutique hotel, built with SCSS and BEM.',
      seoTitle: 'Hotel Miranda — Multi-page Hotel Website | blancodev',
      seoDescription:
        'A six-page marketing site for a boutique hotel built with semantic HTML, SCSS and BEM, a shared layout and responsive navigation.',
      problem:
        'A boutique hotel needs more than a homepage: rooms, offers, room details, about and contact all have to share one brand and one navigation system, and still work on a phone.',
      solution:
        'I built a six-page site with a shared header, footer and component set. The layout uses semantic HTML, SCSS and BEM naming, with vanilla JavaScript for the responsive menu and Swiper for the room sliders. A single 1000 px breakpoint keeps the structure simple while the design still adapts down to 320 px.',
      results: [
        'Six pages with a shared layout and navigation',
        'SCSS and BEM component structure',
        'Responsive from 320 px with a single breakpoint',
        'Semantic HTML and JavaScript interactions',
      ],
      description:
        'A six-page marketing site for a boutique hotel, built with semantic HTML, SCSS and BEM, with a shared layout and responsive navigation.',
      category: 'Landing',
      role: 'Frontend development',
      highlights: [
        'Six pages: home, rooms, room detail, offers, about and contact',
        'Shared header, footer and component system',
        'SCSS with BEM naming and semantic HTML',
        'Responsive navigation and Swiper room sliders',
      ],
      tech: ['HTML5', 'SCSS', 'BEM', 'JavaScript', 'Swiper'],
      image: mock3,
      live: 'https://josekbm.github.io/Hotel-Miranda-HTML/',
      source: 'https://github.com/josekbm/Hotel-Miranda-HTML',
    },
    {
      title: 'API REST in .NET',
      slug: 'api-rest-dotnet',
      summary: '.NET 7 REST API with JWT auth, EF Core and SQLite.',
      seoTitle: 'API REST in .NET — C# Backend Case Study | blancodev',
      seoDescription:
        'A .NET 7 REST API built with C#, EF Core and SQLite, with JWT login, protected CRUD endpoints and a layered controller/model structure.',
      problem:
        'I wanted to practise backend fundamentals in a typed ecosystem: authentication, a relational model with migrations, and CRUD endpoints that follow REST conventions rather than framework magic.',
      solution:
        'I built a .NET 7 Web API with two controllers: a login endpoint that issues a JWT and an employees resource protected by [Authorize]. Entity Framework Core migrations create the SQLite schema, and controllers, models and data access stay in separate layers. Swagger documents the endpoints for manual testing.',
      results: [
        'JWT login and protected employee endpoints',
        'CRUD with EF Core migrations over SQLite',
        'Controllers, models and data access in separate layers',
        'Swagger documentation for manual API testing',
      ],
      description:
        'A .NET 7 REST API built with C#, EF Core and SQLite, with JWT authentication and protected CRUD endpoints.',
      category: 'Backend',
      role: 'Backend development',
      highlights: [
        'JWT login and [Authorize] on the employees resource',
        'EF Core migrations and a SQLite database',
        'Separate controllers, models and data access layers',
        'Swagger UI for testing the endpoints',
      ],
      tech: ['C#', '.NET 7', 'EF Core', 'SQLite'],
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
      'I help founders and small teams ship web products — and automate the manual work around them. From the interface to the API to the deployment, you get one person who owns the whole process.',
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
          'REST APIs, data models and integrations designed to keep your product dependable as it grows. I work across Python, Node.js, PHP and SQL.',
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
