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
df.[0:1]    //wiersz 0
df.[:10]     >> data frame
df.[-10:]
```
### iloc
```
df.iloc[0]   >> series
df.iloc[:5]  >> data frame
df.iloc[ list  ]   >> lista wartosci indexu
df.iloc[ index wierszy , index kolumn]
df.iloc[listaW, listaC]
```

### loc
```
df.loc['wartosc indexu']
df.loc['wartosc indexu'].iloc[0]
df.loc['wartosc indexu', 'index koumny']
df.loc[listaW, listaC]
df.loc[ : 'wartosc indexu'] >> od poczatku do 
```


## Metody series
```
df.Col1.equals(df['Col1'])
```
