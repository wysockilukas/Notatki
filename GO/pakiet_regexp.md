# regexp

Kompilowanie wzorca wyrażeń regularnych jest kosztowną operacją  

```Go
rx := regexp.MustCompile(`[^a-z]+`)   //szuka innych niz litery
word = rx.ReplaceAllString(word, "")  //to zamienia wszystko co nie jest litera
```
