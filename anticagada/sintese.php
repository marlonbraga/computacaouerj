<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>COMPUTAÇÃO-UERJ</title>
		
		<link href="css/js-image-slider.css" rel="stylesheet" type="text/css" />
	    <script type="text/javascript" src="js/js-image-slider.js"></script>

		<script type="text/javascript" src="js/jquery.js"></script>		
		<script type="text/javascript" src="js/jquery.xdomainajax.js"></script>
		<script type="text/javascript" src="js/jquery-latest.pack.js"></script>
	<!--	<script type="text/javascript" src="js/script_jcarousellite.js"></script><!--  -->
		<script>
			function newDoc()
			{
				var mat=document.getElementById("mat");
				var senha=document.getElementById("senha");
				alert(mat.value+"   "+senha.value);
				window.location.assign("http://www.alunoonline.uerj.br/requisicaoaluno/requisicao.php?requisicao=DisciplinasRealizadas&matricula="+mat.value+"&senha="+senha.value);
			}					
		</script>
		<script type="text/javascript">
			window.onload = function(){
				parent.document.getElementById("conteudo").height = document.getElementById("pagina").scrollHeight + 35;
				parent.document.getElementById("indexNome").innerHTML = document.getElementById("SinteseNome").innerHTML;
				parent.document.getElementById("indexMatricula").innerHTML = document.getElementById("SinteseMatricula").innerHTML;
				parent.document.getElementById("indexCurso").innerHTML = document.getElementById("SinteseCurso").innerHTML;
				parent.document.getElementById("indexNome2").innerHTML = document.getElementById("SinteseNome").innerHTML;
				parent.document.getElementById("indexMatricula2").innerHTML = document.getElementById("SinteseMatricula").innerHTML;
				parent.document.getElementById("indexCurso2").innerHTML = document.getElementById("SinteseCurso").innerHTML;
				//alert("indexCurso2:"+parent.document.getElementById("indexCurso2").innerHTML+"\nindexCurso2:"+document.getElementById("SinteseCurso").innerHTML);
			}
		</script>
		<style>
			#pagina{
				color:#EEE;
				font-family:Helvetica,Arial,sans-serif;
				font-size:15px;
				font-weight:900;				
			}
			#conteudo{
				color:#EEE;
				font-family:Helvetica,Arial,sans-serif;
				font-size:15px;
				font-weight:900;				
			}
			.titulo{
				font-family:Helvetica,Arial,sans-serif;
				font-size:25px;
				font-weight:900;
				text-align:center;
				width:100%;
			}
			.subtitulo{
				font-family:Helvetica,Arial,sans-serif;
				font-size:15px;
				font-weight:500;
			}
			.dados{
				font-family:Helvetica,Arial,sans-serif;
				font-size:18px;
				font-weight:900;
			}
		</style>
	</head>
	<body>
		<div id="pagina" style="height:800px;">
			<div id="loading" name="loading" type="text" style="display:none;">
				<img src="css/imagens/loading.gif" height="20px" width="20px">
			</div>
			<div id='graficos_cima' style='width: 600px; margin: 0 auto; display:block;'></div>
	<?php
		include("banco.php");
		$str="vazio";
		if(isset($_REQUEST['CacheSintese2'])){
			$str=$_REQUEST['CacheSintese2'];
		}
		else{
			$str=" não chegou nenhuma REQUEST";
		}
		$str=explode("\r\n",$str);
	?>
					<script src="http://code.highcharts.com/highcharts.js"></script>
					<script src="http://code.highcharts.com/modules/exporting.js"></script>
					
					<table style="text-align: left;" border="0" cellpadding="2" cellspacing="2">
						<tbody>

	<?php
		for($i=0;$tam!=80 ;$i++){ //verifica novo período
			$str[$i]=trim($str[$i]);
			$tam=strlen($str[$i]);
		//	if($tam)	echo "<br>$tam | [$i] => <b>$str[$i]</b>"; //  24 | [114] => 2011/1	
			if($str[$i]=="Situação:") 		$situacao=$str[$i+1];
			if($str[$i]=="Curso:") 			$curso=$str[$i+1];
			if($str[$i]=="C.R. Acumulado:") $CR=$str[$i+1];
			if($str[$i]=="Titulação:") 		$titulacao=$str[$i+1];
			if($str[$i]=="Mês e Ano da Conclusão:")	$conclusao=$str[$i+1];
			if($str[$i]=="Data da Colação:")		$colacao=$str[$i+1];
			if($str[$i]=="Créditos em Disciplinas Obrigatórias"){
				$CreditosObrigatóriosCumpridos=$str[$i+6];
				$CreditosObrigatóriosACumprir=$str[$i+12];
				$CreditosObrigatóriosSituação=$str[$i+18];
			}
			if($str[$i]=="Créditos em Disciplinas Eletivas"){
				$EletivasRestritasCumpridos=$str[$i+6];
				$EletivasRestritasACumprir=$str[$i+12];
				$EletivasRestritasSituação=$str[$i+18];
			}
		/*	if($str[$i]=="Grupo de Eletivas: Restritas Básicas"){
				$EletivasBásicasCumpridos=$str[$i+6];
				$EletivasBásicasACumprir=$str[$i+12];
				$EletivasBásicasSituação=$str[$i+18];
			}*/
			if($str[$i]=="Mínimo de Períodos para Integralização Curricular:")			$MínimoPeríodos=$str[$i+1];
			if($str[$i]=="Máximo de Períodos para Integralização Curricular:")			$MáximoPeríodos=$str[$i+1];
			if($str[$i]=="Períodos Utilizados/Em Uso para Integralização Curricular:")	$PeríodosUtilizados=$str[$i+1];
			if($str[$i]=="Períodos Restantes para Integralização Curricular:")			$PeríodosRestantes=$str[$i+1];
		}
			$nome=substr($str[42], 14);
			$matricula=substr($str[42], 0, 12);
			$ano=substr($str[42], 0, 5);
			$creditos=$CreditosObrigatóriosCumpridos+$EletivasRestritasCumpridos;
			$creditosRestantes=$CreditosObrigatóriosACumprir+$EletivasRestritasACumprir;
			$totalCreditos=$creditosRestantes+$creditos;
			$porcentagemConclusao=number_format($creditos*100/$totalCreditos , 1, '.', '');
			$porcentagemRestante=number_format(100-$porcentagemConclusao, 1, '.', '');
			$anoAtual=20141;
		echo"<div style='float:left; width:480px;'>";
			echo"<div class='titulo'>$nome</div>";
			echo"<br><font class='subtitulo'>matricula:</font><font class='dados'>$matricula<br></font>";
			echo"<font class='subtitulo'>situacao:</font><font class='dados'>$situacao<br></font>";
			echo"<font class='subtitulo'>curso:</font><font class='dados'>$curso<br></font>";
			echo"<font class='subtitulo'>CR:</font><font class='dados'>$CR<br></font>";
			echo"<font class='subtitulo'>Créditos:</font><font class='dados'>$creditos ( $porcentagemConclusao% )<br></font>";
			echo"<font class='subtitulo'>titulacao:</font><font class='dados'>$titulacao<br></font>";
			echo"<font class='subtitulo'>conclusao:</font><font class='dados'>$conclusao<br></font>";
			echo"<font class='subtitulo'>colacao:</font><font class='dados'>$colacao<br></font>";
			echo"<br><font class='subtitulo'>CreditosObrigatóriosCumpridos:</font><font class='dados'>$CreditosObrigatóriosCumpridos<br></font>";
			echo"<font class='subtitulo'>CreditosObrigatóriosACumprir:</font><font class='dados'>$CreditosObrigatóriosACumprir<br></font>";
			echo"<font class='subtitulo'>CreditosObrigatóriosSituação:</font><font class='dados'>$CreditosObrigatóriosSituação<br></font>";
			echo"<br><font class='subtitulo'>EletivasRestritasCumpridos:</font><font class='dados'>$EletivasRestritasCumpridos<br></font>";
			echo"<font class='subtitulo'>EletivasRestritasACumprir:</font><font class='dados'>$EletivasRestritasACumprir<br></font>";
			echo"<font class='subtitulo'>EletivasRestritasSituação:</font><font class='dados'>$EletivasRestritasSituação<br></font>";
			echo"<br><font class='subtitulo'>MínimoPeríodos:</font><font class='dados'>$MínimoPeríodos<br></font>";
			echo"<font class='subtitulo'>MáximoPeríodos:</font><font class='dados'>$MáximoPeríodos<br></font>";
			echo"<font class='subtitulo'>PeríodosUtilizados:</font><font class='dados'>$PeríodosUtilizados<br></font>";
			echo"<font class='subtitulo'>PeríodosRestantes:</font><font class='dados'>$PeríodosRestantes</font>";
		echo"</div>";
		echo"<div id='SinteseNome' style='display:none'>$nome</div>";
		echo"<div id='SinteseMatricula' style='display:none'>$matricula</div>";
		echo"<div id='SinteseCurso' style='display:none'>$curso</div>";	
		
		$criptoMatricula=md5($matricula);
		$nome="< anonimo >";
		$sql="INSERT INTO  `aluno` (`id` ,`matricula` ,`nome` ,`cr` ,`ano` ,`periodo` ,`conclusao` ,`curso` ,`atualização`)
			VALUES (NULL ,  '$criptoMatricula',  '$nome',  '$CR',  '$ano',  '$PeríodosUtilizados',  '$porcentagemConclusao',  '$curso',  '$anoAtual');";
		
		if (!mysql_query($conect,$sql)){
			echo "$sql<br><br>";
			die('Erro: ' . mysql_error($conect));
		}
		
		
	?>
	<div id="container1" style="float: right; width: 500px; height: 400px; margin: 0 auto;"></div>
	<div id="container2" style="float: right; width: 500px; height: 400px; margin: 0 auto;"></div>

	<script>
$(function () {
    	
    	// Radialize the colors
    Highcharts.getOptions().colors =["#FFFFFF","#00AA00", "#000033", "#007700", "#000000","#AAAAAA","#FF5555", "#55FF55", "#5555FF", "#4F8714"];
    
		Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
		    return {
		        radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
		        stops: [
		            [0, color],
		            [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
		        ]
		    };
		});
		
		// Build the chart
        $('#container1').highcharts({
            chart: {
                backgroundColor: "#111",
                plotBackgroundColor: "#111",
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                color: "#EEE",
                text: 'CONCLUSÃO DE CURSO'
            },
            tooltip: {
        	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#EEE',
                        connectorColor: "#EEE",
                        formatter: function() {
                            return this.y>0 ? '<b>'+ this.point.name +'</b>: '+ this.y : '<b>'+ this.point.name +'</b>';
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Porcentagem',
                data: [
                    ['Vestibular', 0],
                    ['Concluído', <?php echo"$creditos ";?>],
                    ['A cursar', <?php echo"$creditosRestantes";?>],
                    ['Formatura', 0],
                ]
            }]
        });
    });
    
	</script>
	
	<script>
$(function () {
    	
    	// Radialize the colors
    Highcharts.getOptions().colors =["#FFFFFF","#AA0000", "#000033", "#007700", "#000000","#AAAAAA","#FF5555", "#55FF55", "#5555FF", "#4F8714"];
    
		Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
		    return {
		        radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
		        stops: [
		            [0, color],
		            [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
		        ]
		    };
		});
		
		// Build the chart
        $('#container2').highcharts({
            chart: {
                backgroundColor: "#111",
                plotBackgroundColor: "#111",
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                color: "#EEE",
                text: 'RELÓGIO DE PERÍODOS RESTANTES'
            },
            tooltip: {
        	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#EEE',
                        connectorColor: "#EEE",
                        formatter: function() {
                            return this.y>0 ? '<b>'+ this.point.name +'</b>: '+ this.y : '<b>'+ this.point.name +'</b>';
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Porcentagem',
                data: [
                    ['Vestibular', 0],
                    ['Utilizados', <?php echo"$PeríodosUtilizados";?>],
                    ['Restantes', <?php echo"$PeríodosRestantes";?>],
                    ['Deadline', 0],
                ]
            }]
        });
    });
    
	</script>

		</div>
	</body>
</html>