
# Funckje i pointery

## Funkcje

Funckja tworzy kopie paramatetrów, chyba ze pzrekaze sie pointer  
Wyjątkiem są mapy, bo wtedy przekazywany jest pointer  

## Pointery

Pointery też mają typ  
np *byte, *int  

```Go
v:= 42      //v=42
p:=&v       //0x40e020
m:=v        //m=42
m = 150     //m=150
p = &m      //0x40e024
*p          // = 150
var p *int
```

Przekazywanie do funkcji  
Funckja tworzy kopie pointera, czyli sa dwa pointery ale oba wskazuja do tej samej komorki pamieci gdzie jest wartosc zmiennej  
Jak funkcja konczy dzialanie to kopia pointer jest usuwana z pamieci  
***Podobno lepiej nie uzywać pointer ze slices***  
Map też nie pzrekazujemy jako pointer, bo mapa juz jest pointerem  
Zeby w funckji zmodyfikowac struct to przekazujemy go jako pointer  

```Go
func main() {

tbl := [...]int{1, 2, 3}
fmt.Println(tbl)
inc(&tbl)
fmt.Println(tbl)
}

func inc(tbl *[3]int) {
for v := range tbl {
    (*tbl)[v]++
    //tbl[v]++    ten zapis jest dopuszczalny GO automatycznie podstawia gwiazdkę
}
}
```
