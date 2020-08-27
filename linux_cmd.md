
kopiowanie plikow ktorych nazwa nie zaczyna sie od liczby  
```bash
find . -maxdepth 1 -regex '\./[^0-9].*\.png' -exec cp {} /data/htdocs/mobile/img \;
```
Usuwanie katalogu z zawartoscia  
```bash
rm -rf lite/
```

Kopiowanie folder do folderu  
```bash
cp -avr /data/MIS_OBIEE/disco/SYSTEM/lite/ /data/htdocs/lite/
```

```bash
echo $SHELL
mkdir -p devops/tmp
rm -r ~/devops/tmp/
cp -r go ~/devops/tmp/
rm -rf go/
touch newFile.txt
cat > newFile.txt 
cat newFile.txt 
cp newFile.txt newFileRen.txt
rm -f newFile.txt 
mv newFileRen.txt newFile.txt
whoami
id
curl https://www.onet.pl/plik.txt -O
wget https://www.onet.pl/plik.txt -O jakoPlik.txt
ls /etc/*release*
cat /etc/*release*
```
  
i - Insert at cursor (goes into insert mode)  
a - Write after cursor (goes into insert mode)  
A - Write at the end of line (goes into insert mode)  
ESC - Terminate insert mode  
u - Undo last change  
U - Undo all changes to the entire line  
o - Open a new line (goes into insert mode)  
dd - Delete line  
3dd - Delete 3 lines.  
D - Delete contents of line after the cursor  
C - Delete contents of a line after the cursor and insert new text. Press ESC key to end insertion.  
dw - Delete word  
4dw - Delete 4 words  
cw - Change word  
x - Delete character at the cursor  
r - Replace character  
R - Overwrite characters from cursor onward  
s - Substitute one character under cursor continue to insert  
S - Substitute entire line and begin to insert at the beginning of the line  
~ - Change case of individual character  
  
Saving and Closing the file  
Shift+zz - Save the file and quit  
:w - Save the file but keep it open  
:q - Quit without saving  
:wq - Save the file and quit  
