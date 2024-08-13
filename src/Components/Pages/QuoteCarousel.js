/* eslint-disable no-undef */
/* eslint-disable no-inner-declarations */
import defaultImage from '../../img/tingey-injury-law-firm-unsplash-low-res.jpg';

const QuoteCarousel = () => {
  const id = localStorage.getItem('intervalId');
  if (id) clearInterval(id);
  displayQuotes();
};

async function displayQuotes() {
    try {
        const response = await fetch('/api/quotes');
        const quotes = await response.json();

        if (quotes.length === 0) return;

        let currentQuoteIndex = 0;
        const usedQuotes = new Set();

        const main = document.querySelector('main');
        main.innerHTML = '';
        
        const carousel = document.createElement('div');
        carousel.classList.add('carousel');
        
        const carouselInner = document.createElement('div');
        carouselInner.classList.add('carousel-inner');
        carousel.appendChild(carouselInner);
        main.appendChild(carousel);

        function displayNextQuote() {
            if (usedQuotes.size === quotes.length) {
                // Si toutes les citations ont été affichées, on arrête le carousel et affiche le message de rechargement
                clearInterval(intervalId);
                const reloadMessage = document.createElement('p');
                reloadMessage.textContent = 'Rechargez la page si vous souhaitez réafficher le carrousel des citations !';
                main.appendChild(reloadMessage);
                return;
            }

            let quote;
            do {
                quote = quotes[currentQuoteIndex];
                currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            } while (usedQuotes.has(quote));

            usedQuotes.add(quote);

            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item', 'active');

            const thinkerName = document.createElement('h3');
            thinkerName.textContent = `${quote.thinker} : "${quote.quote}"`;

            const quoteText = document.createElement('p');
            quoteText.textContent = quote.text;

            const thinkerImage = document.createElement('img');
            thinkerImage.src = quote.image;
            thinkerImage.onerror = () => {
                thinkerImage.src = defaultImage;
            };

            carouselItem.appendChild(thinkerName);
            carouselItem.appendChild(quoteText);
            carouselItem.appendChild(thinkerImage);

            carouselInner.innerHTML = ''; // Efface le contenu précédent
            carouselInner.appendChild(carouselItem);
        }

        displayNextQuote();
        intervalId = setInterval(displayNextQuote, 5000);
        localStorage.setItem('intervalId', intervalId);
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}
export default QuoteCarousel;
