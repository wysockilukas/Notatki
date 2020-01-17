# strings

strings.Builder - służy do wydajniejszego łaczenia stringów  
WriteString zwraca int, ale ma funnckje String, co oznacza ze spełni interfejs Stringer,  
a to oznacza że mozna wynnik metody String pzrekzaćnp do fmt.Println  

```Go
    var str strings.Builder
    str.WriteString("abc")
    str.WriteString("def")
    str.WriteRune('\n')
    fmt.Println(str.String())
```
