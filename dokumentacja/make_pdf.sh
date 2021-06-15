#!/bin/sh

set -e

mkdir tmp

dodaj_pliki() {
    for i in $(find -wholename "./src/$1/*.md"); do
        echo "dodaje $i"
        cat $i >> tmp/all.md
    done
}

dodaj_pliki 'kontrolery'
