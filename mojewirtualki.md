
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
  
