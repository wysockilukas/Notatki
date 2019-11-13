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
