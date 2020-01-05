
# Sciąga z GO

## zmienne śrowiskowe

```shell
go env
```

### GOPATH

Lokazlizacja kodow GO , workspace wszystkich projektow
Tam są SRC PKG i BIN

Create an OS X executable:
GOOS=darwin GOARCH=386 go build

Create a Windows executable:
GOOS=windows GOARCH=386 go build

Create a Linux executable:
GOOS=linux GOARCH=arm GOARM=7 go build

## Pakiety

Pakiety są: executably (tylko main) i library (np fmt). Tych library nie moza uruchomić, można tylko zaimporotwać
Wszystkie pliki pakietu musza byc  w tym samych jednym foderze i miec package ... name ten sam
Import własnych pakietów musi być podan wg scieżki gopath, czyli od folderu src.
Np. D:\GoCode\src\github.com\wysockilukas\misAPI
Praktyka jest nazywac pakiet tak jak folder, w ktorym jest kod
Jeśli cos z pakietu jest zadeklarowane z duzej litery to moze byc eksportowane, czyli widoczne dla innych moduow ktory go impotują

## GO DOC

To narzędzie do twozenia dokumentacji z komentarzy
Musimy zacząć komentraz od nazy deklaraci np. Package main, main function
Polecenie poniezej zwraca kometraz do funckji Println z pakietu fmt

```shell
god doc -src ftm Println
godoc -http=:6060
```

<https://godoc.org/golang.org/x/tools/cmd/godoc>

## Zmienne i typy danych

