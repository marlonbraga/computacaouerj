<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Highcharts Example</title>

		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<!--		<script type="text/javascript">

		
$(function () {
        $('#container').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Historic World Population by Region'
            },
            subtitle: {
                text: 'Source: Wikipedia.org'
            },
            xAxis: {
                categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Population (millions)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' millions'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Year 1800',
                data: [107, 31, 635, 203, 2]
            }, {
                name: 'Year 1900',
                data: [133, 156, 947, 408, 6]
            }, {
                name: 'Year 2008',
                data: [973, 914, 4054, 732, 34]
            }]
        });
    });
 		</script>   
-->


<script type="text/javascript">
$(function () {
					$('#container').highcharts({
						chart: {
							type: 'bar'
						},
						colors: [
						   '#00FF00', 
						   '#88FF00', 
						   '#FFFF00 ', 
						   '#FFA500 ', 
						   '#FF0000 ', 
						   '#492970',
						   '#f28f43', 
						   '#77a1e5', 
						   '#c42525', 
						   '#a6c96a'
						],
						title: {
							text: 'Avaliação de Professores'
						},
						xAxis: {
							categories: ['Clareza de Explicação', 'Dinâmica de aula', 'Profundidade de conteúdo', 'Prática', 'Critérios de avaliação','Comprometimento com a aprendizagem','Domínio de conteúdo']
						},
						yAxis: {
							min: 0,
							title: {
								text: 'média (porcentagem)'
							}
						},
						legend: {
							backgroundColor: '#FFFFFF',
							reversed: true
						},
						plotOptions: {
							series: {
								stacking: 'normal'
							}
						},
							series: [{
							name: 'Excelente',
							data: [0, 0, 0, 0,85, 0, 0]
						}, {
							name: 'Bom',
							data: [65, 0, 76, 0, , 0, 0]
						}, {
							name: 'Regular',
							data: [0, 0, 0, 52, 0, 0, 0]
						}, {
							name: 'Fraco',
							data: [0, 0, 0, 0, 0, 39, 0]
						}, {
							name: 'Péssimo',
							data: [0, 5, 0, 0, 0, 0, 12]
						}]
					});
				});
	</script>  

	</head>
	<body>
<script src="../../js/highcharts.js"></script>
<script src="../../js/modules/exporting.js"></script>
<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
	</body>
</html>
