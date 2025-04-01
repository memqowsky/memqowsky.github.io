
const courseContent = [
    {
        title: "Wprowadzenie",
        content: `
            <h2>Projektowanie interfejsów dla urządzeń mobilnych - zasady Mobile First</h2>
            <p class="author">Mateusz Korotajew</p>
        `
    },
    {
        title: "Czym jest Mobile First?",
        content: `
            <h2>Czym jest Mobile First?</h2>
            <p>Mobile First to podejście do projektowania stron internetowych oraz aplikacji, które stawia na pierwszym miejscu urządzenia mobilne. W praktyce oznacza to, że projektowanie rozpoczyna się od najmniejszych ekranów i dopiero później rozbudowuje się interfejs na większe ekrany (tablet, desktop).</p>
        `
    },
    {
        title: "Historia Mobile First",
        content: `
            <h2>Historia Mobile First</h2>
            <p>Podejście Mobile First zaczęło zyskiwać na popularności na początku lat 2010, gdy liczba użytkowników mobilnych przewyższyła liczbę użytkowników komputerów stacjonarnych. Ethan Marcotte wprowadził pojęcie Responsive Web Design (RWD), które stało się podstawą projektowania mobilnego.</p>
            <p>Firmy takie jak Google i Apple zaczęły dostosowywać swoje usługi do urządzeń mobilnych, co przyspieszyło rozwój tego podejścia. Wcześniej projektanci tworzyli strony pod komputery, a następnie dostosowywali je do mniejszych ekranów, co często powodowało problemy z użytecznością.</p>
        `
    },
    {
        title: "Dlaczego Mobile First?",
        content: `
            <h2>Dlaczego Mobile First?</h2>
            <p>W ostatnich latach liczba użytkowników mobilnych znacznie wzrosła. Urządzenia mobilne są najczęściej używane do przeglądania internetu, zakupów online i korzystania z mediów społecznościowych.</p>
            <p>Projektowanie Mobile First poprawia dostępność i użyteczność aplikacji. Wydajność i szybkie ładowanie są kluczowe na urządzeniach mobilnych, gdzie zasoby są często ograniczone.</p>
        `
    },
    {
        title: "Podstawowe zasady Mobile First",
        content: `
            <h2>Podstawowe zasady Mobile First</h2>
            <ul>
                <li><strong>Prostota</strong> - Interfejsy powinny być minimalistyczne i czytelne.</li>
                <li><strong>Wydajność</strong> - Aplikacje powinny szybko się ładować i nie obciążać urządzeń.</li>
                <li><strong>Responsywność</strong> - Projekt musi automatycznie dopasowywać się do różnych rozdzielczości.</li>
                <li><strong>Użyteczność</strong> - Na pierwszym miejscu stawia się potrzeby użytkownika i intuicyjną nawigację.</li>
            </ul>
        `
    },
    {
        title: "Tworzenie responsywnych interfejsów",
        content: `
            <h2>Tworzenie responsywnych interfejsów</h2>
            <p>Przy projektowaniu mobile first ważne są:</p>
            <ul>
                <li><strong>Fluid Grid Layouts</strong> - Używanie elastycznych układów siatki.</li>
                <li><strong>Media Queries</strong> - Dopasowywanie stylów do różnych rozdzielczości.</li>
                <li><strong>Elastyczne obrazy i multimedia</strong> - Skalowanie zasobów graficznych bez utraty jakości.</li>
                <li><strong>Minimalizm</strong> - Unikanie zbędnych elementów wizualnych.</li>
            </ul>
        `
    },
    {
        title: "Techniki optymalizacji wydajności",
        content: `
            <h2>Techniki optymalizacji wydajności</h2>
            <p>Optymalizacja wydajności w kontekście Mobile First jest kluczowa, ponieważ urządzenia mobilne często mają ograniczone zasoby. Jednym z popularnych podejść jest zastosowanie techniki Lazy Loading, polegającej na ładowaniu obrazów i innych zasobów dopiero wtedy, gdy są one widoczne na ekranie.</p>
            <p>Ważnym elementem optymalizacji jest również minifikacja plików CSS i JS, co pozwala zmniejszyć ich rozmiar i przyspieszyć ładowanie. Dodatkowo, wykorzystanie pamięci podręcznej (cache) i sieci CDN sprawia, że treści są szybciej dostarczane do użytkowników.</p>
        `
    },
    {
        title: "Typografia i tekst",
        content: `
            <h2>Typografia i tekst</h2>
            <p>Czytelność tekstu na urządzeniach mobilnych to jeden z kluczowych aspektów projektowania Mobile First. Należy stosować duże, proste czcionki, które są dobrze widoczne nawet na małych ekranach. Istotne jest również zachowanie odpowiedniego kontrastu między tekstem a tłem.</p>
            <p>Minimalizm w typografii oznacza unikanie zbędnych ozdobników i skomplikowanych fontów, które mogą obciążać urządzenie. Tekst powinien automatycznie skalować się w zależności od rozdzielczości ekranu.</p>
        `
    },
    {
        title: "Google i Mobile First Indexing",
        content: `
            <h2>Google i Mobile First Indexing</h2>
            <p>Google wprowadziło Mobile First Indexing, co oznacza, że wyszukiwarka ocenia strony przede wszystkim na podstawie ich wersji mobilnej. Oznacza to, że jeśli strona nie jest dobrze zoptymalizowana pod kątem urządzeń mobilnych, może tracić pozycję w wynikach wyszukiwania.</p>
            <p>Google zaleca stosowanie responsywnych stron, które automatycznie dostosowują się do ekranów różnych urządzeń. Strony o słabej wydajności mobilnej mogą mieć niższy wskaźnik konwersji i gorszą widoczność w sieci.</p>
        `
    },
    {
        title: "UX Writing w Mobile First",
        content: `
            <h2>UX Writing w Mobile First</h2>
            <p>W Mobile First UX Writing oznacza projektowanie tekstów, które są krótkie, klarowne i intuicyjne. Ze względu na ograniczoną przestrzeń na ekranach mobilnych, komunikaty powinny być zwięzłe i jednoznaczne.</p>
            <p>Wskazane jest unikanie długich akapitów i skomplikowanych wyrażeń, aby użytkownicy mogli szybko przyswoić informacje. Warto stosować call-to-action (CTA), które jasno wskazują użytkownikom, co mają zrobić.</p>
        `
    },
    {
        title: "Dark Mode i jego rola",
        content: `
            <h2>Dark Mode i jego rola w Mobile First</h2>
            <p>Tryb ciemny stał się jednym z popularnych trendów w projektowaniu interfejsów mobilnych. Nie tylko wygląda estetycznie, ale także zmniejsza zmęczenie oczu użytkowników, zwłaszcza w nocy.</p>
            <p>W przypadku ekranów OLED i AMOLED Dark Mode może również zmniejszyć zużycie energii, wydłużając czas pracy baterii. W Mobile First warto zapewnić użytkownikom możliwość wyboru między trybem jasnym a ciemnym.</p>
        `
    },
    {
        title: "Przykłady złych praktyk",
        content: `
            <h2>Przykłady złych praktyk</h2>
            <p>Jednym z najczęstszych błędów w projektowaniu Mobile First jest przeładowanie treścią. Użytkownicy mobilni oczekują szybkiego dostępu do informacji, dlatego rozbudowane bloki tekstu i nadmiar treści mogą skutecznie zniechęcić ich do korzystania z aplikacji.</p>
            <p>Innym problemem są zbyt małe elementy interaktywne, takie jak przyciski czy ikony, które utrudniają nawigację na ekranach dotykowych.</p>
        `
    },
    {
        title: "Przykłady interfejsów Mobile First",
        content: `
            <h2>Przykłady interfejsów Mobile First</h2>
            <p>Współczesne aplikacje mobilne często bazują na zasadach Mobile First. Przykładem tutaj mogą być sklepy internetowe, gdzie użytkownik mobilny oczekuje prostego procesu zakupu oraz przejrzystej nawigacji.</p>
            <p>Przykładem również mogą być aplikacje bankowe, w których prostota i szybkość dostępu do najważniejszych funkcji są priorytetowe. Również platformy społecznościowe, takie jak Instagram czy Twitter, stawiają na szybki dostęp do treści i intuicyjne interakcje.</p>
        `
    },
    {
        title: "Case Study: Instagram",
        content: `
            <h2>Case Study: Instagram</h2>
            <p>Instagram jest doskonałym przykładem wdrożenia zasady Mobile First. Aplikacja została zaprojektowana z myślą o użytkownikach mobilnych, co sprawiło, że jej interfejs jest intuicyjny i wygodny nawet na najmniejszych ekranach.</p>
            <p>Kluczowe cechy mobilnego interfejsu Instagrama to prostota nawigacji, szybkość ładowania treści oraz optymalizacja multimediów. Dzięki podejściu Mobile First Instagram stał się jedną z najpopularniejszych aplikacji na świecie.</p>
        `
    },
    {
        title: "Przyszłość Mobile First",
        content: `
            <h2>Przyszłość Mobile First</h2>
            <p>Podejście Mobile First będzie zyskiwać na znaczeniu wraz z rozwojem technologii mobilnych oraz rosnącą liczbą urządzeń mobilnych na rynku. Trendy, takie jak Progressive Web Apps (PWA) oraz rozwój sieci 5G, jeszcze bardziej uwypuklają znaczenie szybkiego i responsywnego projektowania aplikacji.</p>
            <p>Przewiduje się integrację z nowoczesnymi technologiami, takimi jak rzeczywistość rozszerzona (AR) oraz sztuczna inteligencja (AI).</p>
        `
    },
    {
        title: "Mobile First w IoT",
        content: `
            <h2>Mobile First w IoT (Internet Rzeczy)</h2>
            <p>Mobile First odgrywa kluczową rolę w Internet of Things (IoT), gdzie smartfony pełnią funkcję centrów sterowania inteligentnymi urządzeniami. Aplikacje mobilne umożliwiają użytkownikom zarządzanie smart home, np. regulowanie temperatury, sterowanie oświetleniem czy monitorowanie bezpieczeństwa.</p>
            <p>Interfejsy mobilne dla IoT muszą być przejrzyste, responsywne i łatwe w obsłudze na ekranach dotykowych. Minimalistyczny design i prosta nawigacja są niezbędne, aby użytkownicy mogli szybko i intuicyjnie sterować swoimi urządzeniami.</p>
        `
    },
    {
        title: "Voice UI i Mobile First",
        content: `
            <h2>Voice UI i Mobile First</h2>
            <p>Coraz więcej użytkowników korzysta z asystentów głosowych, takich jak Alexa, Google Assistant czy Siri, co wpływa na rozwój Voice UI w Mobile First. Interfejsy głosowe pozwalają na bezdotykowe sterowanie aplikacjami mobilnymi, co jest szczególnie przydatne w samochodach czy podczas ćwiczeń.</p>
            <p>Projektowanie z myślą o Voice UI wymaga uproszczenia interakcji i dostosowania aplikacji do komend głosowych. Wyszukiwanie głosowe staje się coraz popularniejsze, dlatego Mobile First powinien uwzględniać optymalizację treści pod kątem zapytań głosowych.</p>
        `
    },
    {
        title: "Mobile First w aplikacjach fitness i zdrowotnych",
        content: `
            <h2>Aplikacje fitness i zdrowotne są jednymi z największych beneficjentów podejścia Mobile First.</h2>
            <p>Użytkownicy mobilni oczekują intuicyjnych interfejsów, które pozwalają na szybkie monitorowanie aktywności fizycznej czy parametrów zdrowotnych. Dzięki integracji z sensorami urządzeń mobilnych, takimi jak krokomierze czy pulsometry, aplikacje dostarczają użytkownikom dokładnych danych w czasie rzeczywistym. Personalizacja planów treningowych oraz możliwość śledzenia postępów zwiększa zaangażowanie użytkowników. Mobile First w aplikacjach zdrowotnych umożliwia również łatwy dostęp do konsultacji online i planowania wizyt u lekarzy.
            </p>
        `
    },
    {
        title: "Dostępność w Mobile First",
        content: `
            <h2>Dostępność (Accessibility) w Mobile First</h2>
            <p>Projektowanie z myślą o Accessibility (A11y) oznacza tworzenie interfejsów dostępnych dla osób z niepełnosprawnościami. Mobile First wymaga większego kontrastu tekstów, większych przycisków oraz kompatybilności z czytnikami ekranu.</p>
            <p>Warto zadbać o odpowiednie ARIA labels, które pomagają osobom niewidomym w nawigacji po stronie. Dostosowanie aplikacji do sterowania głosowego oraz obsługi za pomocą jednej ręki poprawia komfort korzystania.</p>
        `
    },
    {
        title: "Jak mierzyć sukces Mobile First",
        content: `
            <h2>Jak mierzyć sukces Mobile First?</h2>
            <p>Skuteczność strategii Mobile First można ocenić na podstawie kluczowych wskaźników wydajności (KPI). Jednym z najważniejszych jest współczynnik konwersji, który mierzy, ilu użytkowników mobilnych wykonuje pożądane działania (np. zakup, rejestracja).</p>
            <p>Czas ładowania strony na urządzeniach mobilnych również wpływa na sukces – optymalny czas to poniżej 3 sekund. Wskaźnik odrzuceń (bounce rate) pokazuje, ile osób opuszcza stronę zaraz po wejściu, co może sugerować problemy z użytecznością.</p>
        `
    },
    {
        title: "Podsumowanie",
        content: `
            <h2>Podsumowanie</h2>
            <p>Projektowanie interfejsów Mobile First to nie tylko trend, ale konieczność w obecnych czasach. Coraz większa liczba użytkowników mobilnych wymaga, aby aplikacje były dostosowane do małych ekranów i oferowały szybki dostęp do kluczowych funkcji.</p>
            <p>Wykorzystując odpowiednie narzędzia oraz przestrzegając zasad Mobile First, projektanci mogą tworzyć intuicyjne i efektywne interfejsy, które spełniają oczekiwania użytkowników.</p>
            <button onclick="startTest()" class="start-test-btn">Rozpocznij test</button>
        `
    }
];


const testQuestions = [
    {
        question: "Co oznacza podejście Mobile First?",
        answers: [
            "Projektowanie aplikacji wyłącznie na komputery stacjonarne",
            "Tworzenie aplikacji mobilnych bez wsparcia dla dużych ekranów",
            "Projektowanie interfejsów z myślą o urządzeniach mobilnych jako priorytet",
            "Tworzenie interfejsów w pełni responsywnych"
        ],
        correctAnswer: 2
    },
    {
        question: "Dlaczego Mobile First jest tak ważne w dzisiejszych czasach?",
        answers: [
            "Ponieważ komputery stacjonarne są już przestarzałe",
            "Ponieważ liczba użytkowników mobilnych znacznie wzrosła",
            "Ponieważ aplikacje desktopowe są bardziej wymagające",
            "Ponieważ zmniejsza to liczbę błędów w kodzie"
        ],
        correctAnswer: 1
    },
    {
        question: "Które z poniższych podejść jest kluczową zasadą Mobile First?",
        answers: [
            "Tworzenie bogatych animacji i efektów graficznych",
            "Minimalizm i prostota interfejsu",
            "Skupienie na dużych ekranach i bogatej typografii",
            "Użycie wyłącznie lokalnych zasobów bez cache"
        ],
        correctAnswer: 1
    },
    {
        question: "Jakie są podstawowe zasady projektowania Mobile First?",
        answers: [
            "Prostota, wydajność, responsywność, użyteczność",
            "Skomplikowane układy, duża ilość animacji, bogata grafika",
            "Minimalna responsywność, maksymalna liczba elementów na stronie",
            "Brak optymalizacji, jedynie rozdzielczość mobilna"
        ],
        correctAnswer: 0
    },
    {
        question: "Co to jest technika Lazy Loading?",
        answers: [
            "Ładowanie wszystkich zasobów jednocześnie",
            "Odkładanie ładowania treści na później",
            "Ładowanie obrazów i zasobów tylko wtedy, gdy są widoczne na ekranie",
            "Zmniejszanie jakości obrazów dla urządzeń mobilnych"
        ],
        correctAnswer: 2
    },
    {
        question: "Jaki framework jest często stosowany w podejściu Mobile First?",
        answers: [
            "Angular",
            "Bootstrap",
            "Django",
            "React Native"
        ],
        correctAnswer: 1
    },
    {
        question: "Które narzędzie służy do tworzenia prototypów interfejsów mobilnych?",
        answers: [
            "MongoDB",
            "Sketch",
            "Visual Studio",
            "Eclipse"
        ],
        correctAnswer: 1
    },
    {
        question: "Jakie techniki pomagają w optymalizacji wydajności aplikacji mobilnych?",
        answers: [
            "Zwiększenie liczby skryptów i zasobów",
            "Lazy Loading, minifikacja CSS i JS, wykorzystanie CDN",
            "Tworzenie aplikacji wyłącznie w natywnym kodzie",
            "Ignorowanie pamięci podręcznej"
        ],
        correctAnswer: 1
    },
    {
        question: "Co oznacza \"Fluid Grid Layout\" w projektowaniu Mobile First?",
        answers: [
            "Stały układ siatki niezależny od rozdzielczości",
            "Układ siatki dostosowujący się do różnych rozmiarów ekranu",
            "Użycie wyłącznie obrazów w tle",
            "Użycie grafiki wektorowej w interfejsie"
        ],
        correctAnswer: 1
    },
    {
        question: "Jakie cechy interfejsu mobilnego sprawiają, że Instagram jest przykładem Mobile First?",
        answers: [
            "Skupienie na dużych ekranach i bogatej grafice",
            "Prostota nawigacji, szybkość ładowania treści, optymalizacja multimediów",
            "Obsługa tylko najnowszych urządzeń mobilnych",
            "Bogata grafika i zaawansowane animacje"
        ],
        correctAnswer: 1
    },
    {
        question: "Jaka jest główna zaleta stosowania Media Queries w Mobile First?",
        answers: [
            "Poprawa bezpieczeństwa aplikacji",
            "Dopasowanie stylów do różnych rozdzielczości",
            "Zmniejszenie rozmiaru aplikacji",
            "Zwiększenie liczby animacji na stronie"
        ],
        correctAnswer: 1
    },
    {
        question: "Które z poniższych nie jest błędem w projektowaniu Mobile First?",
        answers: [
            "Zbyt małe elementy interaktywne",
            "Przeładowanie treścią",
            "Intuicyjna nawigacja i czytelny interfejs",
            "Nadmiar grafik i animacji"
        ],
        correctAnswer: 2
    },
    {
        question: "Jakie są korzyści płynące z minimalizmu w typografii?",
        answers: [
            "Skrócenie czasu ładowania oraz lepsza czytelność",
            "Zwiększenie złożoności interfejsu",
            "Bogatsza prezentacja treści",
            "Mniejsze możliwości dostosowania układu"
        ],
        correctAnswer: 0
    },
    {
        question: "Jakie narzędzie może być używane do tworzenia interaktywnych makiet w Mobile First?",
        answers: [
            "Figma",
            "MongoDB",
            "Qt Creator",
            "Unity"
        ],
        correctAnswer: 0
    },
    {
        question: "Jakie jest główne wyzwanie projektowania Mobile First?",
        answers: [
            "Tworzenie skomplikowanych animacji",
            "Ograniczone zasoby urządzeń mobilnych",
            "Wsparcie tylko dla najnowszych wersji przeglądarek",
            "Integracja wielu bibliotek jednocześnie"
        ],
        correctAnswer: 1
    },
    {
        question: "Jaka technologia wspiera podejście Mobile First w kontekście przyszłości?",
        answers: [
            "Angular 1.0",
            "Progressive Web Apps (PWA)",
            "Windows Forms",
            "Apache Struts"
        ],
        correctAnswer: 1
    },
    {
        question: "Jakie podejście typograficzne jest zgodne z Mobile First?",
        answers: [
            "Małe, ozdobne czcionki",
            "Duże, proste czcionki o wysokim kontraście",
            "Złożone fonty o niskiej czytelności",
            "Brak elastyczności w skalowaniu tekstu"
        ],
        correctAnswer: 1
    },
    {
        question: "Który z poniższych frameworków CSS wspiera Mobile First?",
        answers: [
            "jQuery UI",
            "Bootstrap",
            "Laravel",
            "React"
        ],
        correctAnswer: 1
    },
    {
        question: "Jakie technologie mogą w przyszłości wzbogacić podejście Mobile First?",
        answers: [
            "Windows Forms i DirectX",
            "Rozszerzona rzeczywistość (AR) i sztuczna inteligencja (AI)",
            "Zastąpienie CSS przez XML",
            "Wykorzystanie przestarzałych bibliotek graficznych"
        ],
        correctAnswer: 1
    },
    {
        question: "Co oznacza responsywność w kontekście Mobile First?",
        answers: [
            "Stały układ interfejsu niezależnie od ekranu",
            "Automatyczne dostosowanie interfejsu do różnych rozdzielczości",
            "Ograniczenie funkcjonalności na mniejszych urządzeniach",
            "Użycie wyłącznie statycznych obrazów"
        ],
        correctAnswer: 1
    },
    {
        question: "Jaką rolę pełnią smartfony w ekosystemie IoT?",
        answers: [
            "Służą tylko do przeglądania internetu",
            "Pełnią funkcję centrów sterowania inteligentnymi urządzeniami",
            "Nie mają znaczenia w IoT",
            "Służą wyłącznie do komunikacji"
        ],
        correctAnswer: 1
    },
    {
        question: "Co jest kluczowe w projektowaniu interfejsów dla Voice UI?",
        answers: [
            "Skomplikowane komendy głosowe",
            "Uproszczenie interakcji i dostosowanie do komend głosowych",
            "Rezygnacja z interfejsu graficznego",
            "Zwiększenie liczby opcji menu"
        ],
        correctAnswer: 1
    },
    {
        question: "Co oznacza skrót A11y w kontekście Mobile First?",
        answers: [
            "Algorithm",
            "Accessibility (Dostępność)",
            "Application",
            "Analytics"
        ],
        correctAnswer: 1
    },
    {
        question: "Jaki jest optymalny czas ładowania strony mobilnej?",
        answers: [
            "Poniżej 10 sekund",
            "Poniżej 3 sekund",
            "Poniżej 1 minuty",
            "Nie ma znaczenia"
        ],
        correctAnswer: 1
    },
    {
        question: "Co to jest bounce rate w kontekście Mobile First?",
        answers: [
            "Szybkość animacji",
            "Wskaźnik odrzuceń pokazujący ile osób opuszcza stronę",
            "Liczba wyświetleń strony",
            "Czas spędzony na stronie"
        ],
        correctAnswer: 1
    }
    
];

let currentSlide = 0;
let currentQuestion = 0;
let userAnswers = new Array(testQuestions.length).fill(null);
let isInTest = false;
let testCompleted = false;

function displaySlide(index) {
    const slideContent = document.getElementById('slideContent');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    const progress = document.getElementById('progress');

    
    slideContent.innerHTML = `<div class="slide active">${courseContent[index].content}</div>`;

    
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === courseContent.length - 1;

    
    slideCounter.textContent = `${index + 1} / ${courseContent.length}`;

    
    const progressPercentage = ((index + 1) / courseContent.length) * 100;
    progress.style.width = `${progressPercentage}%`;
}

function displayQuestion(index) {
    const slideContent = document.getElementById('slideContent');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    const progress = document.getElementById('progress');

    const question = testQuestions[index];
    const answersHtml = question.answers.map((answer, i) => `
        <div class="answer-option ${userAnswers[index] === i ? 'selected' : ''}">
            <input type="radio" name="answer" value="${i}" ${userAnswers[index] === i ? 'checked' : ''}>
            <label>${answer}</label>
        </div>
    `).join('');

    slideContent.innerHTML = `
        <div class="test-question">
            <h3>Pytanie ${index + 1}</h3>
            <p>${question.question}</p>
            <form id="questionForm" onsubmit="submitAnswer(event)">
                ${answersHtml}
                <button type="submit" class="submit-answer">Zatwierdź odpowiedź</button>
            </form>
        </div>`;

    
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === testQuestions.length - 1;

    
    slideCounter.textContent = `Pytanie ${index + 1} / ${testQuestions.length}`;

    
    const progressPercentage = ((index + 1) / testQuestions.length) * 100;
    progress.style.width = `${progressPercentage}%`;

    
    document.querySelectorAll('.answer-option').forEach((option, i) => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.answer-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            option.querySelector('input[type="radio"]').checked = true;
        });
    });
}

function submitAnswer(event) {
    event.preventDefault();
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        userAnswers[currentQuestion] = parseInt(selectedAnswer.value);
        if (currentQuestion < testQuestions.length - 1) {
            currentQuestion++;
            displayQuestion(currentQuestion);
        } else {
            showTestResults();
        }
    }
}

function showTestResults() {
    const correctAnswers = userAnswers.reduce((sum, answer, index) => 
        answer === testQuestions[index].correctAnswer ? sum + 1 : sum, 0);
    const percentage = (correctAnswers / testQuestions.length) * 100;

    const slideContent = document.getElementById('slideContent');
    slideContent.innerHTML = `
        <div class="test-results">
            <h2>Wyniki testu</h2>
            <p>Poprawne odpowiedzi: ${correctAnswers} z ${testQuestions.length}</p>
            <p>Wynik: ${percentage.toFixed(1)}%</p>
            <button onclick="returnToCourse()" class="return-to-course">Powrót do kursu</button>
        </div>`;

    
    document.querySelector('.navigation-buttons').style.display = 'none';
    testCompleted = true;
}

function startTest() {
    isInTest = true;
    currentQuestion = 0;
    userAnswers = new Array(testQuestions.length).fill(null);
    displayQuestion(currentQuestion);
}

function returnToCourse() {
    isInTest = false;
    document.querySelector('.navigation-buttons').style.display = 'flex';
    displaySlide(currentSlide);
}

function nextSlide() {
    if (isInTest) {
        if (currentQuestion < testQuestions.length - 1) {
            currentQuestion++;
            displayQuestion(currentQuestion);
        }
    } else {
        if (currentSlide < courseContent.length - 1) {
            currentSlide++;
            displaySlide(currentSlide);
        }
    }
}

function previousSlide() {
    if (isInTest) {
        if (currentQuestion > 0) {
            currentQuestion--;
            displayQuestion(currentQuestion);
        }
    } else {
        if (currentSlide > 0) {
            currentSlide--;
            displaySlide(currentSlide);
        }
    }
}


displaySlide(0);