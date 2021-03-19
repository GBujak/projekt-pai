# Przypadki użycia pracownika

## Zaczęcie naprawy

**1. Nazwa przypadku użycia**

Zaczęcie naprawy.

**1.1. Krótki opis**

Pracownik otrzymuje od kierownika zlecenie naprawy. Widzi w systemie co ma zrobić
i rozpoczyna przydzielone zadanie. Od tego momentu realizuje zlecenie, przed którego skończeniem
nie zajmuje się nowymi zleceniami.

**1.2. Aktorzy**

* Pracownik

**1.3 Wyzwalacze**

Przypadek użycia rozpoczyna się, gdy pracownik wybierze opcję "Zobacz zlecenia"
na swoim koncie i kliknie w nowe zlecenie.

**2. Przepływ zdarzeń**

**2.1. Przepływ podstawowy**

1. Pracownik loguje się do systemu.
2. System pokazuje pracownikowi jego profil.
3. Pracownik wybiera opcję "Zobacz zlecenia".
4. System wyświetla pracownikowi przypisane do niego zlecenie.
5. Pracownik wybiera zlecenie.
6. System odnotowuje, że pracownik odebrał i przeczytał zlecenie.

**2.2 Przepływy alternatywne**

**3. Warunki początkowe**

* W systemie istnieje przynajmniej jedno zgłoszenie przypisane do pracownika.

**4. Warunki końcowe**

* Zgłoszenie zostało odczytane przez pracownika.


---
---

## Zakończenie Wykonywanego Zlecenia

**1. Nazwa przypadku użycia**

Zakończenie Wykonywanego Zlecenia

**1.1. Krótki opis**

Po wykonaniu wszystkich prac, pracownik zakańcza zlecenie. Żeby móc rozliczyć się z klientem
i poinformować kierownika, że jest już wolny i może być przypisany do kolejnego zlecenia.

**1.2. Aktorzy**

* Pracownik

**1.3 Wyzwalacze**

Przypadek rozpoczyna się, gdy pracownik wybierze opcję "Zaktualizuj Zlecenie" w systemie

**2. Przepływ zdarzeń**

**2.1. Przepływ podstawowy**

1. Pracownik loguje się do systemu.
2. System wyświetla profil pracownika.
3. Pracownik wybiera opcję "Zaktualizuj Zlecenie"
4. System wyświetla pracownikowi jego aktualnie robione zlecenie.
5. Pracownik wybiera opcję "Zakończ zlecenie".
6. System przesyła informację do kierownika że pracownik zakończył zlecenie i jest wolny. I jednocześnie przekierowuje pracownika do strony rozliczeniowej

**2.2 Przepływy alternatywne**

**3. Warunki początkowe**

* Pracownik posiada przypisane do niego zlecenie, które jest zaczęte.

**4. Warunki końcowe**

* Zlecenie jest odnotowane w systemie jako zakończone. Pracownik znowu widnieje jako wolny w systemie.

---
---

## Wystawienie klientowi Faktury

**1. Nazwa przypadku użycia**

Wystawienie Klientowi Faktury.

**1.1. Krótki opis**

Pracownik po zakończeniu zlecenia, wystawia rachunek klientowi za wykonane prace
i wysyła mu fakturę w celu uregulowania należności.

**1.2. Aktorzy**

* Pracownik

**1.3 Wyzwalacze**

Pracownik zakończył wykonywane zlecenie.

**2. Przepływ zdarzeń**

**2.1. Przepływ podstawowy**

1. Po zakończeniu zlecenia przez pracownika, system przekierowuje go do strony rozliczeniowej gdzie jest formularz.
2. Pracownik wypełnia informacje w formularzu, takie jak koszty, dane klienta, dane pracownika.
3. Po wypełnieniu formularza, pracownik wybiera opcję "Zatwierdź". Tym samym zapisując informacje systemie.
4. System przyjmuje formularz i tworzy fakturę.
5. System przesyła fakturę do klienta.

**2.2 Przepływy alternatywne**


**3. Warunki początkowe**

* Przynajmniej jedno zlecenie przypisane do dowolnego pracownika jest zakończone.

**4. Warunki końcowe**

* Klient otrzymuje na swoje konto fakturę.
