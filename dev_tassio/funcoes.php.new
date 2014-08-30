<script src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery.xdomainajax.js"></script>
<script type="text/javascript" src="js/jquery-latest.pack.js"></script>
<script type="text/javascript" src="js/jquery.jcarousellite.js"></script>
<script type="text/javascript" src="js/js-image-slider.js"></script>
<script>
	function getComboA(sel,prof) {
		var value = sel.options[sel.selectedIndex].value;
		location.href="http://caime.com.br/resultados.php?id="+prof+"&disciplina="+value;
	}
	function getComboB(sel) {
		var value = sel.options[sel.selectedIndex].value;
		location.href="http://caime.com.br/resultados2.php?idProfessorDisciplina="+value;
	}
	function ler_artigo(id){
		alert("ler artigo");
	/*	$.ajax({url:'artigo.php',cache:false,success:function(){
			$('#conteudo').load('artigo.php?id='+id);
		});*/
		
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
			document.getElementById("conteudo").innerHTML=xmlhttp.responseText;
			}
		  }
		xmlhttp.open("GET","artigo.php?id="+id,true);
		xmlhttp.send();
	}
</script>
<script>
	function professores(dep){
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
			document.getElementById("conteudo").innerHTML=xmlhttp.responseText;
			}
		  }
		xmlhttp.open("GET","professores.php?dep="+dep,true);
		xmlhttp.send();
	}
</script>
		<script>
			function sub_pag(x){
				document.getElementById('sub_pag1').style.display='none';		
				document.getElementById('sub_pag2').style.display='none';				
				document.getElementById('sub_pag3').style.display='none';		
				document.getElementById('sub_pag4').style.display='none';						
				document.getElementById('sub_pag5').style.display='none';				
				
				document.getElementById('sub_pag'+x).style.display='block';
			}
		</script>
		<script>
			function newDoc(){
				var mat=document.getElementById("mat");
				var senha=document.getElementById("senha");
				alert(mat.value+"   "+senha.value);
				window.location.assign("https://www.alunoonline.uerj.br/requisicaoaluno/requisicao.php?requisicao=DisciplinasRealizadas&matricula="+mat.value+"&senha="+senha.value);
			}					
		</script>
		<script>
			$(document).ready(function(){
			
			  $("#noticias").click(function(){
				$.ajax({url:"noticias.php",cache:false,success:function(){
				  $("#conteudo").load('noticias.php');
				}});
			  });
			  $("#calendario").click(function(){
				$.ajax({url:"calendario.html",cache:false,success:function(){
				  $("#conteudo").load('calendario.html');
				}});
			  });
			  $("#monitoria").click(function(){
				$.ajax({url:"monitoria.html",cache:false,success:function(){
				  $("#conteudo").load('monitoria.html');
				}});
			  });			  
			  $("#tour").click(function(){
				$.ajax({url:"tour.html",cache:false,success:function(){
				  $("#conteudo").load('tour.html');
				}});
			  });			
		
		
		
			  $("#matematica").click(function(){
				$.ajax({url:"grad_matematica(licenciatura).html",cache:false,success:function(){
				  $("#superconteudo").css("height","850px");
				  $("#conteudo").load('grad_matematica(licenciatura).html');
				}});
			  });
			  $("#matematica2").click(function(){
				$.ajax({url:"grad_matematica(bacharelado).html",cache:false,success:function(){
				  $("#superconteudo").css("height","2100px");
				  $("#conteudo").load('grad_matematica(bacharelado).html');
				}});
			  });
			  $("#estatistica").click(function(){
				$.ajax({url:"grad_estatistica.html",cache:false,success:function(){
				  $("#superconteudo").css("height","2150px");
				  $("#conteudo").load('grad_estatistica.html');
				}});
			  });
			  $("#computacao").click(function(){
				$.ajax({url:"grad_ciencia_da_computacao.html",cache:false,success:function(){
				  $("#superconteudo").css("height","2800px");
				  $("#conteudo").load('grad_ciencia_da_computacao.html');
				}});
			  });
			  $("#atuaria").click(function(){
				$.ajax({url:"grad_ciencias_atuariais.html",cache:false,success:function(){
				  $("#superconteudo").css("height","2300px");
				  $("#conteudo").load('grad_ciencias_atuariais.html');
				}});
			  });


			  
			  $("#fluxograma").click(function(){
				$.ajax({url:"fluxograma.php",cache:false,success:function(){
					$("#conteudo").load('fluxograma.php');
				}});
			  });
			  $("#rendimento").click(function(){
				$.ajax({url:"rendimento.php",cache:false,success:function(){
					$("#conteudo").load('rendimento.php');
				}});
			  });
			  $("#gerador").click(function(){
				$.ajax({url:"gerador.php",cache:false,success:function(){
					$("#conteudo").load('gerador.php');
				}});
			  });
			  $("#rid").click(function(){
				$.ajax({url:"rid.php",cache:false,success:function(){
					$("#conteudo").load('rid.php');
				}});
			  });	

			  
			  
			  $("#manual").click(function(){
				$.ajax({url:"manual_do_aluno.html",cache:false,success:function(){
					$("#conteudo").load('manual_do_aluno.html');
				}});
			  });
			  $("#hierarquia").click(function(){
				$.ajax({url:"hierarquia.html",cache:false,success:function(){
					$("#conteudo").load('hierarquia.html');
				}});
			  });			  
			  $("#setores").click(function(){
				$.ajax({url:"setores.html",cache:false,success:function(){
					$("#conteudo").load('setores.html');
				}});
			  });			  
			  $("#departamento").click(function(){
				$.ajax({url:"departamento.html",cache:false,success:function(){
					$("#conteudo").load('departamento.html');
				}});
			  });			  
			  
			  $(".graduacao").click(function(){
				$.ajax({url:"manual_do_aluno.html",cache:false,success:function(){
				  $("#superconteudo").css("height","2300px");
				  
				  $("#menu_ime").css("display","none");
				  $("#menu_graduacao").css("display","block");
				  $("#menu_aluno").css("display","none");
				  $("#menu_professores").css("display","none");
				  $("#menu_uerj").css("display","none");
				  
				  $("#conteudo").load('manual_do_aluno.html');
				}});
			  });
			  $(".aluno").click(function(){
				$.ajax({url:"manual_do_aluno.html",cache:false,success:function(){
				  $("#superconteudo").css("height","2300px");
				  
				  $("#menu_ime").css("display","none");
				  $("#menu_graduacao").css("display","none");
				  $("#menu_aluno").css("display","block");
				  $("#menu_professores").css("display","none");
				  $("#menu_uerj").css("display","none");
				  
				  $("#conteudo").load('manual_do_aluno.html');
				}});
			  });
			  $(".professores").click(function(){
				$.ajax({url:"professores.php",cache:false,success:function(){
				  
				  $("#conteudo").load('professores.php');
				  
				  $("#menu_ime").css("display","none");
				  $("#menu_graduacao").css("display","none");
				  $("#menu_aluno").css("display","none");
				  $("#menu_professores").css("display","block");
				  $("#menu_uerj").css("display","none");
				}});
			  });
			  $(".uerj").click(function(){
				$.ajax({url:"manual_do_aluno.html",cache:false,success:function(){
				  $("#superconteudo").css("height","2300px");
				  
				  $("#menu_ime").css("display","none");
				  $("#menu_graduacao").css("display","none");
				  $("#menu_aluno").css("display","none");
				  $("#menu_professores").css("display","none");
				  $("#menu_uerj").css("display","block");
				  
				  $("#conteudo").load('manual_do_aluno.html');
				}});
			  });			  
			  
			});
		</script>	