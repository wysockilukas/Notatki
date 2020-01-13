# bufio

## bufio.Scanner  

Scan input stream linia po linie (z pliku, internetu, lini komend) i dodaje do bufora  
Metoda Scan() kończy dzialanie jak napotka znak końca lini  
Jak jest więcej danych to zwraca true, a jak false to oznacza ze pzreslkanowano wszsytkie dane  
Text() zwraca tekst z bufora  
Mozna pzrekazac jako parametr programu file np go run main.go < plik.txt  

```Go
in := buffio.NewScanner(os.Stdin)
in.Scan()  //zwraca true or false
fmt.Println( in.text())
fmt.Println( in.Bytes())

for in.Scan() {

}

in.Split(bufio.ScanWords) //zmieniamy domyślny skaner, żeby skanował słowa a nie linie
```
