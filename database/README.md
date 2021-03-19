# Jak uruchomić bazę danych

W tym folderze wywołaj:

```
docker-compose up -d
```

**Uwaga:** baza danych będzie uruchamiała się automatycznie przy uruchomieniu
komputera. Żeby wyłączyć:

```
docker-compose down
```

Alternatywnie żeby skasować wszystko z dockera:

```
docker system prune -a
```

# Panel administratora

Panel jest dostępny na localhost:8484

* login: `pguser`
* hasło: `example`
* baza danych: `warsztat`