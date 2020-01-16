
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
func (s naSztuki) doZaplaty() float64 {
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

Type assrtion i dynamic extreaction  
W kodzie poniej tworze zmienną o typie kasa, czyli typie interface  
Wiem ze ten sam typ ma stuktura s1, więc mogę prezypisac p = s1  
Mogę wywołać funkcję p.doZaplaty() bo jets w definicji interfacu  
Ale nie mogę dostac się w prost do parametró i iinych funkcji tej struktury  
Robie to tak p.(typ)...  
Przykłąd  

```Go
var p kasa
p = s1
fmt.Printf("%#v\n",p)
fmt.Printf("%#v\n",p.(naSztuki).nazwa)

var p2 kasa
p2 = &s1
fmt.Printf("%#v\n",p2)
fmt.Printf("%#v\n",p2.(*naSztuki).nazwa)

fmt.Println("tot ", p.doZaplaty())
```

To jest przyklad typ assertion, nie bardzo wiem jak to działa, ale jest ważne  
ttt, ok :=p2.(*naSztuki)
fmt.Println(ttt, ok)

### Empty interface

Używanie emty interafce pozwala pisac kod, gdzie typy nie mają znaczenia  
Bo wszystko mozna przypisać do emtyInt a potem sprawdzic uzywajac dynami type jaki typ się przypisał  
Przykład

```Go
type emptyInterface interface{

}

var empty1 emptyInterface
var empty2 interface{}

empty1 = 42  //przypisuje wartość do pustego interfacu
fmt.Println(empty1 )  //mogę ją wyświetlić

//empty1 += 5  //nie mogę tego zrobić, jest o error
empty1 = empty1.(int) + 5  //a tak mogę, używam dyanmic typu i/lub type assertion

fmt.Println(empty1 ,empty2)
```

Inny przyklad wykorzystania pustego interfacu i dynamic type, gdy nie wiem jakiego typu jest wartośc, którą przypisujemy do typu  

```Go
var emptyInterface interface{}

emptyInterface = 42

if emptyInterface, ok := emptyInterface.(int); ok {
    fmt.Println("To liczba ", emptyInterface)
}

emptyInterface = "42"
if emptyInterface, ok := emptyInterface.(string); ok {
    fmt.Println("To string", emptyInterface)
}

fmt.Println("Hello, playground")

switch emptyInterface := emptyInterface.(type) {
case int:
    fmt.Println("To liczba ", emptyInterface)
case string:
    v, _ := strconv.Atoi(emptyInterface)
    fmt.Println("To string", v*3)
default:
    fmt.Println("To inny typ", emptyInterface)
}
```
