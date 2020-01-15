
# Metody i interfejsy

## Metody

Func (o typ) nazwa() ...  
Mogą istnieć dwie metody o tych samych nazwach  
**Ciekawostka** metodę można wywołać z typu np book.drukuj(b1), to się nazywa method expression  
Do metody przekazywana jest **kopia** struktury  
  
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

## Inteface


```Go

```
