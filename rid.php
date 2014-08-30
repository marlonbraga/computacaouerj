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
				$('.NumPeriodo').click(function(){
					//alert($(this).val());
					for(var numPeriodo=0; numPeriodo<20; numPeriodo++){
						$(".periodo"+numPeriodo).slideTougle();
					};
				});
			});
		</script>
	    <script type="text/javascript">
			window.onload = function(){
				parent.document.getElementById("conteudo").height = document.getElementById("pagina").scrollHeight + 35;
				var manha = document.getElementById('manha').innerHTML;
				var tarde = document.getElementById('tarde').innerHTML;
				var noite = document.getElementById('noite').innerHTML;
				if(manha==0)  $("#quadro1").slideToggle();
				if(tarde==0)  $("#quadro2").slideToggle();
				if(noite==0)  $("#quadro3").slideToggle();
			}
			function MostrarEsconder(turno){
				$("#quadro"+turno).slideToggle();
			}
		</script>
		<style>
			#pagina{
				background-color:#111111;
				color:#FFFFFF;
				font-family:Helvetica,Arial,sans-serif;
				font-size:15px;
				font-weight:900;				
			}
			table{
				margin:auto;
			}
			#quadro{
				margin-bottom:60px;
			}
			#titulo{
				background-color:#222;
				color:#EEE;
				font-size:20px;
				font-weight:600;
				text-align:center;
				width:90px;
				border:1px solid #222;
			}
			.subtitulo{
				background-color:#222;
				color:#EEE;
				font-size:15px;
				font-weight:900;
				text-align:center;
				
			}
			#dados{
				background-color:#333;
				color:#EEE;
				font-size:10.5px;
				font-weight:600;
				text-align:center;
				width:90px;
				height:30px;
				overflow:hidden;
				padding:1px;
			}
			#dadosGrandes{
				background-color:#333;
				color:#EEE;
				font-size:18px;
				font-weight:600;
				text-align:left;
			}
			td{
				padding:0px;
			}
			.lacuna{
				background-color:#000;
				margin:auto;
				color:#EEE;
				height:15px;
				width:704px;
				text-align:center;
				border: 1px solid #222;
			}
		</style>
	</head>
	<body>
		<div class="conteudo" id="pagina" type="text/css" >
		<?php
			class Disciplina{
				public $nome="-";
				public $creditos=0;
				public $carga_horaria=0;
				public $ramificacao=0;
				public $turma=0;
			}/*
			class Horario{
				public $dia=0; //1->dom, 2->seg, 3->ter...
				public $tempo=0; //1->M1, 2->M2... 7->T1, 8->T2...
				public $disciplina=0;
			}*/		
			$Disciplinas=array();
			$Horario=array();
			for($j=0;$j<20;$j++){
				$Horario[$j]=array();
				for($i=0;$i<20;$i++){
					$Horario[$j][$i]["status"]="";
					$Horario[$j][$i]["nome"]="";
				}
			}
			$str="vazio";
			if(isset($_REQUEST['CacheRID2'])){
				$str=$_REQUEST['CacheRID2'];
			}
			else{
				$str=" não chegou nenhuma REQUEST";
			}
			$str=explode("\r\n",$str);
		?>
		<script src="http://code.highcharts.com/highcharts.js"></script>
		<script src="http://code.highcharts.com/modules/exporting.js"></script>
		<?php
			function dia2num($str){
				$num=0;
				if(strpos($str,'Dom') !== false){$num=1;}
				else if(strpos($str,'Seg') !== false){$num=2;}
				else if(strpos($str,'Ter') !== false){$num=3;}
				else if(strpos($str,'Qua') !== false){$num=4;}
				else if(strpos($str,'Qui') !== false){$num=5;}
				else if(strpos($str,'Sex') !== false){$num=6;}
				else if(strpos($str,'Sab') !== false){$num=7;}
				return $num;
			}
			function tempo2num($str){
				$num=0;
					 if($str=="07:00 - 07:50"){$num=1;}	//M1
				else if($str=="07:50 - 08:40"){$num=2;} //M2
				else if($str=="08:50 - 09:40"){$num=3;} //M3
				else if($str=="09:40 - 10:30"){$num=4;} //M4
				else if($str=="10:40 - 11:30"){$num=5;} //M5
				else if($str=="11:30 - 12:20"){$num=6;} //M6
				
				else if($str=="12:30 - 13:20"){$num=7;}	//T1
				else if($str=="13:20 - 14:10"){$num=8;} //T2
				else if($str=="14:20 - 15:10"){$num=9;} //T3
				else if($str=="15:10 - 16:00"){$num=10;} //T4
				else if($str=="16:10 - 17:00"){$num=11;} //T5
				else if($str=="17:00 - 17:50"){$num=12;} //T6
			
				else if($str=="18:00 - 18:45"){$num=13;} //N1
				else if($str=="18:45 - 19:30"){$num=14;} //N2
				else if($str=="19:35 - 20:20"){$num=15;} //N3
				else if($str=="20:20 - 21:05"){$num=16;} //N4
				else if($str=="21:10 - 21:55"){$num=17;} //N5
				else if($str=="21:55 - 22:40"){$num=18;} //N6
				
				return $num;
			}
			function Num2Tempo($num){
				$tempo="";
				if ($num<=6) {$tempo="M".$num;}
				else if (($num>=7)&&($num<=12)) { $num-=6;  $tempo="T$num";}
				else if (($num>=13)&&($num<=18)){ $num-=12; $tempo="N$num";}			
				return $tempo;
			}
			function Num2Horario($num){
				$str=0;
					 if($num==1){$str="07:00 - 07:50";}	//M1
				else if($num==2){$str="07:50 - 08:40";} //M2
				else if($num==3){$str="08:50 - 09:40";} //M3
				else if($num==4){$str="09:40 - 10:30";} //M4
				else if($num==5){$str="10:40 - 11:30";} //M5
				else if($num==6){$str="11:30 - 12:20";} //M6
				
				else if($num==7){$str="12:30 - 13:20";}	//T1
				else if($num==8){$str="13:20 - 14:10";} //T2
				else if($num==9){$str="14:20 - 15:10";} //T3
				else if($num==10){$str="15:10 - 16:00";}//T4
				else if($num==11){$str="16:10 - 17:00";}//T5
				else if($num==12){$str="17:00 - 17:50";}//T6
			
				else if($num==13){$str="18:00 - 18:45";}//N1
				else if($num==14){$str="18:45 - 19:30";}//N2
				else if($num==15){$str="19:35 - 20:20";}//N3
				else if($num==16){$str="20:20 - 21:05";}//N4
				else if($num==17){$str="21:10 - 21:55";}//N5
				else if($num==18){$str="21:55 - 22:40";}//N6
				
				return $str;
			}
			$NumDisciplina=0;
			$NumAula=0;
			$DisciplinasAceitas=0;
			$DisciplinasRecusadas=0;
			$dia=0;
			$tempo=0;
			
			//Listar Vetor
			if(0)
			for($i=0;;$i++){
				$str[$i]=trim($str[$i]);
				$tam=strlen($str[$i]);
				if($tam>0)
				echo "<br>$tam | [$i] => <b>$str[$i]</b>";
				if(strlen(trim($str[$i+1]))==80){break;}
			}
			
		//	if(0)
			$status=1;
			for($i=131;$i<5000;){ //
				$NumDisciplina++;
				//echo"<p> [$NumDisciplina] i=$i</p>";
				$Disciplinas[$NumDisciplina]=new Disciplina();				
				$i+=10;	$Disciplinas[$NumDisciplina]->nome=trim($str[$i]);
				$i+=3;	$Disciplinas[$NumDisciplina]->creditos=trim($str[$i]);
				$i+=3;	$Disciplinas[$NumDisciplina]->carga_horaria=trim($str[$i]); 
				if(!(trim($str[$i+3]))) $i++;
				else{
				$i+=3;	$Disciplinas[$NumDisciplina]->ramificacao=trim($str[$i]);}
				$i+=3;	$Disciplinas[$NumDisciplina]->turma=trim($str[$i]);
						$Disciplinas[$NumDisciplina]->status=$status;
						if($status) $DisciplinasAceitas++;
						else $DisciplinasRecusadas++;
				$i-=17; 
				for($Auxiliar=$Disciplinas[$NumDisciplina]->carga_horaria;$Auxiliar>0;$Auxiliar-=15){
					$i+=20;	$dia=dia2num(trim($str[$i]));
					$i+=3;	$tempo=tempo2num(trim($str[$i]));
					$Horario[$dia][$tempo]["status"] = $Disciplinas[$NumDisciplina]->status;
					$Horario[$dia][$tempo]["nome"] = $Disciplinas[$NumDisciplina]->nome;
					if($Auxiliar!=15) if(!(strlen(trim($str[$i+20])))){break;}
				}
				if(strlen(trim($str[11+$i]))==39){$i+=12;$status=0;}
				$i+=60;
				$cont=trim($str[$i]);
				$tam=strlen($cont);
				if($tam==80)	break;
				else	$i-=60;
				
			}
			// EXIBIR RID
		//	if(0)
			echo"<div id='quadro'><table><tr><td id='titulo'>DISCIPLINAS</td><td id='titulo'>SITUAÇÃO</td></tr>";
			
			$DisciplinasAceitasCont=$DisciplinasAceitas;
                        $DisciplinasRecusadasCont=$DisciplinasRecusadas;
                        
                        $bunda=1;
                        $limite=$NumDisciplina;
                        
                        $i="<font style='text-align:center; padding-left: 25; color: rgb(0,200,0)'>Aceita</font>";
                        //for(;$bunda>0;$bunda--){
                        for(;$bunda<=$limite;$bunda++){
                            $j=$Disciplinas[$bunda]->nome;
                            if($bunda>$DisciplinasAceitasCont){$i="<font style='text-align:center; padding-left: 10; color: rgb(170,0,0)'>Recusada</font>";}
                            if($j != "") echo"<tr><td id='dadosGrandes'>$j</td><td id='dadosGrandes'>$i</td></tr>";
                        }
			echo"</table></div>";
			
			// EXIBIR GRADE DE HORÁRIO
			
			
			echo"<table><tr><td class='subtitulo'>Tempo:</td><td id='titulo'>SEG</td><td id='titulo'>TER</td><td id='titulo'>QUA</td><td id='titulo'>QUI</td id='titulo'><td id='titulo'>SEX</td><td id='titulo'>SÁB</td><td class='subtitulo' style='width:85px;'>Horário:</td></tr></table>";
			$manha=0;			
			$tarde=0;			
			$noite=0;			
		//	if(0)
			echo"<div id='lacuna1' class='lacuna' onClick='MostrarEsconder(1)'>...</div><div id='quadro1'><table>";
			for($j=1;$j<=6;$j++){
				echo"<tr>";
				for($i=1;$i<=8;$i++){
					//$z=$Disciplinas[$NumDisciplina]->nome;
					//$zz=$Disciplinas[$NumDisciplina]->status;
					if ((($i>1)&&($i<8))&&($Horario[$i][$j]["nome"]!="")) $manha=1;
					if ($Horario[$i][$j]["status"]){
						if(($i>1)&&($i<8)) {echo"<td><div id='dados' style='";
                                                    if(substr($Horario[$i][$j]["nome"],12)) {
                                                        echo" background:#235085; ";    
                                                        echo"'>".substr($Horario[$i][$j]["nome"],12)."</div></td>";
                                                    }
                                                }
						else echo" ";
                                        }
					else{
						if(($i>1)&&($i<8)){
                                                    echo"<td><div id='dados' style='";
                                                    if(substr($Horario[$i][$j]["nome"],12)) echo"";
                                                    echo"color:#880000;'>".substr($Horario[$i][$j]["nome"],12)."</div></td>";
                                                }
						else if($i==1) echo"<td class='subtitulo' style='width:53px;'>".Num2Tempo($j)."</td>";
						else if($i==8) echo"<td class='subtitulo' style='width:85px;'>".Num2Horario($j)."</td>";
						else echo"<td>+</td>";
                                        }
				}
				echo"</tr>";
			}
			echo"</table></div>
			<div id='lacuna2' class='lacuna' onClick='MostrarEsconder(2)'>...</div>
			<div id='quadro2' id='class'><table><!--<tr><td class='subtitulo'>Tempo:</td><td id='titulo'>SEG</td><td id='titulo'>TER</td><td id='titulo'>QUA</td><td id='titulo'>QUI</td id='titulo'><td id='titulo'>SEX</td><td id='titulo'>SÁB</td><td class='subtitulo'>Horário:</td></tr>-->";
			for($j=7;$j<=12;$j++){
				echo"<tr>";
				for($i=1;$i<=8;$i++){
					//$z=$Disciplinas[$NumDisciplina]->nome;
					//$zz=$Disciplinas[$NumDisciplina]->status;
					if ((($i>1)&&($i<8))&&($Horario[$i][$j]["nome"]!="")) $tarde=1;
					if ($Horario[$i][$j]["status"])
						if(($i>1)&&($i<8)) {echo"<td><div id='dados' style='";
                                                    if(substr($Horario[$i][$j]["nome"],12)) {
                                                        echo" background:#235085; ";    
                                                        echo"'>".substr($Horario[$i][$j]["nome"],12)."</div></td>";
                                                    }
                                                }
                                                else echo" ";
					else
						if(($i>1)&&($i<8)) echo"<td><div id='dados' style='color:#AA0000;'>".substr($Horario[$i][$j]["nome"],12)."</div></td>";
						else if($i==1) echo"<td class='subtitulo' style='width:53px;'>".Num2Tempo($j)."</td>";
						else if($i==8) echo"<td class='subtitulo' style='width:85px;'>".Num2Horario($j)."</td>";
						else echo"<td>+</td>";
				}
				echo"</tr>";
			}
			echo"</table></div>
			<div id='lacuna3' class='lacuna' onClick='MostrarEsconder(3)'> ... </div>
			<div id='quadro3' id='class'><table><!--<tr><td class='subtitulo'>Tempo:</td><td id='titulo'>SEG</td><td id='titulo'>TER</td><td id='titulo'>QUA</td><td id='titulo'>QUI</td id='titulo'><td id='titulo'>SEX</td><td id='titulo'>SÁB</td><td class='subtitulo'>Horário:</td></tr>-->";
			for($j=13;$j<=18;$j++){
				echo"<tr>";
				for($i=1;$i<=8;$i++){
					//$z=$Disciplinas[$NumDisciplina]->nome;
					//$zz=$Disciplinas[$NumDisciplina]->status;
					if ((($i>1)&&($i<8))&&($Horario[$i][$j]["nome"]!="")) $noite=1;
					if ($Horario[$i][$j]["status"])
						if(($i>1)&&($i<8)) {echo"<td><div id='dados' style='";
                                                    if(substr($Horario[$i][$j]["nome"],12)) {
                                                        echo" background:#235085; ";    
                                                        echo"'>".substr($Horario[$i][$j]["nome"],12)."</div></td>";
                                                    }
                                                }else echo" ";
					else
						if(($i>1)&&($i<8)) echo"<td><div id='dados' style='color:#880000;'>".substr($Horario[$i][$j]["nome"],12)."</div></td>";
						else if($i==1) echo"<td class='subtitulo' style='width:53px;'>".Num2Tempo($j)."</td>";
						else if($i==8) echo"<td class='subtitulo' style='width:85px;'>".Num2Horario($j)."</td>";
						else echo"<td>+</td>";
				}
				echo"</tr>";
			}
			echo"</table></div>";
			echo"<div style='display:none'><div id='manha'>$manha</div><div id='tarde'>$tarde</div><div id='noite'>$noite</div></div>";
		?>	
		
	</body>
</html>