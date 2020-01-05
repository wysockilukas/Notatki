
# Pandas  

```python
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

titanic.fare.cumsum(axis=0)

summer.Year.between(1960, 1969)
_is_view
_is_copy
_is_copy is None
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
Występuje index wierszy i kolumn, moze byc liczbowy lub tekstowy
I inxex wierszy nie musi byc unikalny
```
summer = pd.read_csv("summer.csv", index_col="Athlete")
summer.columns.tolist()
summer.index.get_loc("DRIVAS, Dimitrios")
index_1 = pd.Index(range(1,4))
index_2 = pd.Index(["Mo", "Tue", "Wed"], name = "days")
pd.Series([34,32,21], index = index_1)
```

### Resetowanie
```
summer.reset_index(drop = False, inplace=True)          >>usuwa i tworzy domyslny
summer.set_index("Year", drop = True, inplace = True)   >>ustawia index na podstawie kolumny Year
summer.index.is_unique
new_index = ["Medal_No{}".format(i) for i in range(1,summer.index.size+1)]
summer.index = new_index
summer.index.name = "Medal_No"
summer.reset_index()                      >> popzreni index Medal_No  stanie sie kolumna, chyba ze damy drop = True
```

## Rename column i index
```
titanic.columns = ["Alive", "Class", "Sex", "Age", "SibSp", "ParChi", "Fare", "Emb", "Deck"]
titanic.columns.name = "Pass_Charact"
titanic.index.name = "Passenger_no"
summer.rename({"HAJOS, Alfred":'HAYOS, Alfred'}, axis = "index", inplace= True)
summer.rename({"Gender":'Sex', "City":"Host_City"}, axis = "columns", inplace=True)
```


# Dataframe
## Filtrowanie
```
titanic[titanic.sex == "male"]
titanic.loc[titanic.sex == "male", [kolumny]]             >>lepiej uzywac loc
mask1 = titanic.sex == "male"
titanic_male = titanic.loc[mask1]                         >>lepiej uzywac loc
titanic_male = titanic[mask1

mask2 = titanic.dtypes == object                          >> kolumy str
titanic.loc[:, ~mask2]                                    >>filtrujemy kolumny ktore nie sa str

mask2 = titanic.age > 14
mask1 = titanic.sex == "male"
male_adult = titanic.loc[mask1 & mask2, ["survived", "pclass", "sex", "age"]]
male_adult = titanic.loc[mask1 | mask2, ["survived", "pclass", "sex", "age"]]

og_60s = summer.loc[summer.Year.between(1960, 1969, inclusive=True)]

my_favourite_games = [1972, 1996]
summer.Year.isin(my_favourite_games).head()
og_72_96 = summer.loc[summer.Year.isin(my_favourite_games)]
og_not_72_96 = summer.loc[~summer.Year.isin(my_favourite_games)]

summer[summer.Event.str.contains("100M")]
```

## Usuuwanie kolumn
```
summer.drop(columns = ["Sport", "Discipline"], inplace=True)
summer = summer.loc[:,["Year", "City", "Athlete", "Country", "Gender", "Medal"]]
```

## Usuwanie wierszy
```
summer.drop(labels = "DRIVAS, Dimitrios", axis = 'index',  inplace = True)
summer = summer.loc[~(mask1 | mask2)]
```

## Dodawanie kolumn
```
titanic["Zeros"] = "Zero"
titanic.Ones = 1
titanic["YoB"] = 1912 - titanic.age
titanic.insert(loc = 6, column = "relatives", value = relatives)
```

## Tworzenie z list
```
dic = {"col1": lista1, "col2":lista2}
df=pandas.DataFrame(data = dic)
```

# metody
```
titanic.replace(0, "Zero")
titanic.count(axis = "columns")
titanic.mean(axis = 1)
titanic.sum(axis = 0)
titanic.fare.cumsum(axis = 0)
itanic.corr()
titanic.survived.corr(titanic.pclass)


```

## modyfikoanie calego dataframe
unikamy chainindexing, uzywamy iloc lub loc

## modyfikoanie fragmentu dataframeu, ale nie ruszac oryginalu
loc, iloc + metpdya .copy()


## Sortowanie
```
titanic.age.sort_values()
titanic.sort_values("age")  >>zwraca df, ale nie jest inplace
titanic.sort_values("age", axis = 0, ascending = True, inplace = True)
titanic.sort_values(["pclass", "sex", "age"], ascending = [True, False, True], inplace= True)
```

## Rank
```
sales.rank(ascending=False, method = "min").sort_values(ascending = True)
sales.rank(ascending=False, method = "min", pct=True).sort_values()
titanic["fare_rank"] = titanic.fare.rank(ascending = False, method="min") 
```
## nunique(), nlargest() and nsmallest() 
```
titanic.nunique(dropna = False)           >>liczba unikalnych wartosci we wszystkich kolumnach z null lub bez
titanic.nunique(axis = 1, dropna=False)   >>liczba unikalnych w wierszach
titanic.nlargest(n = 5, columns = "fare")
titanic.nsmallest(n = 1, columns = "age")
```

## apply(), map() and applymap()
```
def range(series):
    return series.max() - series.min()
sales.apply(range, axis=1)
sales.apply(lambda x: x.max() - x.min(), axis = 0)

summer.Athlete.apply(lambda x: x[0])
summer.Athlete.map(lambda x: x[0])
sales.applymap(lambda x: 0.4*x-5)
```





