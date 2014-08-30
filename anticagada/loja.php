<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>COMPUTAÇÃO-UERJ</title>
		
		<link href="css/js-image-slider.css" rel="stylesheet" type="text/css" />

		<script type="text/javascript" src="js/jquery.js"></script>		
		<script type="text/javascript" src="js/jquery.xdomainajax.js"></script>
		<script type="text/javascript" src="js/jquery-latest.pack.js"></script>
		<script type="text/javascript">
			window.onload = function(){
				parent.document.getElementById("conteudo").height = document.getElementById("pagina").scrollHeight + 35;
			}
			function mudar_pag(alvo){
				if (alvo == 'camisas')	document.getElementById("produtos1").style.display="block"; else document.getElementById("produtos1").style.display="none";
				if (alvo == 'casacos')	document.getElementById("produtos2").style.display="block"; else document.getElementById("produtos2").style.display="none";
				if (alvo == 'canecas')	document.getElementById("produtos3").style.display="block"; else document.getElementById("produtos3").style.display="none";
				if (alvo == 'outros')	document.getElementById("produtos4").style.display="block"; else document.getElementById("produtos4").style.display="none";
				window.location.href = '#menu';
			}
		</script>
		<style>
			#pagina{
				color:#EEE;
				font-family:Helvetica,Arial,sans-serif;
				font-size:15px;
				font-weight:900;				
			}
			#submenu{
				float: left;
				width:200px;
				height:100%;
			}
			#produtos{
				float: left;
				text-align:center;
				width:780px;
			}
			#produtos1{display:block;}
			#produtos2{display:none;}
			#produtos3{display:none;}
			#produtos4{display:none;}
			#produtos5{display:none;}
			#produtos6{display:none;}
			#produtos7{display:none;}
			.produto{
				float:left;
				text-align:center;
				margin-top: 5px;
				margin-bottom: 15px;
				margin-left: 5px;
				margin-right 5px;
				width:220px;
				height:150px;
				background: #EEE;
				padding:10px;
				border-radius:5px;
				border:2px solid #0000dd;
			}
			.legenda{
				text-align:center;
				margin: 5px;
				width:200px;
				height:35px;
				background: #55AAAA;
				color: #FFF
				padding:10px;
				border:2px solid #d0d0d0;
			}
			img{
				margin:auto;
				border:0px solid white;
				border-radius:5px;
				width: 200px;
				height: 115px;
			}
			
			.sexypanels{
				list-style-type: none;
				margin: 0;
				padding: 0;
				width: 180px; /* width of menu */
			}
			.sexypanels li{
				border-bottom: 1px solid white; /* white border beneath each menu item */
			}
			.sexypanels li a{
				background: #333 url(imagens/sexypanelright.gif) no-repeat right top; /*color of menu by default*/
				font: bold 13px "Lucida Grande", "Trebuchet MS", Verdana;
				display: block;
				color: white;
				width: auto;
				padding: 5px 0; /* Vertical (top/bottom) padding for each menu link */
				text-indent: 8px;
				text-decoration: none;
				border-bottom: 1px solid black; /*bottom border of menu link. Should be equal or darker to link's bgcolor*/
			}
			.sexypanels li a:visited, .sexypanels li a:active{
				color: white;
			}
			.sexypanels li a:hover{
				background-color: black; /*color of menu onMouseover*/
				color: white;
				border-bottom: 1px solid black; /*bottom border of menu link during hover. Should be equal or darker to link's hover's bgcolor*/
			}
			<!--[if IE]>
			<style type="text/css">
			.sexypanels li a{ /* Menu link width value for IE */
			width: 100%;
			}
			</style>
			<![endif]-->
		</style>
	<style type="text/css">
		.thumbnail{
			position: relative;
			z-index: 0;
		}
			.thumbnail:hover{
			background-color: transparent;
			z-index: 50;
		}
			.thumbnail span{ /*CSS for enlarged image*/
			position: absolute;
			background-color: lightyellow;
			padding: 5px;
			left: -1000px;
			border: 1px dashed gray;
			visibility: hidden;
			color: black;
			text-decoration: none;
		}
			.thumbnail span img{ /*CSS for enlarged image*/
			border-width: 0;
			padding: 2px;
		}
			.thumbnail:hover span{ /*CSS for enlarged image on hover*/
			visibility: visible;
			top: 0;
			left: 60px; /*position where enlarged image should offset horizontally */
		}
	</style>
	</head>
	<body>
		<div id="pagina" style="height:800px;">
			<div id='submenu'>
				<ul class="sexypanels">
					<li><a id="camisas" onClick="mudar_pag('camisas')" href="#menu">»  CAMISAS</a></li>
					<li><a id="casacos" onClick="mudar_pag('casacos')" href="#menu" >»  CASACOS</a></li>
					<li><a id="canecas" onClick="mudar_pag('canecas')" href="#menu">»  CANECAS</a></li>
					<li><a id="outros" onClick="mudar_pag('outros')" class="lastitem" href="#menu">»  OUTROS</a></li>		
				</ul>
			</div>
			<div id='produtos1' class='produtos'>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/camisa1.jpg" ><span><img src="imagens/camisa1.jpg" style="width:500px; height:300px;"><br />Camisa Binária</span></a>
					<div class='legenda'>Camisa Binária<br>R$ 35,00</div>
				</div>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/camisa2.jpg" ><span><img src="imagens/camisa2.jpg" style="width:500px; height:300px;"><br />Camisa Circuito</span></a>
					<div class='legenda'>Camisa Circuito<br>R$ 35,00</div>
				</div>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/camisaIME_Valente.jpg" ><span><img src="imagens/camisaIME_Valente.jpg" style="width:500px; height:300px;"><br />Camisa do IME</span></a>
					<div class='legenda'>Camisa do IME<br>R$ 25,00</div>
				</div>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/CamisasSimples.png" ><span><img src="imagens/CamisasSimples.png" style="width:500px; height:300px;"><br />Camisa Simples</span></a>
					<div class='legenda'>Camisa Simples<br>R$ 20,00</div>
				</div>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/camisaMascote.jpg" ><span><img src="imagens/camisaMascote.jpg" style="width:500px; height:300px;"><br />Camisa do Mascote do IME</span></a>
					<div class='legenda'>Camisa Mascote<br>R$ 49,00</div>
				</div>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/camisaIME_CAIME.png" ><span><img src="imagens/camisaIME_CAIME.png" style="width:500px; height:300px;"><br />Camisa do IME</span></a>
					<div class='legenda'>Camisa do IME<br>R$ 39,00</div>
				</div>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/camisaCAIME.png" ><span><img src="imagens/camisaCAIME.png" style="width:500px; height:300px;"><br />Camisa do CAIME</span></a>
					<div class='legenda'>Camisa CAIME<br>R$ 49,00</div>
				</div>
			</div>
			<div id='produtos2' class='produtos'>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/casaco1.jpg" ><span><img src="imagens/casaco1.jpg" style="width:500px; height:300px;"><br />Casaco Binário</span></a>
					<div class='legenda'>Casaco Binário<br>R$ 39,00</div>
				</div>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/casaco2.jpg" ><span><img src="imagens/casaco2.jpg" style="width:500px; height:300px;"><br />Casaco Circuito</span></a>
					<div class='legenda'>Casaco Circuito<br>R$ 39,00</div>
				</div>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/casaco3.jpg" ><span><img src="imagens/casaco3.jpg" style="width:500px; height:300px;"><br />Casaco Simples</span></a>
					<div class='legenda'>Casaco Simples<br>R$ 29,00</div>
				</div>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/casaco4.jpg" ><span><img src="imagens/casaco4.jpg" style="width:500px; height:300px;"><br />Casaco IME</span></a>
					<div class='legenda'>Casaco IME<br>R$ 29,00</div>
				</div>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/casaco5.jpg" ><span><img src="imagens/casaco5.jpg" style="width:500px; height:300px;"><br />Casaco UERJ</span></a>
					<div class='legenda'>Casaco UERJ<br>R$ 39,00</div>
				</div>
			</div>
			<div id='produtos3' class='produtos'>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/canecaCAIME_pb.jpg" ><span><img src="imagens/canecaCAIME_pb.jpg" style="width:500px; height:300px;"><br />Caneca de 440ml c/ isolante térmico</span></a>
					<div class='legenda'>Caneca CAIME 440ml<br>R$ 15,00</div>
				</div>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/canecaCAIME_colorida.jpg" ><span><img src="imagens/canecaCAIME_colorida.jpg" style="width:500px; height:300px;"><br />Caneca de 770ml colorida</span></a>
					<div class='legenda'>Caneca CAIME 770ml<br>R$ 18,00</div>
				</div>
			<!--	<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/caneca3.jpg" ><span><img src="imagens/caneca3.jpg" style="width:500px; height:300px;"><br />Caneca Simples</span></a>
					<div class='legenda'>Caneca Simples<br>R$ 29,00</div>
				</div>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/caneca4.jpg" ><span><img src="imagens/caneca4.jpg" style="width:500px; height:300px;"><br />Caneca de Chopp</span></a>
					<div class='legenda'>Caneca de Chopp<br>R$ 29,00</div>
				</div>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/caneca5.jpg" ><span><img src="imagens/caneca5.jpg" style="width:500px; height:300px;"><br />Caneca do Mascote</span></a>
					<div class='legenda'>Caneca do Mascote<br>R$ 39,00</div>
				</div>-->
			</div>
			<div id='produtos4' class='produtos'>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/chaveiro.jpg" ><span><img src="imagens/chaveiro.jpg" style="width:500px; height:300px;"><br />Chaveiro Computação</span></a>
					<div class='legenda'>Chaveiro<br>R$ 39,00</div>
				</div>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/adesivo.jpg" ><span><img src="imagens/adesivo.jpg" style="width:500px; height:300px;"><br />Adesivo de Carro</span></a>
					<div class='legenda'>Adesivo de Carro<br>R$ 39,00</div>
				</div>
				<div class='produto'>
					<a class="thumbnail" href="#thumb"><img src="imagens/boneco.jpg" ><span><img src="imagens/boneco.jpg" style="width:500px; height:300px;"><br />Boneco do Mascote</span></a>
					<div class='legenda'>Boneco Mascote<br>R$ 29,00</div>
				</div>
			</div>
		
		</div>
	</body>
</html>