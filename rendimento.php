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
                                document.getElementById('graficos').innerHTML="";
			});
		</script>
                <script type="text/javascript">
			window.onload = function(){
				parent.document.getElementById("conteudo").height = document.getElementById("pagina").scrollHeight + 35;
                                
			}
			function MostrarEsconder(periodo){
                                $(".tbody").css("display","none");
                                $("#tbody"+periodo).fadeIn("slow");
                                //document.getElementById("notas").style.height = document.getElementById("historico").style.height + 50;
                                $("#notas").css("height",$("#historico").css("height")+50);
                        }
		</script>
		<style>
			#pagina{
				color:#EEE;
				font-family:Helvetica,Arial,sans-serif;
				font-size:15px;
				font-weight:900;				
			}
                        #notas{
                                background-color:#DDD;
                                border:2px solid #4572A7;
                                border-radius:7px;
                                overflow-y: auto;
                                
                                width:960px;
                                height:300px;
     
                                margin-top:50px;
                                margin-left:8px;
                                margin-right:8px;
                                margin-bottom:50px;
                                
                                padding-left: 5px;
                                padding-right: 0px;
                                padding-top: 15px;
                                padding-bottom: 15px;
                        }
			#historico{
				color:#EEE;
                                margin-left:13px;
                                float:left;
                                overflow:hidden; 
                                width:750px;
			}
			.titulo{
				color:#EEE;
				font-size:15px;
				font-weight:900;
			}
			.subtitulo{
				color:#EEE;
				background-color:#6272b0;
				font-size:17px;
				font-weight:900;
			}
			td{
				color:#252629;
				background-color:#B0B3C0;
				font-size:16px;
				font-weight:600;
                        }
                        .tabelona{
                            color:#252629;
                            background-color:#111; 
                        }
                        .tabelinha{
                            color:#252629;
                            background-color:#EEE; 
                            border: 1px solid black;
                            border-collapse: collapse;
                        }
			a.link {text-decoration:none;}
			a.visited {text-decoration:none;}
			a.hover {text-decoration:none;}
			a.active {text-decoration:none;}
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
				background: #5190B9 url(imagens/sexypanelright.gif) no-repeat right top; /*color of menu by default*/
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
				background-color: #63A2CB; /*color of menu onMouseover*/
				color: white;
				border-bottom: 1px solid black; /*bottom border of menu link during hover. Should be equal or darker to link's hover's bgcolor*/
			}
		</style>
	</head>
	<body>
		<div class="conteudo" id="pagina" type="text/css" >
		<div id='graficos_cima' style='width:100%; margin:auto; display:block;'></div>
<?php
        include_once 'funcoes.php';
	class DisciplinaCursada{
		public $disciplina="-";
		public $creditos=0;
		public $carga_horaria=0;
		public $tipo="";
		public $frequencia=0.00;
		public $nota=0.00;
		public $situacao="";
	}
	class Periodo{
		public $ano="0000/0";
		public $numero=0;
		public $creditos_habilitados_per=0;
		public $creditos_cursados_per=0;
		public $cr_parcial=0.00;
		public $cr_total=0.00;
		public $aprovacoes=0;
		public $reprovacoes=0;
	}	
	$DisciplinasCursadas=array();
	$Periodos=array();
	
	$qtd_periodos=0; 
	$qtd_disciplinas=0;
	$cont_cred_per=0;
	$cont_cred_total=0;
	$soma_nota_per=0;
	$soma_nota_total=0;
	$creditos_habilitados_total=0;
	$porcentagem_conclusão=0.00;
	$cont_cred_isencao=0;
	$info_per=array();
	$info_disc=array();
	
	//echo "<hr>";
	$str="vazio";
	if(isset($_REQUEST['CacheHistorico2'])){
		$str=$_REQUEST['CacheHistorico2'];
	}
	else{
		$str=" não chegou nenhuma REQUEST";
	}
	$str=explode("\r\n",$str);
	?>
	<script src="http://code.highcharts.com/highcharts.js"></script>
	<script src="http://code.highcharts.com/modules/exporting.js"></script>
        
        <div id="notas">
	<div id='submenu' style="float:left;">
            <div class='titulo' style='text-align:center;'><strong class='NumPeriodo' style='color:#6272b0; font-size:20px;'> Períodos </strong></div>
            <ul id="lista" class="sexypanels">
            </ul>	
        </div>
	<div id="historico">
		<tbody>
	<?php
	if (isset($str[144]))
	for($i=114; ; ){ //verifica novo período
		$str[$i]=trim($str[$i]);
		if((strlen($str[$i])!=6)&&($i!=114)){break;}//verifica se não é um período	
		$tam=strlen($str[$i]);
//                echo "<br>$tam | [$i] => <b>$str[$i]</b>"; //  24 | [114] => 2011/1
		if(!(($i==114)&&(strlen($str[114])!=6))){ //se não for isenção
			$qtd_periodos++;
			$Periodos[$qtd_periodos]=new Periodo();
			echo"<div class='tbody' id='tbody$qtd_periodos' style='display:none;'> <div class='titulo' style='text-align:center;'><strong class='NumPeriodo' style='color:#6272b0; font-size:20px;'> $qtd_periodos º Período ($str[$i])</strong></div>";
                        echo"<script>document.getElementById('lista').innerHTML+=\"<li><a onClick='MostrarEsconder($qtd_periodos)' href='#menu'>»  $qtd_periodos º PERÍODO ($str[$i]) </a></li>\";</script>";
                        $Periodos[$qtd_periodos]->ano=$str[$i];

		}else{ //se for isenção
			$Periodos[$qtd_periodos]=new Periodo();
			echo"<div class='tbody' id='tbody$qtd_periodos' style='display:none;'> <div style='text-align:center;'><strong class='NumPeriodo' style='color:#6272b0; font-size:20px;'> Disciplinas isentas $str[$i]</strong></div>";
                        echo"<script>document.getElementById('lista').innerHTML+=\"<li><a onClick='MostrarEsconder($qtd_periodos)' href='#menu'>»  Disciplinas isentas $str[$i] </a></li>\";</script>";
                        $Periodos[$qtd_periodos]->ano=$str[$i];
		}
		echo"<div id='grade' margin:auto; text-align:left;' border='0' cellpadding='2' cellspacing='2'>";
		echo"<table><tr class='periodo$qtd_periodos' name='periodo$qtd_periodos'><td class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:center;'>Créd.</td><td class='periodo$qtd_periodos' name='periodo$qtd_periodos' colspan='2' style='text-align:center;'>Disciplina</td><td class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:center;'>Nota</td><td class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:center;'>Freq.</td><td class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:center;'>Situação</td></tr>";
		$cont_cred_per=0;
		$soma_nota_per=0;			
		for(;;){ //verifica nova disciplina
			$qtd_disciplinas++;
			$DisciplinasCursadas[$qtd_disciplinas]=new DisciplinaCursada();
			for($k=1;$k<=7;$k++){
				$i=$i+6;
				$str[$i]=trim($str[$i]);
//				$tam=strlen($str[$i]);
//				echo "<br>$tam | [$i] => $str[$i]";  //   29 | [120] => C�lculo I
				switch ($k) {
					case 1:
						$DisciplinasCursadas[$qtd_disciplinas]->disciplina=$str[$i];
						break;
					case 2:
						$DisciplinasCursadas[$qtd_disciplinas]->creditos=$str[$i];
						$e=$i+6*5;
//						$tam2=strlen($str[$e]);
						$str[$e]=trim($str[$e]);
						if($str[$e]!="Cancelado"){
						//if(strlen($str[$e])!=2){//se NÃO é isenção nem Cancelamento
							$cont_cred_per=$cont_cred_per+$str[$i];
							$cont_cred_total=$cont_cred_total+$str[$i];
				//			echo"===== e=$e / situacao=$str[$e]=====";
						}//else echo"===== e=$e / tam=$tam2 =====";
						
						break;
					case 3:
						$DisciplinasCursadas[$qtd_disciplinas]->carga_horaria=$str[$i];
						break;
					case 4:
						$DisciplinasCursadas[$qtd_disciplinas]->tipo=$str[$i];
						if(strlen($str[$i])==13){
							$DisciplinasCursadas[$qtd_disciplinas]->tipo="obrigatória";
						}
						break;
					case 5:
						$DisciplinasCursadas[$qtd_disciplinas]->frequencia=$str[$i];
						break;
					case 6:
						$str[$i]=str_replace(",", ".", $str[$i]);
						if(strlen($str[$i]!=2)){//se NÃO é isenção
							$DisciplinasCursadas[$qtd_disciplinas]->nota=$str[$i];
							$soma_nota_per = $soma_nota_per  +($str[$i]*$DisciplinasCursadas[$qtd_disciplinas]->creditos);
							$soma_nota_total=$soma_nota_total+($str[$i]*$DisciplinasCursadas[$qtd_disciplinas]->creditos);
						}break;
					case 7:
						if(strlen($str[$i])==11){
							$Periodos[$qtd_periodos]->aprovacoes++;
							$DisciplinasCursadas[$qtd_disciplinas]->situacao="Aprovado";
							$Periodos[$qtd_periodos]->creditos_habilitados_per=$Periodos[$qtd_periodos]->creditos_habilitados_per+$DisciplinasCursadas[$qtd_disciplinas]->creditos;
						}else if(strlen($str[$i])==13){
								$Periodos[$qtd_periodos]->reprovacoes++;
								$DisciplinasCursadas[$qtd_disciplinas]->situacao="Reprov. freq.";
								
						}else if(strlen($str[$i])==12){
								$Periodos[$qtd_periodos]->reprovacoes++;
								$DisciplinasCursadas[$qtd_disciplinas]->situacao="Reprov. nota";
						}else if($str[$i]=="Isento"){
								$Periodos[$qtd_periodos]->aprovacoes++;
								$DisciplinasCursadas[$qtd_disciplinas]->situacao="Isento";
								$cont_cred_isencao+=$DisciplinasCursadas[$qtd_disciplinas]->creditos;
						}else if($str[$i]=="Cancelado")
								$DisciplinasCursadas[$qtd_disciplinas]->situacao="Cancelado";
						break;
				}
			}
			$info_disc[0]=$DisciplinasCursadas[$qtd_disciplinas]->creditos;
			$info_disc[1]=$DisciplinasCursadas[$qtd_disciplinas]->disciplina;
			$info_disc[2]=$DisciplinasCursadas[$qtd_disciplinas]->frequencia;
			$info_disc[3]=$DisciplinasCursadas[$qtd_disciplinas]->carga_horaria;
			$info_disc[4]=$DisciplinasCursadas[$qtd_disciplinas]->tipo;
			$info_disc[5]=$DisciplinasCursadas[$qtd_disciplinas]->nota;
			$info_disc[6]=$DisciplinasCursadas[$qtd_disciplinas]->situacao;
			
                        $cor=black;
			if(($info_disc[6])=='Aprovado'){
				$cor=green;
			}
			else if((($info_disc[6])=='Cancelado')||(($info_disc[6])=='Insento')){
				$cor=gray;
			}
			else{
				$cor=red;
			}
			echo "	<tr class='periodo$qtd_periodos' name='periodo$qtd_periodos'>
						<td class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'>$info_disc[0]</div></td>
						<td class='periodo$qtd_periodos' name='periodo$qtd_periodos' colspan='2' rowspan='1'><div style='width:480px; text-align:left; overflow:hidden;'>$info_disc[1]</div></td>
						<td class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'>$info_disc[5]</div></td>
						<td class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'>$info_disc[2]</div></td>
						<td class='periodo$qtd_periodos' name='periodo$qtd_periodos'><div style='width:96px; text-align:center; color:$cor; overflow:hidden; font-size:14px; font-weight:700;'>$info_disc[6]</div></td>
					</tr>";			
			$i=$i+5;
			if((strlen($str[$i])==14)&&(strlen($str[$i+6])==14)){ // verifica se não é uma disciplina
				$i=$i+9;
				//$Periodos[$qtd_periodos]->$ano=$str[$i];
				$Periodos[$qtd_periodos]->numero=$qtd_periodos;
				//$Periodos[$qtd_periodos]->creditos_habilitados_per=$str[$i];
				$Periodos[$qtd_periodos]->creditos_cursados_per=$cont_cred_per;
				$creditos_habilitados_total=$creditos_habilitados_total+$Periodos[$qtd_periodos]->creditos_habilitados_per;
				$Periodos[$qtd_periodos]->cr_parcial=$soma_nota_per/$cont_cred_per;
				if((strlen($str[114])==2)&&($qtd_periodos==0))
					$Periodos[$qtd_periodos]->cr_total=0;
				else
					$Periodos[$qtd_periodos]->cr_total=($soma_nota_total/($cont_cred_total-$cont_cred_isencao));
//				echo"$soma_nota_total :: $cont_cred_total :: $cont_cred_isencao ::<br>";
				
				//$Periodos[$qtd_periodos]->aprovacoes=$str[$i];
				//$Periodos[$qtd_periodos]->reprovacoes=$str[$i];
				$porcentagem_conclusão=$creditos_habilitados_total/197;
				
				$info_per[0]=$Periodos[$qtd_periodos]->creditos_habilitados_per;
				$info_per[1]=$Periodos[$qtd_periodos]->creditos_cursados_per;
				$info_per[2]=$Periodos[$qtd_periodos]->cr_parcial;
				$info_per[3]=$Periodos[$qtd_periodos]->cr_total;
				
				$info_per[2]=round($info_per[2], 2);
				$info_per[3]=round($info_per[3], 2);
				echo"
					<tr class='periodo$qtd_periodos' name='periodo$qtd_periodos'>
						<td colspan='2' class='subtitulo' class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:right;'>Cr&eacute;d.Habilitados:</td>
						<td class='subtitulo' class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='width:74px; text-align:center;'>&nbsp;<span style='font-weight: bold;'>$info_per[0]</span></td>
						<td class='subtitulo' class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:right;'colspan='2'>C.R. / Per&iacute;odo:</td>
						<td class='subtitulo' class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>$info_per[2]</span></td>
					</tr>
					<tr class='periodo$qtd_periodos' name='periodo$qtd_periodos'>
						<td colspan='2' class='subtitulo' class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='width:100%; text-align:right;'>Cr&eacute;d.Cursados:</td>
						<td class='subtitulo' class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='width:74px; text-align:center;'>&nbsp;<span style='font-weight: bold;'>$info_per[1]</span></td>
						<td class='subtitulo' class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:right;'colspan='2'>C.R. Total:</td>
						<td class='subtitulo' class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>$info_per[3]</span></td>
					</tr>";
				echo"</table></div></div>";
				break;
			}
			else{
				if((strlen($str[$i])==10)&&(strlen($str[$i+21])==98)){// verifica se chegou ao fim do vetor
					$i=$i+9;
					//$Periodos[$qtd_periodos]->$ano=$str[$i];
					$Periodos[$qtd_periodos]->numero=$qtd_periodos;
					//$Periodos[$qtd_periodos]->creditos_habilitados_per=$str[$i];
					$Periodos[$qtd_periodos]->creditos_cursados_per=$cont_cred_per;
					$creditos_habilitados_total=$creditos_habilitados_total+$Periodos[$qtd_periodos]->creditos_habilitados_per;
					$Periodos[$qtd_periodos]->cr_parcial=$soma_nota_per/$cont_cred_per;
					if((strlen($str[114])==2)&&($qtd_periodos==0))
						$Periodos[$qtd_periodos]->cr_total=0;
					else
						$Periodos[$qtd_periodos]->cr_total=($soma_nota_total/($cont_cred_total-$cont_cred_isencao));
			//		echo"$soma_nota_total :: $cont_cred_total :: $cont_cred_isencao ::<br>";
					//$Periodos[$qtd_periodos]->aprovacoes=$str[$i];
					//$Periodos[$qtd_periodos]->reprovacoes=$str[$i];
					$porcentagem_conclusão=$creditos_habilitados_total/197;
					
					$info_per[0]=$Periodos[$qtd_periodos]->creditos_habilitados_per;
					$info_per[1]=$Periodos[$qtd_periodos]->creditos_cursados_per;
					$info_per[2]=$Periodos[$qtd_periodos]->cr_parcial;
					$info_per[3]=$Periodos[$qtd_periodos]->cr_total;	

					$info_per[2]=round($info_per[2], 2);
					$info_per[3]=round($info_per[3], 2);					

					echo"
							<tr class='periodo$qtd_periodos' name='periodo$qtd_periodos'>
								<td class='subtitulo' class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:right;'colspan='2'>Cr&eacute;d.Habilitados:</td>
								<td class='subtitulo' class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='width:74px; text-align:center;'>&nbsp;<span style='font-weight: bold;'>$info_per[0]</span></td>
								<td class='subtitulo' class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:right;'colspan='2'>C.R. / Per&iacute;odo:</td>
								<td class='subtitulo' class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>$info_per[2]</span></td>
							</tr>
							<tr class='periodo$qtd_periodos' name='periodo$qtd_periodos'>
								<td class='subtitulo' class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:right;'colspan='2'>Cr&eacute;d.Cursados:</td>
								<td class='subtitulo' class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='width:74px; text-align:center;'>&nbsp;<span style='font-weight: bold;'>$info_per[1]</span></td>
								<td class='subtitulo' class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:right;'colspan='2'>C.R. Total:</td>
								<td class='subtitulo' class='periodo$qtd_periodos' name='periodo$qtd_periodos' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>$info_per[3]</span></td>
							</tr>
                                  <!--       </table></div></div> 


                                        <table>
                                        <div class='tbody' id='tbody99' style='display:none;'> 
                                                <tr class='periodo99' name='periodo99'>
                                                    <td class='periodo99' name='periodo99' style='text-align:center;'><div style='width:100%; text-align:center; overflow:hidden;'><input type='text' name='' value=''></div></td>
                                                    <td class='periodo99' name='periodo99' colspan='2' rowspan='1'><div style='width:480px; text-align:left; overflow:hidden;'><input type='text' name='' value=''></div></td>
                                                    <td class='periodo99' name='periodo99' style='text-align:center;'><div style='width:58px; text-align:center; overflow:hidden;'><input type='text' name='' value=''></div></td>
                                                    <td class='periodo99' name='periodo99' style='text-align:center;'><div style='width:66px; text-align:center; overflow:hidden;'><input type='text' name='' value=''></div></td>
                                                    <td class='periodo99' name='periodo99'><div style='width:96px; text-align:center; color:$cor; overflow:hidden; font-size:14px; font-weight:700;'><input type='text' name='' value=''></div></td>
                                                </tr>
                                                <tr class='periodo99' name='periodo99'>
                                                        <td class='subtitulo' class='periodo99' name='periodo99' style='text-align:right;'colspan='2'>Cr&eacute;d.Habilitados:</td>
                                                        <td class='subtitulo' class='periodo99' name='periodo99' style='width:74px; text-align:center;'>&nbsp;<span style='font-weight: bold;'>$info_per[0]</span></td>
                                                        <td class='subtitulo' class='periodo99' name='periodo99' style='text-align:right;'colspan='2'>C.R. / Per&iacute;odo:</td>
                                                        <td class='subtitulo' class='periodo99' name='periodo99' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>$info_per[2]</span></td>
                                                </tr>
                                                <tr class='periodo99' name='periodo99'>
                                                        <td class='subtitulo' class='periodo99' name='periodo99' style='text-align:right;'colspan='2'>Cr&eacute;d.Cursados:</td>
                                                        <td class='subtitulo' class='periodo99' name='periodo99' style='width:74px; text-align:center;'>&nbsp;<span style='font-weight: bold;'>$info_per[1]</span></td>
                                                        <td class='subtitulo' class='periodo99' name='periodo99' style='text-align:right;'colspan='2'>C.R. Total:</td>
                                                        <td class='subtitulo' class='periodo99' name='periodo99' style='text-align:center;'>&nbsp;<span style='font-weight: bold;'>$info_per[3]</span></td>
                                                </tr>
                                        </div>-->
					</table></div></div></div>
					";
                      //                  echo"<script>document.getElementById('lista').innerHTML+=\"<li><a onClick='MostrarEsconder(99)' href='#menu'>» SIMULAÇÃO </a></li>\";</script>";
                                        echo"<script> MostrarEsconder($qtd_periodos) </script>";
					break;
				}
			}
		}
        }
	
	echo"<script>
	var aprovacao = new Array();
	var reprovacao = new Array();
	var cr_total = new Array();
	var cr_parcial = new Array();	
	
	";
        $lim=8;
        if ($qtd_periodos>8) $lim=$qtd_periodos;     
	for($i=1;$i<=$lim;++$i){
		if(isset($Periodos[$i]->aprovacoes)){
			$aprovacao[$i]=$Periodos[$i]->aprovacoes;
			$reprovacao[$i]=$Periodos[$i]->reprovacoes;	
			$cr_total[$i]=number_format($Periodos[$i]->cr_total, 2, ".", "");	
			$cr_parcial[$i]=number_format($Periodos[$i]->cr_parcial, 2, ".", "");
			echo"
				cr_total[$i]=$cr_total[$i];
				cr_parcial[$i]=$cr_parcial[$i];
			";			
		}else{
			$aprovacao[$i]=0;
			$reprovacao[$i]=0;	
			$cr_total[$i]="";	
			$cr_parcial[$i]="";	
		}echo"
			aprovacao[$i]=$aprovacao[$i];
			reprovacao[$i]=$reprovacao[$i];				
		";
	}echo"</script>";
?>	
		<div id="graficos">
			<table style="margin:auto;">
				<tr style="list-style:none; margin:0px; width:100%;">
					<td class="tabelona">
						<div style="margin: 0px; width: 490px;">
                                                    <div style="background:#EEE; width: 470px; margin: 0 auto; padding-left: 5px; padding-right: 5px; border:2px solid blueviolet; border-radius: 7px;">
                                                    	<table class="tabelinha" style="margin: auto; margin-top: 10px; margin-bottom: 10px;">
								<tr><td class="tabelinha"> </td><?php for($i=1;($i<=$qtd_periodos);++$i) {echo"<td class='tabelinha'><b> &nbsp; &nbsp;$i º&nbsp; &nbsp;</b></td>";}?></tr>
								<tr><td class="tabelinha">Aprovações</td><?php for($i=1;$i<=$qtd_periodos;++$i) {echo"<td class='tabelinha' style='text-align:center'><b>$aprovacao[$i]</b></td>";}?></tr>
								<tr><td class="tabelinha">Reprovações</td><?php for($i=1;$i<=$qtd_periodos;++$i) {echo"<td class='tabelinha' style='text-align:center'><b>$reprovacao[$i]</b></td>";}?></tr>
							</table>
                                                    </div>
							<div id='container' style='width:480px; height:300px; margin: 2px auto; display:block;'></div>
						</div>
					</td>
					<td class="tabelona">
						<div style="margin: 0px; width: 490px;">
                                                    <div style="background:#EEE; width: 470px; margin: 0 auto; padding-left: 5px; padding-right: 5px; border:2px solid blueviolet; border-radius: 7px;">
                                                        <table class="tabelinha" style="margin: auto; margin-top: 10px; margin-bottom: 10px;">
								<tr><td class='tabelinha'> </td><?php for($i=1;$i<=$qtd_periodos;++$i) {echo"<td class='tabelinha'><b> &nbsp; &nbsp;$i º&nbsp; &nbsp;</b></td>";}?></tr>
								<tr><td class='tabelinha'>CR/período</td><?php for($i=1;$i<=$qtd_periodos;++$i) {echo"<td class='tabelinha' style='text-align:center'><b>$cr_parcial[$i]</b></td>";}?></tr>
								<tr><td class='tabelinha'>CR</td><?php for($i=1;$i<=$qtd_periodos;++$i) {echo"<td class='tabelinha' style='text-align:center'><b>$cr_total[$i]</b></td>";}?></tr>
							</table>
                                                    </div>
							<div id='container2' style='width:480px; height:300px; margin: 2px auto; display:block;'></div>
						</div>
					</td>
				</tr>
			</table>
		</div>
                <div style="height:50px"></div>
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