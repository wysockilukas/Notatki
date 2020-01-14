
# Struktry i JSON

## structs

Struct to typ, troche przypoina klasę z OOP  
W runtime strukt jest niezmienna, nie można np dodawaćnowych pól  
Jak przy deklaracji struct uzywamy nazw pol to kolejność nie ma znaczenia  
Struct values to "bare values" do funckji pzrekazywane są kopie, zwraane są kopie (nie pointer)  

```Go
type person struct  {
    name string
    age int
}

p1 := person{
    name: "Imię",
    age: 42,
}
p1.name = "Inne imię"
fmt.Printf("%#v\n",p1)  //zwróci main.person{name:"Inne imię", age:42}

var p2 person
p2.name = "ttt"
```

Porównanie struct jest możliwe jka zawiera tylko porównywaklne typy, np jak ma slice to juz się nie da  

```Go
p1==p2
```

Zagnieżdzone

```Go
type adres struct {
    ulica, miasto, kod string
}

type person struct {
    name  string
    adres adres
}
p1 := person{
    name: "Imię",
    adres: adres{
        ulica:  "Długa 1",
        miasto: "Warszawa",
        kod:    "00-105",
    },
}
p1.name = "Inne imię"
fmt.Printf("%#v\n", p1)
```

## JSON

W Go tworzenie JSON nazywa sie marshaling (chyba)  
JSON package koduje na jsona tylko eksportowane pola, czyli z dużej litery  

### Encoding

```Go
type adres struct {
    Ulica, Miasto, Kod string
}

type person struct {
    Name  string
    Adres adres
}
p1 := person{
    Name: "Imię",
    Adres: adres{
        Ulica:  "Długa 1",
        Miasto: "Warszawa",
        Kod:    "00-105",
    },
}
p1.Name = "Inne imię"

//p1.adres.miasto = "Lublin"

out, _ := json.Marshal(p1)
out, _ := json.MarshalIndent(p1, "", "\t")  //ładniej formatuje JSONa

fmt.Printf("%#v\n", p1)
fmt.Println(string(out))
```

Wykluczanie z JSONa  

```Go
type person struct {
    Name  string `json:"username,omitempty"`
    Adres adres `json:"-"`  //nie będzie adresu w JSONie
}
```

### Decoding

```Go
var input []byte
// W tej pętli wczytuje zawartosc pliku do zmiennej input; program wywoalny go run main.go < plik.txt
for in:=bufio.NewScanner(os.Stdin); in.Scan(); {
    input = append(input, in.Bytes()...)
}
```

```Go
type adres struct {
    Ulica, Miasto, Kod string
}

type person struct {
    Name  string `json:"username"`  //bo w JSONie pole nazywa się username a nie Name
    Adres adres
}

dane := `
{
"username": "Inne imię",
"Adres": {
"Ulica": "Długa 1",
"Miasto": "Warszawa",
"Kod": "00-105"
}
}
`

var wynik person

fmt.Println(dane)

err := json.Unmarshal([]byte(dane), &wynik)
fmt.Println("err ", err)
fmt.Println(wynik)
fmt.Println(wynik.Adres.Kod)
```
