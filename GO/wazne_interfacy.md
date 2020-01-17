# Ważne interfajsy

## Interface Stringer

Typu, ktore mają metodę  
func String() (string)  impelmentują interface Stringer, czyli to  
co zwraca funkcja String() będzie zwracane jak dany typ będzie pzrekazny do fmt.Print

```Go
type produkt struct {
    nazwa string
    cena  float64
}

func (p *produkt) String() string {
    return fmt.Sprintf("Produkt :%s w cenie %.2fzł", p.nazwa, p.cena)
}

func main() {
    //nie działą uważaj na typ w metodzie. String jest do typu pointer
    p1 := produkt{"awokado", 8.5}
    fmt.Println(p1)

    //A terwz działa bo typ to &produkt
    p2 := &produkt{"awokado", 8.5}
    fmt.Println(p2)
}
```

## Sorter - sort interface

Funckcja sort przyjmuje jako argument typ interface  
Ten typ w pakieciem sort nazywa się Interface (z dużej litery)  
Więc jak nasz typ będzie mieć metody len Less i Swap to rownież będzie typem Interface i będzie go mozna przzekazać do funckji Sort  

```Go
type Interface interface {
    // Len is the number of elements in the collection.
    Len() int
    // Less reports whether the element with
    // index i should sort before the element with index j.
    Less(i, j int) bool
    // Swap swaps the elements with indexes i and j.
    Swap(i, j int)
}
```

Przykład  

```Go
type produkt struct {
    nazwa string
    cena  float64
}

func (p *produkt) String() string {
    return fmt.Sprintf("Produkt :%s w cenie %.2fzł", p.nazwa, p.cena)
}

type listaProduktow []*produkt

func (l listaProduktow) Len() int {
    return (len(l))
}

func (l listaProduktow) Swap(i, j int)      { l[i], l[j] = l[j], l[i] }
func (l listaProduktow) Less(i, j int) bool { return l[i].cena < l[j].cena }

func main() {
    //nie działą uważaj na typ w metodzie. String jest do typu pointer
    p1 := produkt{"awokado", 8.5}
    fmt.Println(p1)

    //A terwz działa bo typ to &produkt
    p2 := &produkt{"awokado", 8.5}
    p3 := &produkt{"jabłaka", 4}
    p4 := &produkt{"jakokosa", 12}

    //lista := []listaProduktow{p2, p3, p4} -- tak jest blad
    var lista listaProduktow
    lista = append(lista, p2, p3, p4)

    fmt.Println(lista)

    sort.Sort(lista)
    fmt.Println(lista)

    sort.Sort(sort.Reverse(lista))
    fmt.Println(lista)
}
```

## Marshalers

Założmy że mamy strukturę o polu nazwa s  

```Go
type Marshaler interface {
    MarshalJSON() ([]byte, error)
}
```
