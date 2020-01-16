
# Metody i interfejsy

## Metody

Func (o typ) nazwa() ...  
Mogą istnieć dwie metody o tych samych nazwach  
**Ciekawostka** metodę można wywołać z typu np book.drukuj(b1), to się nazywa method expression  
Do metody przekazywana jest **kopia** struktury  
Metoda nalezy do typu, a funkcja do pakietu  
Jak receiver metody jest typu pinter to nie musimy wywoływać metody z &, bo GO podstawia to automtycznie. Można (&b1).zVatem(), ale trzeba  
**Warto** przekazywać pointer !!!  
  
```Go
func (b book) printBook() {
    fmt.Println(b.title)
}
```

```Go
func main() {

b1 := book{"lalka", 20}

b1.drukuj()
b1.zVatem()
b1.drukuj()

}

type book struct {
tytul string
cena  float64
}

func (b book) drukuj() {
fmt.Printf("%-15s: %.2f\n", b.tytul, b.cena)
}

func (b *book) zVatem() {
b.cena = 1.22 * b.cena
}
```

Do zwykłego typu też można dodać metodę. W przykładzie ponziej dodanie metody String sprawia, że obiekt automatycznie implementuuje interface Stringer  
A to oznacz, że w tej metodzcie definiujemyh co będzie zwracane jak pzrekazemy ten obiekt do fmt.Println  

```Go
type money float64

func (m money) String() string {
    return fmt.Sprintf("$%0.2f", m)
}

func main() {
    var x money = 1234
    fmt.Println(x)
}
```

## Inteface

```Go

/*
Tworzę dwie strukury i obie mają tą samą metodę doZaplaty. Ta metoda oblicza i zwraca cenę do zapłaty za produkt
*/
type naWage struct {
    nazwa    string
    cenaZaKg float64
    wagaWKg  float64
}
type naSztuki struct {
    nazwa        string
    cenaZaSztuje float64
    sztuk        int
}
func (w naWage) doZaplaty() float64 {
    return w.cenaZaKg * w.wagaWKg
}
func (s ) doZaplaty() float64 {
    return s.cenaZaSztuje * float64(s.sztuk)
}

/*
Obie strukury mają tą samą metodę więc mogę stworzyć interface kasa
Co oznacz ze teraz te strukry są typu kasa
*/
type kasa interface {
    doZaplaty() float64
}

/*
Tworzę nowy typ - slice pobiektów kasa. 
Robie tak dlatego, że moetody nie można przypiać bezośredo do slice
*/
type kupioneProdukty []kasa

/*
Definiuje metode dla typu kupioneProdukty, ktory jest slice dla obuiektu kasa, ktory jest intefejsem i ten intefejs mają struktury naWage i naSztuki
A to oznacz że do tej metody moze byćprzekazana lista obiektów  naWage lub naSztuki
*/
func (l kupioneProdukty) cenaZaWszystkie() float64 {
var total float64
for _, it := range l {
    total += it.doZaplaty() //mogę tu użyć metody doZaplaty, ktora jest inna dla obu typów naWage i naSztuki
    //fmt.Println(it)
}
return total
}

func main() {
w1 := naWage{"pomidory", 12, 1}
s1 := naSztuki{"avokado", 8, 1}

//tworze zmienna koszyk typu kupioneProdukty, ktory jest slicem obuiektów o typie kasa, naWage lub naSztuki
var koszyk kupioneProdukty

//dodaje obiuekty do listy
koszyk = append(koszyk, w1, s1)

fmt.Println(w1.doZaplaty())
fmt.Println(s1.doZaplaty())

//wywoluję metodę cenaZaWszystkie
fmt.Println(koszyk.cenaZaWszystkie())
}
```
