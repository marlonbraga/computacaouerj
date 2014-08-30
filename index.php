<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <!--
    
    Desenvolvido por:
           Marlon Dantas Braga
    Apoio:
           Bruno Menezes
           Fellipe Calleia
           Gabriel Oliveira
           Programador Anônimo
    -->
    <head>
        <!-- Scripts Javascript -->
        <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="js/jquery.xdomainajax.js"></script>
        <script src="/js/highcharts.js" type="text/javascript"></script>
        <script type="text/javascript">
            function mudar_pag(alvo){
                if (alvo == 'inicial')          document.forms["alunoonline"].action = 'inicial.php';
                if (alvo == 'historico')	document.forms["alunoonline"].action = 'rendimento.php';
                if (alvo == 'fluxograma')	document.forms["alunoonline"].action = 'fluxograma.php';
                if (alvo == 'sintese')		document.forms["alunoonline"].action = 'sintese.php';
                if (alvo == 'rid')		document.forms["alunoonline"].action = 'rid.php';
                if (alvo == 'gerador')		document.forms["alunoonline"].action = 'em_breve.php';
                if (alvo == 'loja')		document.forms["alunoonline"].action = 'loja.php';
                window.location.href = '#menu';
                document.forms["alunoonline"].submit();
            }
            function onBlur(el) {
                if (el.value == '') {
                    el.value = el.defaultValue;
                    if (el.id=='senha'){
                        el.type = 'text';
                    }
                    document.getElementById(el.id).style.color="#555";
                    //document.getElementById(el.id).style.text-align="center";
                }else{
                    document.getElementById(el.id).style.color="#00DD00";
                }
            }
            function onFocus(el) {
                if (el.value == el.defaultValue) {
                    el.value = '';
                }
                if (el.id=='senha'){
                    el.type = 'password';
                }
                document.getElementById(el.id).style.color="#00DD00";

            }
        </script>
        <script type="text/javascript">
            $(document).ready(function(){
                //alert("Funcionalidades Fora do Ar no momento. Tenha paciência. Já estamos consertando ;-)");
                document.getElementById("terminal").innerHTML+="<br>$> Pagina inicial CARREGADA";
                /*$("#terminal").change(function(){
                        var objScrDiv = document.getElementById("terminal"); 
                        objScrDiv.scrollTop = objScrDiv.scrollHeight;
                });*/
                var nav = $('.menu');
                $(window).scroll(function () {
                    if ($(this).scrollTop() > 156) {
                        nav.addClass("f-nav");
                    } else {
                        nav.removeClass("f-nav");
                    }
                });
                $("#sair").click(function(){
                    window.location.href = 'http://www.computacaouerj.com.br';  
                    /*
                    $('#terminal').attr({scrollTop: $('#terminal').attr('scrollHeight')});  
                    document.getElementById("conteudo").style.display="none";		
                    document.getElementById("identificacao").style.display="none";	
                    document.getElementById("inicio").style.display="block";	
                    document.getElementById("login").style.display="block";		
                    //document.getElementById("menu").style.display="none";*/		
                });
                $("#acessar").click(function(){
                    $('#terminal').attr({scrollTop: $('#terminal').attr('scrollHeight')});  
                    document.getElementById("terminal").innerHTML+="<br>$> Isso pode demorar um pouco...";
                    document.getElementById("terminal").innerHTML+="<br>$> Conectando ALUNO ONLINE...";
                    document.getElementById('loading').style.display = "block";
                    document.getElementById('login').style.display = "none";
                    site1 = "http://www.alunoonline.uerj.br/requisicaoaluno/requisicao.php?requisicao=SinteseFormacao&matricula="+$('#mat').val()+"&senha="+$('#senha').val();
                    site2 = "http://www.alunoonline.uerj.br/requisicaoaluno/requisicao.php?requisicao=DisciplinasRealizadas&matricula="+$('#mat').val()+"&senha="+$('#senha').val();
                    site3 = "https://www.alunoonline.uerj.br/disemcur/disemcur.php?nome=Tassio%20Braga%20Ludolf%20Reis&matricula=201110043211&periodo_letivo=2014%2F1&flg_logado=%40FLG_LOGADO%40"; //Daniel Henrique da Silva Costa
                    site4 = "http://www.alunoonline.uerj.br/requisicaoaluno/requisicao.php?requisicao=RID&matricula="+$('#mat').val()+"&senha="+$('#senha').val();
                    var elemento1 = "CacheSintese";
                    var elemento2 = "CacheHistorico";
                    var elemento3 = "CacheNotas";
                    var elemento4 = "CacheRID";
                    var str="";
                    var cont=0;
                    var headline;
                    function espelhar_dados(site, elemento){
                        document.getElementById("terminal").innerHTML+="<br>"+elemento+"$> :: Carregamento iniciado...";
                        $.ajax({
                            url: site,
                            type: 'GET',
                            success: function(res) {
                                headline = $(res.responseText).text();
                                $("#"+elemento).html(headline);	
                                str=document.getElementById(elemento).innerHTML;
                                document.getElementById(elemento+"2").innerHTML=str;
                                if (str!=""){
                                    document.forms["alunoonline"].submit();
                                    document.getElementById("terminal").innerHTML+="<br>"+elemento+"$> :: Carregamento concluído!";
                                    document.getElementById("inicio").style.display="none";
                                    document.getElementById("conteudo").style.display="block";
                                    document.getElementById("identificacao").style.display="block";		
                                    document.getElementById("login").style.display="none";	
                                    //document.getElementById("menu").style.display="block";	
                                }else{
                                    if(cont<10){
                                        cont++;
                                        document.getElementById("terminal").innerHTML+="<br>"+elemento+"$> :: Deu erro!";
                                        document.getElementById("terminal").innerHTML+="<br>"+elemento+"$> :: Tentativa nº:"+cont+" "+str;
                                        $('#terminal').attr({scrollTop: $('#terminal').attr('scrollHeight')});  
                                        espelhar_dados(site, elemento);
                                    }else{
                                        //document.getElementById('loading').style.visibility = 'hidden'
                                        document.getElementById("terminal").innerHTML+="<br>"+elemento+"$> :: Aluno online está de frescura<br>Por favor tente mais tarde";
                                        $('#terminal').attr({scrollTop: $('#terminal').attr('scrollHeight')});
                                        alert("Aluno online está de frescura<br>Por favor tente mais tarde");
                                    }
                                }
                            }
                        },function(){		
                        });
                        return 0;
                    }
                    espelhar_dados(site1, elemento1);
                    espelhar_dados(site2, elemento2);
                    //espelhar_dados(site3, elemento3);
                    espelhar_dados(site4, elemento4);
                    document.getElementById("terminal").innerHTML+="<br>"+elemento+"$> :: ";
                });
            });
        </script>
        <style>
            body {
                background-color:#000;
                background-image:url("imagens/Fundo10.jpg");
                background-repeat:repeat;
                margin:0px;
            }
            .f-nav{
                z-index: 9999;
                position: fixed;
                top: 0;
                width: 1000px;
                margin: auto;
            }
            #body {
                background-color:#111;
                background: rgba(0, 0, 0, 0.9);
                background-repeat:repeat;
                font-family:Helvetica,Arial,sans-serif;

            }
            #mat{
                background-color:#222;
                color:#555;
                text-align:center;
                font-family:Helvetica,Arial,sans-serif;
            }
            #senha{
                background-color:#222;
                color:#555;
                text-align:center;
                font-family:Helvetica,Arial,sans-serif;
            }
            #tudo{
                background-color:#111;
                width: 1000px;
                margin:auto;
                border:2.5px solid #d0d0d0;
                border-radius:10px;
                opacity:0.97;
                margin-top:5px;
            }
            #links{
                background-color:#111;
                color:#BBB;
                width: 1000px;
                margin:auto;
                margin-top:20px;
                border:2.5px solid #d0d0d0;
                border-radius:10px;
                opacity:0.97;
                text-align:center;
                font-size:12px;
                font-weight:600;
                padding-bottom:15px;
                padding-top:15px;
            }
            .link{
                width: 240px;
                height: 140px;
                margin:auto;
                border:2px solid #d0d0d0;
                border-radius:5px;
            }
            #capa{
                background-color:#111;
                background-image:url("imagens/capa2.jpg");
                background-repeat:no-repeat;
                background-position:left top;
                height: 120px;
            }
            #menu{	
                display:block;
            }
            #login{
                background-color:#111;
                color:#EEE;
                text-align:center;
                padding-top: 150px;
                display:block;
            }
            #identificacao{
                background-color:#111;
                color:#DDD;
                display:none;
                height:50px;
                text-align:center;
                font-family:Helvetica,Arial,sans-serif;
                font-size:20px;
                font-weight:600;
            }
            #informacao{
                background-color:#111;
                color:#FFFFFF;
                display:none;
            }
            #inicio{
                display:block;
                margin-top:50px;
            }
            #terminal{
                background-color:#111;
                color:#EEE;
                border: 5px;
                height: 250px;
                width: 600px;
                padding-left: 40px;
                padding-right: 40px;
                overflow:auto;
                display:none;
                
            }
            #loading{
                border: 5px;
                width: 600px;
                margin: auto;
                display:none;
                text-align:center;
                
            }
            #likebox{
                margin:auto;
            }
            #conteudo{
                background-color:#111;
                color:#EEE;
                display:none;
            }	  
            #creditos{
                color:#009900;
                font-family:Helvetica,Arial,sans-serif;
                font-size:15px;
                font-weight:300;
                text-align: center;
                text-shadow: 1px 0px 0px black, 
                    -1px 0px 0px black, 
                    0px 1px 0px black, 
                    0px -1px 0px black;
            }
            .classname {
                    -moz-box-shadow:inset 0px 1px 8px 3px #dcecfb;
                    -webkit-box-shadow:inset 0px 1px 8px 3px #dcecfb;
                    box-shadow:inset 0px 1px 8px 3px #dcecfb;
                    background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #bddbfa), color-stop(1, #80b5ea) );
                    background:-moz-linear-gradient( center top, #bddbfa 5%, #80b5ea 100% );
                    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#bddbfa', endColorstr='#80b5ea');
                    background-color:#bddbfa;
                    -webkit-border-top-left-radius:7px;
                    -moz-border-radius-topleft:7px;
                    border-top-left-radius:7px;
                    -webkit-border-top-right-radius:7px;
                    -moz-border-radius-topright:7px;
                    border-top-right-radius:7px;
                    -webkit-border-bottom-right-radius:7px;
                    -moz-border-radius-bottomright:7px;
                    border-bottom-right-radius:7px;
                    -webkit-border-bottom-left-radius:7px;
                    -moz-border-radius-bottomleft:7px;
                    border-bottom-left-radius:7px;
                    text-indent:0;
                    border:2px solid #84bbf3;
                    display:inline-block;
                    color:#ffffff;
                    font-family:Arial;
                    font-size:15px;
                    font-weight:bold;
                    font-style:normal;
                    height:40px;
                    line-height:40px;
                    width:200px;
                    text-decoration:none;
                    text-align:center;
                    text-shadow:1px 1px 50px #528ecc;
            }
            .classname:hover {
                    background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #80b5ea), color-stop(1, #bddbfa) );
                    background:-moz-linear-gradient( center top, #80b5ea 5%, #bddbfa 100% );
                    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#80b5ea', endColorstr='#bddbfa');
                    background-color:#80b5ea;
            }.classname:active {
                    position:relative;
                    top:1px;
            }
            /* This button was generated using CSSButtonGenerator.com */
            div.bottombar{ /* bar that runs across the bottom of the menu */
                height: 10px;
                background: #0F3819;
            }
            ul.semiopaquemenu{ /* main menu UL */
                font: bold 14px Georgia ;
                width: 100%;
                background: #b1e958;
                padding: 11px 0 8px 0; /* padding of the 4 sides of the menu */
                margin: 0;
                text-align: left; /* set value to "left", "center", or "right" to align menu accordingly */
            }
            ul.semiopaquemenu li{
                display: inline;
            }
            ul.semiopaquemenu li a{
                color:black;
                padding: 6px 8px 6px 8px; /* padding of the 4 sides of each menu link */
                margin-right: 15px; /* spacing between each menu link */
                text-decoration: none;
            }
            ul.semiopaquemenu li a:hover, ul.semiopaquemenu li a.selected{
                color: black;
                background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgc3RvcC1vcGFjaXR5PSIwLjgyIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZmZmZmYiIHN0b3Atb3BhY2l0eT0iMC4xNiIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+); /* IE9+ SVG equivalent  of linear gradients */
                background: -moz-linear-gradient(top,  rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.16) 100%); /* fade from white (0.82 opacty) to 0.16 opacity */
                background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,0.82)), color-stop(100%,rgba(255,255,255,0.16)));
                background: -webkit-linear-gradient(top,  rgba(255,255,255,0.82) 0%,rgba(255,255,255,0.16) 100%);
                background: -o-linear-gradient(top,  rgba(255,255,255,0.82) 0%,rgba(255,255,255,0.16) 100%);
                background: -ms-linear-gradient(top,  rgba(255,255,255,0.82) 0%,rgba(255,255,255,0.16) 100%);
                background: linear-gradient(top,  rgba(255,255,255,0.82) 0%,rgba(255,255,255,0.16) 100%);
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d1ffffff', endColorstr='#29ffffff',GradientType=0 );
                -moz-box-shadow: 0 0 5px #595959; /* CSS3 box shadows */
                -webkit-box-shadow: 0 0 5px #595959;
                box-shadow: 0 0 5px #595959;
                padding-top: 12px; /* large padding to get menu item to protrude upwards */
                padding-bottom: 20px; /* large padding to get menu item to protrude downwards */
            }
        </style>
<style type="text/css">
.classname {
	-moz-box-shadow:inset 0px 1px 0px 0px #c1ed9c;
	-webkit-box-shadow:inset 0px 1px 0px 0px #c1ed9c;
	box-shadow:inset 0px 1px 0px 0px #c1ed9c;
	background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #9dce2c), color-stop(1, #8cb82b) );
	background:-moz-linear-gradient( center top, #9dce2c 5%, #8cb82b 100% );
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#9dce2c', endColorstr='#8cb82b');
	background-color:#9dce2c;
	-webkit-border-top-left-radius:10px;
	-moz-border-radius-topleft:10px;
	border-top-left-radius:10px;
	-webkit-border-top-right-radius:10px;
	-moz-border-radius-topright:10px;
	border-top-right-radius:10px;
	-webkit-border-bottom-right-radius:10px;
	-moz-border-radius-bottomright:10px;
	border-bottom-right-radius:10px;
	-webkit-border-bottom-left-radius:10px;
	-moz-border-radius-bottomleft:10px;
	border-bottom-left-radius:10px;
	text-indent:0;
	border:2px solid #83c41a;
	display:inline-block;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	font-style:normal;
	height:40px;
	line-height:40px;
	width:200px;
	text-decoration:none;
	text-align:center;
	text-shadow:1px 1px 0px #689324;
}
.classname:hover {
	background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #8cb82b), color-stop(1, #9dce2c) );
	background:-moz-linear-gradient( center top, #8cb82b 5%, #9dce2c 100% );
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#8cb82b', endColorstr='#9dce2c');
	background-color:#8cb82b;
}.classname:active {
	position:relative;
	top:1px;
}</style>
        <title>COMPUTAÇÃO-UERJ</title>
    </head>
    <body>
        <div id="body">
            <br>
            <div id="fb-root"></div>
            <script>(function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/pt_BR/all.js#xfbml=1";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));</script>
             <div id='tudo'>
                <div id='capa'>

                </div>
                <div name='menu' class='menu' id='menu'>
                    <ul class="semiopaquemenu">
                       <!-- <li class="current"><a id='inicial' class='linkMenu' class="selected" href="http://www.computacaouerj.com.br">Home</a></li>
                      -->  <li class="current"><a id='sintese' class='linkMenu' onclick="mudar_pag('sintese')" href="#menu">Síntese de Formação</a></li>
                        <li><a id='historico' class='linkMenu' onclick="mudar_pag('historico')" href="#menu">Histórico</a></li>
                        <li><a id='rid' class='linkMenu' onclick="mudar_pag('rid')" href="#menu">RID</a></li>
                        <li><a id='fluxograma' class='linkMenu' onclick="mudar_pag('fluxograma')" href="#menu">Fluxograma</a></li>
                        <li><a id='gerador' class='linkMenu' onclick="mudar_pag('gerador')" href="#menu">Gerador de Grades</a></li>
                    <!--    <li><a id='loja' class='linkMenu' onclick="mudar_pag('loja')" href="#menu">Loja</a></li>-->
                    </ul>
                    <div class="bottombar"></div>
                </div>
                <div id='login'><br>
                        <input type="text" id="mat" onblur="onBlur(this)" onfocus="onFocus(this)" style="width:200px; height:30px;margin-bottom: 10px;" maxlength="13" value="- MATRÍCULA -" /></br>
                        <input type="text" id="senha" onblur="onBlur(this)" onfocus="onFocus(this)" style="width:200px; height:30px;margin-bottom: 10px;" value="- SENHA -"/></br>
                        <a href="#" id="acessar" class="classname">ACESSAR</a>
                </div>
                <div id='identificacao'>
                    <div><font style="display:none;" id='indexMatricula'></font> <font id='indexNome'></font> - <font id='indexCurso'></font> <button id="sair">LOGOUT</button></div>
                </div>
                <div id='informacao'>
                    <form id="alunoonline" name="alunoonline" action="sintese.php" method="post" target="conteudo">
                        <div type='text' style="background:#EEF0A6" name='CacheSintese' id='CacheSintese'>¨¨¨</div>
                        <div type='text' style="background:#EED0A6" name='CacheHistorico' id='CacheHistorico'>¨¨¨</div>
                        <div type='text' style="background:#EEB0A6" name='CacheNotas' id='CacheNotas'>***</div>
                        <div type='text' style="background:#EE90A6" name='CacheRID' id='CacheRID'>***</div>
                        <div style="visibility:hidden;"><textarea id="CacheSintese2" name="CacheSintese2" style="background:#FEF0A6">Aluno Online <!-- A.LINKNAOSUB { text-decoration: none; color: #000066;} .LINKNAOSUBB { color: #FFFFFF; text-decoration: none;} .linalt2 { line-height: 15px; top-margin: 15px;} --> Síntese da Formação    201110252811 - Marlon Dantas Braga                  Dados somente para consulta. Não vale como documento oficial. Situação: Vinculado Curso: Ciência da Computação C.R. Acumulado: 7,13 Dados da Formação Titulação: Bacharel Mês e Ano da Conclusão: --/---- Data da Colação: --/--/----   INCOMPLETO.     Versão Curricular: 1 - Currículo de Ciência da Computação - 2009 Regime: Crédito   Síntese do Aproveitamento Acadêmico Requisitos Curriculares da Formação   Cumpridos   A Cumprir   Situação       Créditos em Disciplinas Obrigatórias   140   37   Incompleto Créditos em Disciplinas Eletivas   8   12   Incompleto   Estrutura Curricular   Obtidos   Exigidos   Situação       RAMIFICAÇÃO: 626 - Ciência da Computação                  Grupo de Obrigatórias   140   177   Incompleto      Grupo de Eletivas: Rest. Técnicas/Práticas/Compl.   4   16   Incompleto      Grupo de Eletivas: Restritas Básicas   4   4   Concluído   Obs.: Obtidos / Exigidos - valores em créditos para cursos de regime de crédito e em carga horária para cursos de regime de seriado, exceto para a categoria de atividades onde o tipo do valor está descrito na própria linha. Resumo de Períodos Letivos Mínimo de Períodos para Integralização Curricular: 08 Máximo de Períodos para Integralização Curricular: 16 Períodos Utilizados/Em Uso para Integralização Curricular: 07 Períodos Restantes para Integralização Curricular: 09   © 2012, Universidade do Estado do Rio de Janeiro. Todos os Direitos Reservados.</textarea></div>
                        <div style="visibility:hidden;"><textarea id="CacheHistorico2" name="CacheHistorico2" style="background:#FEF0A6">Aluno Online <!-- A.LINKNAOSUB { text-decoration: none; color: #000066;} .LINKNAOSUBB { color: #FFFFFF; text-decoration: none;} .linalt2 { line-height: 15px; top-margin: 15px;} --> Disciplinas Realizadas    201110252811 - Marlon Dantas Braga                  Disciplinas Realizadas Período Disciplina Crd. CH   Tipo Freq. Nota Situação 2011/1   Cálculo I   6   90   Obrigatória   93%   7,30   Aprov. Nota     Álgebra   4   60   Obrigatória   60%   1,80   Reprov. Freq.     Geometria Analítica   4   60   Obrigatória   0%   0,00   Reprov. Freq.     Fundamentos da Computação   5   90   Obrigatória   83%   9,60   Aprov. Nota     Matemática Discreta   4   60   Obrigatória   93%   6,00   Aprov. Nota       2011/2   Física I   5   90   Obrigatória   100%   4,40   Reprov. Nota     Cálculo II   4   60   Obrigatória   100%   2,80   Reprov. Nota     Geometria Analítica   4   60   Obrigatória   100%   7,50   Aprov. Nota     Algoritmos e Estruturas de Dados I   6   90   Obrigatória   100%   6,30   Aprov. Nota     Linguagem de Programação I   4   60   Obrigatória   76%   7,20   Aprov. Nota     Cálculo das Probabilidades   4   60   Obrigatória   66%   2,18   Reprov. Freq.       2012/1   Português Instrumental   4   60   Obrigatória   100%   10,00   Aprov. Nota     Cálculo II   4   60   Obrigatória   100%   7,50   Aprov. Nota     Elementos de Lógica   4   60   Obrigatória   100%   7,00   Aprov. Nota     Algoritmos e Estruturas de Dados II   4   60   Obrigatória   100%   7,90   Aprov. Nota     Linguagem de Programação II   4   60   Obrigatória   86%   7,00   Aprov. Nota     Teoria da Computação   4   60   Obrigatória   100%   10,00   Aprov. Nota     Arquitetura de Computadores I   4   60   Obrigatória   100%   8,70   Aprov. Nota       2012/2   Ling Inglesa Instr p/Leitura na Ciência da Computação   4   60   E. Restrita   95%   8,58   Aprov. Nota     Cálculo III   4   60   Obrigatória   100%   10,00   Aprov. Nota     Cálculo IV   6   90   Obrigatória   88%   7,80   Aprov. Nota     Álgebra Linear   6   90   Obrigatória   100%   7,41   Aprov. Nota     Cálculo Numérico   4   60   Obrigatória   100%   10,00   Aprov. Nota     Arquitetura de Computadores II   4   60   Obrigatória   100%   7,40   Aprov. Nota     Algoritmos em Grafos   3   45   Obrigatória   100%   9,30   Aprov. Nota     Cálculo das Probabilidades   4   60   Obrigatória   100%   5,50   Aprov. Nota       2013/1   Engenharia de Software   4   60   Obrigatória   83%   5,00   Aprov. Nota     Banco de Dados I   4   60   Obrigatória   90%   8,90   Aprov. Nota     Estruturas de Linguagens   4   60   Obrigatória   100%   5,90   Aprov. Nota     Sistemas Operacionais I   4   60   Obrigatória   86%   7,70   Aprov. Nota     Arquiteturas Avançadas de Computadores   4   60   Obrigatória   80%   8,20   Aprov. Nota     Qualidade de Software   4   60   E. Restrita   100%   7,80   Aprov. Nota     Otimização Combinatória   4   60   Obrigatória   100%   6,70   Aprov. Nota       2013/2   Física I   5   90   Obrigatória   86%   7,50   Aprov. Nota     Análise e Projeto de Sistemas   4   60   Obrigatória   86%   7,00   Aprov. Nota     Banco de Dados II   4   60   Obrigatória   78%   7,80   Aprov. Nota     Interfaces Humano-Computador   4   60   Obrigatória   86%   8,80   Aprov. Nota     Sistemas Operacionais II   4   60   Obrigatória   100%   6,30   Aprov. Nota     Compiladores   4   60   Obrigatória   100%   9,60   Aprov. Nota     Otimização em Grafos   3   45   Obrigatória   91%   9,80   Aprov. Nota © 2012, Universidade do Estado do Rio de Janeiro. Todos os Direitos Reservados.</textarea></div>
                        <div style="visibility:hidden;"><textarea id="CacheNotas2" name="CacheNotas2" style="background:#FEF0A6">***</textarea></div>
                        <div style="visibility:hidden;"><textarea id="CacheRID2" name="CacheRID2" style="background:#FEF0A6">***</textarea></div>
                        <textarea style="visibility:hidden;" id='indexMatricula2' name='indexMatricula2'></textarea>
                        <textarea style="visibility:hidden;" id='indexNome2' name='indexNome2'></textarea>
                        <textarea style="visibility:hidden;" id='indexCurso2' name='indexCurso2'></textarea>
                    </form>
                </div>
                <div id="inicio">
                    <div id='terminal'></div>
                    <div id='loading'><img src="imagens/loading.gif" style="margin:auto;"/>
                        <div style='display:none;'>
                            <img src="imagens/propaganda/login.png"/>
                            <img src="imagens/propaganda/login.jpg"/>
                            <img src="imagens/propaganda/rendimento.jpg"/>
                            <img src="imagens/propaganda/sintese.jpg"/>
                            <img src="imagens/propaganda/fluxograma.jpg"/>
                            <img src="imagens/propaganda/disciplina.jpg"/>
                            <img src="imagens/propaganda/loja.jpg"/>
                            <img src="imagens/propaganda/rid.jpg"/>
                        </div>
                    </div>
                </div>
                <div>
                    <iframe name='conteudo' id='conteudo' frameborder='0' scrolling='no' style="margin:auto; width:100%" height="">ooo</iframe>
                    <div style="margin-top: 200px; text-align:right;"><div style="float:left; color:#AAA;"><img src="imagens/email.png" style="float:left; height:60px; width:60px;"/><div style="float:left; height:60px; padding-top:20px;"> desenvolvedor@computacaouerj.com.br</div></div><div class="fb-like" data-href="https://www.facebook.com/computacaouerj" data-width="450" data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div></div>
                </div>
            </div>
            <div id='links'> 
                <p>	Nosso objetivo é dar aos alunos recursos e ferramentas que a UERJ ainda não oferece.
                    <br>Essas ferramentas são sugestões de melhoria para o Aluno Online.
                </p>
                <p>	Não armazenamos senhas em circunstância nenhuma. Não causamos problemas. </p>
            </div>
            <div id='creditos'>
                Desenvolvido por alunos de Ciência da Computação - UERJ
            </div>
        </div>
    </body>
</html>
