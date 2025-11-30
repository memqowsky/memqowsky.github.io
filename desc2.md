[X] Zrealizuj funkcjonalność CRUD dotyczącą projektu. Dane zapisz w localStorage - napisz dedykowaną klasę do komunikacji z api (tymczasowym api będzie localStorage).

[X] Zamodeluj klasę zarządzającą zalogowanym użytkownikiem. Na ten moment chcemy mock zalogowanego użytkownika (bez opcji logowania, zakładania konta itp).

[X] Zrealizuj w aplikacji wybór "aktualnego" projektu. Czyli wybieram projekt, apka go zapamiętuje (api) i do czasu zmiany wszystko co widzę w aplikacji jest związane jedynie z tym projektem.

[X] Zrealizuj CRUD do historyjki (funkcjonalności) w projekcie. Historyjki powinny się zapisywać za pośrednictwem zaprojektowanej poprzednio klasy do komunikacji z api.

[X] Widok listy historyjek powininen dzielić historyjki na aktualnie wykonywane, czekające na wykonanie i zamknięte (lub jedna lista z filtrowaniem).

[X] Rozbuduj model użytkownika o rolę. Możliwe role: admin, devops, developer.

[X] Zamockuj listę użytkowników. Zalogowany pozostaje admin, na liście powinien być jeszcze min. jeden developer i jeden devops.

[X] Zadanie to najmniejsza jednostka projektu. Jest wykonywana przez jedną osobę, jest przypisane do konkretnej historyjki/funkcjonalności, jest możliwe do zamknięcia.

[X] Zrealizuj CRUD do zadania.

[X] Zrealizuj widok szczegółów zadania - dane zadania oraz nazwa projektu, przypisana funkcjonalność, data startu, zrealizowane roboczogodziny, przypisana osoba.

[X] Widok szczegółów zadania (lub dodatkowy widok) powinien dostarczać możliwość przypisania osoby do zadania (devops lub developer). Przypisanie osoby automatycznie zmienia stan zadania z "todo" na "doing" oraz uzupełnia datę startu zadania.

[X] Widok szczegółów zadania (lub dodatkowy widok) powinien dostarczać możliwość zmiany stanu zadania na "done". Zmiana stanu automatycznie uzupełnia datę zakończenia zadania.

[X] Zrealizuj widok tablicy kanban z zadaniami (kolumny todo, doing, done).

[X] Zadania powinny się zapisywać za pośrednictwem mechanizmu komunikacji z api.

[X] Utwórz formularz logowania (pola: login, hasło). Dane powinny zostać wysłane do API (zaprojektuj endpoint).

[X] Zaprojektuj endpoint do logowania - pobiera login i hasło, weryfikuje i zwraca token (JWT) i refreshToken lub błąd.

[X] Zaprojektuj endpoint do odświeżania tokenu JWT.

[X] Skorzystaj z dowolnej biblioteki CSS/komponentów (przykładowe biblioteki poniżej) do dopracowania UI aplikacji. Jeśli masz gotowe swoje własne style - nie musisz ich zmieniać (zobacz wtedy jak działają poniższe biblioteki).

[X] Zaimplementuj tryb ciemny/jasny (przełącznik na stronie lub zależny od ustawień przeglądarki).

[X] Zmień miejsce magazynowania danych w aplikacji z localStorage na bazę danych. Wykorzystaj bazę NoSQL (np. MongoDB, Google Firestore).

[X] Komunikację z bazą danych może się odbywać zarówno bezpośrednio z aplikacji webowej jak i z pośrednictwem serwera backendowego (do wyboru).