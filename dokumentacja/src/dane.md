# Temat projektu: Oprogramowanie wspomagające pracę warsztatu.

Projekt znajduje się w repozytorium: <https://github.com/gbujak/projekt-pai>

## Zakres projektu

Przygotowanie programu, który wspomagałby pracę warsztatu. Zaimplementowanie
funkcjonalności, które opisaliśmy przy kategoriach użytkowników poniżej.

## Kategorie użytkowników i ich funkcjonalności

* Klient - konto klienta warsztatu. Może zamieścić na stronie opis problemu z
  samochodem. Otrzyma od pracownika spodziewany koszt naprawy i propozycje terminów.
  Może umówić się na wizytę. Może sprawdzać terminy swoich wizyt i stan napraw.

* Pracownik - otrzymuje od kierownika opisy problemów i wpisuje spodziewany koszt. W
  trakcie naprawy może dodawać nowe informacje do strony internetowej naprawy. Ma
  dostęp do danych kontaktowych klienta, który zlecił naprawę. Może zakończyć
  naprawę.

* Kierownik - otrzymuje nowe opisy problemów od klientów i decyduje, jakim
  pracownikom przydzielić naprawę. Może wygenerować adres url, który pozwoli na
  stworzenie konta pracownika. Może kasować konta pracowników i użytkowników.

* Administrator - może kasować wszystkie konta używkownika i wygenerować adres url
  pozwalający na stworzenie konta kierownika.

## Wykorzystywane technologie

* Angular
* Kotlin + Spring Boot
* Baza danych Postgresql

## Skład zespołu

* Grzegorz Bujak - grzegorzbujak10@gmail.com

    * temat z Inżynierii: niewybrany
    * temat z Podstaw Inżynierii Programowania: szkoła podstawowa
    * temat pracy inżynierskiej: niewybrany

* Arkadiusz Markowski - arekmarko8@gmail.com

    * temat z Inżynierii: niewybrany
    * temat z Podstaw Inżynierii Programowania: szkoła podstawowa
    * temat pracy inżynierskiej: niewybrany

* Marcin Majdański - majmarcin0@gmail.com

    * temat z Inżynierii: niewybrany
    * temat z Podstaw Inżynierii Programowania: Komisariat Policji
    * temat pracy inżynierskiej: niewybrany

## Podział pracy

* Grzegorz Bujak

    * Administrator
    * Kierownik
    * Konfiguracja Spring Security

* Arkadiusz Markowski

    * Klient (w programie, nie frontend)

* Marcin Majdański

    * Pracownik
