
# Teradata
## Instalacja

Wirtualkę pobrałem z https://downloads.teradata.com/download/database/vantage-express-for-vmware-player  
TDExpress15.10.0.7_Sles11_40GB_vp 
Artykuł jak zainstalować  
https://hernandezpaul.wordpress.com/2017/01/24/teradata-express-15-10-installation-using-oracle-virtualbox/  

## Polecenia

Czy działa SSH jako serwis  
```bash
service sshd status  
```

Sprawdzenie i dodanie interfajsu eth  
```bash
ip addr show
ip addr add 192.168.0.175/24 dev eth0
```

Start bazy
```bash
/etc/init.d/tpa start
```

# REDHAT 
## Sterowniki TD
```bash
cp Downloads/tdodbc1700__linux_x8664.17.00.00.18-1.tar.gz sources/
tar xvf tdodbc1700__linux_x8664.17.00.00.18-1.tar.gz
cd tdodbc1700/
./setup_wrapper.sh
```
vi .bash_profile  
export ODBCSYSINI=/etc  
export ODBCINI=/etc/odbc.ini  
cp /opt/teradata/client/17.00/odbc_64/odbc.ini /home/osboxes/.odbc.ini  
cp /opt/teradata/client/17.00/odbc_64/odbc.ini /home/centos/.odbc.ini  
sudo cp /opt/teradata/client/17.00/odbc_64/odbc.ini /etc/odbc.ini  
isql -v td dbc dbc  
.//odbcinst  
./odbcinst -m  
./odbcinst -c  
./odbcinst -j  
./odbcinst -n  
./odbcinst -l  



/etc/odbc.ini
```bash
[ODBC]
# For Data Direct to load its error messages
# Data Direct Driver Manager looks for the messages here:
# "/opt/teradata/client/17.00/locale/xx_xx/LC_MESSAGES/"
InstallDir=/opt/teradata/client/17.00/odbc_64
Trace=no
Pooling=yes


[ODBC Data Sources]
td=tdataodbc_sb64.so


[td]
# This key is not necessary and is only to give a description of the data source.
Description=Teradata Database ODBC Driver 17.00

# Driver: The location where the ODBC driver is installed to.
Driver=/opt/teradata/client/17.00/odbc_64/lib/tdataodbc_sb64.so

# Required: These values can also be specified in the connection string.
DBCName=192.168.0.128
UID=dbc


# Optional
AccountStr=
CharacterSet=ASCII
DatasourceDNSEntries=
DateTimeFormat=AAA
DefaultDatabase=
DontUseHelpDatabase=0
DontUseTitles=1
EnableExtendedStmtInfo=1
EnableReadAhead=1
IgnoreODBCSearchPattern=0
LogErrorEvents=0
LoginTimeout=20
MaxRespSize=65536
MaxSingleLOBBytes=4000
MaxTotalLOBBytesPerRow=65536
MechanismName=
NoScan=0
PrintOption=N
retryOnEINTR=1
ReturnGeneratedKeys=N
SessionMode=System Default
SplOption=Y
TABLEQUALIFIER=0
TCPNoDelay=1
TdmstPortNumber=1025
UPTMode=Not set
USE2XAPPCUSTOMCATALOGMODE=0
UseDataEncryption=0
UseDateDataForTimeStampParams=0
USEINTEGRATEDSECURITY=0
UseSequentialRetrievalOnly=0
UseXViews=0
EnableUDFUpload=0
UDFUploadPath=Please enter the UDF folder path
EnableRedrive=Default
ReconnectCount=20
ReconnectInterval=30
Type=Default
```
  
/etc/odbcinst.ini
```bash
# Example driver definitions

# Driver from the postgresql-odbc package
# Setup from the unixODBC package
[PostgreSQL]
Description     = ODBC for PostgreSQL
Driver          = /usr/lib/psqlodbcw.so
Setup           = /usr/lib/libodbcpsqlS.so
Driver64        = /usr/lib64/psqlodbcw.so
Setup64         = /usr/lib64/libodbcpsqlS.so
FileUsage       = 1


# Driver from the mysql-connector-odbc package
# Setup from the unixODBC package
[MySQL]
Description     = ODBC for MySQL
Driver          = /usr/lib/libmyodbc5.so
Setup           = /usr/lib/libodbcmyS.so
Driver64        = /usr/lib64/libmyodbc5.so
Setup64         = /usr/lib64/libodbcmyS.so
FileUsage       = 1


# Driver from the freetds-libs package
# Setup from the unixODBC package
[FreeTDS]
Description     = Free Sybase & MS SQL Driver
Driver          = /usr/lib/libtdsodbc.so
Setup           = /usr/lib/libtdsS.so
Driver64        = /usr/lib64/libtdsodbc.so
Setup64         = /usr/lib64/libtdsS.so
Port            = 1433


# Driver from the mariadb-connector-odbc package
# Setup from the unixODBC package
[MariaDB]
Description     = ODBC for MariaDB
Driver          = /usr/lib/libmaodbc.so
Driver64        = /usr/lib64/libmaodbc.so
FileUsage       = 1

[Teradata]
Driver=/opt/teradata/client/17.00/odbc_64/lib/tdataodbc_sb64.so
```



## Python

# jupyter
Zeby był dostepny zdalnie musiałem utworzyc i skonfigurować plik jupyter_notebook_config.py  
Odkomentowałem dwie linie  
c.NotebookApp.allow_origin = '*' #allow all origins  
c.NotebookApp.ip = '0.0.0.0' # listen on all IPs  

A ponzniej musialem otworzyc porty w firewall  
```bash
firewall-cmd --zone=public --add-port=8888/tcp --permanent
firewall-cmd --reload
```
