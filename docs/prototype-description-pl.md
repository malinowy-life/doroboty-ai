# Opis prototypu DoRoboty.ai — ocena próbki pracy

## 1. Jaki problem użytkownika rozwiązujemy

Rekruter zatrudniający do pracy z AI otrzymuje profil, odpowiedź i materiały kandydata, ale nie zawsze potrafi ocenić, co kandydat zrobił samodzielnie, czy jego praca jest dobrze wykonana i czy odpowiada wymaganiom konkretnej roli. Sam dostęp do repozytorium ani ogólny Match Score nie wyjaśniają podstaw decyzji.

Prototyp ma pomóc rekruterowi zdecydować, czy warto zaprosić kandydata do kolejnego etapu i na jakiej podstawie. Sprawdzamy, czy wsparcie prowadzi do trafniej uzasadnionej decyzji, a nie tylko zwiększa pewność rekrutera.

### Przykład w prototypie

Tomasz Zieliński, Hiring Manager w Northstar Health, przegląda zgłoszenie Kuby Wójcika, AI buildera, na istniejące stanowisko Staff AI Engineer. Ogłoszenie obejmuje integracje modeli językowych, ewaluacje odpowiedzi, utrzymanie usług i pracę ze źródłami.

Kuba przedstawia fragment asystenta AI do wyszukiwania w dokumentacji. Deklaruje odpowiedzialność za wczytywanie dokumentów, wyszukiwanie, generowanie odpowiedzi ze źródłami i testy. Interfejs i logowanie przypisuje pozostałym osobom w trzyosobowym zespole.

### Prototyp zawiera

- **Próbkę pracy przy zgłoszeniu.** Sekcja znajduje się w zakładce „Odpowiedź”; nie pojawia się w zakładce „CV”.
- **Główny wniosek widoczny od razu.** „Dopasowanie próbki do roli: częściowo potwierdzone”, z żółtym tłem wyłącznie pod statusem z krótkim uzasadnieniem. Rekruter nie musi otwierać szczegółów, żeby poznać najważniejszy wynik.
- **Odniesienie do wymagań ogłoszenia.** Trzy obszary mają statusy: integracja modeli i wyszukiwanie w dokumentach — „Potwierdzone”; ocena jakości odpowiedzi — „Częściowo potwierdzone”; utrzymanie usług produkcyjnych — „Brak potwierdzenia”. Są to przygotowane wyniki tego scenariusza.
- **Materiał kandydata.** „Zobacz materiał” otwiera wiadomość Kuby oraz cztery rozwijane pliki: README, kod odpowiedzi, testy i przykładowy dokument. Rekruter może zobaczyć surową próbkę, do której odnosi się ocena.
- **Szczegóły oceny.** „Zobacz uzasadnienie” otwiera opis wkładu, jakości i dopasowania. Rozwijane podstawy pokazują deklarację kandydata i przygotowane fragmenty opisu materiału. Obecnie nie są to odnośniki do konkretnych linii prawdziwego repozytorium.
- **Pytania do rozmowy.** „O co warto dopytać” jest widoczne na dole sekcji bez otwierania szczegółów. Pytania dotyczą samodzielności, błędów wykrytych w testach i odpowiedzialności po wdrożeniu.
- **Notatkę i istniejące działania rekrutacyjne.** Rekruter może zapisać uzasadnienie w notatce i przejść do kolejnego etapu lub zakończyć proces. Notatka zapisuje się w historii przy zmianie etapu.

## 2. Po czym poznam, że prototyp działa

Technicznie prototyp działa, jeśli rekruter może przejść następującą ścieżkę:

1. Wejść jako Tomasz Zieliński i otworzyć zgłoszenie Kuby na Staff AI Engineer.
2. W zakładce „Odpowiedź” zobaczyć główny wniosek i statusy trzech wymagań.
3. Otworzyć „Zobacz materiał” i przeczytać wiadomość, README oraz fragmenty kodu i testów.
4. Otworzyć „Zobacz uzasadnienie” i przejść od wniosku do pokazanej podstawy.
5. Bez otwierania szczegółów odczytać pytania, które warto zadać kandydatowi.
6. Wpisać uzasadnienie w notatce i zmienić etap, a następnie zobaczyć zachowaną notatkę w historii procesu.
7. Przełączyć na CV i zobaczyć samo CV oraz wspólne działania rekrutacyjne, bez sekcji „Próbka pracy”.

Czy rozwiązanie pomaga użytkownikowi, poznamy po tym, że rekruter potrafi wyjaśnić:

- co w zakresie wkładu jest deklaracją kandydata, a co potwierdzają materiały;
- jakie są mocne strony i ograniczenia wykonania;
- które wymagania roli próbka potwierdza, a których nie pokazuje;
- na jakiej podstawie podejmuje decyzję i czego potrzebuje do jej uzupełnienia.

Brak potwierdzenia w próbce nie jest dowodem braku umiejętności kandydata. Jedna próbka nie wystarcza do oceny wszystkich wymagań poziomu Staff.

Pierwszy test tego widoku sprawdza zrozumienie informacji i użyteczność ścieżki. Aby ocenić trafność narzędzia, potrzebne są rzeczywiste materiały i kryteria uzgodnione ze specjalistą. W dalszym teście porównamy uzasadnienia decyzji na porównywalnych zgłoszeniach bez wsparcia i ze wsparciem. Niezależny specjalista oceni poprawność wniosków i podstaw decyzji.

Cel biznesowy to wzrost ponownego płatnego zakupu pracodawców w 90 dni z 30% do 60%. Sam test tego prototypu nie potwierdzi jeszcze wpływu na ten wskaźnik.

## 3. Co działa naprawdę, a co jest symulacją

### Działa naprawdę

- **Interfejs rekrutera:** wybór profilu, lista kandydatów, szczegóły zgłoszenia, zakładki „Odpowiedź” i „CV”.
- **Przeglądanie materiału:** otwieranie wiadomości kandydata, README, kodu, testów i przykładowego dokumentu oraz rozwijanie poszczególnych plików.
- **Przeglądanie oceny:** główny wniosek, statusy wymagań, szczegóły i rozwijane podstawy oraz pytania do kandydata.
- **Notatki i etapy:** wpisywanie notatki, zapis przy zmianie etapu i historia procesu w lokalnym stanie aplikacji. Dane są zachowywane w tej przeglądarce, jeśli zapis jest dostępny.
- **Powiązanie scenariusza z istniejącą rekrutacją:** używamy konta Tomasza oraz roli i wymagań ogłoszenia Northstar obecnych w aplikacji.

### Symulacja albo uproszczenie

- **Kandydat i próbka:** Kuba, opis udziału, wiadomość i cztery pliki są przygotowanymi danymi scenariusza. Nie pobieramy prawdziwego repozytorium i nie ma tu rzeczywistego przesyłania plików przez kandydata.
- **Ocena próbki:** wniosek, statusy, uzasadnienia i pytania są przygotowanymi treściami. Nie generuje ich model AI ani reguły analizujące kod. „Zobacz uzasadnienie” otwiera istniejący opis; nie uruchamia analizy.
- **Weryfikacja autorstwa:** brak historii commitów i potwierdzenia od zespołu. Opis udziału pozostaje deklaracją kandydata.
- **Testy produktu kandydata:** pokazujemy kod dwóch testów z atrapami modelu i wyszukiwarki. Interfejs ich nie uruchamia; nie stanowią one dowodu rzeczywistej jakości odpowiedzi modelu.
- **Przejście do podstaw oceny:** rozwijamy przygotowane fragmenty tekstu. Nie otwieramy zewnętrznego repozytorium ani konkretnego commita.
- **Komunikacja:** lista pytań wspiera rozmowę. Nie wysyła próśb do kandydata i nie obsługuje odpowiedzi, e-maili ani powiadomień.
- **Decyzja:** korzystamy z obecnych etapów procesu. Nie dodaliśmy osobnej akcji „Potrzebuję wyjaśnienia”; tę potrzebę można opisać w notatce.
- **Dostęp i zapis:** przełączanie osób jest mechanizmem prototypu, a nie prawdziwym logowaniem. Nie ma serwera rekrutacyjnego ani współdzielenia danych między urządzeniami.

## 4. Co zmieniliśmy w aplikacji

Dodaliśmy osobne zgłoszenie AI buildera do istniejącej rekrutacji Northstar. Sekcję „Próbka pracy” umieściliśmy wyłącznie w zakładce „Odpowiedź”. Główny wniosek i pytania są widoczne bez otwierania okien; trzy statusy wymagań oraz uzasadnienia są dostępne w „Zobacz uzasadnienie”, a surowe materiały w „Zobacz materiał”.

Uprościliśmy sekcję: usunęliśmy powtarzany podpis z nazwą roli, dodatkowe kolumny wkładu i jakości oraz zdanie wyjaśniające status. Wniosek oznaczyliśmy krótką etykietą „Dopasowanie próbki do roli: częściowo potwierdzone” (16 px) z żółtym tłem wyłącznie pod słowami „częściowo potwierdzone”. Jego opis ma 13 px. Usunęliśmy też pusty odstęp przed notatką rekrutacyjną. Szczegółowe informacje o wkładzie i jakości nadal znajdują się w uzasadnieniu oceny.

Po przeglądzie UX status znajduje się obok etykiety. Każde wymaganie występuje w uzasadnieniu tylko raz. Pytania odnoszą się do wyszukiwania, jakości prawdziwego modelu i utrzymania asystenta po wdrożeniu. Opisy rozróżniają deklarację udziału od widocznego kodu oraz testy z atrapami od oceny jakości modelu.
