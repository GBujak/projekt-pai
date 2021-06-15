#!/bin/sh

set -e

mkdir tmp

dodaj_pliki() {
    for i in $(find -wholename "./src/$1/*.md"); do
        echo "dodaje $i"
        cat $i >> tmp/all.md
    done
}

cat ./pandoc_config.md >> tmp/all.md
cat src/dane.md >> tmp/all.md

dodaj_pliki 'przypadki'
dodaj_pliki 'kontrolery'

