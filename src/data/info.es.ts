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
  experience: [
    {
      role: 'Desarrollador Full Stack y de Automatización de Procesos',
      company: 'AMETEL',
      period: 'Feb 2024 — Actualidad',
      location: 'Sevilla, España',
      summary: 'ERP corporativo, automatización interna e infraestructura de IA local.',
      highlights: [
        'Diseño, desarrollo y mantenimiento del ERP corporativo en módulos de RRHH, finanzas, formación y gestión laboral con PHP 8.2 nativo, React y JavaScript vanilla.',
        'Automatización de procesos internos e integraciones de API con PHP y Python.',
        'Despliegue de LLMs locales con Ollama y desarrollo de agentes de IA con Python y n8n.',
        'Administración de servicios contenedorizados con Docker y Portainer sobre Ubuntu Server.',
      ],
    },
    {
      role: 'Desarrollador Full Stack',
      company: 'Oxygen Coworking',
      period: 'Mar 2023 — Ago 2023',
      location: 'Sevilla, España',
      summary: 'Dashboard interno de gestión hotelera y web corporativa.',
      highlights: [
        'Desarrollo del dashboard hotelero y la web corporativa con React, TypeScript, Redux, Sass y MongoDB.',
        'Diseño de arquitecturas de componentes modulares y gestión del estado global en paneles administrativos.',
      ],
    },
    {
      role: 'Desarrollador Front-End',
      company: 'INNN',
      period: 'Oct 2022 — Feb 2023',
      location: 'Sevilla, España',
      summary: 'Interfaz de una aplicación interna de gestión de proyectos.',
      highlights: [
        'Desarrollo de la interfaz de una app interna de gestión de proyectos con Bootstrap 5, JavaScript vanilla, HTML5 y CSS3.',
        'Trabajo con Git, GitHub y Asana en un equipo ágil.',
      ],
    },
  ],
  education: [
    {
      title: 'Técnico Superior en Desarrollo de Aplicaciones Web (DAW)',
      institution: 'Ilerna',
      period: '2021 — 2023',
    },
    {
      title: 'Formación Full Stack Developer',
      institution: 'Oxygen Academy',
      period: '2023',
    },
    {
      title: 'Certificado de inglés EF SET — C2 Proficient',
      institution: 'EF Standard English Test',
      period: 'Mar 2023',
    },
  ],
  projects: [
    {
      title: 'JM Sánchez · Cortador de Jamón',
      slug: 'jm-sanchez',
      summary: 'Web multipágina en Astro para un cortador profesional de jamón en Sevilla.',
      seoTitle: 'JM Sánchez · Cortador de Jamón — Caso de estudio Astro',
      seoDescription:
        'Cómo construí una web multipágina en Astro para un cortador de jamón en Sevilla, con páginas de servicio, SEO estructurado y presupuesto por WhatsApp.',
      problem:
        'JM Sánchez necesitaba algo más que una tarjeta de visita digital: una web creíble que explicara sus servicios para eventos, mostrara la calidad de su trabajo y convirtiera las visitas en solicitudes de presupuesto sin depender de un CMS.',
      solution:
        'Diseñé una identidad editorial en negro y oro y construí una web multipágina en Astro alrededor del recorrido de reserva: home, páginas propias para bodas, empresas, envasado al vacío y catas, precios, sobre mí y páginas legales. La galería usa un lightbox accesible, el flujo de presupuesto abre WhatsApp con los datos del evento ya rellenados, y el schema ProfessionalService junto con metadatos por página hacen que la web sea fácil de encontrar.',
      results: [
        'Nueve páginas rastreables, incluidas cuatro de servicio y una de precios',
        'Salida estática en Astro sin frameworks de cliente',
        'Galería accesible, flujo de presupuesto por WhatsApp y schema ProfessionalService',
        'Despliegue con Docker, Nginx Proxy Manager y HTTPS',
      ],
      description:
        'Una web multipágina para un cortador profesional de jamón en Sevilla: diseño editorial, páginas de servicio, galería y presupuesto por WhatsApp.',
      category: 'Landing',
      role: 'Diseño y desarrollo',
      highlights: [
        'Proyecto de cliente: identidad editorial en negro y oro en nueve páginas',
        'Astro, CSS artesanal y cero frameworks de cliente',
        'Páginas de servicio para bodas, empresas, envasado al vacío y catas',
        'Presupuesto por WhatsApp, galería accesible y SEO estructurado',
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
      summary: 'App en React para explorar, buscar y descubrir videojuegos con la API de RAWG.',
      seoTitle: "Gamer's Nest — App de juegos en React | blancodev",
      seoDescription:
        'Una app en React con la API de RAWG para descubrir juegos populares, próximos y recientes, con búsqueda en vivo, navegación por género y fichas detalladas.',
      problem:
        'Descubrir juegos está fragmentado: calendarios de lanzamiento, tiendas y valoraciones viven en sitios distintos. El objetivo era una sola interfaz para ver qué es popular, qué está por llegar y qué acaba de salir, y entrar en la ficha de un juego sin abrir cinco pestañas.',
      solution:
        'Construí una app en React 18 sobre la API de RAWG con rutas para inicio, búsqueda y detalle. Cubre el top 10 de juegos populares, próximos y recientes, permite navegar por plataforma, género y distribuidora, y muestra cada juego con descripción, valoración, tiendas, vídeo y galería de capturas con lightbox. Material UI aporta los componentes, React Router gestiona la navegación y DOMPurify sanea el HTML que devuelve la API.',
      results: [
        'Vistas de top 10 para populares, próximos y recientes',
        'Búsqueda en vivo y navegación por plataforma, género y distribuidora',
        'Fichas con descripción, vídeo, tiendas y galería de capturas',
        'Despliegue estático en GitHub Pages',
      ],
      description:
        'Una app en React para descubrir videojuegos con la API de RAWG, con vistas de lanzamientos, búsqueda en vivo, navegación por plataforma y género y fichas detalladas.',
      category: 'Frontend',
      role: 'Diseño y desarrollo',
      highlights: [
        'Top 10 de juegos populares, próximos y recientes',
        'Búsqueda en vivo y navegación por plataforma, género y distribuidora',
        'Fichas con vídeo, tiendas y galería de capturas con lightbox',
        'Contenido de API saneado y despliegue estático en GitHub Pages',
      ],
      tech: ['React', 'JavaScript', 'Material UI', 'RAWG API'],
      image: mock6,
      live: 'https://josekbm.github.io/gamers_nest/',
      source: 'https://github.com/josekbm/gamers_nest',
    },
    {
      title: "Miranda's Dashboard",
      slug: 'mirandas-dashboard',
      summary: 'Panel de administración en React para la operación hotelera.',
      seoTitle: "Miranda's Dashboard — Panel hotelero | blancodev",
      seoDescription:
        'Un panel de administración en React para la operación hotelera con rutas protegidas, tarjetas de KPIs, tablas reutilizables y tests con Cypress.',
      problem:
        'Los datos de habitaciones, reservas, contactos y usuarios estaban repartidos en vistas y hojas de cálculo. El objetivo era un panel protegido donde el equipo pudiera revisar cada área, filtrar registros y cambiar de tarea sin perder el contexto.',
      solution:
        'Construí un panel en React con login de demostración, rutas protegidas, resumen de KPIs y tablas reutilizables para habitaciones, reservas, contactos y usuarios. Redux Toolkit gestiona el estado del dominio, styled-components mantiene la interfaz coherente y un carrusel de reseñas cubre la parte pública. Los tests de Cypress comprueban el login y la protección de rutas.',
      results: [
        'Panel protegido con login, logout y vistas enrutadas',
        'Estado con Redux Toolkit para habitaciones, reservas, contactos y usuarios',
        'Tablas, filtros, tarjetas de KPIs y carrusel de reseñas reutilizables',
        'Tests end-to-end con Cypress para login y rutas protegidas',
      ],
      description:
        'Un panel de administración en React para la operación hotelera con rutas protegidas, tarjetas de KPIs, tablas reutilizables, filtros y carrusel de reseñas.',
      category: 'Frontend',
      role: 'Desarrollo frontend',
      highlights: [
        'Login de demostración con rutas protegidas y logout',
        'Tarjetas de KPIs y carrusel de reseñas para la web pública',
        'Tablas y filtros reutilizables con Redux Toolkit',
        'Tests de Cypress para login y protección de rutas',
      ],
      tech: ['React', 'Redux Toolkit', 'styled-components', 'Cypress'],
      image: mock4,
      source: 'https://github.com/josekbm/dashboard-miranda',
    },
    {
      title: "Miranda's Backend",
      slug: 'mirandas-backend',
      summary: 'API REST tipada con Express para el panel hotelero, con autenticación JWT.',
      seoTitle: "Miranda's Backend — API REST Node.js | blancodev",
      seoDescription:
        'Una API REST en TypeScript y Express para un panel hotelero, con autenticación JWT, validación y una estructura por capas.',
      problem:
        'El panel del hotel necesitaba una única fuente de verdad para habitaciones, reservas, contactos y usuarios, además de autenticación para que solo el personal identificado pudiera leer o modificar registros.',
      solution:
        'Diseñé una API tipada en Express separada en rutas, controladores, servicios y validadores. Passport gestiona el login con email y contraseña y JWT protege todas las rutas /api; express-validator comprueba los datos antes de que lleguen a la capa de servicio, y un pequeño módulo de acceso a datos persiste los cambios en un almacén JSON para que la API sea fácil de arrancar e inspeccionar durante el desarrollo.',
      results: [
        'Endpoints REST protegidos con JWT para habitaciones, reservas, contactos y usuarios',
        'Capas de rutas → controladores → servicios → validadores',
        'Validación de peticiones y manejo explícito de errores',
        'Interfaces tipadas compartidas en todo el dominio hotelero',
      ],
      description:
        'Una API REST en TypeScript y Express para el panel hotelero, con autenticación JWT, validación de peticiones y una estructura por capas.',
      category: 'Backend',
      role: 'Desarrollo backend',
      highlights: [
        'Autenticación JWT con Passport en todas las rutas /api',
        'Rutas, controladores, servicios y validadores en capas separadas',
        'Esquemas de express-validator para los datos entrantes',
        'Almacén JSON detrás de un pequeño módulo de acceso a datos',
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
      summary: 'Landing de e-commerce responsive con Sass y JavaScript vanilla.',
      seoTitle: 'OXYGENShop — Landing e-commerce responsive | blancodev',
      seoDescription:
        'Una landing de e-commerce responsive con HTML, Sass y JavaScript vanilla, con planes de precios, selector de divisas en vivo, modal y slider.',
      problem:
        'El encargo era una landing de tienda que pareciera un producto real sin usar frameworks: precios claros, selector de divisas, interacciones promocionales y un diseño que aguantara desde 320 px.',
      solution:
        'Construí una landing mobile-first con HTML semántico y Sass, con tres planes de precios, un selector de divisas que convierte los precios desde una API de tipos de cambio en vivo, un modal que aparece por tiempo o scroll, un slider y un formulario de newsletter. El menú responsive y las interacciones usan JavaScript vanilla, y los estilos están organizados como componentes reutilizables en lugar de parches por página.',
      results: [
        'Diseño responsive probado hasta 320 px',
        'Selector de divisas con tipos de cambio en vivo para EUR, USD y GBP',
        'Modal, slider y newsletter con JavaScript vanilla',
        'Estilos de componentes en Sass sin dependencias de framework',
      ],
      description:
        'Una landing de e-commerce responsive construida con HTML, Sass y JavaScript vanilla, con planes de precios, selector de divisas e interacciones promocionales.',
      category: 'Landing',
      role: 'Desarrollo frontend',
      highlights: [
        'Escaparate mobile-first que aguanta hasta 320 px',
        'Planes de precios y selector de divisas con tipos de cambio en vivo',
        'Modal, slider y newsletter con JavaScript vanilla',
        'Estilos de componentes en Sass sin dependencias de framework',
      ],
      tech: ['HTML5', 'Sass', 'JavaScript'],
      image: mock1,
      live: 'https://josekbm.github.io/OXYGENShop/',
      source: 'https://github.com/josekbm/OXYGENShop',
    },
    {
      title: 'Photo Dash',
      slug: 'photo-dash',
      summary: 'App de fotos en React y Redux con la API de Unsplash.',
      seoTitle: 'Photo Dash — App de fotos Unsplash | blancodev',
      seoDescription:
        'Una app en React y Redux con la API de Unsplash, con búsqueda en vivo, favoritos persistentes, edición y descargas en una cuadrícula responsive.',
      problem:
        'Unsplash es una gran biblioteca de imágenes, pero no una herramienta de exploración: no hay una colección personal a la que volver ni una forma rápida de guardar una foto. El objetivo era un cliente pequeño que uniera buscar, guardar y descargar en un solo flujo.',
      solution:
        'Construí una app en React con slices de Redux Toolkit para búsqueda y favoritos. La búsqueda va contra la API de Unsplash, los resultados se muestran en una cuadrícula responsive y los favoritos persisten en localStorage con acciones de añadir, editar y borrar. MUI y styled-components dan forma a la interfaz, y cada foto se puede descargar desde su modal de detalle.',
      results: [
        'Búsqueda en vivo contra la API de Unsplash',
        'Favoritos persistidos en localStorage con edición y borrado',
        'Flujo de descarga desde el modal de cada foto',
        'Cuadrícula responsive con un estado vacío propio',
      ],
      description:
        'Una app de fotos en React y Redux con la API de Unsplash, con búsqueda en vivo, favoritos persistentes y descargas.',
      category: 'Frontend',
      role: 'Desarrollo frontend',
      highlights: [
        'Integración con la API de Unsplash y búsqueda en vivo',
        'Favoritos guardados en localStorage y editables desde la colección',
        'Flujo de descarga y modal de detalle de cada foto',
        'Cuadrícula responsive con un estado vacío propio',
      ],
      tech: ['React', 'Redux Toolkit', 'Unsplash API', 'MUI'],
      image: mock2,
      live: 'https://josekbm.github.io/proyecto-fotos/',
      source: 'https://github.com/josekbm/proyecto-fotos',
    },
    {
      title: 'Hotel Miranda',
      slug: 'hotel-miranda',
      summary: 'Web de marketing de seis páginas para un hotel boutique, con SCSS y BEM.',
      seoTitle: 'Hotel Miranda — Web multipágina de hotel | blancodev',
      seoDescription:
        'Una web de marketing de seis páginas para un hotel boutique con HTML semántico, SCSS y BEM, layout compartido y navegación responsive.',
      problem:
        'Un hotel boutique necesita más que una home: habitaciones, ofertas, detalle de habitación, sobre el hotel y contacto deben compartir una misma marca y navegación, y funcionar igual de bien en el móvil.',
      solution:
        'Construí una web de seis páginas con cabecera, pie y componentes compartidos. El layout usa HTML semántico, SCSS y nomenclatura BEM, con JavaScript vanilla para el menú responsive y Swiper para los sliders de habitaciones. Un único breakpoint a 1000 px mantiene la estructura simple mientras el diseño se adapta hasta 320 px.',
      results: [
        'Seis páginas con layout y navegación compartidos',
        'Estructura de componentes con SCSS y BEM',
        'Responsive desde 320 px con un único breakpoint',
        'HTML semántico e interacciones con JavaScript',
      ],
      description:
        'Una web de marketing de seis páginas para un hotel boutique, con HTML semántico, SCSS y BEM, layout compartido y navegación responsive.',
      category: 'Landing',
      role: 'Desarrollo frontend',
      highlights: [
        'Seis páginas: home, habitaciones, detalle, ofertas, sobre el hotel y contacto',
        'Cabecera, pie y sistema de componentes compartidos',
        'SCSS con nomenclatura BEM y HTML semántico',
        'Navegación responsive y sliders de habitaciones con Swiper',
      ],
      tech: ['HTML5', 'SCSS', 'BEM', 'JavaScript', 'Swiper'],
      image: mock3,
      live: 'https://josekbm.github.io/Hotel-Miranda-HTML/',
      source: 'https://github.com/josekbm/Hotel-Miranda-HTML',
    },
    {
      title: 'API REST en .NET',
      slug: 'api-rest-dotnet',
      summary: 'API REST en .NET 7 con autenticación JWT, EF Core y SQLite.',
      seoTitle: 'API REST en .NET — Caso de estudio C# | blancodev',
      seoDescription:
        'Una API REST en .NET 7 con C#, EF Core y SQLite, con login JWT, endpoints CRUD protegidos y una estructura por capas de controladores y modelos.',
      problem:
        'Quería practicar los fundamentos de backend en un ecosistema tipado: autenticación, un modelo relacional con migraciones y endpoints CRUD que siguieran las convenciones REST en lugar de la magia del framework.',
      solution:
        'Construí una API Web en .NET 7 con dos controladores: un endpoint de login que emite un JWT y un recurso de empleados protegido con [Authorize]. Las migraciones de Entity Framework Core crean el esquema SQLite, y los controladores, modelos y acceso a datos se mantienen en capas separadas. Swagger documenta los endpoints para probarlos a mano.',
      results: [
        'Login JWT y endpoints de empleados protegidos',
        'CRUD con migraciones de EF Core sobre SQLite',
        'Controladores, modelos y acceso a datos en capas separadas',
        'Documentación Swagger para probar la API a mano',
      ],
      description:
        'Una API REST en .NET 7 construida con C#, EF Core y SQLite, con autenticación JWT y endpoints CRUD protegidos.',
      category: 'Backend',
      role: 'Desarrollo backend',
      highlights: [
        'Login JWT y [Authorize] en el recurso de empleados',
        'Migraciones de EF Core y base de datos SQLite',
        'Controladores, modelos y acceso a datos en capas separadas',
        'Swagger UI para probar los endpoints',
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
    availability: 'Disponible para nuevos proyectos',
    intro:
      'Ayudo a fundadores y equipos pequeños a lanzar productos web y a automatizar el trabajo manual que los rodea. Desde la interfaz hasta la API y el despliegue, una sola persona se hace cargo de todo el proceso.',
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
        title: 'Automatización de procesos e IA',
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
          'APIs REST, modelos de datos e integraciones diseñadas para que tu producto siga siendo fiable mientras crece. Trabajo con Python, Node.js, PHP y SQL.',
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
          'Entornos contenedorizados y flujos de despliegue que hacen las releases repetibles, desde un único VPS en adelante.',
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
          'Una web centrada en el producto que explica qué ofrece y convierte visitas en conversaciones.',
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
        bestFor: 'Operaciones, reporting y procesos con mucha documentación.',
      },
    ],
    process: [
      {
        title: 'Llamada inicial',
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
          'Depende del alcance. Después de una primera llamada corta envío una propuesta escrita con presupuesto fijo, para que sepas el total antes de empezar. Sin facturas por horas inesperadas.',
      },
      {
        question: '¿Cuánto se tarda?',
        answer:
          'Las landing suelen estar listas en unas semanas. Las apps full-stack y las automatizaciones dependen de las integraciones y del ciclo de feedback. Recibirás un plan por hitos junto con la propuesta.',
      },
      {
        question: '¿Puedes trabajar con mi stack o equipo actual?',
        answer:
          'Sí. Puedo incorporarme a un código existente de React, Node.js, Python o PHP, integrarme con tus herramientas o entregar el proyecto a tu equipo después del lanzamiento.',
      },
      {
        question: '¿Ofreces soporte continuo?',
        answer:
          'Sí. Los acuerdos mensuales cubren mantenimiento, nuevas funcionalidades y mejoras de automatización. Muchos proyectos empiezan con alcance cerrado y pasan a un acuerdo mensual tras el lanzamiento.',
      },
      {
        question: '¿Puedes mantener nuestros datos en nuestros servidores?',
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
