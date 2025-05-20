import { Logo } from "@/once-ui/components";

const person = {
  firstName: "Samet",
  lastName: "Erkalp",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Bioinformatician & Machine Learning Researcher",
  avatar: "/images/avatar.jpg",
  email: "sameterkalpofficial@gmail.com",
  location: "Europe/Istanbul", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Turkish"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I share insights about bioinformatics, machine learning in drug discovery,
      and the latest developments in computational biology.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Abdussamed-1",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/samet-erkalp-5b043a249/",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Bioinformatics & Machine Learning Enthusiast</>,
  featured: {
    display: true,
    title: <>Latest project: <strong className="ml-4">Drug Discovery AI</strong></>,
    href: "/work/drug-discovery-ai",
  },
  subline: (
    <>
      I'm Samet, a Bioinformatician passionate about combining biological sciences with machine learning.
      <br /> Currently working on drug discovery and molecular docking methods.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://www.notion.so/1272c4a6b53b809f912cd954e4a05b0f?v=1272c4a6b53b819eaf21000c6079e78f",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
    Samet is a Bioinformatician based in Istanbul, 
    Turkey, working on research learning and building 
    the integration of biological sciences and machine learning methods. 
    His work is in the areas of drug discovery molecular docking methods and machine learning methods in biological sciences.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Bioinformatics Research Lab",
        timeframe: "2023 - Present",
        role: "Research Assistant",
        achievements: [
          <>
            Developed machine learning models for drug-target interaction prediction, achieving 85% accuracy
            in virtual screening.
          </>,
          <>
            Implemented molecular docking algorithms to optimize drug discovery pipeline, reducing
            computational time by 40%.
          </>,
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Drug Discovery Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Computational Biology Center",
        timeframe: "2022 - 2023",
        role: "Bioinformatics Intern",
        achievements: [
          <>
            Analyzed genomic data using Python and R, contributing to 3 published research papers
            in computational biology.
          </>,
          <>
            Developed automated pipelines for sequence analysis, improving processing efficiency by 60%.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Inonu University",
        description: <>MSc in Bioinformatics and Computational Biology</>,
      },
      {
        name: "Inonu University",
        description: <>BSc in Molecular Biology and Genetics</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Machine Learning",
        description: <>Expertise in developing ML models for drug discovery and protein structure prediction using PyTorch and scikit-learn.</>,
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "ML Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Bioinformatics Tools",
        description: <>Proficient in molecular docking, sequence analysis, and structural bioinformatics using tools like AutoDock, BLAST, and PyMOL.</>,
        images: [
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Bioinformatics Tools",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Programming",
        description: <>Advanced programming skills in Python, R, and shell scripting for biological data analysis and automation.</>,
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Programming",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Bioinformatics and Machine Learning projects by ${person.name}`,
  projects: [
    {
      title: "Drug Discovery AI",
      description: "Machine learning-based drug discovery platform for predicting drug-target interactions",
      technologies: ["Python", "PyTorch", "scikit-learn", "AutoDock"],
      image: "/images/projects/project-01/drug-discoverycover.jpg",
      link: "/work/drug-discovery-ai",
      featured: true
    },
    {
      title: "Protein Structure Prediction",
      description: "Deep learning model for predicting protein structures using sequence data",
      technologies: ["Python", "TensorFlow", "BioPython", "PyMOL"],
      image: "/images/projects/protein-structure/cover.jpg",
      link: "/work/protein-structure-prediction",
      featured: true
    },
    {
      title: "Genomic Data Analysis Pipeline",
      description: "Automated pipeline for analyzing and visualizing genomic data",
      technologies: ["Python", "R", "Bash", "Docker"],
      image: "/images/projects/genomic-analysis/cover.jpg",
      link: "/work/genomic-analysis-pipeline",
      featured: false
    },
    {
      title: "Molecular Docking Optimization",
      description: "Optimized molecular docking algorithms for faster drug screening",
      technologies: ["Python", "AutoDock", "OpenMM", "RDKit"],
      image: "/images/projects/molecular-docking/cover.jpg",
      link: "/work/molecular-docking-optimization",
      featured: false
    }
  ]
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
