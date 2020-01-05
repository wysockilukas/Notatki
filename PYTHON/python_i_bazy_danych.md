# Python polaczenie do baz danych


## Terdata
```
import pyodbc

def create_connection():
    conn = pyodbc.connect("DRIVER=Teradata;DBCNAME=KHD_LIVE;UID=PL135555;PWD=!Zielony69;QUIETMODE=YES", autocommit=True,unicode_results=True)
    return conn
conn_rw = create_connection()
abc = pandas.read_sql('select * from dbc.usersV', conn_rw)

```

## Oracle
```

```


## MS SQL Server
```
import pyodbc
conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=WRO294VM;'
                      'Database=middle_office;'
                      'Trusted_Connection=yes;')
cursor = conn.cursor()
cursor.execute("select data_raportu,  cif , nominal  from ORF_DEALS_IR where cif = '1012206328'")
for row in cursor:
    print(row)
```
