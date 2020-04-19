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
