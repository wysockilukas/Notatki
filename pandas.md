# Pandas  
```
ctrl + enter 
alt + enter
shift + enter
tab + tab
sfift + tab //wewnatrz wywolaia funkcji
shift + tab  tab  //wiecej
shift + tab tab tab //nie znika
shift 4xtab
```


## Basics
```
pd.options.display.max_rows = 10
pd.options.display.min_rows = 10
df.head(10)
df.tail(10)
df.columns
df.index   //row index
df.info()
df.shape
df.descripe()  //statystyki
```

## Wybieranie kolumn
```
df.['Col1']           //series
df.[['Col1']]         //dataframe
df.[['Col1','Col2']]  //dwie kolumny
df.[['Col2','Col1']]  //dwie kolumny
df.Col1               //series
```

## Wybieranie wierszy
```
df.['Col1']           //series

```


## Metody series
```
df.Col1.equals(df['Col1'])
```
