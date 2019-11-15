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


## Series 
### Metody
```
df.Col1.equals(df['Col1'])
df.Col1.dtype
age = df.age
age.index
age.describe()
age.count()     >> wszystkie nie nulle
age.size        >> wszystkie z nullami
age.sum()
age.mean()
age.std()
age.min()
age.max()
age.ptp()
age.median()
age.unique()        >> wylacznie do series
age.nunique()       >> liczba unikalnyhc
age.value_count()   >>liczebnosci 
age.value_counts(dropna = True, sort = True, ascending = False)
age.value_counts(dropna = True, sort = True, ascending = False, normalize = True)       >>udzial procentowy
age.value_counts(dropna = True, sort = True, ascending= False, bins = 5).head()         >>liczebnosc w pieciu grupach

sales.sort_index()
sales.sort_index(ascending = True, inplace= True)
age.sort_values(ascending=False).head(3) ==  age.nlargest(n = 3)
sales.sort_values(ascending=False)  ==  sales.idxmax()
```

### Tworzenie
```
pd.Series([10,25,6,36,2])
pd.Series([10,25,6,36,2], index=["Mon","Tue","Wed","Thu", "Fri"], name = "Sales")
pd.Series(  np.array([10,25,6,36,2])  )
pd.Series( (10,25,6,36,2)  )
pd.Series(    {"Mon":10, "Tue":25, "Wed":6, "Thu": 36, "Fri": 2}    )
pd.Series(dic, index = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"])      >>dodajemy brakujacy dzien tygodnia
pd.Series(dic, index = [1,2,3,4,5])
```

### Zmiany
```
sales = (sales/1.1).round(2)
age = titanic["age"]    >> referancje do klumny w data frame
age.iloc[1] = 30        >>zmieniamy wartosc w dataframe
mpg = cars.mpg.copy()
```

## Indexy

