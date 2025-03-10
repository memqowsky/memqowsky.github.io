// Course content
const courseContent = [
    {
        title: "Czym jest Mobile First?",
        content: `
            <h2>Czym jest Mobile First?</h2>
            <p>Mobile First to podejście do projektowania stron internetowych oraz aplikacji, które stawia na pierwszym miejscu urządzenia mobilne. W praktyce oznacza to, że projektowanie rozpoczyna się od najmniejszych ekranów i dopiero później rozbudowuje się interfejs na większe ekrany (tablet, desktop).</p>
        `
    },
    {
        title: "Dlaczego Mobile First?",
        content: `
            <h2>Dlaczego Mobile First?</h2>
            <p>W ostatnich latach liczba użytkowników mobilnych znacznie wzrosła. Urządzenia mobilne są najczęściej używane do przeglądania internetu, zakupów online i korzystania z mediów połecznościowych.</p>
            <p>Projektowanie Mobile First poprawia dostępność i użyteczność aplikacji. Wydajność i szybkie ładowanie są kluczowe na urządzeniach mobilnych, gdzie zasoby są często ograniczone.</p>
        `
    },
    {
        title: "Podstawowe zasady Mobile First",
        content: `
            <h2>Podstawowe zasady Mobile First</h2>
            <p>Podejście mobile first posiada swoje zasady, które projektant powinien przestrzegać. Są to:</p>
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
            <p>Ważnym elementem optymalizacji jest również minifikacja plików CSS i JS, co pozwala zmniejszyć ich rozmiar i przyspieszyć ładowanie. Dodatkowo, wykorzystanie pamięci podręcznej (cache) i sieci CDN sprawia, że treści są szybciej dostarczane do użytkowników, co przekłada się na lepsze doświadczenia podczas korzystania z aplikacji.</p>
        `
    },
    {
        title: "Typografia i tekst",
        content: `
            <h2>Typografia i tekst</h2>
            <p>Czytelność tekstu na urządzeniach mobilnych to jeden z kluczowych aspektów projektowania Mobile First. Należy stosować duże, proste czcionki, które są dobrze widoczne nawet na małych ekranach. Istotne jest również zachowanie odpowiedniego kontrastu między tekstem a tłem, aby zapewnić komfort czytania w różnych warunkach oświetleniowych.</p>
            <p>Minimalizm w typografii oznacza unikanie zbędnych ozdobników i skomplikowanych fontów, które mogą obciążać urządzenie. Tekst powinien automatycznie skalować się w zależności od rozdzielczości ekranu, co gwarantuje optymalną czytelność na każdym urządzeniu.</p>
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
            <p>Współczesne aplikacje mobilne często bazują na zasadach Mobile First. Przykładem tutaj mogą być sklepy internetowe, gdzie użytkownik mobilny oczekuje prostego procesu zakupu oraz przejrzystej nawigacji. Stosowanie Mobile First w takich przypadkach sprawia, że użytkownicy chętniej korzystają z aplikacji, co przekłada się na lepsze wyniki biznesowe.</p>
            <p>Przykładem również mogą być aplikacje bankowe, w których prostota i szybkość dostępu do najważniejszych funkcji są priorytetowe. Również platformy społecznościowe, takie jak Instagram czy Twitter, stawiają na szybki dostęp do treści i intuicyjne interakcje.</p>
        `
    },
    {
        title: "Narzędzia wspierające Mobile First",
        content: `
            <h2>Narzędzia wspierające Mobile First</h2>
            <p>W procesie projektowania interfejsów Mobile First warto korzystać z dedykowanych narzędzi i technologii. Jednym z najpopularniejszych frameworków jest Bootstrap, który pozwala na tworzenie responsywnych stron internetowych. Inne narzędzia to Foundation oraz Tailwind CSS, oferujące elastyczność w dostosowywaniu układu.</p>
            <p>Do prototypowania i tworzenia interfejsów można wykorzystać narzędzia takie jak Figma, Sketch czy Adobe XD. Dzięki nim możliwe jest tworzenie interaktywnych makiet oraz testowanie interfejsu przed wdrożeniem.</p>
        `
    },
    {
        title: "Case Study: Instagram",
        content: `
            <h2>Case Study: Instagram</h2>
            <p>Instagram jest doskonałym przykładem wdrożenia zasady Mobile First. Aplikacja została zaprojektowana z myślą o użytkownikach mobilnych, co sprawiło, że jej interfejs jest intuicyjny i wygodny nawet na najmniejszych ekranach.</p>
            <p>Kluczowe cechy mobilnego interfejsu Instagrama to prostota nawigacji, szybkość ładowania treści oraz optymalizacja multimediów. Dzięki podejściu Mobile First Instagram stał się jedną z najpopularniejszych aplikacji na świecie, oferując płynne i angażujące doświadczenie użytkownikom na całym świecie.</p>
        `
    },
    {
        title: "Przyszłość Mobile First",
        content: `
            <h2>Przyszłość Mobile First</h2>
            <p>Podejście Mobile First będzie zyskiwać na znaczeniu wraz z rozwojem technologii mobilnych oraz rosnącą liczbą urządzeń mobilnych na rynku. Trendy, takie jak Progressive Web Apps (PWA) oraz rozwój sieci 5G, jeszcze bardziej uwypuklają znaczenie szybkiego i responsywnego projektowania aplikacji.</p>
            <p>Przewiduje się, że w przyszłości podejście Mobile First zostanie jeszcze bardziej zintegrowane z nowoczesnymi technologiami, takimi jak rzeczywistość rozszerzona (AR) oraz sztuczna inteligencja (AI), które będą wzbogacać interakcje użytkownika z aplikacjami mobilnymi.</p>
        `
    },
    {
        title: "Podsumowanie",
        content: `
            <h2>Podsumowanie</h2>
            <p>Projektowanie interfejsów Mobile First to nie tylko trendy, ale także konieczność w obecnych czasach. Coraz większa liczba użytkowników mobilnych wymaga, aby aplikacje były dostosowane do małych ekranów i oferowały szybki dostęp do klucazowych funkcji.</p>
            <p>Wykorzystując odpowiednie narzędzia oraz przestrzegając zasad Mobile First, projektanci mogą tworzyć intuicyjne i efektywne interfejsy, które spełniają oczekiwania użytkowników.</p><br><br>
            <strong>Ćwczienie: Spróbuj zaprojektować prostą aplikację do przeglądania zdjęć i zastanów się czy prostsze jest projektowanie na komputer czy na komórkę i dlaczego?</strong>
            <button onclick="startTest()" class="start-test-btn">Rozpocznij test</button>
        `
    }
];

// Test questions
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

    // Update slide content
    slideContent.innerHTML = `<div class="slide active">${courseContent[index].content}</div>`;

    // Update navigation buttons
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === courseContent.length - 1;

    // Update slide counter
    slideCounter.textContent = `${index + 1} / ${courseContent.length}`;

    // Update progress bar
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

    // Update navigation buttons
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === testQuestions.length - 1;

    // Update question counter
    slideCounter.textContent = `Pytanie ${index + 1} / ${testQuestions.length}`;

    // Update progress bar
    const progressPercentage = ((index + 1) / testQuestions.length) * 100;
    progress.style.width = `${progressPercentage}%`;

    // Add click handlers for answer options
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

    // Hide navigation buttons during results
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

// Initialize first slide
displaySlide(0);