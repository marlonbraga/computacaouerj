
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>COMPUTAÇÃO-UERJ</title>
		
		<link href="css/js-image-slider.css" rel="stylesheet" type="text/css" />
	    <script type="text/javascript" src="js/js-image-slider.js"></script>
	
		<script type="text/javascript" src="js/jquery.js"></script>		
		<script type="text/javascript" src="js/jquery.xdomainajax.js"></script>
		<script type="text/javascript" src="js/jquery-latest.pack.js"></script>
		<script type="text/javascript" src="js/jquery.jcarousellite.js"></script>
		<script type="text/javascript">
			$(document).ready(function(){
				parent.document.getElementById("terminal").innerHTML += "<br>Pagina Historico CARREGADA"; 
				//alert("ready");
				document.getElementById('graficos_cima').innerHTML=document.getElementById('graficos').innerHTML;
			});
		</script>
	    <script type="text/javascript">
			window.onload = function(){
				parent.document.getElementById("conteudo").height = document.getElementById("pagina").scrollHeight + 35;
			}
			function MostrarEsconder(periodo){
				$("#tbody"+periodo).slideToggle();
				//alert("BUNDA!");
			}
		</script>
		<style>
			#pagina{
				color:#EEE;
				font-family:Helvetica,Arial,sans-serif;
				font-size:15px;
				font-weight:900;				
			}
			#historico{
				color:#EEE;
			}
			.titulo{
				color:#EEE;
				background-color:#222;
				font-size:15px;
				font-weight:900;
				border:1px solid #444;
			}
			.subtitulo{
				color:#EEE;
				background-color:#333;
				font-size:17px;
				font-weight:900;
			}
			td{
				color:#EEE;
				background-color:#444;
				font-size:16px;
				font-weight:600;
			}
			a.link {text-decoration:none;}
			a.visited {text-decoration:none;}
			a.hover {text-decoration:none;}
			a.active {text-decoration:none;}
		</style>
	</head>
	<body>
		<div class="conteudo" id="pagina" type="text/css" >
		<div id='graficos_cima' style='width:100%; margin:auto; display:block;'></div>
	<script src="http://code.highcharts.com/highcharts.js"></script>
	<script src="http://code.highcharts.com/modules/exporting.js"></script>
	<div id="historico" style="margin:auto; width:672px;">
		<tbody>
	<div class='titulo' style='text-align:center;'><a href='#periodo1' onClick='MostrarEsconder(1)' value='1'><strong class='NumPeriodo' style='color:#6272b0; font-size:20px;'> 1 º Período (2011/1)</strong></a></div><div id='tbody1' style='display:block; margin:auto; text-align:left;' border='0' cellpadding='2' cellspacing='2'><table><tr class='periodo1' name='periodo1'><td class='periodo1' name='periodo1' style='text-align:center;'>Créd.</td><td class='periodo1' name='periodo1' colspan='2' style='text-align:center;'>Disciplina</td><td class='periodo1' name='periodo1' style='text-align:center;'>Nota</td><td class='periodo1' name='periodo1' style='text-align:center;'>Freq.</td><td class='periodo1' name='periodo1' style='text-align:center;'>Situação</td></tr>	<tr class='periodo1' name='periodo1'>
						<td class='periodo1' name='periodo1' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>6</div></td>
						<td class='periodo1' name='periodo1' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Cálculo I</div></td>
						<td class='periodo1' name='periodo1' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>7.30</div></td>
						<td class='periodo1' name='periodo1' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>93%</div></td>
						<td class='periodo1' name='periodo1'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo1' name='periodo1'>
						<td class='periodo1' name='periodo1' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo1' name='periodo1' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Álgebra</div></td>
						<td class='periodo1' name='periodo1' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>1.80</div></td>
						<td class='periodo1' name='periodo1' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>60%</div></td>
						<td class='periodo1' name='periodo1'><div style='width:96px; text-align:center; overflow:hidden;'>Reprov. freq.</div></td>
					</tr>	<tr class='periodo1' name='periodo1'>
						<td class='periodo1' name='periodo1' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo1' name='periodo1' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Geometria Analítica</div></td>
						<td class='periodo1' name='periodo1' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>0.00</div></td>
						<td class='periodo1' name='periodo1' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>0%</div></td>
						<td class='periodo1' name='periodo1'><div style='width:96px; text-align:center; overflow:hidden;'>Reprov. freq.</div></td>
					</tr>	<tr class='periodo1' name='periodo1'>
						<td class='periodo1' name='periodo1' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>5</div></td>
						<td class='periodo1' name='periodo1' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Fundamentos da Computação</div></td>
						<td class='periodo1' name='periodo1' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>9.60</div></td>
						<td class='periodo1' name='periodo1' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>83%</div></td>
						<td class='periodo1' name='periodo1'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo1' name='periodo1'>
						<td class='periodo1' name='periodo1' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo1' name='periodo1' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Matemática Discreta</div></td>
						<td class='periodo1' name='periodo1' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>6.00</div></td>
						<td class='periodo1' name='periodo1' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>93%</div></td>
						<td class='periodo1' name='periodo1'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>
					<tr class='periodo1' name='periodo1'>
						<td class='subtitulo' class='periodo1' name='periodo1'></td>
						<td class='subtitulo' class='periodo1' name='periodo1' style='text-align:right;'colspan='1'>Cr&eacute;d.Habilitados:</td>
						<td class='subtitulo' class='periodo1' name='periodo1' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>15</span></td>
						<td class='subtitulo' class='periodo1' name='periodo1' style='text-align:right;'colspan='2'>C.R.	no Per&iacute;odo:</td>
						<td class='subtitulo' class='periodo1' name='periodo1' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>5.35</span></td>
					</tr>
					<tr class='periodo1' name='periodo1'>
						<td class='subtitulo' class='periodo1' name='periodo1'></td>
						<td class='subtitulo' class='periodo1' name='periodo1' style='text-align:right;'colspan='1'>Cr&eacute;d.Cursados:</td>
						<td class='subtitulo' class='periodo1' name='periodo1' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>23</span></td>
						<td class='subtitulo' class='periodo1' name='periodo1' style='text-align:right;'colspan='2'>C.R. Total:</td>
						<td class='subtitulo' class='periodo1' name='periodo1' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>5.35</span></td>
					</tr></table></div><div class='titulo' style='text-align:center;'><a href='#periodo2' onClick='MostrarEsconder(2)' value='2'><strong class='NumPeriodo' style='color:#6272b0; font-size:20px;'> 2 º Período (2011/2)</strong></a></div><div id='tbody2' style='display:block; margin:auto; text-align:left;' border='0' cellpadding='2' cellspacing='2'><table><tr class='periodo2' name='periodo2'><td class='periodo2' name='periodo2' style='text-align:center;'>Créd.</td><td class='periodo2' name='periodo2' colspan='2' style='text-align:center;'>Disciplina</td><td class='periodo2' name='periodo2' style='text-align:center;'>Nota</td><td class='periodo2' name='periodo2' style='text-align:center;'>Freq.</td><td class='periodo2' name='periodo2' style='text-align:center;'>Situação</td></tr>	<tr class='periodo2' name='periodo2'>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>5</div></td>
						<td class='periodo2' name='periodo2' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Física I</div></td>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>4.40</div></td>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo2' name='periodo2'><div style='width:96px; text-align:center; overflow:hidden;'>Reprov. nota</div></td>
					</tr>	<tr class='periodo2' name='periodo2'>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo2' name='periodo2' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Cálculo II</div></td>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>2.80</div></td>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo2' name='periodo2'><div style='width:96px; text-align:center; overflow:hidden;'>Reprov. nota</div></td>
					</tr>	<tr class='periodo2' name='periodo2'>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo2' name='periodo2' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Geometria Analítica</div></td>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>7.50</div></td>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo2' name='periodo2'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo2' name='periodo2'>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>6</div></td>
						<td class='periodo2' name='periodo2' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Algoritmos e Estruturas de Dados I</div></td>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>6.30</div></td>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo2' name='periodo2'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo2' name='periodo2'>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo2' name='periodo2' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Linguagem de Programação I</div></td>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>7.20</div></td>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>76%</div></td>
						<td class='periodo2' name='periodo2'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo2' name='periodo2'>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo2' name='periodo2' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Cálculo das Probabilidades</div></td>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>2.18</div></td>
						<td class='periodo2' name='periodo2' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>66%</div></td>
						<td class='periodo2' name='periodo2'><div style='width:96px; text-align:center; overflow:hidden;'>Reprov. freq.</div></td>
					</tr>
					<tr class='periodo2' name='periodo2'>
						<td class='subtitulo' class='periodo2' name='periodo2'></td>
						<td class='subtitulo' class='periodo2' name='periodo2' style='text-align:right;'colspan='1'>Cr&eacute;d.Habilitados:</td>
						<td class='subtitulo' class='periodo2' name='periodo2' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>14</span></td>
						<td class='subtitulo' class='periodo2' name='periodo2' style='text-align:right;'colspan='2'>C.R.	no Per&iacute;odo:</td>
						<td class='subtitulo' class='periodo2' name='periodo2' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>5.13</span></td>
					</tr>
					<tr class='periodo2' name='periodo2'>
						<td class='subtitulo' class='periodo2' name='periodo2'></td>
						<td class='subtitulo' class='periodo2' name='periodo2' style='text-align:right;'colspan='1'>Cr&eacute;d.Cursados:</td>
						<td class='subtitulo' class='periodo2' name='periodo2' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>27</span></td>
						<td class='subtitulo' class='periodo2' name='periodo2' style='text-align:right;'colspan='2'>C.R. Total:</td>
						<td class='subtitulo' class='periodo2' name='periodo2' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>5.23</span></td>
					</tr></table></div><div class='titulo' style='text-align:center;'><a href='#periodo3' onClick='MostrarEsconder(3)' value='3'><strong class='NumPeriodo' style='color:#6272b0; font-size:20px;'> 3 º Período (2012/1)</strong></a></div><div id='tbody3' style='display:block; margin:auto; text-align:left;' border='0' cellpadding='2' cellspacing='2'><table><tr class='periodo3' name='periodo3'><td class='periodo3' name='periodo3' style='text-align:center;'>Créd.</td><td class='periodo3' name='periodo3' colspan='2' style='text-align:center;'>Disciplina</td><td class='periodo3' name='periodo3' style='text-align:center;'>Nota</td><td class='periodo3' name='periodo3' style='text-align:center;'>Freq.</td><td class='periodo3' name='periodo3' style='text-align:center;'>Situação</td></tr>	<tr class='periodo3' name='periodo3'>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo3' name='periodo3' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Português Instrumental</div></td>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>10.00</div></td>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo3' name='periodo3'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo3' name='periodo3'>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo3' name='periodo3' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Cálculo II</div></td>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>7.50</div></td>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo3' name='periodo3'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo3' name='periodo3'>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo3' name='periodo3' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Elementos de Lógica</div></td>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>7.00</div></td>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo3' name='periodo3'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo3' name='periodo3'>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo3' name='periodo3' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Algoritmos e Estruturas de Dados II</div></td>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>7.90</div></td>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo3' name='periodo3'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo3' name='periodo3'>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo3' name='periodo3' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Linguagem de Programação II</div></td>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>7.00</div></td>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>86%</div></td>
						<td class='periodo3' name='periodo3'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo3' name='periodo3'>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo3' name='periodo3' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Teoria da Computação</div></td>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>10.00</div></td>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo3' name='periodo3'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo3' name='periodo3'>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo3' name='periodo3' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Arquitetura de Computadores I</div></td>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>8.70</div></td>
						<td class='periodo3' name='periodo3' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo3' name='periodo3'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>
					<tr class='periodo3' name='periodo3'>
						<td class='subtitulo' class='periodo3' name='periodo3'></td>
						<td class='subtitulo' class='periodo3' name='periodo3' style='text-align:right;'colspan='1'>Cr&eacute;d.Habilitados:</td>
						<td class='subtitulo' class='periodo3' name='periodo3' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>28</span></td>
						<td class='subtitulo' class='periodo3' name='periodo3' style='text-align:right;'colspan='2'>C.R.	no Per&iacute;odo:</td>
						<td class='subtitulo' class='periodo3' name='periodo3' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>8.3</span></td>
					</tr>
					<tr class='periodo3' name='periodo3'>
						<td class='subtitulo' class='periodo3' name='periodo3'></td>
						<td class='subtitulo' class='periodo3' name='periodo3' style='text-align:right;'colspan='1'>Cr&eacute;d.Cursados:</td>
						<td class='subtitulo' class='periodo3' name='periodo3' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>28</span></td>
						<td class='subtitulo' class='periodo3' name='periodo3' style='text-align:right;'colspan='2'>C.R. Total:</td>
						<td class='subtitulo' class='periodo3' name='periodo3' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>6.33</span></td>
					</tr></table></div><div class='titulo' style='text-align:center;'><a href='#periodo4' onClick='MostrarEsconder(4)' value='4'><strong class='NumPeriodo' style='color:#6272b0; font-size:20px;'> 4 º Período (2012/2)</strong></a></div><div id='tbody4' style='display:block; margin:auto; text-align:left;' border='0' cellpadding='2' cellspacing='2'><table><tr class='periodo4' name='periodo4'><td class='periodo4' name='periodo4' style='text-align:center;'>Créd.</td><td class='periodo4' name='periodo4' colspan='2' style='text-align:center;'>Disciplina</td><td class='periodo4' name='periodo4' style='text-align:center;'>Nota</td><td class='periodo4' name='periodo4' style='text-align:center;'>Freq.</td><td class='periodo4' name='periodo4' style='text-align:center;'>Situação</td></tr>	<tr class='periodo4' name='periodo4'>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo4' name='periodo4' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Ling Inglesa Instr p/Leitura na Ciência da Computação</div></td>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>8.58</div></td>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>95%</div></td>
						<td class='periodo4' name='periodo4'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo4' name='periodo4'>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo4' name='periodo4' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Cálculo III</div></td>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>10.00</div></td>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo4' name='periodo4'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo4' name='periodo4'>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>6</div></td>
						<td class='periodo4' name='periodo4' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Cálculo IV</div></td>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>7.80</div></td>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>88%</div></td>
						<td class='periodo4' name='periodo4'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo4' name='periodo4'>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>6</div></td>
						<td class='periodo4' name='periodo4' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Álgebra Linear</div></td>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>7.41</div></td>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo4' name='periodo4'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo4' name='periodo4'>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo4' name='periodo4' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Cálculo Numérico</div></td>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>10.00</div></td>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo4' name='periodo4'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo4' name='periodo4'>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo4' name='periodo4' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Arquitetura de Computadores II</div></td>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>7.40</div></td>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo4' name='periodo4'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo4' name='periodo4'>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>3</div></td>
						<td class='periodo4' name='periodo4' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Algoritmos em Grafos</div></td>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>9.30</div></td>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo4' name='periodo4'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo4' name='periodo4'>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo4' name='periodo4' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Cálculo das Probabilidades</div></td>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>5.50</div></td>
						<td class='periodo4' name='periodo4' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo4' name='periodo4'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>
					<tr class='periodo4' name='periodo4'>
						<td class='subtitulo' class='periodo4' name='periodo4'></td>
						<td class='subtitulo' class='periodo4' name='periodo4' style='text-align:right;'colspan='1'>Cr&eacute;d.Habilitados:</td>
						<td class='subtitulo' class='periodo4' name='periodo4' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>35</span></td>
						<td class='subtitulo' class='periodo4' name='periodo4' style='text-align:right;'colspan='2'>C.R.	no Per&iacute;odo:</td>
						<td class='subtitulo' class='periodo4' name='periodo4' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>8.15</span></td>
					</tr>
					<tr class='periodo4' name='periodo4'>
						<td class='subtitulo' class='periodo4' name='periodo4'></td>
						<td class='subtitulo' class='periodo4' name='periodo4' style='text-align:right;'colspan='1'>Cr&eacute;d.Cursados:</td>
						<td class='subtitulo' class='periodo4' name='periodo4' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>35</span></td>
						<td class='subtitulo' class='periodo4' name='periodo4' style='text-align:right;'colspan='2'>C.R. Total:</td>
						<td class='subtitulo' class='periodo4' name='periodo4' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>6.89</span></td>
					</tr></table></div><div class='titulo' style='text-align:center;'><a href='#periodo5' onClick='MostrarEsconder(5)' value='5'><strong class='NumPeriodo' style='color:#6272b0; font-size:20px;'> 5 º Período (2013/1)</strong></a></div><div id='tbody5' style='display:block; margin:auto; text-align:left;' border='0' cellpadding='2' cellspacing='2'><table><tr class='periodo5' name='periodo5'><td class='periodo5' name='periodo5' style='text-align:center;'>Créd.</td><td class='periodo5' name='periodo5' colspan='2' style='text-align:center;'>Disciplina</td><td class='periodo5' name='periodo5' style='text-align:center;'>Nota</td><td class='periodo5' name='periodo5' style='text-align:center;'>Freq.</td><td class='periodo5' name='periodo5' style='text-align:center;'>Situação</td></tr>	<tr class='periodo5' name='periodo5'>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo5' name='periodo5' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Engenharia de Software</div></td>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>5.00</div></td>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>83%</div></td>
						<td class='periodo5' name='periodo5'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo5' name='periodo5'>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo5' name='periodo5' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Banco de Dados I</div></td>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>8.90</div></td>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>90%</div></td>
						<td class='periodo5' name='periodo5'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo5' name='periodo5'>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo5' name='periodo5' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Estruturas de Linguagens</div></td>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>5.90</div></td>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo5' name='periodo5'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo5' name='periodo5'>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo5' name='periodo5' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Sistemas Operacionais I</div></td>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>7.70</div></td>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>86%</div></td>
						<td class='periodo5' name='periodo5'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo5' name='periodo5'>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo5' name='periodo5' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Arquiteturas Avançadas de Computadores</div></td>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>8.20</div></td>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>80%</div></td>
						<td class='periodo5' name='periodo5'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo5' name='periodo5'>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo5' name='periodo5' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Qualidade de Software</div></td>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>7.80</div></td>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo5' name='periodo5'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo5' name='periodo5'>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo5' name='periodo5' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Otimização Combinatória</div></td>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>6.70</div></td>
						<td class='periodo5' name='periodo5' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo5' name='periodo5'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>
					<tr class='periodo5' name='periodo5'>
						<td class='subtitulo' class='periodo5' name='periodo5'></td>
						<td class='subtitulo' class='periodo5' name='periodo5' style='text-align:right;'colspan='1'>Cr&eacute;d.Habilitados:</td>
						<td class='subtitulo' class='periodo5' name='periodo5' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>28</span></td>
						<td class='subtitulo' class='periodo5' name='periodo5' style='text-align:right;'colspan='2'>C.R.	no Per&iacute;odo:</td>
						<td class='subtitulo' class='periodo5' name='periodo5' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>7.17</span></td>
					</tr>
					<tr class='periodo5' name='periodo5'>
						<td class='subtitulo' class='periodo5' name='periodo5'></td>
						<td class='subtitulo' class='periodo5' name='periodo5' style='text-align:right;'colspan='1'>Cr&eacute;d.Cursados:</td>
						<td class='subtitulo' class='periodo5' name='periodo5' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>28</span></td>
						<td class='subtitulo' class='periodo5' name='periodo5' style='text-align:right;'colspan='2'>C.R. Total:</td>
						<td class='subtitulo' class='periodo5' name='periodo5' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>6.95</span></td>
					</tr></table></div><div class='titulo' style='text-align:center;'><a href='#periodo6' onClick='MostrarEsconder(6)' value='6'><strong class='NumPeriodo' style='color:#6272b0; font-size:20px;'> 6 º Período (2013/2)</strong></a></div><div id='tbody6' style='display:block; margin:auto; text-align:left;' border='0' cellpadding='2' cellspacing='2'><table><tr class='periodo6' name='periodo6'><td class='periodo6' name='periodo6' style='text-align:center;'>Créd.</td><td class='periodo6' name='periodo6' colspan='2' style='text-align:center;'>Disciplina</td><td class='periodo6' name='periodo6' style='text-align:center;'>Nota</td><td class='periodo6' name='periodo6' style='text-align:center;'>Freq.</td><td class='periodo6' name='periodo6' style='text-align:center;'>Situação</td></tr>	<tr class='periodo6' name='periodo6'>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>5</div></td>
						<td class='periodo6' name='periodo6' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Física I</div></td>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>7.50</div></td>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>86%</div></td>
						<td class='periodo6' name='periodo6'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo6' name='periodo6'>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo6' name='periodo6' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Análise e Projeto de Sistemas</div></td>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>7.00</div></td>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>86%</div></td>
						<td class='periodo6' name='periodo6'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo6' name='periodo6'>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo6' name='periodo6' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Banco de Dados II</div></td>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>7.80</div></td>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>78%</div></td>
						<td class='periodo6' name='periodo6'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo6' name='periodo6'>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo6' name='periodo6' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Interfaces Humano-Computador</div></td>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>8.80</div></td>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>86%</div></td>
						<td class='periodo6' name='periodo6'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo6' name='periodo6'>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo6' name='periodo6' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Sistemas Operacionais II</div></td>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>6.30</div></td>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo6' name='periodo6'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo6' name='periodo6'>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>4</div></td>
						<td class='periodo6' name='periodo6' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Compiladores</div></td>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>9.60</div></td>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>100%</div></td>
						<td class='periodo6' name='periodo6'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>	<tr class='periodo6' name='periodo6'>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>3</div></td>
						<td class='periodo6' name='periodo6' colspan='2' rowspan='1'><div style='width:400px; text-align:left; overflow:hidden;'>Otimização em Grafos</div></td>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>9.80</div></td>
						<td class='periodo6' name='periodo6' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>91%</div></td>
						<td class='periodo6' name='periodo6'><div style='width:96px; text-align:center; overflow:hidden;'>Aprovado</div></td>
					</tr>
							<tr class='periodo6' name='periodo6'>
								<td class='subtitulo' class='periodo6' name='periodo6'></td>
								<td class='subtitulo' class='periodo6' name='periodo6' style='text-align:right;'colspan='1'>Cr&eacute;d.Habilitados:</td>
								<td class='subtitulo' class='periodo6' name='periodo6' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>28</span></td>
								<td class='subtitulo' class='periodo6' name='periodo6' style='text-align:right;'colspan='2'>C.R.	no Per&iacute;odo:</td>
								<td class='subtitulo' class='periodo6' name='periodo6' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>8.03</span></td>
							</tr>
							<tr class='periodo6' name='periodo6'>
								<td class='subtitulo' class='periodo6' name='periodo6'></td>
								<td class='subtitulo' class='periodo6' name='periodo6' style='text-align:right;'colspan='1'>Cr&eacute;d.Cursados:</td>
								<td class='subtitulo' class='periodo6' name='periodo6' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>28</span></td>
								<td class='subtitulo' class='periodo6' name='periodo6' style='text-align:right;'colspan='2'>C.R. Total:</td>
								<td class='subtitulo' class='periodo6' name='periodo6' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>7.13</span></td>
							</tr>				
					</table></div></div><br><br><br>
					<script>
	var aprovacao = new Array();
	var reprovacao = new Array();
	var cr_total = new Array();
	var cr_parcial = new Array();	
	
	
				cr_total[1]=5.35;
				cr_parcial[1]=5.35;
			
			aprovacao[1]=3;
			reprovacao[1]=2;				
		
				cr_total[2]=5.23;
				cr_parcial[2]=5.13;
			
			aprovacao[2]=3;
			reprovacao[2]=3;				
		
				cr_total[3]=6.33;
				cr_parcial[3]=8.30;
			
			aprovacao[3]=7;
			reprovacao[3]=0;				
		
				cr_total[4]=6.89;
				cr_parcial[4]=8.15;
			
			aprovacao[4]=8;
			reprovacao[4]=0;				
		
				cr_total[5]=6.95;
				cr_parcial[5]=7.17;
			
			aprovacao[5]=7;
			reprovacao[5]=0;				
		
				cr_total[6]=7.13;
				cr_parcial[6]=8.03;
			
			aprovacao[6]=7;
			reprovacao[6]=0;				
		
			aprovacao[7]=0;
			reprovacao[7]=0;				
		
			aprovacao[8]=0;
			reprovacao[8]=0;				
		</script>	
		<div id="graficos">
			<table style="margin:auto;">
				<tr style="list-style:none; margin:0px; width:100%;">
					<td>
						<div style="margin: 0px; width: 490px;">
							<table style="margin: 10px;">
								<tr><td> </td><td><b> &nbsp; &nbsp;1 º&nbsp; &nbsp;</b></td><td><b> &nbsp; &nbsp;2 º&nbsp; &nbsp;</b></td><td><b> &nbsp; &nbsp;3 º&nbsp; &nbsp;</b></td><td><b> &nbsp; &nbsp;4 º&nbsp; &nbsp;</b></td><td><b> &nbsp; &nbsp;5 º&nbsp; &nbsp;</b></td><td><b> &nbsp; &nbsp;6 º&nbsp; &nbsp;</b></td></tr>
								<tr><td>Aprovações</td><td style='text-align:center'><b>3</b></td><td style='text-align:center'><b>3</b></td><td style='text-align:center'><b>7</b></td><td style='text-align:center'><b>8</b></td><td style='text-align:center'><b>7</b></td><td style='text-align:center'><b>7</b></td></tr>
								<tr><td>Reprovações</td><td style='text-align:center'><b>2</b></td><td style='text-align:center'><b>3</b></td><td style='text-align:center'><b>0</b></td><td style='text-align:center'><b>0</b></td><td style='text-align:center'><b>0</b></td><td style='text-align:center'><b>0</b></td></tr>
							</table>
							<div id='container' style='width:480px; height:300px; margin: 0 auto; display:block;'></div>
						</div>
					</td>
					<td>
						<div style="margin: 0px; width: 490px;">
							<table style="margin: 10px;">
								<tr><td> </td><td><b> &nbsp; &nbsp;1 º&nbsp; &nbsp;</b></td><td><b> &nbsp; &nbsp;2 º&nbsp; &nbsp;</b></td><td><b> &nbsp; &nbsp;3 º&nbsp; &nbsp;</b></td><td><b> &nbsp; &nbsp;4 º&nbsp; &nbsp;</b></td><td><b> &nbsp; &nbsp;5 º&nbsp; &nbsp;</b></td><td><b> &nbsp; &nbsp;6 º&nbsp; &nbsp;</b></td></tr>
								<tr><td>CR/período</td><td style='text-align:center'><b>5.35</b></td><td style='text-align:center'><b>5.13</b></td><td style='text-align:center'><b>8.30</b></td><td style='text-align:center'><b>8.15</b></td><td style='text-align:center'><b>7.17</b></td><td style='text-align:center'><b>8.03</b></td></tr>
								<tr><td>CR</td><td style='text-align:center'><b>5.35</b></td><td style='text-align:center'><b>5.23</b></td><td style='text-align:center'><b>6.33</b></td><td style='text-align:center'><b>6.89</b></td><td style='text-align:center'><b>6.95</b></td><td style='text-align:center'><b>7.13</b></td></tr>
							</table>
							<div id='container2' style='width:480px; height:300px; margin: 0 auto; display:block;'></div>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<script>
		/**
		 * Grid theme for Highcharts JS
		 * @author Torstein Hønsi
		 */

		Highcharts.theme = {
		   colors: ['#CD0000', '#50B432', '#058DC7', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
		   chart: {
			  backgroundColor: {
				 linearGradient: [0, 0, 500, 500],
				 stops: [
					[0, 'rgb(255, 255, 255)'],
					[1, 'rgb(240, 240, 255)']
				 ]
			  },
			  borderWidth: 2,
			  plotBackgroundColor: 'rgba(255, 255, 255, .9)',
			  plotShadow: true,
			  plotBorderWidth: 1
		   },
		   title: {
			  style: {
				 color: '#000',
				 font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
			  }
		   },
		   subtitle: {
			  style: {
				 color: '#666666',
				 font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
			  }
		   },
		   xAxis: {
			  gridLineWidth: 1,
			  lineColor: '#000',
			  tickColor: '#000',
			  labels: {
				 style: {
					color: '#000',
					font: '11px Trebuchet MS, Verdana, sans-serif'
				 }
			  },
			  title: {
				 style: {
					color: '#333',
					fontWeight: 'bold',
					fontSize: '12px',
					fontFamily: 'Trebuchet MS, Verdana, sans-serif'
				 }
			  }
		   },
		   yAxis: {
			  minorTickInterval: 'auto',
			  lineColor: '#000',
			  lineWidth: 1,
			  tickWidth: 1,
			  tickColor: '#000',
			  labels: {
				 style: {
					color: '#000',
					font: '11px Trebuchet MS, Verdana, sans-serif'
				 }
			  },
			  title: {
				 style: {
					color: '#333',
					fontWeight: 'bold',
					fontSize: '12px',
					fontFamily: 'Trebuchet MS, Verdana, sans-serif'
				 }
			  }
		   },
		   legend: {
			  itemStyle: {
				 font: '9pt Trebuchet MS, Verdana, sans-serif',
				 color: 'black'

			  },
			  itemHoverStyle: {
				 color: '#039'
			  },
			  itemHiddenStyle: {
				 color: 'gray'
			  }
		   },
		   labels: {
			  style: {
				 color: '#99b'
			  }
		   }
		};
		// Apply the theme
		var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
		</script>
		<script>
			$(function () {
				var chart;
				$(document).ready(function() {
					chart = new Highcharts.Chart({
						chart: {
							renderTo: 'container',
							type: 'column'
						},
						title: {
							text: 'Rendimento de Aprovação'
						},
						xAxis: {
							categories: ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º', '10º', '11º', '12º', '13º', '14º', '15º', '16º', '17º', '18º', '19º', '20º']
						},
						yAxis: {
							min: 0,
							title: {
								text: 'Qdt. de Disciplinas cursadas'
							},
							stackLabels: {
								enabled: true,
								style: {
									fontWeight: 'bold',
									color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
								}
							}
						},
						legend: {
							align: 'right',
							x: -100,
							verticalAlign: 'top',
							y: 20,
							floating: true,
							backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
							borderColor: '#CCC',
							borderWidth: 1,
							shadow: false
						},
						tooltip: {
							formatter: function() {
								return '<b>'+ this.x +'</b><br/>'+
									this.series.name +': '+ this.y +'<br/>'+
									'Total: '+ this.point.stackTotal;
							}
						},
						plotOptions: {
							column: {
								stacking: 'normal',
								dataLabels: {
									enabled: true,
									color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
								}
							}
						},
						series: [{
							name: 'Reprovado',
							data: [reprovacao[1],reprovacao[2],reprovacao[3],reprovacao[4],reprovacao[5],reprovacao[6],reprovacao[7],reprovacao[8],reprovacao[9],reprovacao[10],reprovacao[11],reprovacao[12],reprovacao[13],reprovacao[14],reprovacao[15],reprovacao[16],reprovacao[17],reprovacao[18],reprovacao[19],reprovacao[20]]
						}, {
							name: 'Aprovado',
							data: [aprovacao[1],aprovacao[2],aprovacao[3],aprovacao[4],aprovacao[5],aprovacao[6],aprovacao[7],aprovacao[8],aprovacao[9],aprovacao[10],aprovacao[11],aprovacao[12],aprovacao[13],aprovacao[14],aprovacao[15],aprovacao[16],aprovacao[17],aprovacao[18],aprovacao[19],aprovacao[20]]
						}]
					});
				});
				
			});
			$(function () {
				var chart;
				$(document).ready(function() {
					chart = new Highcharts.Chart({
						chart: {
							renderTo: 'container2',
							type: 'line'
						},
						title: {
							text: 'Rendimento de CR'
						},
						subtitle: {
							text: ''
						},
						xAxis: {
							categories: ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º', '10º', '11º', '12º', '13º', '14º', '15º', '16º', '17º', '18º', '19º', '20º']
						},
						yAxis: {
							title: {
								text: 'Coeficiente de Rendimento'
							}
						},
						tooltip: {
							enabled: false,
							formatter: function() {
								return '<b>'+ this.series.name +'</b><br/>'+
									this.x +': '+ this.y +'';
							}
						},
						plotOptions: {
							line: {
								dataLabels: {
									enabled: true
								},
								enableMouseTracking: false
							}
						},
						series: [{
							name: ' ',
							data: []
						},{
							name: 'Total',
							data: [cr_total[1],cr_total[2],cr_total[3],cr_total[4],cr_total[5],cr_total[6],cr_total[7],cr_total[8],cr_total[9],cr_total[10],cr_total[11],cr_total[12],cr_total[13],cr_total[14],cr_total[15],cr_total[16],cr_total[17],cr_total[18],cr_total[19],cr_total[20]]
						}, {
							name: 'Parcial',
							data: [cr_parcial[1],cr_parcial[2],cr_parcial[3],cr_parcial[4],cr_parcial[5],cr_parcial[6],cr_parcial[7],cr_parcial[8],cr_parcial[9],cr_parcial[10],cr_parcial[11],cr_parcial[12],cr_parcial[13],cr_parcial[14],cr_parcial[15],cr_parcial[16],cr_parcial[17],cr_parcial[18],cr_parcial[19],cr_parcial[20]]
						}]
					});
				});
			});
		</script>
	</body>
</html>