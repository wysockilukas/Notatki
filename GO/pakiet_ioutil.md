# ioutil

```Go
ioutil.readDir  //zwraca slice of typu os.FileInfo
ioutil.WriteFile

s := "jaki string"
var b []byte
b = append(b, s...) //string to ciag bajtow
err = ioutil.WriteFile("plik.txt", b, 0644)
```
