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
            category: ["Web Application", "Calcolatore", "App Mobile"],
            date: "Febbraio 2025",
            thumb: "../public/calculator.png",
            company: "Progetto personale",
            text: "Calcolatore che esegue operazioni matematiche semplici.",
            descr: "Piccola applicazione per calcoli di base e semplici. Ha la possibilità di cancellare il risultato per ricominciare da capo e la lunghezza del numero di adegua al contenitore. Un pulsante consente di passare da una modalità diurna con un layout chiaro a una modalitò notturna con layout più scuro. L\'applicazione, per quanto semplice, è stata utile sia per consolidare le conoscenze acquisite con React.js relative alla suddivisione in componenti, UseState e useEffect sia per ampliare nuove logiche di sviluppo. Dal lato di design, invece, mi ha permesso di sperimentare la visualizzazione in Grid."
        },
        {
            id: 2,
            title: "PuzzleGame",
            stack: "Front-end",
            isResponsive: false,
            techs: ["JavaScript", "HTML", "CSS"],
            category: ["Web application", "Game"],
            date: "Dicembre 2024 - Gennaio 2025",
            thumb: "../public/puzzle.png",
            company: "Progetto personale",
            text: "Gioco di puzzle tradizionale dove si possono scegliere diversi livelli di difficoltà.",
            descr: "Si tratta di un gioco di puzzle tradizione in cui l'utente deve ricostruire l'immagine originaria ricomponendo i tasselli nell'ordine stabilito. Si possono scegliere diversi livelli di difficoltà (facile, medio, difficile) e in base al tipo di difficoltà si avrà un'esperienza di gioco differente. Nel gioco sono state caricate 9 immagini, tre per ogni livello di difficoltà. Questa piccola applicazione è stata utile per ampliare le conoscenze in JavaScript e consolidare le conoscenze già acquisite "
        },
        {
            id: 3,
            title: "TechNGo",
            stack: "Back-end",
            isResponsive: false,
            techs: ["Laravel", "PHP", "HTML", "SCSS"],
            category: ["Dashboard", "Web application"],
            date: "Novembre 2024",
            thumb: "../public/TechNGo.png",
            company: "Progetto personale",
            text: "Dashboard per la gestione di ticket per servizio utenti",
            descr: "Si tratta di un'applicazione, sviluppata in Laravel, che permette a un utente di un'azienda fittizia specializzata nel settore informatico di gestire ticket di supporto. L'utente amministratore può creare un ticket, stabilire la categoria del problema riscontrato e assegnare gli operatori in quel momento disponibili."
        },
        {
            id: 4,
            title: "BoolBnB",
            stack: "Full Stack",
            isResponsive: true,
            techs: ["Vue.js", "HTML", "SCSS", "JavaScript", "Bootstrap", "Laravel", "PHP", "MySQL"],
            category: ["API", "Web application", "e-commerce"],
            date: "Ottobre - Novembre 2024",
            thumb: "../public/boolbnb.png",
            company: "Progetto Boolean",
            text: "Web application per ricercare e gestire appartamenti da mettere in affitto.",
            descr: "L'applicazione permette a utenti proprietari di registrarsi per caricare gli appartamenti da mettere in affitto nella piattaforma attraverso una dashboard personale. Gli utenti interessati possono ricercare l'appartamento che gli interessa sfruttando la ricerca geografica, che si basa sull'indirizzo. Gli utenti interessati possono contattare i proprietari, che possono gestire i messaggi in una casella posta nella loro dashboard"
        },
        {
            id: 5,
            title: "AnimeTech",
            stack: "Front-end",
            isResponsive: false,
            techs: ["Vue.js", "HTML", "CSS", "Bootstrap", "JavaScript"],
            category: ["sito vetrina", "anime"],
            date: "Luglio 2024",
            thumb: "../public/animetech.png",
            company: "Progetto Boolean",
            text: "Sito vetrina di un venditore di prodotti e anime giapponesi",
            descr: "Il sito presenta un'organizzazione o società fittizia che vende prodotti e anime giapponesi. Esso è costituito da alcuni sliders che presentano i prodotti venduti e i video più legati al mondo anime, mentre una pagina rimanda ai contatti e alle informazioni personali della società. Nella pagina dei contatti, oltre a trovare i principali recapiti, si trovano il form da compilare per contattare il reparto amministratore della società e la mappa che geolocalizza le società"
        },
        {
            id: 6,
            title: "Boolzapp",
            stack: "Front-end",
            isResponsive: true,
            techs: ["Vue.js", "HTML", "CSS", "JavaScript"],
            category: ["Web application", "Social media", "Chat", "App Mobile"],
            date: "Giugno - Luglio 2024",
            thumb: "../public/boolzapp.png",
            company: "Progetto Boolean",
            text: "Replica template di WhatSapp per scambiare messaggi.",
            descr: "Applicazione che permette agli utenti di scambiare messaggi con contatti preesistenti, che possono inviare a loro volta dei messaggi di risposta. All'invio del messaggio da parte dell'utente, il sistema simula la connessione online del contatto e il momento in cui scrive il messaggio. Ttutti i messaggi di risposta sono generati casualmente, per cui non sono legati ai messaggi dell'utente. Un filtro permette di cercare determinati contatti"
        },
        {
            id: 7,
            title: "Boolflix",
            stack: "Front-end",
            isResponsive: true,
            techs: ["Vue.js", "HTML", "CSS", "JavaScript"],
            category: ["API", "Web application"],
            date: "Luglio 2024",
            thumb: "../public/boolflix.png",
            company: "Progetto Boolean",
            text: "Replica template di Netflix per cercare film e serie TV.",
            descr: "L'applicazione permette agli utenti di ricercare un film o serie TV attraverso una barra di ricerca posta in alto.  "
        }
    ]

})