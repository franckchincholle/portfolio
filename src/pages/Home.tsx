import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PdfViewer from '../components/PdfViewer';
import { pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const sectionsData = [
    { id: "about", name: "A propos de moi" },
    { id: "experience", name: "Experience" },
    { id: "cv", name: "CV" },
    { id: "entreprise", name: "Entreprise" },
    { id: "Projects", name: "Projects" },
    { id: "veille", name: "Veille Technologique" },
];

const projectCardsData = [
    {
        title: "OnlyJob",
        subtitle: "PRE MSC",
        date: "19 Octobre 2025",
        description: "Plateforme de recherche d'emploi (job board) développée en utilisant les technologies web fondamentales.",
        tech: ["HTML", "CSS", "JavaScript"],
        status: "Coming Soon",
    },
    {
        title: "Portfolio",
        subtitle: "PRE MSC",
        date: "26 Octobre 2025",
        description: "Mon portfolio personnel que vous consultez actuellement, créé pour présenter mes compétences et mes projets.",
        tech: ["React", "TypeScript", "SCSS", "Framer Motion"],
        status: "En ligne",
    },
];

const experiencesData = [
    {
        company: "Mission Micro",
        position: "Alternant Technicien Informatique",
        date: "Août 2023 - Août 2025",
        description:
            "Installation, maintient, dépannage des équipements // Support aux utilisateurs en entreprise.",
        tech: ["Windows", "Linux", "Support"],
    },
    {
        company: "Proman",
        position: "Intérimaire",
        date: "Novembre 2022 - Août 2023",
        description:
            "Reception, mise en rayon et gestion des stocks pour le compte de OCP Répartition",
        tech: ["Manutention", "Stock", "Travail d'équipe"],
    },
];

const Home: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState("");
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const sectionElements = container.querySelectorAll(".section");
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollTop = container.scrollTop;
                    const containerHeight = container.scrollHeight - container.clientHeight;
                    const scrolled = (scrollTop / containerHeight) * 100;
                    setScrollProgress(scrolled);

                    let currentSection = "";
                    sectionElements.forEach((section) => {
                        const rect = section.getBoundingClientRect();
                        const containerTop = container.getBoundingClientRect().top;
                        if (rect.top - containerTop <= 150 && rect.bottom - containerTop >= 150) {
                            currentSection = section.id;
                        }
                    });
                    setActiveSection(currentSection);
                    ticking = false;
                });
                ticking = true;
            }
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
        event.preventDefault();
        const container = scrollContainerRef.current;
        if (!container) return;
        const position = index * 1000;
        container.scrollTo({
            top: position,
            behavior: "smooth",
        });
    };

    return (
        <div className="home">
            <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }}></div>

            <aside className="left-content">
                <div className="intro-section">
                    <h1 className="name">Chincholle Franck</h1>
                    <h2 className="tagline">PREMSC</h2>
                    <p className="bio">Recherche Alternance Cybersécurité</p>
                </div>
                <nav className="side-nav">
                    <ul>
                        {sectionsData.map((section, index) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className={activeSection === section.id ? "active" : ""}
                                    onClick={(e) => handleNavClick(e, index)}
                                >
                                    {section.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="social-icons">
                    <a href="https://github.com/fchincholle" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon fontSize="large" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/franck-chincholle-97583a246/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <LinkedInIcon fontSize="large" />
                    </a>
                </div>
            </aside>

            <main className="right-content" ref={scrollContainerRef}>
                <div className="slide-arrow">
                    <KeyboardArrowDownIcon fontSize="large" />
                </div>
                <section id="about" className="section about">
                    <h2>A propos de moi</h2>
                    <p>
                        Originaire de l'Aveyron, je suis depuis toujours passionnés par l'informatique et ces différentes branches.
                        Portés par mon envie de découvrir un environnement en plein dévellopement ainsi que par mon expérience personnelle je cherche à m'orienter dans la cybersécurité.
                    </p>
                    <p>
                        Curieux, rigoureux et toujours motivé à apprendre, j’aime relever de nouveaux défis et travailler sur des projets concrets qui allient technique et créativité.
                    </p>
                    <p>
                         Ayant obtenu mon BTS SIO option SISR en cet été 2025 et accepté à EPITECH Toulouse pour un Master of Science, je suis actuellement à la recherche d'une alternance en cybersécurité pour les 3 ans à venir à partir de Janvier 2026.
                    </p>
                </section>

                <section id="experience" className="section experience">
                    <h2>Experience</h2>
                    <div className="experiences-container">
                        {experiencesData.map((exp, index) => (
                            <div key={index} className="experience-item">
                                <div className="header">
                                    <h3>{exp.position}</h3>
                                    <span className="date">{exp.date}</span>
                                </div>
                                <span className="company">{exp.company}</span>
                                <p>{exp.description}</p>
                                {exp.tech.length > 0 && (
                                    <div className="tech-stack">
                                        {exp.tech.map((tech, i) => (
                                            <span key={i} className="tech">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section id="cv" className="section about">
                    <h2>Mon CV</h2>
                    <div>
                        <PdfViewer file={`${process.env.PUBLIC_URL}/CV.pdf`} />
                    </div>
                </section>

                <section id="entreprise" className="section about">
                    <h2>Entreprise</h2>
                    <h3>Mission Micro</h3>
                    <p>

                        Mission Micro est une entreprise basée à Beauzelle, spécialisée dans les services informatiques adaptés aux besoins des entreprises et des particuliers.
                        Depuis 2005, elle propose des solutions sur mesure en matière de réseaux, systèmes, sécurité informatique et télécoms.
                        Son équipe polyvalente intervient sur des missions variées telles que l’assistance à maîtrise d’ouvrage, la maintenance, le déploiement de postes et la formation des utilisateurs.
                        La collaboration durable entre Mission Micro et Collecte Localisation Satellite se poursuit aujourd’hui, avec pour mission d’assurer un support technique fiable et réactif aux utilisateurs de CLS.

                    </p>
                    <a href="https://www.agencemissionmicro.fr" target="_blank" rel="noopener noreferrer">
                        <img src="https://32c05b15c2.clvaw-cdnwnd.com/a5f998c5006027b58154b034ba58d825/200000000-d245ad3412/MM_logo1_carte%20de%20visite%20B.jpg?ph=32c05b15c2" alt="Logo MM" style={{ width: '60px', marginTop: '10px', marginBottom: '20px' }} />
                    </a>
                    <h3>Collecte Localisation Satellite</h3>
                    <p>

                        CLS est une entreprise française pionnière dans les solutions d'observation et de surveillance de la Terre depuis 1986.
                        CLS déploie des services satellitaires innovants pour comprendre, protéger notre planète et gérer durablement ses ressources.
                        Basée à Toulouse, elle opère dans plus de 30 pays et emploie environ 1 000 collaborateurs.
                        Ses domaines d'expertise couvrent la surveillance environnementale, la gestion durable des pêches, la sécurité maritime, la mobilité et les infrastructures énergétiques.
                        CLS est également l'opérateur exclusif du système Argos, utilisé mondialement pour le suivi d'espèces, de flottes et de données environnementales.
                    </p>
                    <a href="https://www.cls.fr" target="_blank" rel="noopener noreferrer">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Logo_CLS.jpg" alt="Logo CLS" style={{ width: '60px', marginTop: '5px', marginBottom: '5px' }} />
                    </a>
                </section>
                <section id="Projects" className="section experience">
                    <h2>Projets EPITECH</h2>
                    <div className="project-list">
                        {projectCardsData.map((project, index) => (
                            <div key={index} className="experience-item">
                                <div className="header">
                                    <h3>{project.title}</h3>
                                    <span className="project-status">{project.status}</span>
                                    <span className="date">{project.date}</span>
                                </div>
                                <span className="company">{project.subtitle}</span>
                                <p>{project.description}</p>
                                {project.tech.length > 0 && (
                                    <div className="tech-stack">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="tech">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section id="veille" className="section about">
                    <h2>Veille Technologique</h2>
                    <div className="veille-list">
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <a href="https://www.th-formations-en-cybersecurite-et-informatique.fr" target="_blank" rel="noopener noreferrer">
                                <img
                                src="https://primary.jwwb.nl/public/h/a/i/temp-kgajfdohdkbphashzqbs/image-high.png?enable-io=true&amp;enable=upscale&amp;width=229"
                                alt="TH Logo"
                                style={{ width: '100px', height: '100px', marginRight: '15px' }}
                                />
                            </a>
                            <div style={{ width: '2px', height: '80px', backgroundColor: '#b68af5', marginRight: '15px' }}></div>
                            <div>
                                <h4 style={{ margin: 0 }}>TH Formations en cybersécurité</h4>
                                <p style={{ margin: 0 }}>
                                    Une plateforme dédiée aux formations en cybersécurité et informatique, ainsi qu'une partie blog avec des articles traitant de l'actualité.
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <a href="https://www.linkedin.com/groups/4880871/" target="_blank" rel="noopener noreferrer">
                                <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1024px-LinkedIn_icon.svg.png"
                                alt="Linkedin logo"
                                style={{ width: '100px', height: '100px', marginRight: '15px' }}
                                />
                            </a>
                            <div style={{ width: '2px', height: '80px', backgroundColor: '#b68af5', marginRight: '15px' }}></div>
                            <div>
                                <h4 style={{ margin: 0 }}>LinkedIn</h4>
                                <p style={{ margin: 0 }}>
                                    LinkedIn est une plateforme professionnelle essentielle pour le réseautage et la veille en cybersécurité. Des groupes comme "Sécurité informatique, Cybersécurité & Protection des emails" réunissent des experts partageant actualités, analyses et solutions sur les cybermenaces.
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <a href="https://www.reddit.com" target="_blank" rel="noopener noreferrer">
                                <img
                                src="https://yt3.googleusercontent.com/ZBnkDCcneFV2uCrAOIzTCN4ItYEMoq6LFLs36qbJ0q6pPkQh1YVusaIsx5Hqn8n5BpYIhlg1Tg=s900-c-k-c0x00ffffff-no-rj"
                                alt="Reddit logo"
                                style={{ width: '100px', height: '100px', marginRight: '15px' }}
                                />
                            </a>
                            <div style={{ width: '2px', height: '80px', backgroundColor: '#b68af5', marginRight: '15px' }}></div>
                            <div>
                                <h4 style={{ margin: 0 }}>Reddit</h4>
                                <p style={{ margin: 0 }}>
                                    Une communauté en ligne où les utilisateurs partagent et discutent des actualités, des outils et des stratégies en cybersécurité, notamment via des subreddits comme r/cybersecurity.
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                <img
                                src="data:image/png;base64,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"
                                alt="YT logo"
                                style={{ width: '100px', height: '100px', marginRight: '15px' }}
                                />
                            </a>
                            <div style={{ width: '2px', height: '80px', backgroundColor: '#b68af5', marginRight: '15px' }}></div>
                            <div>
                                <h4 style={{ margin: 0 }}>Youtube</h4>
                                <p style={{ margin: 0 }}>
                                    Une plateforme vidéo mondiale où les créateurs partagent des tutoriels, conférences et analyses sur la cybersécurité, idéale pour apprendre et suivre les dernières tendances techniques.
                                    Exemple : @Micode , @Underscore_
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <a href="https://www.actuia.com" target="_blank" rel="noopener noreferrer">
                                <img
                                src="https://media.licdn.com/dms/image/v2/C560BAQFPf4kDosaSSw/company-logo_200_200/company-logo_200_200/0/1631433984114?e=2147483647&v=beta&t=V95dVJ3a0uddluRAnKbVBsBYZUr4_fVypS0vw890Ob8"
                                alt="Wiki logo"
                                style={{ width: '100px', height: '100px', marginRight: '15px' }}
                                />
                            </a>
                            <div style={{ width: '2px', height: '80px', backgroundColor: '#b68af5', marginRight: '15px' }}></div>
                            <div>
                                <h4 style={{ margin: 0 }}>Actu IA</h4>
                                <p style={{ margin: 0 }}>
                                    Actu IA est un site français dédié à l’actualité de l’intelligence artificielle, couvrant innovations, recherches et applications. Il propose des articles, analyses et interviews pour suivre les tendances de l’IA.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

            </main>
        </div>
    );
};

export default Home;
