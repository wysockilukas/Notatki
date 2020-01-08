# Error handling

## nil

nil to odpowiednik null w javascript. Oznacza brak wartosci  
Pusty pointer lun pusty slice jest nil  
Err moze byc nil  

```Go
if err !=nil {
    return
}
if n, err:=strconv.Atoi("42"); err == nil {
    //n i  err maja zasięg tylko w ifie
    return
}
if n, err=strconv.Atoi("42"); err == nil {
    //n i  err maja zasięg poza if
    return
}
```
