
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
