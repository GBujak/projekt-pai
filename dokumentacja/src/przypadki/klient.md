# Przypadki użycia klienta
//Arkadiusz Markowski

## Stworzenie zgłoszenia

**1. Nazwa przypadku użycia**

Stworzenie zgłoszenia.

**1.1. Krótki opis**

Klient tworzy nowe zgłoszenie. Jest to opis usługi, jakiej chce od warsztatu.

**1.2. Aktorzy**

* Klient

**1.3 Wyzwalacze**

Klient wybiera opcję "stwórz zgłoszenie" z panelu głównego klienta.

**2. Przepływ zdarzeń**

**2.1. Przepływ podstawowy**

1. System pokazuje klientowi formularz. Prosi o podanie tytułu zgłoszenia, modelu i
   marki samochodu. Prosi o wybranie rodzaju usługi np. naprawa, czy serwis.
2. Klient podaje dane, zatwierdza stworzenie zgłoszenia.
3. System zapisuje zgłoszenie.

**2.2 Przepływy alternatywne**

2.2.1 Po wysłaniu formularzu system weryfikuje, że dana marka samochodu nie jest naprawiana w tym serwisie.

**3. Warunki początkowe**

*Klient musi być zalogowany na swoje konto użytkownika.

**4. Warunki końcowe**

Zgłoszenie zostało zapisane w systemie.

---
---

## Ocena wykonanej usługi

**1. Nazwa przypadku użycia**

Ocena wykonanej usługi.

**1.1. Krótki opis**

Po zaznaczeniu przez pracownika wykonania usługi klient dostaje opcję oceny wykonanej
usługi w panelu zgłoszenia.

**1.2. Aktorzy**

* Klient

**1.3 Wyzwalacze**

Klient otwiera panel zgłoszenia po zgłoszeniu przez pracownika wykonania usługi.

**2. Przepływ zdarzeń**

**2.1. Przepływ podstawowy**

1. System prosi użytkownika o ocenę wykonania usługi
2. Użytkownik daje ocenę pozytywną.
3. System zapisuje ocenę, archiwizuje zgłoszenie.

**2.2 Przepływy alternatywne**

2.2.1 Klient wystawił ocenę negatywną

3. System prosi użytkownika o powód wystawienia negatywnej oceny.
4. Użytkownik podaje powód.
5. System zapisuje ocenę, archiwizuje zgłoszenie.

**3. Warunki początkowe**

* W systemie istnieje zgłoszenie przypisane do klienta, którego stan jest ustawiony
  na "wykonane".

**4. Warunki końcowe**

* Zgłoszenie zostało zarchiwizowane.

---
---

## TODO

**1. Nazwa przypadku użycia**

Podgląd aktualnego zgłoszenia.

**1.1. Krótki opis**

Klient może sprawdzić stan swojego aktualnego zgłoszenia. Zgłoszenie może być w trakcie i pokazać rzeczy zrobione i te, które zostały jeszcze do zrobienia oraz zgłoszenie może być już zakończone i samochód oczekuje na odebranie.

**1.2. Aktorzy**

Klient

**1.3 Wyzwalacze**

Klient wybiera w panelu "pokaż aktualne zgłoszenia".

**2. Przepływ zdarzeń**

**2.1. Przepływ podstawowy**

1.Klientowi wyświetla się lista zgłoszeń, które są przypisane do jego konta.
2.Klient klika w "pokaż szczegóły" przy najświeższym zgłoszeniu.
3.System wyświetla dane o zgłoszeniu oraz informacje co zostało zrobione, a co zostało jeszcze do zrobienia.

**2.2 Przepływy alternatywne**

**3. Warunki początkowe**

*Klient musi być zalogowany.
*Do konta klienta musi być przypisane zgłoszenie.

**4. Warunki końcowe**

Klient zna aktualny stan serwisowania/naprawy swojego auta.
