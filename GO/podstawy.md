
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

```Go
var (
    ToBe   bool       = false
    MaxInt uint64     = 1<<64 - 1
    z      complex128 = cmplx.Sqrt(-5 + 12i)
)
var x, y int = 3, 4
var f float64 = math.Sqrt(float64(x*x + y*y))
```

## Pętla

```Go
for i := 0; i < 10; i++ {
    sum += i
}
for sum < 1000; {
    sum += sum
}
for {
}
```

## IF, Switch

```Go
switch os := runtime.GOOS; os {
case "darwin":
    fmt.Println("OS X.")
case "linux":
    fmt.Println("Linux.")
default:
    // freebsd, openbsd,
    // plan9, windows...
    fmt.Printf("%s.\n", os)
}

switch time.Saturday {
case today + 0:
    fmt.Println("Today.")
case today + 1:
    fmt.Println("Tomorrow.")
case today + 2:
    fmt.Println("In two days.")
default:
    fmt.Println("Too far away.")
}

switch {
case t.Hour() < 12:
    fmt.Println("Good morning!")
case t.Hour() < 17:
    fmt.Println("Good afternoon.")
default:
    fmt.Println("Good evening.")
}
```

## Pointers

```Go
i, j := 42, 2701

p := &i         // to pointer do i - przechowuje adres i w pamięci
fmt.Println(*p) // *p to wartosc jaka jest pod adresem na ktory wskazuje p
*p = 21         // zmieniamy wartosc i, pzrez modyfikacje wartosic bezpośrednio wpamieci, gdzie wskazuje pointer p
fmt.Println(i)  // see the new value of i
```

## Struct

```Go
type Vertex struct {
    X int
    Y int
}
v := Vertex{1, 2}
v.X = 4
fmt.Println(Vertex{1, 2})
p := &v
p.X = 100
p  = &Vertex{1, 2} // p jest pointerem i ma typ *Vertex
```
