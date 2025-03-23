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
            icon: 'https://img.icons8.com/dusk/100/chat.png'
        },
        {
            name: 'Gestione delle priorità',
            icon: 'https://img.icons8.com/dusk/100/high-priority.png'
        },
        {
            name: 'Attenzione al dettaglio',
            icon: 'https://img.icons8.com/dusk/100/search--v1.png'
        },
        {
            name: 'Flessibilità',
            icon: 'https://img.icons8.com/dusk/100/sorting-arrows-horizontal.png'
        },
        {
            name: 'Organizzazione',
            icon: 'https://img.icons8.com/dusk/100/folder-invoices.png'
        }
    ],

    //perché scegliere me
    qualities:[
        {
            title: 'Design semplice',
            desc: 'Template con grafica semplice, lineare e ricca di interazioni per un\'estetica gradevole',
            icon: '../public/icon/progettazione1.png',
            iconDef: '../public/icon/progettazione1.png',
            iconGif: '../public/icon/progettazione.gif'
        },
        {
            title: 'Codice manutenibile',
            desc: 'Codice comprensibile, semplice da leggere e facilmente modificabile',
            icon: '../public/icon/pc1.png',
            iconDef: '../public/icon/pc1.png',
            iconGif: '../public/icon/pc.gif'
        },
        {
            title: 'Creatività',
            desc: 'Cerco sempre di sperimentare nuovi approcci e nuove metodologie quando sviluppo',
            icon: '../public/icon/lampadina1.png',
            iconDef: '../public/icon/lampadina1.png',
            iconGif: '../public/icon/lampadina2.gif'
        }
    ],
    

    //progetti del portfolio
    projects: [
        {
            id: 1,
            title: "ReactCalculator",
            stack: "Front-end",
            isResponsive: true,
            techs: ["React.js", "CSS", "JavaScript"],
            category: ["Web Application", "Calcolatore"],
            date: "2025",
            thumb: "../public/calculator.png",
            company: "Progetto personale",
            text: "Calcolatore che esegue operazioni matematiche semplici."
        },
        {
            id: 2,
            title: "PuzzleGame",
            stack: "Front-end",
            isResponsive: false,
            techs: ["JavaScript", "HTML", "CSS"],
            category: ["Web application", "Game"],
            date: "2025",
            thumb: "../public/puzzle.png",
            company: "Progetto personale",
            text: "Gioco di puzzle tradizionale dove si possono scegliere diversi livelli di difficoltà."
        },
        {
            id: 3,
            title: "BoolBnB",
            stack: "Full Stack",
            isResponsive: true,
            techs: ["Vue.js", "HTML", "SCSS", "JavaScript", "Bootstrap", "Laravel", "PHP", "MySQL"],
            category: ["API", "Web application", "e-commerce"],
            date: "2024",
            thumb: "../public/boolbnb.png",
            company: "Progetto Boolean",
            text: "Web application per ricercare e gestire appartamenti da mettere in affitto."
        },
        {
            id: 4,
            title: "AnimeTech",
            stack: "Front-end",
            isResponsive: false,
            techs: ["Vue.js", "HTML", "CSS", "Bootstrap", "JavaScript"],
            category: ["sito vetrina", "anime"],
            date: "2024",
            thumb: "../public/animetech.png",
            company: "Progetto Boolean",
            text: "Sito vetrina di un venditore di prodotti e anime giapponesi"
        },
        {
            id: 5,
            title: "Boolzapp",
            stack: "Front-end",
            isResponsive: true,
            techs: ["Vue.js", "HTML", "CSS", "JavaScript"],
            category: ["Web application", "Social media", "Chat"],
            date: "2024",
            thumb: "../public/boolzapp.png",
            company: "Progetto Boolean",
            text: "Replica template di WhatSapp per scambiare messaggi."
        },
        {
            id: 6,
            title: "Boolflix",
            stack: "Front-end",
            isResponsive: true,
            techs: ["Vue.js", "HTML", "CSS", "JavaScript"],
            category: ["API", "Web application"],
            date: "2024",
            thumb: "../public/boolflix.png",
            company: "Progetto Boolean",
            text: "Replica template di Netflix per cercare film e serie TV."
        }
    ]

})