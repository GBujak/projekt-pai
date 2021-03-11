# Przypadki użycia użytkownika niezalogowanego

## Stworzenie konta pracownika

**1. Nazwa przypadku użycia**

Stworzenie konta pracownika.

**1.1. Krótki opis**

Niezalogowany użytkownik tworzy konto pracownika.

**1.2. Aktorzy**

* Niezalogowany użytkownik

**1.3 Wyzwalacze**

* Niezalogowany użytkownik otwiera udostępniony mu przez kierownika adres URL służący
  do tworzenia konta pracownika.

**2. Przepływ zdarzeń**

**2.1. Przepływ podstawowy**

1. System sprawdza, czy kod zawarty w adresie URL jest nadal aktualny.
2. System prosi użytkownika o podanie imienia, nazwiska, loginu i hasła.
3. Użytkownik podaje dane.
4. System tworzy konto pracownika.

**2.2 Przepływy alternatywne**

2.2.1 Kod tworzenia konta pracownika wygasł

2. System informuje użytkownika, że kod wygasł. Sugeruje kontakt z kierownikiem.
3. Koniec przypadku użycia.

**3. Warunki początkowe**

* Podany przez niezalogowanego użytkownika kod został wcześniej wygenerowany przez
  konto kierownika.

**4. Warunki końcowe**

* W systemie znajduje się nowe konto pracownika z podanymi przez niezalogowanego
  użytkownika danymi.
