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
        top: targetPosition,
        behavior: 'smooth'
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

    // Funktion zum Erzeugen der Sterne
    function generateStars() {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Zufällige Positionen für die Sterne
            star.style.top = Math.random() * 100 + 'vh';
            star.style.left = Math.random() * 100 + 'vw';
            
            // Zufällige Größen
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            // Zufällige Geschwindigkeiten für den Parallax-Effekt
            const speedClass = Math.random() > 0.5 ? 'parallax-slow' : (Math.random() > 0.5 ? 'parallax-medium' : 'parallax-fast');
            star.classList.add(speedClass);

            starsContainer.appendChild(star);
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
    }

    // Sterne generieren
    generateStars();

    // Scroll-Event hinzufügen
    window.addEventListener('scroll', moveStarsOnScroll);
    
    // Initiale Position der Sterne beim Laden der Seite einstellen
    moveStarsOnScroll();
});



