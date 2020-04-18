//musi byc dodane zeby kod działał w pzregladrace, zamias nodejs

/**
 * TODO: 
 * ? dfsdfsfs
 * ! sdfsdfsdf
 */
var Excel = ExcelJS;



var znak = String.fromCharCode(160);
var znak2 = String.fromCharCode(8239);


function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "FF" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}

function toColumnName(num) {
    for (var ret = '', a = 1, b = 26;
        (num -= a) >= 0; a = b, b *= 26) {
        ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
    }
    return ret;
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};



//
//ustawiamy wysokosc wierszy i szerokosc kolumn
//
function wsSetRowsColumnsHeightWidth(excelHTMLObject, ws) {

if (typeof excelHTMLObject.excelRows !== 'undefined'){
    //console.log(excelHTMLObject);
    var columnWidthArray = [];
    var rowHeightArray = [];

    //set text to cells
    excelHTMLObject.excelRows.forEach(function (row, index) {
		try{
			
        var rowArray = [];
        row.excelCells.forEach(function (cell, sub_index) {
            rowArray.push(cell.text);
			
			//KAROL B
			if (cell.hasOwnProperty("rowspan"))
				if (cell.rowspan > 1){
					cell.height = 0;
					cell.width = 0;
				}
			
			//Define rows min height
            if (cell.height !== 0) {
                if (typeof rowHeightArray[index] == "undefined") {
                    rowHeightArray[index] = (cell.height / 1.33);
                } else {
                    if (rowHeightArray[index] < (cell.height / 1.33)) {
                        rowHeightArray[index] = (cell.height / 1.33);
                    }
                }
            }

            //Define columns min width
            if (cell.width !== 0 && cell.cellElement == 'td' && cell.colspan == 1) {
                if (typeof columnWidthArray[sub_index] == "undefined") {
                    columnWidthArray[sub_index] = ((cell.width + 1) / 7.06);
                } else {
                    if (columnWidthArray[sub_index] < ((cell.width + 1) / 7.06)) { //when actual width is less than currenc cell then use current cell
                        columnWidthArray[sub_index] = ((cell.width + 1) / 7.06);
                    }
                }
            }


        });
        ws.addRow(rowArray);
		}catch(e){
			console.log(e);
		};
    });

    //Set column width
    var columnsArr = [];
    columnWidthArray.forEach(function (item, index) {
        columnsArr.push({
            width: item
        });
    });
    ws.columns = columnsArr;

    excelHTMLObject.excelRows.forEach(function (row, index) {
        var mergeOffset = 0;
        var worksheetRow = ws.getRow(index + 1);
        worksheetRow.height = rowHeightArray[index];
    });
}

	

}



function getFormat(type, precision, inNum) {
    var str = "";
    var strDecimal = "0";
    if (precision === -1) precision = 0;

    if (precision <= 0) {
        strDecimal = "0";
    } else {
        strDecimal = "0." + "0".repeat(precision);
    }
    str = '### ### ### ##' + strDecimal;

    if (type === '(%') {
        str = strDecimal + '%;(' + strDecimal + '%)';
    }

    if (type === '%') {
        str = strDecimal + '%';
    }

    if (type === '(') {
        strNum = parseInt(inNum, 10).toString();
        var vGr =   Math.ceil(strNum.length / 3) - 1;
        var fFormat;
        strDecimal = ".0".repeat(precision);
        if (strNum.length <= 3) {
            fFormat = "#".repeat(strNum.length) + strDecimal;
        } else {
            fFormat = "#".repeat(strNum.length - 3 * vGr) + " ###".repeat(vGr) + strDecimal
        }

        str = fFormat + ';(' + fFormat + ')';
    }

    return str;
}


function setNumberFormat(cell, worksheetCell, index, sub_index, scale) {


    //sparawdza czy jest text w komorce
    if (cell.text !== "" && /\S/.test(cell.text)) {


        // if (index == 3 && sub_index == 24) {
        //     console.log('A');
        // }



        //czy w komorce jest liczba
        if (!(/[a-zA-Z<>]/.test(cell.text))) {

            let przed = cell.text
            var vInNumber = cell.text.replaceAll(" ", "").replaceAll(znak2, '').replaceAll(znak, '').replaceAll(",", ".").replace("(", "").replace(")", "").replaceAll("%", "");
            // console.log(przed, "\t", vInNumber )
            
            var fullValue =0
            if (cell.excel_value=='BRAK' || !(cell.hasOwnProperty("excel_value")) || cell.excel_value===null ) {
                fullValue = vInNumber;
            } else {
                fullValue = Number(cell.excel_value / (1000000/scale));
            }

            // console.log('fullValue ', fullValue)
            
            var lastColonIndex = vInNumber.lastIndexOf(".");
            if (lastColonIndex == -1) {
                var vPrecision = 0;
            } else {
                var vPrecision = vInNumber.length - lastColonIndex - 1;
            }

            // console.log(index,sub_index, cell.text, vInNumber, vPrecision);

            if (cell.text.indexOf("%") !== -1) {

                if (cell.text.trim().startsWith("(")) {
                    worksheetCell.numFmt = getFormat('(%', vPrecision);
                    // worksheetCell.value = Number(0 - parseFloat(cell.text.replaceAll(" ", "").replaceAll(",", ".").replace("(", "").replace(")", "").replaceAll("%", "")) / 100);
                    worksheetCell.value = Number(0 - parseFloat(vInNumber) / 100);
                } else {
                    if (cell.text.length > 1) {
                        worksheetCell.numFmt = getFormat('%', vPrecision);
                        worksheetCell.value = (Number(vInNumber) / 100);
                    } else {
                        worksheetCell.value = cell.text;
                    }
                }

            } else if (cell.text.trim().startsWith("-") && cell.text.trim().length > 1) {
                worksheetCell.numFmt = '[Red]# ##0.00';
                // worksheetCell.value = (Number((cell.text.trim().replaceAll(" ", "").replaceAll(",", "."))));
                // worksheetCell.value = (Number((vInNumber)));
                worksheetCell.value = fullValue;
            } else if (/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(cell.text) ||
                /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(cell.text)) {
                worksheetCell.value = cell.text;
            } else if (cell.text.trim().startsWith("(")) {
                // worksheetCell.value = Number(0 - parseFloat(cell.text.replaceAll(" ", "").replaceAll(",", ".").replace("(", "").replace(")", "")));
                // worksheetCell.value = Number(0 - vInNumber / scale);
                worksheetCell.value = fullValue;
                worksheetCell.numFmt = getFormat('(', vPrecision, vInNumber / scale);
            } else if (cell.text.trim() == '-') {
                worksheetCell.value = '';
            } else {

                // if (index == 3 && sub_index == 24) {
                // }


                // worksheetCell.value = Number((cell.text.replaceAll(" ", "").replaceAll(",", ".").replaceAll(znak, '')));
                // worksheetCell.numFmt = '# ##0.00';
                // worksheetCell.value = Number(vInNumber / scale);
                worksheetCell.value = fullValue;
                worksheetCell.numFmt = getFormat('default', vPrecision);

                console.log('worksheetCell.value ', worksheetCell.value,  worksheetCell.numFmt)

                // if (index == 3 && sub_index == 24) {
                // }

            }

            //w komorce sa tylko literu lub <>    
        } else {

            // if (index == 3 && sub_index == 24) {
            //     // console.log('C');
            // }

            worksheetCell.value = cell.text;
        }
    }

}




function wsSetCellProperties(excelHTMLObject, ws, scale) {
    //set styles to cells
if (typeof excelHTMLObject.excelRows !== 'undefined'){
	var shifts = []; //KAROL B
    excelHTMLObject.excelRows.forEach(function (row, index) {
		
		/* KAROL B */
        var mergeOffset = 0;
		let isShift = typeof shifts[index] !== 'undefined' ? true : false;
		
        var worksheetRow = ws.getRow(index + 1);
        //worksheetRow.height = rowHeightArray[index];

        row.excelCells.forEach(function (cell, sub_index) {
		try{ //KAROL B
			
			/* KAROL B */
			if (isShift){
				while (shifts[index].hasOwnProperty(mergeOffset)){
					mergeOffset += shifts[index][mergeOffset];
					// console.log("shift: row %d, cell %d",index,mergeOffset);
				}
			}
			try{
				var worksheetCell = worksheetRow.getCell(mergeOffset + 1);
			}catch(e){
				// console.log("out of scope?");
			}
			

            if (cell.borderLeft !== "" && cell.borderLeft.substring(0, 3) != '0px') {
                if (typeof worksheetCell.border == 'undefined') {
                    worksheetCell.border = {};
                }

                worksheetCell.border.left = {
                    style: 'thin',
                    color: {
                        argb: rgb2hex("rgb" + cell.borderLeft.split("rgb")[1])
                    }
                };
            }
            if (cell.borderRight !== "" && cell.borderRight.substring(0, 3) != '0px') {
                if (typeof worksheetCell.border == 'undefined') {
                    worksheetCell.border = {};
                }

                worksheetCell.border.right = {
                    style: 'thin',
                    color: {
                        argb: rgb2hex("rgb" + cell.borderRight.split("rgb")[1])
                    }
                };
            }
            if (cell.borderBottom !== "" && cell.borderBottom.substring(0, 3) != '0px') {
                if (typeof worksheetCell.border == 'undefined') {
                    worksheetCell.border = {};
                }
                worksheetCell.border.bottom = {
                    style: 'thin',
                    color: {
                        argb: rgb2hex("rgb" + cell.borderBottom.split("rgb")[1])
                    }
                };
            }
            if (cell.borderTop !== "" && cell.borderTop.substring(0, 3) != '0px') {
                if (typeof worksheetCell.border == 'undefined') {
                    worksheetCell.border = {};
                }
                worksheetCell.border.top = {
                    style: 'thin',
                    color: {
                        argb: rgb2hex("rgb" + cell.borderTop.split("rgb")[1])
                    }
                };
            }
            if (cell.font !== "") {
                worksheetCell.font = {
                    name: cell.font.split(",")[0],
                    color: {
                        argb: rgb2hex(cell.font_color)
                    },
                    family: 2,
                    size: cell.font_size.replace("px", ""),
                    bold: (cell.font_weight === "bold" || cell.font_weight >= 600),
                    italic: (cell.font_style === "italic")
                };
            }

            var align = cell.alignment;
            align = (align === "start") ? 'left' : align;
            align = (align === "end") ? 'right' : align;


            worksheetCell.alignment = {
                vertical: cell.alignmentVert,
                horizontal: align,
                indent: cell.indent
            };

            if (cell.background_color !== "") {
                if (cell.background_color == "#FFF") {

                } else {
                    worksheetCell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                            argb: rgb2hex(cell.background_color)
                        }
                    };
                }
            }
            if (cell.tabulation !== "") {

            }
            if (cell.href !== "") {
				
            }
			
			/* KAROL B */
			let colSpan = typeof cell.colspan !== 'undefined' ? cell.colspan : 1, 
			rowSpan = typeof cell.rowspan !== 'undefined' ? cell.rowspan : 1; 
            if (colSpan > 1 || rowSpan > 1){
                var fCol = toColumnName(mergeOffset + 1);
                var sCol = toColumnName(mergeOffset + colSpan);

                ws.mergeCells(fCol + (index + 1) + ':' + sCol + (index + 1 + rowSpan-1));
				if (rowSpan > 1){
					// console.log("rowspan for cell %d",mergeOffset);
					// console.log("colspan: %d",colSpan);
					for (let i=1;i<rowSpan;i++)
						if (typeof shifts[index+i] === 'undefined')
							shifts[index+i] = {[mergeOffset]: colSpan};
						else{
							shifts[index+i][mergeOffset] = colSpan;
							// console.log(mergeOffset,colSpan);
						}
					
					// console.log(shifts);
				}
            }


            setNumberFormat(cell, worksheetCell, index, sub_index, scale);


            mergeOffset += cell.colspan;
			
		}catch(e){
			// console.log(e);
		};
        });

    });
}

}





function createWorksheet(workbook, excelHTMLObjec, sheetName, scale) {
    var worksheet = workbook.addWorksheet(sheetName, {
        pageSetup: {
            showGridLines: false
        }
    });

    worksheet.views = [{
        showGridLines: false
    }];

    wsSetRowsColumnsHeightWidth(excelHTMLObjec, worksheet);
    wsSetCellProperties(excelHTMLObjec, worksheet, scale);

    return worksheet;
}




function createWorkbook(excelHTMLObject) {
    var workbook = new Excel.Workbook();
    workbook.creator = 'Santader-MIS';
    workbook.created = new Date(2019, 4, 9);

    //var ws1 = createWorksheet(workbook, excelHTMLObject, 'Arkusz1');
    //var ws2 = createWorksheet(workbook, excelHTMLObject, 'Arkusz2');
    if (excelHTMLObject.constructor === Array) {
        if (excelHTMLObject[0].hasOwnProperty('tableContent')) {
            var ws = [];
            for (var x = 0; x < excelHTMLObject.length; x++) {
                var oTmp = excelHTMLObject[x].tableContent;
                var sheetName = excelHTMLObject[x].sheetName;

                if (excelHTMLObject[0].hasOwnProperty('scale')) {
                    var scale = excelHTMLObject[x].scale;
                } else {
                    var scale = 1;
                }

                createWorksheet(workbook, oTmp, sheetName, scale);
                // ws.push(createWorksheet(workbook, oTmp, sheetName));
            }
        }
    } else {
        // var ws1 = createWorksheet(workbook, excelHTMLObject, 'Arkusz1');
        createWorksheet(workbook, excelHTMLObject, 'Arkusz1');
    }
    return workbook;
}


function Start() {
    // excelHTMLObject = JSON.parse(vInputdate);
    excelHTMLObject = excelJSON;
    // console.log(excelHTMLObject);
	//try{
		var workbook = createWorkbook(excelHTMLObject);
	//}catch(e){
	//	console.log(e);
	//}
		
    // console.log(workbook);
	var noExcelRows = false;
	for (let i=0;i<excelHTMLObject.length;i++)
		if (excelHTMLObject[i].tableContent.excelRows === 'undefined'){
			noExcelRows = true;
			break;
		}
		
	if (!noExcelRows && workbook.xlsx !== 'undefined'){
		workbook.xlsx.writeBuffer()
			.then(function (buffer) {
				var blob = new Blob([buffer], {
					type: "application/octet-stream"
				})
				saveAs(blob, "Klient.xlsx");

			}).catch(
			// Log the rejection reason
		(reason) => {
				console.log('Handle rejected promise ('+reason+') here.');
			});
	}
	else
		alert("Wystąpił błąd");

}

// Start();


/*

Działajacy prosty przykład


var Excel = ExcelJS;
var workbook = new Excel.Workbook();



workbook.creator = 'Me';
workbook.lastModifiedBy = 'Her';
workbook.created = new Date(1985, 8, 30);
workbook.modified = new Date();
workbook.lastPrinted = new Date(2016, 9, 27);



var worksheet = workbook.addWorksheet('My Sheet');

worksheet.columns = [
    { header: 'Id', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    // { header: 'D.O.B.', key: 'dob', width: 10, outlineLevel: 1 }
    { header: 'D.O.B.', key: 'dob', width: 10}
  ];
   


worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970,1,1)});
worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965,1,7)});



workbook.xlsx.writeBuffer()
  .then(function(buffer) {
    var blob = new Blob([buffer], {type: "application/octet-stream"})
    //saveAs(blob, "rand.xlsx");

  });

*/