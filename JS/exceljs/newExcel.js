'use strict';

class ExcelCell {
    constructor(cell) {
        const cellStyle = window.getComputedStyle(cell, null);
        const fontProps = (cell.childElementCount) ? window.getComputedStyle(cell.children[0], null): cellStyle;

        this.height = cell.offsetHeight,//Math.round(parseInt(cellStyle.getPropertyValue("height").replace("px",""))),
        this.width =  cell.offsetWidth,//Math.round(parseInt(cellStyle.getPropertyValue("width").replace("px",""))),
        this.borderLeft = cellStyle.borderLeft;
        this.borderRight = cellStyle.borderRight;
        this.borderTop = cellStyle.borderTop;
        this.borderBottom = cellStyle.borderBottom;
        this.alignment = cellStyle.textAlign;
        this.alignmentVert = cellStyle.verticalAlign;
        this.indent = parseInt(cellStyle.paddingLeft) ? parseInt(cellStyle.paddingLeft) + 5 / 10: 0; //jak padding jest zero to zero, a jak 
        this.font = fontProps.fontFamily;
        this.font_size = ( parseInt(fontProps.fontSize.replace("px", "")) * 0.65 ) + "px";
        this.font_weight = fontProps.fontWeight;
        this.font_style = fontProps.fontStyle;
        this.font_color = fontProps.color;
        this.background_color =  cellStyle.backgroundColor === "rgba(0, 0, 0, 0)" ? window.getComputedStyle(cell.parentNode).backgroundColor === "rgba(0, 0, 0, 0)" ? undefined : window.getComputedStyle(cell.parentNode).backgroundColor : cellStyle.backgroundColor
        this.tabulation = typeof cell.getElementsByTagName("A")[0]!== 'undefined' ? cell.getElementsByTagName("A")[0].innerText.replace(/\&nbsp\;/g, " ").length : 0;
        this.href = typeof cell.getElementsByTagName("A")[0]!== 'undefined' ? cell.getElementsByTagName("A")[0].getAttribute("href") : ""
        this.colspan = cell.colSpan;
        this.rowspan = cell.rowSpan;
        this.wordWrap = true;
        this.display = cellStyle.display;
        this.cellElement = cell.tagName.toLocaleLowerCase();
        this.text = cell.innerText;
        this.excel_value = cell.getAttribute('excel_value') ;
      }
}

class ExcelRow {
    excelCells = [];
    add_cell = (cell) => {
        this.excelCells.push(cell);
    }
}

class ExcelTable2 {
    excelRows = [];
    add_row = (row) => {
        this.excelRows.push(row);
    }
}    


function spowalniacz() {
    var above = 0,
        below = 0;
    for (var i = 0; i < 10000000; i++) {
        if (Math.random() * 2 > 1) {
            above++;
        } else {
            below++;
        }
    }
}


const getCellJson = cell => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            // spowalniacz();
            // console.log('Kom ',cell )
            const cellJson = new ExcelCell(cell)
            resolve(cellJson )
        }, 0);
    })
  }

  const getJsonFromTables = async () => {
    const output = []  
    const progress = document.getElementsByClassName("pasekPostepu"); 
    progress[0].innerText = "Start"
    let excelSheet = {};
    const tables = document.getElementsByClassName("jsExportToExcel");

    for (let i=0; i < tables.length; i++) {
        const excelTable = new ExcelTable2();
        const row = tables[i].getElementsByTagName("TR"); 

        for (let rowId=0; rowId < row.length; rowId++) { 
            const rowJSON = new ExcelRow();
            const cell = row[rowId].children;
            for (let cellId=0; cellId < cell.length; cellId++) {
                const cellJson = await getCellJson(cell[cellId])
                rowJSON.add_cell( cellJson );
                progress[0].innerHTML = `
                <p>Tabela ${i+1} z ${tables.length}:</p>
                <p>Wiersz ${rowId+1} z ${row.length}:</p>
                <p>Komórka ${cellId+1} z ${cell.length}:</p>
                `
            }
            excelTable.add_row(rowJSON);   
        }

        excelSheet = {};
        excelSheet.sheetName = tables[i].getAttribute('tableName');
        excelSheet.scale = 1;
        excelSheet.tableContent = excelTable;
        output.push(excelSheet);

        
     }
     return output;

  }

var zz = ''
for (var i =1; i <=2000; i++) {
    zz += 
    `<tr>
    <td class="jednostka">Zachodni</td>
    <td class="dane">${ parseFloat(Math.random()*100000).toLocaleString('pl')  }</td>
    <td class="dane">${parseFloat(Math.random()*100000).toLocaleString('pl')}</td>
    <td class="dane"><span style="color:red;">${parseFloat(Math.random()*100000).toLocaleString('pl')}</span></td>
    <td class="dane">${parseFloat(Math.random()*100).toLocaleString('pl')}</td>
    <td class="dane">${parseFloat(Math.random()*100).toLocaleString('pl')}%</td>
   </tr>
   `  ;
};
copy(zz);


const getJsonFromTablesHandler = async () => {
    const result = await getJsonFromTables()
    naServer(result);
    //console.log(result);
}


// const excelTableClass = ;

const tables = document.getElementsByClassName("jsExportToExcel");

const rows = tables[0].getElementsByTagName("TR");
// rowsNum = rows.length;
// const cell = rows[3].children[3]
// const cell = rows[0].children[0]


// const excelCell = new ExcelCell(cell);
//  console.log('Moja cell ', new ExcelCell(  rows[0].children[0]) );

const row = new ExcelRow();
row.add_cell(  new ExcelCell(  rows[0].children[0])  );
row.add_cell(  new ExcelCell(  rows[0].children[1])  );
// row.add_cell(  new ExcelCell(  rows[0].children[2])  );
// row.add_cell(  new ExcelCell(  rows[0].children[4])  );
// row.add_cell(  new ExcelCell(  rows[0].children[5])  );
// console.log('Moja row', row);


const row2 = new ExcelRow();
row2.add_cell(  new ExcelCell(  rows[1].children[0])  );
row2.add_cell(  new ExcelCell(  rows[1].children[1])  );
row2.add_cell(  new ExcelCell(  rows[1].children[2])  );
row2.add_cell(  new ExcelCell(  rows[1].children[4])  );
// row2.add_cell(  new ExcelCell(  rows[1].children[5])  );



const excelTable = new ExcelTable2();
excelTable.add_row(row);
excelTable.add_row(row2);

console.log('Moja excelTable', excelTable);



const naServer = (dd) => {

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState === 4 && xhttp.status === 200) {
			if (typeof window.navigator.msSaveBlob !== 'undefined') //navigator.appVersion.toString().indexOf('.NET') > 0
				window.navigator.msSaveBlob(xhttp.response, "plik.xlsx");
			else {
				let a = document.createElement('a');
				a.href = window.URL.createObjectURL(xhttp.response);
				a.download =  "plik.xlsx";
				a.style.display = 'none';
				document.body.appendChild(a);
				a.click();
			}
    };


    }

	xhttp.open("POST", "http://localhost:7661");
	xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	xhttp.setRequestHeader("dataType", "json");
	xhttp.responseType = 'blob';
	xhttp.send(JSON.stringify(dd));
	

}
