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



**1.1. Krótki opis**



**1.2. Aktorzy**



**1.3 Wyzwalacze**



**2. Przepływ zdarzeń**

**2.1. Przepływ podstawowy**



**2.2 Przepływy alternatywne**

**3. Warunki początkowe**



**4. Warunki końcowe**


