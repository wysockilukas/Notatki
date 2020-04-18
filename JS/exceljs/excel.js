const excelTableClass = "jsExportToExcel";

/* excel classes from HQ_functions.js */

var ExcelCell2 = function ExcelCell2(config) {
	"use strict";
	
	this.height = typeof config.height === 'undefined' ? 0 : config.height;
	this.width = typeof config.width === 'undefined' ? 0 : config.width;
	this.borderLeft = typeof config.borderLeft === 'undefined' ? 0 : config.borderLeft;
	this.borderRight = typeof config.borderRight === 'undefined' ? 0 : config.borderRight;
	this.borderTop = typeof config.borderTop === 'undefined' ? 0 : config.borderTop;
	this.borderBottom = typeof config.borderBottom === 'undefined' ? 0 : config.borderBottom;
	this.alignmentVert = typeof config.alignmentVert === 'undefined' ? "middle" : config.alignmentVert;
	this.alignment = typeof config.alignment === 'undefined' ? "left" : config.alignment;
	this.indent = typeof config.indent === 'undefined' ? 0 : config.indent;
	this.font = typeof config.font === 'undefined' ? "Arial,  Helvetica;" : config.font;
	this.font_size = typeof config.font_size === 'undefined' ? "11pt" : config.font_size;
	this.font_weight = typeof config.font_weight === 'undefined' ? "400" : config.font_weight;
	this.font_style = typeof config.font_style === 'undefined' ? "normal" : config.font_style;
	this.font_color = typeof config.font_color === 'undefined' ? "rgb(255, 255, 255)" : config.font_color;
	this.background_color = typeof config.background_color === 'undefined' ? "rgb(255, 255, 255)" : config.background_color;
	this.tabulation = typeof config.tabulation === 'undefined' ? 0 : config.tabulation;
	this.href = typeof config.href === 'undefined' ? "" : config.href;
	this.colspan = typeof config.colspan === 'undefined' ? 0 : config.colspan;
	this.rowspan = typeof config.rowspan === 'undefined' ? 0 : config.rowspan;
	this.cellElement = typeof config.cellElement === 'undefined' ? 0 : config.cellElement;
	this.text = typeof config.text === 'undefined' ? "" : config.text;
	this.excel_value = typeof config.excel_value === 'undefined' ? "BRAK" : config.excel_value;
};

var ExcelRow2 = function (){
		"use strict";

		function ExcelRow2(config) {
			this.height = typeof config.height === 'undefined' ? 0 : config.height;
			this.width = typeof config.width === 'undefined' ? 0 : config.width;
			this.excelCells = [];
		}

		var _proto = ExcelRow2.prototype;

		_proto.add_cell = function add_cell(cell) {
			this.excelCells.push(cell);
		};

		return ExcelRow2;
}();

var ExcelTable2 = function (){
		"use strict";

		function ExcelTable2(config) {
			this.height = typeof config.height === 'undefined' ? 0 : config.height;
			this.width = typeof config.width === 'undefined' ? 0 : config.width;
			this.excelRows = [];
		}

		var _proto2 = ExcelTable2.prototype;

		_proto2.add_row = function add_row(row) {
			this.excelRows.push(row);
		};

		return ExcelTable2;
}();



var excelJSON = [];
var excelSheet = {};
var excelTable = new ExcelTable2({});

/* functions for modifying excelJSON */
var modifyExcelJSON = {
	/* task template
	{
		sheets: "'all' or array with sheet indexes";
		option: "'all' - iterate over table, 'rows' - iterate over particular 	rows, 'columns' - iterate over particular columns",
		indexArray: "array with rows or columns indexes; omitted when option 	is different from 'all'",
		fun: "function which is called for each iterated cell"
	}
	*/
	tasks: [],
	call: function(){
		for (let i=0;i<this.tasks.length;i++)
			this._executeTask(this.tasks[i]);
	},
	
	_executeTask: function(task){
		try{
			let sheets = task.sheets, option = task.option, indexArray = task.indexArray, fun = task.fun;
			
			var self = this;
			this._iterate["sheets"](sheets,function(sheet){
				if (option === "all")
					self._iterate["rows"](sheet,"all",fun);
				else
					if (option === "rows" || option === "columns")
						self._iterate[option](sheet,indexArray,fun);
					else
						throw("unrecognized option in arguments of call function");
					
			});
		}catch(e){
			console.log("[modifyExcelJSON] ERROR:\n",e);
		}
	},
	
	_iterate: {
		sheets: function(sheets,fun){
			if (sheets === "all")
				for (let i=0;i<excelJSON.length;i++)
					fun(excelJSON[i]);
			else
				for (let i=0;i<sheets.length;i++)
					fun(excelJSON[sheets[i]]);
		},
		rows: function(sheet,rows,fun){
			console.log(arguments);
			if (rows === "all"){
				let rows = sheet.tableContent.excelRows;
				for (let i=0;i<rows.length;i++)
					for (let j=0;j<rows[i].excelCells.length;j++)
						fun(rows[i].excelCells[j]);
			}
			else{
				for (let i=0;i<rows.length;i++){
					let row = sheet.tableContent.excelRows[rows[i]];
					for (let j=0;j<row.excelCells.length;j++)
						fun(row.excelCells[j]);
				}
			}
		},
		columns: function(sheet,columns,fun){
			let rows = sheet.tableContent.excelRows;
			for (let i=0;i<rows.length;i++)
				for (let j=0;j<columns.length;j++)
					fun(rows[i].excelCells[columns[j]]);
			}
		}
};	

var reportName = "", fileName = "", sheetName = "", tableName = "";
var sheetNameDuplicates = {};
var reports = [], tables = [], rows = [];
var allTablesInOneSheet = false;
var reportsNum = 0, tablesNum = 0, rowsNum = 0;
var reportNo = 0, tableNo = 0, rowNo = 0;


var scanning = {timeStep: 10, maxIter: 18000};
var start = 0, end = 0;
var busy = false, finished = false;

/*const processInfoID = "ProcessInfoBar";
var processInfo = {
	ID: processInfoID,
	
	statuses: ["Rozpoczęcie eksportu do Excela", "Ładowanie tabel", "Skanowanie tabel", "Skanowanie raportów ukończone", "Wysyłanie danych na serwer", "Oczekiwanie na odpowiedź serwera"],
	
	statusName: "",
	reportName: "",
	scannedRowsNum: null,
	allRowsNum: null,
	stagePercent: null,
	processPercent: null,
	
	_status: function(n){
		if ([1,4,5].indexOf(n) !== -1)
			this._addSpinner();
		else
			this._removeSpinner();
			
		return this.statuses[n]
	},
	setParams: function(params){
		for (let name in params)
			this[name] = params[name];
	},
	
	bar$: document.getElementById(processInfoID),
	
	statusName$: document.getElementById(processInfoID).getElementsByClassName("status-name")[0],
	reportName$: document.getElementById(processInfoID).getElementsByClassName("report-name")[0],
	filling$: document.getElementById(processInfoID).getElementsByClassName("filling")[0],
	
	_update_status: function(){
		this.statusName$.innerText = this.statusName;
		if (this.statusName === "" || this.statusName === null)
			this._removeSpinner();
	},
	_update_report: function(){ 
		this.reportName$.innerText = this.reportName ? "["+this.reportName+"]" : "";
	},
	_update_progress: function(){
		if (this.scannedRowsNum !== null && this.allRowsNum && reportsNum){
			this.stagePercent = Math.round(this.scannedRowsNum/this.allRowsNum*100);
			this.processPercent = parseInt( (reportNo*100 + this.stagePercent)/reportsNum );
		
			this.filling$.innerText = this.processPercent+"%";
			this.filling$.style.width = this.processPercent+"%";
		}
		else 
			if (this.processPercent !== null){
				this.filling$.innerText = this.processPercent+"%";
				this.filling$.style.width = this.processPercent+"%";
			}
			else{
				this.filling$.innerText = "";
				this.filling$.style.width = "0";
			}
	},
	update: function(arr){
		try{
			if (arguments.length)
				for (let i=0;i<arr.length;i++)
					this["_update_"+arr[i]]();
			else{
				this._update_status();
				this._update_report();
				this._update_progress();
			}
		}catch(e){
			console.log("ERROR during process info updating\n",e);
		}
	},
	
	_addSpinner: function(){
		this.statusName$.classList.add("with-spinner");
	},
	_removeSpinner: function(){
		this.statusName$.classList.remove("with-spinner");
	},
	
	init: function(){
		this.statusName = this._status(0);
		this.reportName = "";
		this.scannedRowsNum = 0;
		this.allRowsNum = 0;
		this.stagePercent = 0;
		this.processPercent = 0;
		
		this.update();
		this.bar$.classList.add("active");
		document.getElementsByClassName("overlay")[0].style.display = "block";
	},
	
	reset: function(){
		this.statusName = "";
		this.reportName = "";
		this.scannedRowsNum = null;
		this.allRowsNum = null;
		this.stagePercent = null;
		this.processPercent = null;
		
		this.update();
		document.getElementsByClassName("overlay")[0].style.display = "none";
		this.bar$.classList.remove("active");
	}
};


if (typeof isIE === 'undefined')
	var isIE = !!navigator.userAgent.match(/Trident\/7\./);
*/






/* scanning functions */

function scanCells(){
	console.time('row '+(rowNo+1));
	
	let row = new ExcelRow2({}); 
	let cells = rows[rowNo].children;
    let cellRef ;
    
	let i = 0, n = cells.length, cellStyle = {};
	for (i = 0; i<n; i++){
	  cellRef = cells[i].localName;
	  if (cellRef==="th" || cellRef==="td"){
		cellStyle = window.getComputedStyle(cells[i], null);
		//object cellStyle contains active values for CSS property longhand (!) names; shorthand names available only in Chrome
		
		var config = {
			'height': cells[i].offsetHeight,//Math.round(parseInt(cellStyle.getPropertyValue("height").replace("px",""))),
			'width': cells[i].offsetWidth,//Math.round(parseInt(cellStyle.getPropertyValue("width").replace("px",""))),
			'borderLeft': cellStyle.getPropertyValue("border-left-width")+" "+cellStyle.getPropertyValue("border-left-style")+" "+cellStyle.getPropertyValue("border-left-color"),//cellStyle.getPropertyValue("border-left"),
			'borderRight': cellStyle.getPropertyValue("border-right-width")+" "+cellStyle.getPropertyValue("border-right-style")+" "+cellStyle.getPropertyValue("border-right-color"),
			'borderTop': cellStyle.getPropertyValue("border-top-width")+" "+cellStyle.getPropertyValue("border-top-style")+" "+cellStyle.getPropertyValue("border-top-color"),
			'borderBottom': cellStyle.getPropertyValue("border-bottom-width")+" "+cellStyle.getPropertyValue("border-bottom-style")+" "+cellStyle.getPropertyValue("border-bottom-color"),
			'alignment': cellStyle.getPropertyValue("text-align"),
			'alignmentVert': cellStyle.getPropertyValue("vertical-align"),
			'indent': (cells[i].getElementsByClassName("txtLabel").length) ? ((parseInt(window.getComputedStyle(cells[i].getElementsByClassName("txtLabel")[0], null).getPropertyValue("padding-left")) + 5) / 10) : 0,
			'font': cellStyle.getPropertyValue("font-family"),
			'font_size': (parseInt(cellStyle.getPropertyValue("font-size").replace("px", "")) * 0.65) + "px",
			'font_weight': cellStyle.getPropertyValue("font-weight"),
			'font_style': cellStyle.getPropertyValue("font-style"),
			'font_color': (cells[i].getElementsByTagName("SPAN").length) ? window.getComputedStyle(cells[i].getElementsByTagName("SPAN")[0], null).getPropertyValue("color") : cellStyle.getPropertyValue("color"),
			'background_color': cellStyle.getPropertyValue("background-color") === "rgba(0, 0, 0, 0)" ? window.getComputedStyle(cells[i].parentNode, null).getPropertyValue("background-color") === "rgba(0, 0, 0, 0)" ? undefined : window.getComputedStyle(cells[i].parentNode, null).getPropertyValue("background-color") : cellStyle.getPropertyValue("background-color"),
			'tabulation': typeof cells[i].getElementsByTagName("A")[0]!== 'undefined' ? cells[i].getElementsByTagName("A")[0].innerText.replace(/\&nbsp\;/g, " ").length : 0,
			'href': typeof cells[i].getElementsByTagName("A")[0]!== 'undefined' ? cells[i].getElementsByTagName("A")[0].getAttribute("href") : "",
			'colspan': cells[i].colSpan,
			'rowspan': cells[i].rowSpan,
			'display': cellStyle.getPropertyValue('display'),
			'cellElement': cellRef,
			'text': cells[i].innerText,
			'excel_value': (cells[i].getAttribute('excel_value') !== 'undefined') ? cells[i].getAttribute('excel_value') : 'BRAK'
		};
		if (config.display != 'none') row.add_cell(new ExcelCell2(config));
	};
	}
	
	if (row.excelCells.length){ 
		excelTable.add_row(row);
	}
	console.timeEnd('row '+(rowNo+1));
}

function scanTables(){
	var iter = 0;
	scanning.interval = setInterval(function(){

		if (!busy){
			busy = true;
			
			scanNextRow();
		}
		else
			setTimeout(scanNextRow,0);
		
		if (++iter > scanning.maxIter)
			clearInterval(scanning.interval);
			
	}, scanning.timeStep);
	
}

function scanNextRow(){
	if (rowNo < rowsNum){
		scanCells();
		
		afterScanning("row");
		return 1;
	}
	else
		if (rowNo === rowsNum){
			afterScanning("table");
			
			if (tableNo < tablesNum){
				init.table();
				scanNextRow();
			}
			else{
				afterScanning("report");
				afterScanning("all");
				
				clearInterval(scanning.interval);
				return 0;
			}
		}
		else
			return 0;
}



/* init functions */
export function startExcelExport(){
    excelJSON = [];
    sheetNameDuplicates = {};
	
	init.report();
	
	if (tablesNum){
		init.table();
		init.scanning();
	
		setTimeout(scanTables,0);
	}
	else
		alert("Nie znaleziono tabel do eksportowania \n[brak tabel o klasie jsExportToExcel]");
}

var init = {

	scanning: function(){
		/*
		processInfo.init();
		
		processInfo.setParams({
			statusName: processInfo._status(2),
			reportName: reportName,
			scannedRowsNum: 0,
			allRowsNum: countAllRows()
		});
		processInfo.update();
		*/

		start = performance.now();
	},
	
	report: function(){
        reportName = getUrlVars()["page"];
        reportsNum = 1;
        reportNo = 0;
		
		tables = document.getElementsByClassName(excelTableClass);
        tablesNum = tables.length;
        tableNo = 0;
		
		allTablesInOneSheet = document.getElementsByClassName("exportInOneSheet").length ? true : false;
		sheetName = allTablesInOneSheet ? reportName : "";
	},
	
	table: function(){
		tableName = tables[tableNo].getAttribute("tblname");
		
		rows = tables[tableNo].getElementsByTagName("TR");
        rowsNum = rows.length;
        rowNo = 0;
	
		if (!allTablesInOneSheet || !tableNo)
			excelTable = new ExcelTable2({});
	}

}



/* other functions */

function countAllRows(){
	//instead of: document.querySelectorAll(".jsExportToExcel tr").length;
	
	let tables = document.getElementsByClassName(excelTableClass);
	let count = 0;
	for (let i=0;i<tables.length;i++)
		count += tables[i].getElementsByTagName("TR").length;
	
	return count;
}

function addExcelSheet(sheetName){
	excelSheet = {};
	excelSheet.sheetName = sheetName;
	excelSheet.scale = 1;
	excelSheet.tableContent = excelTable;
	
	checkSheetName();
	excelJSON.push(excelSheet);
	
	console.log("adding excel sheet: %s",sheetName);
}

function checkSheetName(){
	for (let i=0; i<excelJSON.length; i++)
		if (excelJSON[i].sheetName === excelSheet.sheetName){
			if (sheetNameDuplicates.hasOwnProperty(i))
				excelSheet.sheetName = excelSheet.sheetName + " ("+ (++sheetNameDuplicates[i]) + ")";
			else{
				excelSheet.sheetName = excelSheet.sheetName + " (1)";
				sheetNameDuplicates[i] = 1;
			}
			break;
		}
}


function afterScanning(level){
	switch(level){
		case 'row':
            //++processInfo.scannedRowsNum;
            ++rowNo;
			//processInfo.update(["progress"]);
			
			console.log("------ row %d/%d", rowNo, rowsNum);
			break;
			
		case 'table':
			if (!allTablesInOneSheet)
				addExcelSheet(tableName);
			else 
				if (tableNo === tablesNum-1)
					addExcelSheet(sheetName);
				else
					excelTable.add_row(new ExcelRow2({height:30}));
					
			++tableNo;
			
			console.log("--- Table %d has been scanned", tableNo);
			break;
			
		case 'report':
			//processInfo.update(["progress"]);
			++reportNo;
			
			//console.log("Report %s is ready", processInfo.reportName);
			console.log("Report is scanned");
			break;
			
		case 'all':
			end = performance.now();
			let msg = "Total time of scanning: "+Math.round(end-start)+"ms";
			console.log(msg);
			
			/*
			processInfo.setParams({
				statusName: processInfo._status(3),
				reportName: ""
			});
			processInfo.update(["status","report"]);
			*/
	
			setTimeout(function(){
			
				/*
				processInfo.setParams({
					statusName: processInfo._status(4)
				});
				processInfo.update(["status"]);
				*/
				
				modifyExcelJSON.call();
				
				console.log("EXCEL JSON\n",excelJSON);
				if (excelJSON.length)
					ajaxExcel2();
				else{
					alert("Brak danych do wysłania [pusty JSON]");
					finishExcelExport();
				}
				
			},0);
			
			break;
			
		default:
			;
	}
}

function finishExcelExport(){
    //processInfo.reset();
	
	//document.getElementsByClassName("excel-btn").disabled = false;
}



function getUrlVars(){
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key.toLowerCase()] = value;
	});
	return vars;
};


/* ajax for excel */

const ajaxExcel2 = function(){
	if (typeof fileName === 'undefined' || fileName == "")
		fileName = "raport";
	else if (typeof reportName !== 'undefined')
		fileName = reportName.replace(/([A-Z][a-z]+)([A-Z][a-z]+)([A-Z][a-z]+).*/, function (match, p1, p2, p3) {
			if ((p1 + p2 + p3).length > 30) return [p1, p2].join('')
			else return [p1, p2, p3].join('')
		})
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState === 4 && xhttp.status === 200) {
			if (typeof window.navigator.msSaveBlob !== 'undefined') //navigator.appVersion.toString().indexOf('.NET') > 0
				window.navigator.msSaveBlob(xhttp.response, fileName + ".xlsx");
			else {
				let a = document.createElement('a');
				a.href = window.URL.createObjectURL(xhttp.response);
				a.download = fileName + ".xlsx";
				a.style.display = 'none';
				document.body.appendChild(a);
				a.click();
			}
			finishExcelExport();
		}
    };
	xhttp.onerror = function(e){
		var xhttp2 = new XMLHttpRequest();
		xhttp2.onreadystatechange = function(){
			if (xhttp2.readyState === 4 && xhttp2.status === 200)
				console.log('error saved to app log');
		};
		xhttp2.onerror = function(){console.log(xhttp2.response)};
		xhttp2.open("POST","https://mis.centrala.bzwbk/apex2/mis_mobile/mobile/applog");
		xhttp2.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		xhttp2.setRequestHeader("dataType", "json");
		xhttp2.send(JSON.stringify({
			processname: 'excel',
			msg:'An error occurred during the transaction: ' + e.target.status
		}));
			
		/*
		$.ajax({
			type: 'POST',
			url: 'https://mis.centrala.bzwbk/apex2/mis_mobile/mobile/applog',
			data: {
						processname: 'excel',
						msg:'An error occurred during the transaction'
			},
			success: function(text) {
						console.log('error saved to app log');
			},
			error: function (response) {
						console.log(response);
			}
		});
		*/
	
		alert("Wystąpił błąd.");
		finishExcelExport();
    }

	//xhttp.open("POST", "/html2excel");
	xhttp.open("POST", "/vmdev");
	xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	xhttp.setRequestHeader("dataType", "json");
	xhttp.responseType = 'blob';
	xhttp.send(JSON.stringify(excelJSON));
	
	/*
	processInfo.setParams({
		statusName: processInfo._status(5)
	});
	processInfo.update(["status"]);
	*/
}




///////////////////////////////////////////////




modifyExcelJSON.tasks.push({
	sheets: "all",
	option: "columns",
	indexArray: [0],
	fun: function(elem){
		elem.text = elem.text.replace("keyboard_arrow_right",String.fromCharCode(parseInt("25B6", 16))+" ");
		elem.text = elem.text.replace("keyboard_arrow_down",String.fromCharCode(parseInt("25BC", 16))+" ");
	}
});






