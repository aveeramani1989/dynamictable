$(document).ready(function () {
	GetChamber();

	$('#drpYear').on('change', function () {
		ChamberSno = getCookie('ChamberSerialNo');
		var Year = $('option:selected', this).text();
		BindChart(ChamberSno, Year)
	});

	$('#FirstCycleSubmit').on('click', function () {
		
		let BeginningCycle = $('#txtBeginningCycle').val();
		if (BeginningCycle == "") {
			
			toastr.warning('Please fill the Beginning Cycle Count', '', {
				"positionClass": "toast-bottom-right",
				"timeOut": "3000",
			});
			$('#txtBeginningCycle').focus();
			return;
		}
		let MaxCycle = $("#txtMaxCycle").val();
		if (Number(BeginningCycle) < Number(MaxCycle)) {

			toastr.warning('Beginning Cycle Count Must be greater than or Equal Previous Cycle Count', '', {
				"positionClass": "toast-bottom-right",
				"timeOut": "3000",
			});
			$('#txtBeginningCycle').focus();
			return;
		}

		let FirstCycle = $('#txtFirstCycle').val();
		if (FirstCycle == "") {

			toastr.warning('Please fill the Starting Cycle Count', '', {
				"positionClass": "toast-bottom-right",
				"timeOut": "3000",
			});
			$('#txtFirstCycle').focus();
			return;
		}

		if (Number(BeginningCycle) > Number(FirstCycle)) {

			toastr.warning('Starting Cycle Count Must be greater than or Equal Beginning Cycle Count', '', {
				"positionClass": "toast-bottom-right",
				"timeOut": "3000",
			});
			$('#txtFirstCycle').focus();
			return;
		}

		var ChamberSerialNo = $('#ChamberSelect :selected').val();
		var Name = $("#UserName").text().split(' ');
		var shortName = Name[0].charAt(0) + ". " + Name[1];
		var _JqueryObjectClass = {};

		_JqueryObjectClass.Purpose = "Starting Cycle Count";
		_JqueryObjectClass.CycleStart = BeginningCycle;
		_JqueryObjectClass.CycleStop = FirstCycle;
		_JqueryObjectClass.User = "ADMIN";
		_JqueryObjectClass.Mode = "FIRSTCYCLEINSERT";
		_JqueryObjectClass.DailyProcedure = "Starting";
		_JqueryObjectClass.ChamberSerialNo = ChamberSerialNo;
		_JqueryObjectClass.UserName = shortName;
		$.ajax({
			type: "POST",
			url: "/Chamber/CycleLogSubmit",
			data: JSON.stringify(_JqueryObjectClass),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (response) {

				if (response[0].Status == "Success") {
					toastr.success('Saved Successfully', '', {
						"positionClass": "toast-bottom-right",
						"timeOut": "2000",
						"onHidden": function () {
							window.location.href = '/Chamber/Index';
						}
					});
				}
			},
			error: function (ex) {
			}
		});
	})
})

function BindChart(ChamberSno, Year) {
	
		$('.apex-charts').empty()
		var _ModalClass = {};
	_ModalClass.Mode = 'Chart';
	_ModalClass.Year = Year;
	_ModalClass.ChamberSerialNo = ChamberSno;
	$.ajax({
		type: "POST",
		url: "/Chamber/GetChart",
		data: JSON.stringify(_ModalClass),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		async: false,
		cache: false,
		//data: jsonData,
		success: function (response) {
			
			$("#CuYearTotalCycles").text(response.ObjClsChartLabels[0].CuYearTotalCycles)
			$("#TotalCycles").text(response.ObjClsChartLabels[0].TotalCycles)
			$("#AvgCyclesPerMonth").text(response.ObjClsChartLabels[0].AvgCyclesPerMonth)
			barchartdata = [];
			$.each(response.ObjClsChartvalues, function (i) {
				barchartdata.push(response.ObjClsChartvalues[i].MonthlyCount);
			})
			chartlabel = [];
			$.each(response.ObjClsChartvalues, function (i) {
				chartlabel.push(response.ObjClsChartvalues[i].MonthYear);
			})

			
			options = {
				chart: {
					height: 339,
					type: "line",
					stacked: !1,
					toolbar: {
						show: !1
					}
				},
				stroke: {
					//width: [0, 2, 4],
					width: [0],
					curve: "smooth"
				},
				plotOptions: {
					bar: {
						columnWidth: "30%"
					}
				},
				//colors: ["#5b73e8", "#dfe2e6", "#f1b44c"],
				colors: ["#5b73e8"],
				/*colors: ["#dfe2e6", "#f1b44c"],*/
				series: [
					{
						name: "Monthly Cycle Counts",
						type: "column",
						data: barchartdata
					},
					//{
					//name: "Laptops",
					//type: "area",
					//data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
					//},
					//{
					//   name: "Mo Avg Cycles",
					//type: "line",
					//data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
					//}
				],
				fill: {
					//opacity: [.85, .25, 1],
					opacity: [.85],
					gradient: {
						inverseColors: !1,
						shade: "light",
						type: "vertical",
						opacityFrom: .85,
						opacityTo: .55,
						stops: [0, 100, 100, 100]
					}
				},
				labels: chartlabel,
				markers: {
					size: 0
				},
				//xaxis: {
				//	type: "datetime"
				//},
				yaxis: {
					title: {
						text: "Count"
					}
				},
				tooltip: {
					enabled: true,
					shared: !1,
					intersect: !1,
					y: {
						formatter: function (e) {
							return void 0 !== e ? e.toFixed(0) + " Count" : e
						}
					}
				},
				grid: {
					borderColor: "#f1f1f1"
				}
			};
			(chart = new ApexCharts(document.querySelector("#sales-analytics-chart"), options)).render();
		},
		error: function (data) {

		}
	});
	}

function BindYear(ChamberSno) {
	
	var _ModalClass = {};
	_ModalClass.ChamberSerialNo = ChamberSno;
	_ModalClass.Mode = 'ChartYear';
	$.ajax({
		type: "POST",
		url: "/Chamber/GetChart",
		data: JSON.stringify(_ModalClass),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			
			$("#drpYear").empty();
			if (response.ObjClsChartvalues.length <=0) {
				$("#divHead").attr('class', "d-none");
				$("#divChart").attr('class', "d-none");
				$("#divfirstcycle").attr('class', "");
				var MaxCycle = response.ObjClsChartLabels[0].MaxCycle == null ? 0 : response.ObjClsChartLabels[0].MaxCycle;
				$("#txtMaxCycle").val(MaxCycle);
				$("#MaxDate").text(response.ObjClsChartLabels[0].MaxDate);
				$("#MaxCycle").text(response.ObjClsChartLabels[0].MaxCycle);
				$("#txtMaxCycle").val(MaxCycle);
				//$("#txtBeginningCycle").attr('placeholder', 'Last Cycle '+ MaxCycle);
				return
			}
			else {
				$("#divfirstcycle").attr('class', "d-none");
				$("#divChart").attr('class', ""); $("#divHead").attr('class', "");
				
				$.each(response.ObjClsChartvalues, function (i) {
					
					if (response.ObjClsChartvalues.length - 1 == i) {
						$("#drpYear").append('<option Selected>' + response.ObjClsChartvalues[i].Year + '</option>');
						BindChart(ChamberSno, response.ObjClsChartvalues[i].Year)
					}
					else
						$("#drpYear").append('<option>' + response.ObjClsChartvalues[i].Year + '</option>');
				})
            }
			
		},
		error: function (data) {
			
		}
	});
}
function GetChamber() {
	$.ajax({
		type: "POST",
		url: "/Chamber/GetChamberSerialNumbers",
		//data: JSON.stringify(_ModalClass),
		//contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			ChamberSno = getCookie('ChamberSerialNo');
			BindYear(ChamberSno)
			//BindChart(ChamberSno);
		},
		error: function (data) {
		}
	});
}

//options1 = {
//	chart: {
//		height: 339,
//		type: "line",
//		stacked: !1,
//		toolbar: {
//			show: !1
//		}
//	},
//	stroke: {
//		//width: [0, 2, 4],
//		width: [0, 4],
//		curve: "smooth"
//	},
//	plotOptions: {
//		bar: {
//			columnWidth: "30%"
//		}
//	},
//	//colors: ["#5b73e8", "#dfe2e6", "#f1b44c"],
//	colors: ["#5b73e8"],
//	/*colors: ["#dfe2e6", "#f1b44c"],*/
//	series: [
//		{
//		name: "Monthly Cycle Counts",
//		type: "column",
//		data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
//		},
//		//{
//		//name: "Laptops",
//		//type: "area",
//		//data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
//		//},
//		//{
//	 //   name: "Mo Avg Cycles",
//		//type: "line",
//		//data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
//		//}
//	],
//	fill: {
//		//opacity: [.85, .25, 1],
//		opacity: [.85],
//		gradient: {
//			inverseColors: !1,
//			shade: "light",
//			type: "vertical",
//			opacityFrom: .85,
//			opacityTo: .55,
//			stops: [0, 100, 100, 100]
//		}
//	},
//	labels: ["01/01/2003", "02/01/2003", "03/01/2003", "04/01/2003", "05/01/2003", "06/01/2003", "07/01/2003", "08/01/2003", "09/01/2003", "10/01/2003", "11/01/2003"],
//	markers: {
//		size: 0
//	},
//	xaxis: {
//		type: "datetime"
//	},
//	yaxis: {
//		title: {
//			text: "Points"
//		}
//	},
//	tooltip: {
//		shared: !0,
//		intersect: !1,
//		y: {
//			formatter: function (e) {
//				return void 0 !== e ? e.toFixed(0) + " points" : e
//			}
//		}
//	},
//	grid: {
//		borderColor: "#f1f1f1"
//	}
//};
//(chart = new ApexCharts(document.querySelector("#sales-analytics-chart"), options)).render();