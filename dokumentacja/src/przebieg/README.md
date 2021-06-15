# Przebieg usługi w systemie

1. Użytkownik dodaje samochód. Wybiera markę i model. Wpisuje przebieg i rok
   produkcji.

2. Użytkownik przyjeżdża do warsztatu samochodowego.

3. Mechanik ogląda samochów i edytuje tagi serwisu.

4. Kierownik przypisuje obsługę serwisu mechanikowi, którego specjalizacje zawierają
   tagi opisujące serwis.

5. Mechanik i klient zostawiają komentarze w historii usługi. Mechanik może dodawać
   do komentarza jeden lub kilka opisów pracy. Każdy opis pracy może mieć przypisane
   jedną lub kilka zużytych części.

6. Mechanik lub klient dodają komentarz zaznaczając przed tym pole "Komentarz kończy
   usługę".

7. W historii usługi pojawia się formularz, w kóry klient musi wpisać dane do
   wystawienia faktury. Nie można już dodawać opisów pracy do komentarzy, bo mogłoby
   to zmienić już wystawioną fakturę, ale można dodawać komentarze bez opisu pracy.

8. System zapisuje dane do faktury. Od tej pory wyświetla się przycisk służący do
   otwarcia faktury za usługę. Do faktury są zliczane wszystkie opisy pracy dotyczące
   usługi. Praca jest wyceniana za godzinę, a zużyte części za sztukę.

9. Użytkownik widzi na swojej stronie głównej możliwość podglądu faktur i wystawienia
   ocen dla wszystkich skończonych usług (niezaimplementowane).

