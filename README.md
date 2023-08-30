JECKO
## Presentazione del Progetto:
Il progetto è un'applicazione web sviluppata con React, Redux Toolkit, Bootstrap (frontend) e Express con MongoDB (back-end). L'obiettivo principale è creare un'app in grado 
di geolocalizzare gli utenti e mostrare i campi pubblici di basket e calcio nelle vicinanze. 
Gli utenti possono creare eventi su questi campi, rappresentati da bandierine sulla 
mappa, dove possono organizzare partite in un determinato periodo di tempo. Altri 
utenti possono unirsi agli eventi fino a raggiungere un numero limite di partecipanti, a 
seconda dello sport. Inoltre, una chat di gruppo sarà generata automaticamente per gli 
utenti partecipanti agli eventi, consentendo loro di organizzarsi e discutere i dettagli 
dell'evento, come chi porterà il pallone...
## Funzionalità Principali:
• Geolocalizzazione Utente e Mappe Interattive: L'app sfrutta la potenza delle 
Google Maps API per geolocalizzare gli utenti e visualizzare i campi sportivi sulla 
mappa. I marcatori dinamici forniscono informazioni dettagliate sui campi 
disponibili.
• Creazione di Eventi e Gestione: Gli utenti possono facilmente creare eventi 
sportivi su campi specifici, con la possibilità di specificare sport (basket o calcio), 
data, orario e numero massimo di partecipanti. L'integrazione con MongoDB 
consente la memorizzazione efficiente delle informazioni sugli eventi.
• Partecipazione agli Eventi: Gli utenti possono unirsi agli eventi creati da altri 
utenti, con il sistema di limiti di partecipazione basato sul tipo di sport. 
L'intuitiva gestione degli eventi è supportata da Redux Toolkit per garantire 
un'esperienza senza interruzioni.
• Chat di Gruppo in Tempo Reale: L'applicazione utilizza Socket.IO per fornire 
chat di gruppo in tempo reale per gli eventi. Gli utenti possono facilmente 
comunicare e coordinarsi all'interno di un evento specifico.
• Caricamento e Gestione delle Immagini: Cloudinary è integrato per il 
caricamento e la gestione delle immagini. Gli utenti possono aggiungere foto ai 
loro profili o agli eventi, migliorando l'esperienza visiva.
## Tecnologie Utilizzate:
• Front-end: React è la spina dorsale del front-end, consentendo una gestione 
efficiente delle interfacce utente complesse. Redux Toolkit è utilizzato per la 
gestione dello stato, garantendo un flusso dati coerente.
• Design e Stile: Bootstrap viene utilizzato per il design e lo stile dell'applicazione, 
garantendo un aspetto moderno e responsive.
• Back-end: Express.js gestisce le richieste degli utenti, gestisce le operazioni 
CRUD per gli eventi e le chat, e si occupa dell'autenticazione e dell'autorizzazione 
degli utenti.
• Database: MongoDB è utilizzato per l'archiviazione dei dati, consentendo una 
struttura flessibile e scalabile.
• Chat in Tempo Reale: Socket.IO è utilizzato per implementare chat di gruppo in 
tempo reale.
• Gestione delle Immagini: Cloudinary gestisce il caricamento e la gestione delle 
immagini utente e dei campetti.
• Mappe e Geolocalizzazione: L'applicazione sfrutta le Google Maps API per 
geolocalizzare gli utenti e visualizzare i campi sportivi sulla mappa con marcatori 
interattivi.
Questo progetto è progettato per offrire agli appassionati di sport un modo coinvolgente 
per organizzare e partecipare a partite, sfruttando tecnologie avanzate per rendere 
l'esperienza più ricca e interattiva.