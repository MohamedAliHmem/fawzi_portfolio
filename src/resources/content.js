import { Logo } from "@once-ui-system/core";

// Helper function for asset paths in production
const assetPath = (path) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/fawzi_portfolio' : '';
  
  // If the path already contains the basePath, return it as is
  if (path.startsWith('/fawzi_portfolio/')) {
    return path;
  }
  
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}/${cleanPath}`;
};

const person = {
  firstName: "Fawzi",
  lastName: "HMEM",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Technicien Audiovisuel",
  avatar: assetPath("/images/avatar.jpg"),
  email: "Faouizi574hm@gmail.com",
  location: "Tunisien", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Français", "Anglais", "Arabe"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Abonnez-vous à la newsletter de {person.firstName}</>,
  description: (
    <>
      Je partage régulièrement mes expériences en audiovisuel, les dernières technologies
      et mes réflexions sur l'évolution du secteur multimédia.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/fawzi-hmem/",
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/fawzi_hmem",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
  {
    name: "CV",
    icon: "download",
    link: assetPath("/cv/Fawzi Hmem.pdf"),
  },
];

const home = {
  path: "/",
  image: assetPath("/images/og/home.jpg"),
  label: "Accueil",
  title: `Portfolio de ${person.name}`,
  description: `Portfolio professionnel présentant mon travail en tant que ${person.role}`,
  headline: <>Créer des expériences audiovisuelles immersives</>,
  featured: {
    display: false,
    title: <>Projet récent: <strong className="ml-4">Production Audiovisuelle</strong></>,
    href: "/work/production-audiovisuelle",
  },
  subline: (
    <>
      Je suis Fawzi, technicien audiovisuel passionné par la création de contenus multimédias
      <br /> et la maîtrise des technologies de production audiovisuelle.
    </>
  ),
};

const about = {
  path: "/about",
  label: "À propos",
  title: `À propos – ${person.name}`,
  description: `Découvrez ${person.name}, ${person.role} basé en Tunisie`,
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com/fawzi-hmem",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Fawzi est un technicien audiovisuel passionné avec une expertise dans la production,
        la post-production et la diffusion de contenus multimédias. Son travail couvre
        l'enregistrement audio, la prise de vue vidéo, le montage et la maîtrise des
        technologies audiovisuelles modernes.
      </>
    ),
  },
  work: {
    display: false, // set to false to hide this section
    title: "Expérience Professionnelle",
    experiences: [
      {
        company: "Studio de Production Audiovisuelle",
        timeframe: "2020 - Présent",
        role: "Technicien Audiovisuel Senior",
        achievements: [
          <>
            Supervision de la production audiovisuelle complète, de la pré-production à la
            post-production, avec une amélioration de 25% de l'efficacité des workflows.
          </>,
          <>
            Mise en place d'un système de gestion des équipements audiovisuels permettant
            une réduction de 30% des temps de préparation.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: assetPath("/images/projects/project-01/cover-01.jpg"),
            alt: "Production Audiovisuelle",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Société de Communication",
        timeframe: "2017 - 2020",
        role: "Technicien Audiovisuel",
        achievements: [
          <>
            Réalisation de plus de 100 productions audiovisuelles incluant documentaires,
            publicités et événements corporatifs.
          </>,
          <>
            Formation et encadrement d'une équipe de 5 techniciens juniors, contribuant
            à l'amélioration globale de la qualité des productions.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Formation",
    institutions: [
      {
        name: "Institut Supérieur des Arts Multimédias",
        description: <>Formation en techniques audiovisuelles et production multimédia.</>,
      },
      {
        name: "Centre de Formation Professionnelle",
        description: <>Certification en maintenance et réparation d'équipements audiovisuels.</>,
      },
    ],
  },
  technical: {
    display: false, // set to false to hide this section
    title: "Compétences Techniques",
    skills: [
      {
        title: "Production Audiovisuelle",
        description: <>Maîtrise complète des techniques de prise de vue, d'éclairage et de prise de son pour tous types de productions.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: assetPath("/images/projects/project-01/cover-02.jpg"),
            alt: "Production audiovisuelle",
            width: 16,
            height: 9,
          },
          {
            src: assetPath("/images/projects/project-01/cover-03.jpg"),
            alt: "Équipement audiovisuel",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Post-Production",
        description: <>Expertise en montage vidéo, mixage audio et étalonnage avec Adobe Premiere Pro, Final Cut Pro et DaVinci Resolve.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: assetPath("/images/projects/project-01/cover-04.jpg"),
            alt: "Post-production",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Équipements Audiovisuels",
        description: <>Installation, configuration et maintenance d'équipements professionnels : caméras, micros, consoles de mixage, éclairages.</>,
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Écrits sur l'audiovisuel et la technologie...",
  description: `Découvrez les dernières réflexions de ${person.name} sur l'audiovisuel`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Projets",
  title: `Projets – ${person.name}`,
  description: `Projets audiovisuels et productions de ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Galerie",
  title: `Galerie photo – ${person.name}`,
  description: `Collection de photos et projets audiovisuels de ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: assetPath("/images/gallery/horizontal-1.jpg"),
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: assetPath("/images/gallery/horizontal-2.jpg"),
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: assetPath("/images/gallery/horizontal-3.jpg"),
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: assetPath("/images/gallery/horizontal-4.jpg"),
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: assetPath("/images/gallery/vertical-1.jpg"),
      alt: "image",
      orientation: "vertical",
    },
    {
      src: assetPath("/images/gallery/vertical-2.jpg"),
      alt: "image",
      orientation: "vertical",
    },
    {
      src: assetPath("/images/gallery/vertical-3.jpg"),
      alt: "image",
      orientation: "vertical",
    },
    {
      src: assetPath("/images/gallery/vertical-4.jpg"),
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
