# Przypadki użycia kierownika

## Przypisanie pracownika do naprawy

**1. Nazwa przypadku użycia**

Przypisanie pracownika do naprawy.

**1.1. Krótki opis**

Kierownik wczytuje panel nowych zgłoszeń klientów. Przegląda zgłoszenia. Decyduje,
który pracownik nadaje się najbardziej do tego typu usługi. Gdy podejmie decyzję,
wybiera pracownika. U wybranego pracownika w systemie będzie widoczne nowe
zgłoszenie.

**1.2. Aktorzy**

* Kierownik

**1.3 Wyzwalacze**

Przypadek użycia rozpoczyna się, gdy kierownik wybierzę opcję "przypisz pracownika"
przy nowym zgłoszeniu od klienta.

**2. Przepływ zdarzeń**

**2.1. Przepływ podstawowy**

1. System pokazuje kierownikowi informacje o zgłoszeniu, jakie wpisał klient.
2. Kierownik wybiera opcję "przypisz pracownika".
3. System pokazuje kierownikowi listę pracowników.
4. Kierownik wybiera pracownika, którego chce przypisać do zgłoszenia.
5. System przypisuje pracownika do zgłoszenia.

**2.2 Przepływy alternatywne**

**3. Warunki początkowe**

* W systemie istnieje przynajmniej jedno zgłoszenie od klienta bez przypisanego
  pracownika.

**4. Warunki końcowe**

* Zgłoszenie zostanie przypisane do wybranego pracownika.
* Pracownik zobaczy to ogłoszenie przy następnym logowaniu.

---
---

## Tworzenie adresu URL pozwalającego na stworzenie konta pracownika

**1. Nazwa przypadku użycia**

Tworzenie adresu URL pozwalającego na stworzenie konta pracownika

**1.1. Krótki opis**

Normalnie w systemie jest możliwość stworzenia tylko konta klienta. Kierownik może
wygenerować adres URL, który pozwoli na stworzenie konta pracownika.

**1.2. Aktorzy**

* Kierownik

**1.3 Wyzwalacze**

Przypadek rozpoczyna się, gdy kierownik wybierzę opcję "nowy pracownik" w panelu
głównym w sytemie.

**2. Przepływ zdarzeń**

**2.1. Przepływ podstawowy**

1. System pyta kierownika ile chce wygenerować adresów i jak długo powinny być ważne.
2. Kierownik podaje ilość kluczy i jak długo powinny być ważne.
3. System tworzy podaną ilość jednorazowych adresów URL pozwalających na stworzenie
   konta pracownika, zapisuje, do kiedy są ważne w bazie danych. Wyświetla klucze
   kierownikowi.
4. Kierownik kopiuje klucze. Może wysyłać je pocztą e-mail do nowych pracowników
   (poza systemem).

**2.2 Przepływy alternatywne**

**3. Warunki początkowe**

**4. Warunki końcowe**

* Wygenerowane adresy działają tylko do ustalonej daty, pozwalają na założenie
  jednego konta pracownika.

---
---

## Transfer zgłoszenia do innego pracownika

**1. Nazwa przypadku użycia**

Transfer zgłoszenia do innego pracownika.

**1.1. Krótki opis**

Pracownik może zgłosić kierownikowi, że nie da rady wykonać zadania. Kierownik może
wtedy zmienić przypisanego do zgłoszenia pracownika.

Może też zamknąć zgłoszenie z wiadomością dla klienta, ale to inny przypadek.

**1.2. Aktorzy**

* Kierownik
* Pracownik

**1.3 Wyzwalacze**

Kierownik kliknie w jedno ze zgłoszeń w panelu "prośby o interwencję kierownika".

**2. Przepływ zdarzeń**

**2.1. Przepływ podstawowy**

1. System pokazuje kierownikowi przebieg zgłoszenia, przewija widok tak, żeby była na
   ekranie wybrana prośba o interwencję.
2. Kierownik czyta wiadomość, jaką załączył pracownik. Może zdecydować o konieczności
   przypisania zgłoszenia do innego pracownika. Klika opcję "transfer zgłoszenia".
3. System prosi kierownika o komentarz do operacji oraz wybór pracownika.
4. Kierownik wpisuje komentarz i wybiera pracownika.
5. System dodaje nowe wydarzenie do przebiegu zgłoszenia z opisem transferu.
   Przypisuje zgłosznie do wybranego przez kierownika pracownika.

**2.2 Przepływy alternatywne**

2.2.1 Kierownik decyduje, że nie dokona transferu.

3. System prosi kierownika o wiadomość dla pracownika.
4. Kierownik wpisuje wiadomość.
5. System dodaje wiadomość od kierownika do przebiegu zgłoszenia.

**3. Warunki początkowe**

* W sytemie jest przynajmniej jedna prośba o interwencję kierownika.

**4. Warunki końcowe**

* Zgłoszenie jest przypisane do innego pracownika, niż oryginalnie.
