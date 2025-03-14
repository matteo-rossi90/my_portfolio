import { reactive } from "vue";

export const store = reactive({

    //hard skills
    hardSkill: [
        {
            name: 'HTML',
            icon: '../public/icon/html-1.svg'
        },
        {
            name: 'CSS',
            icon: '../public/icon/css-3.svg'
        },
        {
            name: 'JavaScript',
            icon: '../public/icon/logo-javascript.svg'
        },
        {
            name: 'Vue.js',
            icon: '../public/icon/vue.svg'
        },
        {
            name: 'Bootstrap',
            icon: '../public/icon/bootstrap-5-1.svg'
        },
        {
            name: 'PHP',
            icon: '../public/icon/php-4.svg'
        },
        {
            name: 'Laravel',
            icon: '../public/icon/laravel-2.svg'
        },
        {
            name: 'MySQL',
            icon: '../public/icon/mysql-logo-pure.svg'
        },
        {
            name: 'React',
            icon: '../public/icon/react-2.svg'
        }
    ],

    //soft skills
    softSkill: [
        {
            name: 'Lavoro di gruppo',
            icon: ''
        },
        {
            name: 'Gestione delle priorità',
            icon: ''
        },
        {
            name: 'Attenzione al dettaglio',
            icon: ''
        },
        {
            name: 'Disponibilità',
            icon: ''
        },
        {
            name: 'Organizzazione',
            icon: ''
        }
    ],
    

    //progetti del portfolio
    projects: [
        {
            id: 1,
            title: "Portfolio Personale",
            stack: "Full Stack",
            isResponsive: true,
            techs: ["Vue.js", "SCSS", "JavaScript"],
            category: ["Web Application", "Portfolio"],
            date: "2024-01-15",
            company: "Progetto personale",
            description: "Sito portfolio per mostrare le mie competenze e progetti, sviluppato con Vue.js e SCSS."
        },
        {
            id: 2,
            title: "E-commerce Store",
            stack: "Front-end",
            isResponsive: true,
            techs: ["React", "Redux", "Tailwind CSS"],
            category: ["E-commerce", "Web Application"],
            date: "2023-11-10",
            company: "Freelance",
            description: "Interfaccia utente per un e-commerce con gestione del carrello e pagamenti online."
        },
        {
            id: 3,
            title: "Gestione Ordini",
            stack: "Back-end",
            isResponsive: false,
            techs: ["Node.js", "Express", "MongoDB"],
            category: ["API", "Gestione dati"],
            date: "2023-09-20",
            company: "Azienda logistica",
            description: "API per gestire gli ordini e il magazzino di un'azienda di logistica, con autenticazione JWT."
        },
        {
            id: 4,
            title: "Social Media Dashboard",
            stack: "Full Stack",
            isResponsive: true,
            techs: ["React", "Node.js", "PostgreSQL"],
            category: ["Dashboard", "Social Media"],
            date: "2024-02-05",
            company: "Startup tecnologica",
            description: "Dashboard per analizzare metriche di social media e gestire post pianificati."
        },
        {
            id: 5,
            title: "Blog con CMS",
            stack: "Front-end",
            isResponsive: true,
            techs: ["Next.js", "GraphQL", "Tailwind CSS"],
            category: ["Blog", "CMS"],
            date: "2023-08-12",
            company: "Progetto accademico",
            description: "Sviluppo di un blog dinamico con CMS personalizzato per la gestione degli articoli."
        },
        {
            id: 6,
            title: "API per Servizio di Prenotazioni",
            stack: "Back-end",
            isResponsive: false,
            techs: ["Django", "REST Framework", "PostgreSQL"],
            category: ["API", "Booking System"],
            date: "2023-05-30",
            company: "Agenzia di viaggi",
            description: "API REST per la gestione delle prenotazioni di hotel e voli, con autenticazione OAuth."
        }
    ]

})