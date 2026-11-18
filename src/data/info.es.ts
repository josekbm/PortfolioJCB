import self from '../img/self.webp';
import mock1 from '../img/mock1.webp';
import mock2 from '../img/mock2.webp';
import mock3 from '../img/mock3.webp';
import mock4 from '../img/mock4.webp';
import mock6 from '../img/mock6.webp';
import mock7 from '../img/mock7.webp';
import type { Info } from './info';
import { CV_URL } from './links';

export const infoEs: Info = {
  firstName: 'Jose Carlos',
  lastName: 'Blanco',
  initials: 'JCB',
  role: 'Ingeniero Full Stack y de Automatización de Procesos',
  selfPortrait: self,
  email: 'jcblanco.dev@gmail.com',
  location: 'Sevilla, España',
  bio: 'Soy Jose Carlos, Ingeniero Full Stack y de Automatización de Procesos de Sevilla con más de 3 años de experiencia. Construyo aplicaciones web e integro IA para automatizar flujos de trabajo complejos de principio a fin: desde desplegar LLMs locales (Ollama, vLLM) y orquestar agentes de IA con n8n, hasta diseñar sistemas ERP e infraestructura contenedorizada con Docker y Linux. Trabajo con Python, PHP nativo y el ecosistema JavaScript/TypeScript (React, Node.js), y tengo un nivel de inglés certificado C2.',
  miniBio: [
    { emoji: '📍', text: 'con base en Sevilla' },
    { emoji: '🤖', text: 'Full Stack y automatización con IA' },
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
      label: 'Currículum',
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
    exposedTo: ['n8n', 'Java', 'Bootstrap', 'Sass', 'PostgreSQL', 'MongoDB'],
  },
  hobbies: [
    { label: 'lectura', emoji: '📖' },
    { label: 'videojuegos', emoji: '🎮' },
    { label: 'cine', emoji: '🎥' },
    { label: 'cocina', emoji: '🌶️' },
  ],
  projects: [
    {
      title: 'JM Sánchez · Cortador de Jamón',
      description:
        'Una web de una sola página para un cortador profesional de jamón en Sevilla, con servicios, presupuesto a medida, galería y contacto por WhatsApp.',
      category: 'Landing',
      role: 'Diseño y desarrollo',
      highlights: [
        'Diseño editorial de una página con identidad propia en negro y oro',
        'Astro, CSS artesanal y cero frameworks de cliente',
        'Galería accesible, presupuesto por WhatsApp y SEO estructurado',
        'Despliegue con Docker, Nginx Proxy Manager y HTTPS',
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
        'Un hub para que los jugadores descubran, reseñen y compartan sus títulos favoritos.',
      category: 'Frontend',
      role: 'Diseño y desarrollo',
      highlights: [
        'Vistas de descubrimiento para lanzamientos populares, próximos y nuevos',
        'Búsqueda con una cuadrícula de juegos responsive',
        'Despliegue estático en GitHub Pages',
      ],
      tech: ['React', 'TypeScript', 'CSS Modules'],
      image: mock6,
      live: 'https://josekbm.github.io/gamers_nest/',
      source: 'https://github.com/josekbm/gamers_nest',
    },
    {
      title: "Miranda's Dashboard",
      description:
        'Un panel de administración para gestión hotelera con tablas, filtros y una interfaz cuidada.',
      category: 'Frontend',
      role: 'Desarrollo frontend',
      highlights: [
        'Login de administración con dashboard protegido',
        'Resumen de KPIs y carrusel de reseñas automático',
        'Tablas y filtros reutilizables con un layout Sass desktop-first',
      ],
      tech: ['React', 'JavaScript', 'Sass'],
      image: mock4,
      source: 'https://github.com/josekbm/dashboard-miranda',
    },
    {
      title: "Miranda's Backend",
      description:
        'API REST que alimenta el dashboard del hotel y gestiona habitaciones, reservas y usuarios.',
      category: 'Backend',
      role: 'Desarrollo backend',
      highlights: [
        'Endpoints REST para habitaciones, reservas y usuarios',
        'Modelos MongoDB para el dominio hotelero',
        'API consumida por el dashboard de React',
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
        'Una landing de e-commerce responsive con un diseño moderno y experiencia de carrito.',
      category: 'Landing',
      role: 'Desarrollo frontend',
      highlights: [
        'Escaparate responsive sin framework',
        'Tarjetas de producto e interacciones de carrito',
        'Diseño mobile-first en todo el flujo',
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      image: mock1,
      live: 'https://josekbm.github.io/OXYGENShop/',
      source: 'https://github.com/josekbm/OXYGENShop',
    },
    {
      title: 'Photo Dash',
      description:
        'Una app de descubrimiento de fotos con Unsplash, búsqueda, likes y descargas.',
      category: 'Frontend',
      role: 'Desarrollo frontend',
      highlights: [
        'Integración con la API de Unsplash y búsqueda en vivo',
        'Flujos de like y descarga para cada imagen',
        'Diseño editorial responsive',
      ],
      tech: ['JavaScript', 'CSS3', 'REST API'],
      image: mock2,
      live: 'https://josekbm.github.io/proyecto-fotos/',
      source: 'https://github.com/josekbm/proyecto-fotos',
    },
    {
      title: 'Hotel Miranda',
      description:
        'Una web de marketing multipágina para un hotel boutique con un aire sofisticado.',
      category: 'Landing',
      role: 'Desarrollo frontend',
      highlights: [
        'Web multipágina con layout compartido',
        'Navegación y secciones responsive',
        'HTML semántico, CSS y JavaScript vanilla',
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      image: mock3,
      live: 'https://josekbm.github.io/Hotel-Miranda-HTML/',
      source: 'https://github.com/josekbm/Hotel-Miranda-HTML',
    },
    {
      title: 'API REST in .NET',
      description:
        'Una API REST ligera construida con C# y .NET para explorar fundamentos de backend.',
      category: 'Backend',
      role: 'Desarrollo backend',
      highlights: [
        'Endpoints CRUD con C# y .NET',
        'Estructura de proyecto por capas',
        'Enfocada en convenciones REST y fundamentos de backend',
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
    availability: 'Disponible para nuevos proyectos',
    intro:
      'Ayudo a founders y equipos pequeños a lanzar productos web y a automatizar el trabajo manual que los rodea. Desde la interfaz hasta la API y el despliegue, una sola persona se hace cargo de todo el camino.',
    services: [
      {
        icon: 'code',
        title: 'Aplicaciones web full-stack',
        tagline: 'Interfaces que se sienten rápidas. Backends que aguantan.',
        description:
          'Productos de cara al cliente y herramientas internas construidas con React y TypeScript, apoyadas por Node.js, Python o PHP nativo, lo que mejor encaje con tu stack.',
        deliverables: [
          'UI de producto y sistemas de componentes reutilizables',
          'Autenticación, dashboards y vistas con muchos datos',
          'Integración de APIs y flujos de principio a fin',
        ],
      },
      {
        icon: 'automation',
        title: 'Automatización con IA y de procesos',
        tagline: 'Que el trabajo repetitivo se haga solo.',
        description:
          'Mapeo los pasos manuales de tu operación y los convierto en flujos fiables con n8n, APIs e integraciones de LLM, incluidos modelos locales cuando los datos no pueden salir de tus servidores.',
        deliverables: [
          'Auditoría de flujos y planos de automatización',
          'Pipelines con n8n, webhooks y APIs',
          'Integraciones LLM con Ollama o vLLM',
        ],
      },
      {
        icon: 'backend',
        title: 'Backends y APIs',
        tagline: 'La parte silenciosa que tiene que estar bien.',
        description:
          'APIs REST, modelos de datos e integraciones diseñadas para que tu producto siga siendo fiable mientras crece. Cómodo con Python, Node.js, PHP y SQL.',
        deliverables: [
          'Diseño e implementación de APIs REST',
          'Modelado de bases de datos en MySQL o PostgreSQL',
          'Integraciones con terceros y ERPs',
        ],
      },
      {
        icon: 'infra',
        title: 'Infraestructura y despliegue',
        tagline: 'Despliega sin sorpresas.',
        description:
          'Entornos contenedorizados y flujos de despliegue que hacen las releases repetibles, desde un único VPS hacia arriba.',
        deliverables: [
          'Entornos de desarrollo y producción con Docker',
          'Configuración de servidores Linux y Nginx',
          'Flujos de despliegue y copias de seguridad',
        ],
      },
    ],
    packages: [
      {
        icon: 'code',
        title: 'Lanzamiento',
        description:
          'Una web enfocada que explica el producto y convierte visitas en conversaciones.',
        includes: [
          'Landing o web de marketing pequeña',
          'Construcción responsive con SEO básico',
          'Formulario de contacto o leads, analítica y despliegue',
        ],
        bestFor: 'Lanzamientos de producto, servicios freelance y campañas.',
      },
      {
        icon: 'product',
        title: 'Producto',
        description:
          'Una aplicación full-stack desde la primera pantalla hasta el despliegue en producción.',
        includes: [
          'Interfaz de producto con React y TypeScript',
          'API, autenticación y base de datos',
          'Integraciones con terceros y despliegue',
        ],
        bestFor:
          'Herramientas internas, dashboards y MVPs que necesitan funcionar de principio a fin.',
        featured: true,
      },
      {
        icon: 'automation',
        title: 'Automatiza',
        description:
          'Un flujo manual convertido en un pipeline fiable en el que tu equipo puede confiar.',
        includes: [
          'Auditoría del flujo y mapa de automatización',
          'Implementación con n8n, webhooks y APIs',
          'Integración de LLM donde aporte valor real',
        ],
        bestFor: 'Operaciones, reporting y procesos con mucho documento.',
      },
    ],
    process: [
      {
        title: 'Briefing',
        description:
          'Una llamada o email corto para entender el objetivo, las restricciones y el plazo.',
      },
      {
        title: 'Alcance',
        description:
          'Una propuesta escrita con entregables, hitos y presupuesto fijo antes de empezar.',
      },
      {
        title: 'Desarrollo',
        description:
          'Ciclos de feedback cortos, demos regulares y comunicación directa.',
      },
      {
        title: 'Entrega',
        description:
          'Despliegue, documentación y una ventana de soporte tras el lanzamiento.',
      },
    ],
    faq: [
      {
        question: '¿Cuánto cuesta un proyecto?',
        answer:
          'Depende del alcance. Después de un briefing corto envío una propuesta escrita con presupuesto fijo, para que sepas el total antes de empezar. Sin sorpresas por horas.',
      },
      {
        question: '¿Cuánto se tarda?',
        answer:
          'Las landing suelen tardar unas semanas. Las apps full-stack y las automatizaciones dependen de las integraciones y del ciclo de feedback. Recibes un plan por hitos junto con la propuesta.',
      },
      {
        question: '¿Puedes trabajar con mi stack o equipo actual?',
        answer:
          'Sí. Puedo incorporarme a un código existente de React, Node.js, Python o PHP, integrarme con tus herramientas o entregar el proyecto a tu equipo después del lanzamiento.',
      },
      {
        question: '¿Ofreces soporte continuo?',
        answer:
          'Sí. Los retainers mensuales cubren mantenimiento, nuevas funcionalidades y mejoras de automatización. Muchos proyectos empiezan con alcance cerrado y pasan a retainer tras el lanzamiento.',
      },
      {
        question: '¿Podéis mantener nuestros datos en nuestros servidores?',
        answer:
          'Sí. Despliego modelos locales con Ollama o vLLM y diseño automatizaciones que corren en tu propia infraestructura cuando los datos no pueden salir de tu red.',
      },
      {
        question: '¿Cómo empezamos?',
        answer:
          'Envíame un email corto con el problema, el plazo y las restricciones. Te responderé con los siguientes pasos y, si encaja, una propuesta.',
      },
    ],
  },
};
