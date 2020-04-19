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
				let rows = sheet.excelRows;
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



modifyExcelJSON.tasks.push({
	sheets: "all",
	option: "columns",
	indexArray: [0],
	fun: function(elem){
		elem.text = elem.text.replace("keyboard_arrow_right",String.fromCharCode(parseInt("25B6", 16))+" ");
		elem.text = elem.text.replace("keyboard_arrow_down",String.fromCharCode(parseInt("25BC", 16))+" ");
	}
});

modifyExcelJSON.call();