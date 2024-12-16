document.addEventListener('wheel', function (e) {
    const hero = document.querySelector('.hero');
    const portfolio = document.querySelector('.portfolio');

    if (e.deltaY > 0) {
        // Scroll nach unten: Erste Seite ausblenden, zweite einblenden
        if (!hero.classList.contains('animate')) {
            hero.classList.add('animate');
            portfolio.classList.add('animate');
        }
    }
});

window.addEventListener('load', function() {
    // Scrollt beim Laden der Seite zur obersten Position
    window.scrollTo(0, 0);
});


document.getElementById('scrollButton').addEventListener('click', function () {
    const hero = document.querySelector('.hero');
    const portfolio = document.querySelector('.portfolio');

    // Erste Seite ausblenden und zweite Seite einblenden
    hero.classList.add('animate');
    portfolio.classList.add('animate');

    // Sanft an den Anfang der zweiten Seite scrollen
    const targetPosition = portfolio.offsetTop; // Die obere Position der zweiten Seite
    window.scrollTo({
        behavior: 'smooth',
        block: "start"
    });
});

document.addEventListener('wheel', function (e) {
    const hero = document.querySelector('.hero');
    const portfolio = document.querySelector('.portfolio');

    const currentScroll = window.scrollY; // Aktuelle Scroll-Position
    const portfolioTop = portfolio.offsetTop; // Startpunkt der zweiten Seite

    console.log('Current Scroll:', currentScroll);
    console.log('Portfolio Top:', portfolioTop);


    // Überprüfen, ob nach unten oder oben gescrollt wird
    if (e.deltaY > 0) {
        // Nach unten gescrollt - Animation der ersten Seite abspielen
        if (!hero.classList.contains('animate')) {
            hero.classList.add('animate');
            portfolio.classList.add('animate');
        }
    } else {
        // Nach oben gescrollt - Nur, wenn wir am Anfang der zweiten Seite sind
        if (currentScroll <= portfolioTop + 10 && hero.classList.contains('animate')) {
            hero.classList.remove('animate');
            portfolio.classList.remove('animate');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
});




    //-----------------------------//
   //                             //
  //         STERNE              //
 //                             //
//-----------------------------//
document.addEventListener('DOMContentLoaded', () => {
    const starsContainer = document.querySelector('.stars-container');

    // Maximalanzahl der Sterne
    const maxStars = 130;
    let currentStars = 0;

    // Funktion zum Erzeugen der Sterne
    function generateStars(amount = 90) {
        for (let i = 0; i < amount; i++) {
            if (currentStars >= maxStars) return; // Verhindert, dass mehr Sterne als maxStars hinzugefügt werden

            const star = document.createElement('div');
            star.classList.add('star');
            
            // Zufällige Positionen für die Sterne (oberhalb und innerhalb des sichtbaren Bereichs)
            const topPosition = (Math.random() * 110) - 15 + 'vh'; // Sterne können oberhalb des Bildschirms erscheinen
            star.style.top = topPosition;
            star.style.left = Math.random() * 100 + 'vw';

            // Zufällige Größen
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            // Zufällige Geschwindigkeiten für den Parallax-Effekt
            const speedClass = Math.random() > 0.5 ? 'parallax-slow' : (Math.random() > 0.5 ? 'parallax-medium' : 'parallax-fast');
            star.classList.add(speedClass);

            starsContainer.appendChild(star);
            currentStars++;
        }
    }

    // Funktion, um die Position der Sterne beim Scrollen zu ändern (Parallax-Effekt)
    function moveStarsOnScroll() {
        const scrollPosition = window.scrollY;
        const stars = document.querySelectorAll('.star');
        
        stars.forEach(star => {
            // Berechnung der neuen Position auf Basis der Scroll-Position
            const speed = star.classList.contains('parallax-slow') ? 0.3 : (star.classList.contains('parallax-medium') ? 0.5 : 1);
            const offset = scrollPosition * speed;

            // Position des Sterns anpassen
            star.style.transform = `translateY(${offset}px)`;
        });

        // Neue Sterne hinzufügen, sowohl oben als auch unten
        if (scrollPosition + window.innerHeight >= document.body.scrollHeight - 30) {
            generateStars(10); // Sterne unten hinzufügen
        }

        if (scrollPosition <= 10) {
            generateStars(30); // Sterne oben hinzufügen, wenn am Anfang der Seite
        }
    }

    // Funktion für Sternschnuppen
    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');
        
        // Zufällige Startposition
        shootingStar.style.left = Math.random() * 100 + 'vw';
        shootingStar.style.top = -10 + 'px'; // Startet knapp über dem Bildschirm

        // Zufällige Geschwindigkeit der Sternschnuppe
        const speed = Math.random() * 3 + 2; // Zwischen 2s und 5s für die Bewegung
        shootingStar.style.animationDuration = `${speed}s`;

        starsContainer.appendChild(shootingStar);

        // Entfernt die Sternschnuppe, nachdem die Animation abgeschlossen ist
        setTimeout(() => {
            shootingStar.remove();
        }, speed * 1000); // Umrechnung in Millisekunden
    }

    // Funktion, um den Scroll-Event für mobile Geräte zu optimieren
    function handleScroll() {
        // Alle 10ms wird geprüft, ob neue Sterne benötigt werden
        setTimeout(() => {
            moveStarsOnScroll();
        }, 10);
    }

    // Sterne generieren (erstmalig)
    generateStars(50); // Zuerst 50 Sterne generieren

    // Scroll-Event hinzufügen
    window.addEventListener('scroll', moveStarsOnScroll);

    // Event-Listener für Scrollen und Touchen hinzufügen
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchmove', handleScroll, { passive: true }); // Für mobile Geräte

    // Initiale Position der Sterne beim Laden der Seite einstellen
    moveStarsOnScroll();

    // Alle 5-10 Sekunden eine neue Sternschnuppe erstellen
    setInterval(createShootingStar, Math.random() * 5000 + 5000); // Zufälliges Intervall zwischen 5 und 10 Sekunden
});









window.addEventListener('scroll', function() {
    const visualcard = document.querySelector('.infocard');

    // Überprüfen, ob der Benutzer das Ende der Seite erreicht hat
    const bottomOfPage = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight;

    // Wenn das Ende erreicht wird, die Karte sichtbar machen
    if (bottomOfPage) {
        visualcard.style.opacity = 1;  // Karte sichtbar machen
        visualcard.style.pointerEvents = 'auto';  // Interaktionen aktivieren
    }
});



document.getElementById('copyButton').addEventListener('click', function() {
    // Den Text des Elements abrufen
    const textToCopy = document.getElementById('textToCopy').textContent;

    // Text in die Zwischenablage kopieren
    navigator.clipboard.writeText(textToCopy).then(function() {
        console.log('Text wurde in die Zwischenablage kopiert!');
    }).catch(function(error) {
        console.error('Fehler beim Kopieren in die Zwischenablage: ', error);
    });
});

document.getElementById('copyButton2').addEventListener('click', function() {
    // Den Text des Elements abrufen
    const textToCopy2 = document.getElementById('textToCopy2').textContent;

    // Text in die Zwischenablage kopieren
    navigator.clipboard.writeText(textToCopy2).then(function() {
        console.log('Text wurde in die Zwischenablage kopiert!');
    }).catch(function(error) {
        console.error('Fehler beim Kopieren in die Zwischenablage: ', error);
    });
});



    document.getElementById("scrollbutton").addEventListener("click", function() {
        document.getElementById("Portfolio").scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
        });
    });





