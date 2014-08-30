<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>COMPUTAÇÃO-UERJ</title>
	<link rel="stylesheet" href="css/style.css">
	<script type="text/javascript" src="dist/paper.js"></script>
	<style>
		#pagina{
			background-color:#111;
			color:#EEE;
			font-family:Helvetica,Arial,sans-serif;
			font-size:15px;
			font-weight:900;	
			height: 550px;
			width: 100%;
		}
		#canvas{
			background-color:#111;
		}
		#pop{
			display:none;
			position:absolute;
			top:0px;
			left:0px;
			margin-left:250px;
			margin-right:100%;
			margin-top:20px;
			margin-bottom:100%;
			padding:10px;
			width:500px;
			height:450px;
			overflow:auto;
			background-color: #EEE;
			color: #111;
			border:3px solid #4572A7;
			border-radius:15px;
			opacity:0.95;
		}
		.titulo{
			font-family:Helvetica,Arial,sans-serif;
			font-size:20px;
			font-weight:900;
		}
		.subtitulo{
			font-family:Helvetica,Arial,sans-serif;
			font-size:15px;
			font-weight:900;
		}
		.dados{
			font-family:Helvetica,Arial,sans-serif;
			font-size:18px;
			font-weight:900;
		}
		.dadosTexto{
			font-family:Helvetica,Arial,sans-serif;
			font-size:15px;
			font-weight:300;
		}
		.cabecalho{
			left:100%;
		}
		a.link {text-decoration:none; color:blue;}
		a.visited {text-decoration:none; color:darkblue;}
		a.hover {text-decoration:none; color:red;}
		a.active {text-decoration:none;color:blue;}			
	</style> 
    <script type="text/javascript">
    window.onload = function(){
        parent.document.getElementById("conteudo").height = document.getElementById("pagina").scrollHeight + 35;
    }
    </script>
	<script type="text/paperscript" canvas="canvas">
		var espaco = new Point(30,30);
		var disciplina=[];
		var informacao=[];
		var corBordas = new Color('#555');
		var corCursada = new Color('#222');
		var corAFazer = new Color('#CCC');
		var corEmCurso = new Color('#4572A7');
		var corLetraACursar = new Color('#111');
		var corLetraCursada = new Color('#DDD');
		var corLetraEmCurso = new Color('#EEE');
		
		for (var i=0; i<8; i++){
			disciplina[i]=[];
			informacao[i]=[];
			for (var j=0; j<7; j++){
				if (!(((i==0 || i==7)&& j==5 ) || (i!=4 && j==6))){
					informacao[i][j]=[];
					disciplina[i][j] = new Path.Rectangle({
						x: 0.5*(i+1) + i*(100+espaco.x),
						y: 0.5*(j+1) + j*(45+espaco.y),
						width: 100,
						height: 45,
						radius: 7,
						fillColor: corAFazer,
						strokeColor: corBordas,
						strokeWidth: 2.5,
					});
					disciplina[i][j].position.y += 7;
					
					console.log(disciplina[i][j]);
					var n = i*10+j;
					switch(n){
						case 0:
							informacao[i][j]["nomeOriginal"] = "Geometria Analítica";
							informacao[i][j]["nome"] = "Geometria\nAnalitica";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "03";
							informacao[i][j]["codigo"] = 10814;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Ao final do período o aluno deverá conhecer o campo vetorial: manipular a Geometria Analítica Plana e  Espacial sob o aspecto vetorial e conhecer os sistemas de representação no plano e no espaço.";
							informacao[i][j]["Conceito"] = "Conhecimentos básicos de matemática abordados nos cursos do primeiro e segundo graus";
							informacao[i][j]["Ementa"] = "Vetores no plano R2 e no espaço R3. Curvas e Superfícies. Coordenadas Polares, cilíndricas e específicas. Classificação das cônicas e das quádricas. Interpretação geométrica de sistemas lineares de duas e três variáveis.";
							informacao[i][j]["Biografia"] = "Álgebra Vetorial e Geometria, Medeiros-Luiz Adauto; Andrade- Nirzi Gonçalves; Wanderley- Augusto Maurício, Ed. campus, 1981. \n Matrizes, Vetores e Geometria Analítica, Santos- Reginaldo J., Imprensa Universitária da UFMG,2006 \n Vetores e Geometria Analítica, Rigutto- Armando \n Geometria analítica: Um tratamento vetorial, Paulo Boulos, Ivan Camargo. Ed McGraw-Hill, 1987 ";
							break;
						case 1:
							informacao[i][j]["nomeOriginal"] = "Cálculo I";
							informacao[i][j]["nome"] = "Calculo 1";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "01";
							informacao[i][j]["codigo"] = "04827";
							informacao[i][j]["creditos"] = 6;
							informacao[i][j]["cargaHoraria"] = 90;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Ensinar as noções de derivada e integral de funções de uma variável";
							informacao[i][j]["Conceito"] = "Conhecimentos básicos de matemática abordados nos cursos do primeiro e segundo graus";
							informacao[i][j]["Ementa"] = "Derivadas de Funções de uma Variável - Conceito, Cálculos. Máximos e Mínimos e outras aplicações. Integrais Definidas e Indefinidas – Teorema Fundamental do Cálculo - Cálculo de áreas de outras aplicações";
							informacao[i][j]["Biografia"] = "Leithold, Louis, O Cálculo com Geometria Analítica, Vol. I e II, Ed. Harper e Row do Brasil LTDA, São Paulo, 1980. \n Guidorozzi, Hamilton, Um curso de Cálculo Vol. I, II e III, Ed. LTC, 1985. \n Simmons, Georgef , Cálculo com Geometria Analítica, Vol. II, Ed. McGraw–Hill, São Paulo, 1987";
							break;
						case 2:
							informacao[i][j]["nomeOriginal"] = "Álgebra";
							informacao[i][j]["nome"] = "Algebra";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "02";
							informacao[i][j]["codigo"] = 10815;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Capacitar o aluno de efetuar operações com conjuntos e funções, levar ao conhecimento do aluno noções elementares das estruturas algébricas de grupos e anéis, familiarizar o aluno com a aritmética modular e as propriedades básicas de polinômios";
							informacao[i][j]["Conceito"] = "Conhecimentos básicos de matemática abordados nos cursos do primeiro e segundo graus";
							informacao[i][j]["Ementa"] = "Teoria dos Conjuntos: noções de conjunto, operações com conjuntos. Funções: conceito de função, imagem e imagem inversa de um conjunto por uma função, composição de funções, funções invertíveis. Grupos: definição e exemplos, subgrupos, Teorema de Lagrange, grupos cíclicos, grupos de permutações. Anéis: definição e exemplos, anel dos inteiros modulares e anéis de polinômios";
							informacao[i][j]["Biografia"] = "1- Coutinho, S.C., “Números Inteiros e Criptografia RSA”, Série de Computação e Matemática, IMPA, SBM, RJ.; \n 2-  Dean, R., “Elementos de Álgebra Abstrata”, LTC, Rio de Janeiro, 1975.;\n 3- Fraleigh, J.B., “A first course in Abstract Algebra”, Addison-Wesley.;\n 4- Garcia, Arnaldo e Lequain, Yves, “Elementos de Álgebra”, Projeto Euclides, IMPA, Rio de Janeiro. \n 5- Gonçalves, A., “Introdução à Álgebra”, Projeto Euclides, IMPA, RJ.; \n 6- Hefez, A., “Curso de Álgebra”, Vol. 1, Coleção Matemática Universitária, IMPA, RJ, 1993. .;\n 6) -Lima, Elon Lages, Carvalho, Paulo Cezar Pinto, Wagner, Eduardo e Morgado, Augusto César,  “A Matemática do Ensino Médio”, Coleção do Professor de Matemática, Vols 1,2 e 3, SBM, 1998.; \n 7) Palis, Gilda e Malta, Iaci, “Somos todos mentirosos”, Revista do Professor de Matemática, Nº 37 pgs 1-10, 1998.";
							break;
						case 3:
							informacao[i][j]["nomeOriginal"] = "Matemática Discreta";
							informacao[i][j]["nome"] = "Matematica\nDiscreta";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "06";
							informacao[i][j]["codigo"] = 10816;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Introduzir técnicas de contagem indispensáveis em matemática, visando preparar disciplinas futuras de Matemática, Computação, Estatística e Matemática Aplicada.";
							informacao[i][j]["Conceito"] = "Conhecimentos básicos de matemática abordados nos cursos do primeiro e segundo graus. ";
							informacao[i][j]["Ementa"] = "Indução matemática, Relações de equivalência e de Ordem, Princípio Aditivo e Princípio Multiplicativo, Princípio de Inclusão e Exclusão, Funções Geradoras e Relações de Recorrência. ";
							informacao[i][j]["Biografia"] = "1- J.P.O. Santos, M.P. Mello e I.T.C. Muraci, “Introdução à Análise Combinatória”, Editora da Unicamp, 2002.; 2- R.L. Grahan, D.E. Knuth e O. Patashnik, “Matemática Concreta – Fundamentos para Ciência da Computação”, Editora LTC, 1995.; 3- A.C. Morgado, J.B. Pitombeira de Carvalho, P.C.P. Carvalho, P. Fernandez, “Análise Combinatória e Probabilidade”, SBM, 1997.";
							break;
						case 4:
							informacao[i][j]["nomeOriginal"] = "Fundamentos da Computação";
							informacao[i][j]["nome"] = "Fundamentos da \n Computacao";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = 10817;
							informacao[i][j]["creditos"] = 5;
							informacao[i][j]["cargaHoraria"] = 90;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Dar ao aluno uma visão geral dos componentes da arquitetura de um computador, conceitos básicos sobre representação binária e introdução a algoritmos e programação estruturada. Capacitar o aluno a desenvolver programas simples em uma linguagem de programação. ";
							informacao[i][j]["Conceito"] = "Conhecimentos básicos de matemática abordados nos cursos do primeiro e segundo graus. ";
							informacao[i][j]["Ementa"] = "Conceitos básicos de hardware: arquitetura básica do computador, dispositivos de entrada e saída. Conceitos básicos de software: sistema de representação binária, aritmética binária, operações lógicas, sistema operacional, sistema de armazenamento de dados, noções de redes de computadores. Ênfase em algoritmos: construção de algoritmos, tipos de dados, estruturas de controle básicas. Estrutura de um programa em uma linguagem de programação. Comandos simples de entrada e saída, armazenamento de dados. ";
							informacao[i][j]["Biografia"] = "1- Guimarães, A. M. e Lages, N. A. C. “Algoritmos e Estruturas de Dados”, LTC Editora, 1994.; 2- Velloso, F. C. Informática: Conceitos Básicos, Editora Campus, 2004.";
							break;
						case 10:
							informacao[i][j]["nomeOriginal"] = "Álgebra Linear";
							informacao[i][j]["nome"] = "Algebra\nLinear";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "02";
							informacao[i][j]["codigo"] = 10818;
							informacao[i][j]["creditos"] = 6;
							informacao[i][j]["cargaHoraria"] = 90;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 0;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Geometria Analitica";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Ao final do período, o aluno deverá ser capaz de: efetuar operações com matrizes, resolver sistemas lineares, operar espaços vetoriais, manipular matrizes e operadores lineares e aplicar em computação as habilidades e conhecimentos adquiridos";
							informacao[i][j]["Conceito"] = "";
							informacao[i][j]["Ementa"] = "Matrizes. Sistemas Lineares. Espaços Vetoriais. Dependência Linear. Bases e Dimensão. Transformações Lineares. Matriz Associada a uma Transformação Linear. Autovalores e Autovetores. Diagonalização. Produto Interno. Norma. Ortogonalidade. Bases Ortogonais. Operadores Simétricos e Ortogonais. ";
							informacao[i][j]["Biografia"] = "-Anton, Howard, 'Elementary Linear Algebra', Wiley, 9th ed., 2004. \n-Boldrini, José L. et al. 'Álgebra Linear'. Ed. Harbra, 3.ª edição, São Paulo, 1984. \n-Lipschutz, Seymour. 'Álgebra Linear'. Ed. McGraw-Hill do Brasil Ltda., 3.ª edição, São Paulo, 1997. \n-Domingos, Hygino, 'Álgebra Linear e Aplicações'. Ed. Atual. \n-Kolman, B., 'Introdução à Álgebra Linear com Aplicações', Ed. LTC, 1999";
							break;
						case 11:
							informacao[i][j]["nomeOriginal"] = "Cálculo II";
							informacao[i][j]["nome"] = "Calculo 2";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "02";
							informacao[i][j]["codigo"] = "04884";
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 1;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Calculo 1";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Ensinar as noções de curvas e superfícies e derivação de funções de mais do que uma variável.";
							informacao[i][j]["Conceito"] = "O aluno deverá ter familiaridade com os conceitos de derivada e integral de funções de uma variável, para compreender melhor a derivação e as funções de mais de uma variável";
							informacao[i][j]["Ementa"] = "Curvas Parametrizadas no Plano e no Espaço – vetores Velocidade, retas tangentes. Funções de 2 e 3 Variáveis. Gráficos, Curvas e Superfícies de Nível. Derivadas Parciais e Direcionais, Gradientes. Plano Tangente e Superfícies. Problemas de Máximos e Mínimos – Multiplicadores de Lagrange";
							informacao[i][j]["Biografia"] = "-Leithold, Louis, 'O Cálculo com Geometria Analítica', Vol. II, Ed. Harper & Row do Brasil LTDA, São Paulo \n-Guidorozzi, Hamiltonl, 'Um curso de Cálculo', Vol. II e III, Ed. LTC. \n-Simmons, Georgef, 'Cálculo com Geometria Analítica' Vol. II, Ed. McGraw - Hill, São Paulo. \n-Trotter, H.,Croswell, R, Williamson, R: 'Cálculo de Funções Vetoriais I', Ed. LTC. ";
							break;
						case 12:
							informacao[i][j]["nomeOriginal"] = "Cálculo das Probabilidades";
							informacao[i][j]["nome"] = "Calculo das\nProbabilidades";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "05";
							informacao[i][j]["codigo"] = 10819;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 1;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Calculo 1";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Ao final do período o aluno deverá ser capaz de empregar os Métodos Probabilísticos na análise dos fatos que ocorrem na área da Informática e Ciência da Computação.";
							informacao[i][j]["Conceito"] = "Derivadas de Funções de uma Variável. Integrais Definidas e Indefinidas";
							informacao[i][j]["Ementa"] = "Experimentos Aleatórios. Espaço Amostral e Eventos Aleatórios. Probabilidade de Evento e Propriedades. Probabilidade Condicional. Teorema de Bayes. Independência de eventos. Variáveis aleatórias. Momentos. Modelos Probabilísticos Discretos: Binominal, Hipergeométrico e Poisson, Geométrica. Modelos probabilísticos Contínuos: Uniforme, Exponencial e Normal. Transformação de variáveis aleatórias. Variáveis Bidimensionais. Convergência.";
							informacao[i][j]["Biografia"] = "- Murteira, Bento J. F., “Probabilidade e Estatística”, Vol.II, 2ª ed. McGRaw Hill, Lisboa, 1990. \n - Ross, S. M., 'Introduction to Probability Models', 5nd ed., Academic Press, New York, 1998. \n - Meyer, P. L., 'Probabilidade: Aplicação à Estatística', 2a ed. Livros Técnicos e Científicos, Rio de Janeiro, 1983. \n - Ross, S. [1998]. A First Course In Probability. 3rd ed., Macmillan Publishing Company, New York. \n - Serra Costa, J. J., “Curso de Cálculo das Probabilidades', UFRJ, Rio de Janeiro, 1991. \n - Grimmett, G. E Welsh, D., 'Probability: An Introduction', Claredon Press, Oxford, 1988. ";
							break;
						case 13:
							informacao[i][j]["nomeOriginal"] = "Algoritmos e Estruturas de Dados I";
							informacao[i][j]["nome"] = "Algoritmos e\nEstruturas de Dados 1";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = 10820;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 4;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Fundamentos da Computacao";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Introduzir os princípios da análise de algoritmos e as estruturas computacionais básicas para representação de dados em computadores, bem como os algoritmos básicos para manipulação dessas estruturas. Desta forma, ao final do curso, o aluno será capaz de escolher e manipular as estruturas adequadas para a solução de problemas computacionais. ";
							informacao[i][j]["Conceito"] = "Estruturas básicas para construção de algoritmos";
							informacao[i][j]["Ementa"] = "Introdução à complexidade de algoritmos. Estruturas lineares: representação por arrays e por encadeamento. Pesquisa sequencial e pesquisa binária. Ordenação por seleção, inserção e Mergesort. Pilhas, Filas e principais operações. Listas de prioridade: operações e Heapsort. Árvores: representação, operações e percursos em árvores. Árvores binárias, árvores binárias de busca e árvores balanceadas (AVL e B). Pesquisa digital: árvores digitais, Tries e árvores Patrícia. Hashing: funções hash e tratamento de colisões. Conjuntos: representação e operações. ";
							informacao[i][j]["Biografia"] = "-J. L. Szwarcfiter, L. Markenzon, 'Estruturas de Dados e Seus Algoritmos', LTC, 1994. \n-T. H. Cormen, C. E. Leiserson, R.L.Rivest,C. Stein, 'Algoritmos - Teoria e Prática', Ed. Campus, 2002.\n -D. Knuth, 'The Art of Computer Programming: Fundamental Algorithms', 2nd ed. Addison-Wesley, 1973.\n -B. R. Preiss, 'Data Structures and Algorithms - With Object Oriented Design in Java', John Wiley & Sons, 1999. ";
							break;
						case 14:
							informacao[i][j]["nomeOriginal"] = "Linguagem de Programação I";
							informacao[i][j]["nome"] = "Linguagem de\nProgramacao 1";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = 10821;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 4;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Fundamentos da Computacao";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Apresentar ao aluno uma linguagem de programação de computadores, procedural, de propósito geral. Desenvolvimento de programas, utilizando serviços do sistema operacional através de programação estruturada";
							informacao[i][j]["Conceito"] = "Conceitos de Hardware e Software. Lógica Booleana. Desejável conceitos sobre Estrutura de Dados";
							informacao[i][j]["Ementa"] = "Desenvolvimento de programas em linguagem procedural; Algoritmos básicos, tipos de dados básicos e estruturados, Comandos da uma linguagem; Subprogramação, Recursividade, Alocação encadeada de memória, Alocação dinâmica de memória; Acesso ao sistema de arquivos; Uso de bibliotecas; Ponteiros; Metodologias de especificação, desenvolvimento e documentação de programas. ";
							informacao[i][j]["Biografia"] = "-Kernighan, B. & Ritchie, D. 'C: A linguagem de programação', Ed. Campus 1990. \n-Schildt, H. 'Turbo C - guia do usuário', Ed. McGraw-Hill, 1988. \n-Schildt, H. 'C - completo e total', Ed. McGraw-Hill, 1990. \n-Mizrahi, V. V. 'Treinamento em linguagem C - Módulos 1 e 2', Ed. McGraw-Hill, 1990. ";
							break;
						case 15:
							informacao[i][j]["nomeOriginal"] = "Física I";
							informacao[i][j]["nome"] = "Fisica 1";
							informacao[i][j]["instituto"] = "FIS";
							informacao[i][j]["departamento"] = "01";
							informacao[i][j]["codigo"] = 10982;
							informacao[i][j]["creditos"] = 5;
							informacao[i][j]["cargaHoraria"] = 90;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "";
							informacao[i][j]["Conceito"] = "Conhecimentos básicos de matemática abordados nos cursos do primeiro e segundo graus";
							informacao[i][j]["Ementa"] = "Medindo grandeza. O sistema internacional de unidades. Mudanças de unidade. Comprimento. Tempo. Massas. Movimento Retilíneo. Vetores. Movimento em duas e três dimensões. Força e movimento: força, massa, leis de Newton, atrito, força de viscosidade, movimento circular uniforme. Estática. Trabalho e energia cinética. Conservação da energia. Sistemas de partículas: momento linear, conservação do momento linear. Colisões.";
							informacao[i][j]["Biografia"] = "";
							break;
						case 20:
							informacao[i][j]["nomeOriginal"] = "Português Instrumental";
							informacao[i][j]["nome"] = "Portugues\nInstrumental";
							informacao[i][j]["instituto"] = "ILE";
							informacao[i][j]["departamento"] = "02";
							informacao[i][j]["codigo"] = 10822;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Ao final do período o aluno deverá ser capaz de: Conhecer a gramática descritiva na dimensão do funcionamento textual-discursivo dos elementos da língua; Apresentar habilidades de leitura e interpretação como reconstrução de textos em diferentes níveis; Demonstrar competência na produção textual, comprovando capacidade de organização do pensamento e uso eficaz da língua padrão praticada em ambiente acadêmico. ";
							informacao[i][j]["Conceito"] = "";
							informacao[i][j]["Ementa"] = "Gramática descritiva: funcionamento textual-discursivo dos elementos da língua: registros formal e informal: consultoria linguístico-gramatical: questões ortográficas, orientação bibliográfica. Leitura e produção textual como reconstrução de textos em diferentes níveis; modos de organização discursiva; formas enunciativas e diferentes tipos de texto; estrutura da argumentação; relações entre marcas lingüísticas e níveis de significação textual; mecanismos da coerência e coesão textuais. ";
							informacao[i][j]["Biografia"] = "";
							break;
						case 21:
							informacao[i][j]["nomeOriginal"] = "Cálculo III";
							informacao[i][j]["nome"] = "Calculo 3";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "01";
							informacao[i][j]["codigo"] = "06767";
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 11;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Calculo 2";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Ensinar as noções de integrais múltiplas, de linha e de superfície. ";
							informacao[i][j]["Conceito"] = "O aluno deverá ter familiaridade com as noções de curvas e superfícies e derivação de funções de mais do que uma variável, para compreender melhor as integrais múltiplas, de linha e superfície. ";
							informacao[i][j]["Ementa"] = "Integrais Múltiplas. Integrais de Linha, Campos conservativos, Teorema de Green. Integrais em Superfícies, Teorema da Divergência, Teorema de Stokes. ";
							informacao[i][j]["Biografia"] = "-Kaplan, W., Trotter, H. 'Cálculo Avançado'. Vol. I - Ed. Universidade de São Paulo \n-Croswell, R ; Williamson, R, 'Cálculo de Funções Vetoriais I, II' , Ed. LTC. ";
							break;
						case 22:
							informacao[i][j]["nomeOriginal"] = "Algoritmos e Estruturas de Dados II";
							informacao[i][j]["nome"] = "Algoritmos e\nEstruturas de Dados 2";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = 10823;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 13;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Algoritmos e Estruturas de Dados 1";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Tornar acessíveis aos alunos a prática de análise e projeto de algoritmos computacionais eficientes, através da apresentação de técnicas básicas de construção de algoritmos e sua análise matemática. Apresentar também uma visão dos problemas sem soluções eficientes conhecidas e as técnicas aproximativas para contornar essa deficiência. ";
							informacao[i][j]["Conceito"] = "Medidas de complexidade de algoritmos. Estruturas básicas de dados e seus algoritmos.";
							informacao[i][j]["Ementa"] = "Medidas de complexidade de algoritmos e de problemas. Técnicas básicas de construção de algoritmos: Recursão, Backtracking, Programação Dinâmica e Algoritmo Guloso, com exemplificação e análise de cada técnica. Teoria da intratabilidade de problemas. Classes P e NP. Método da Redução. Teorema da Satisfatibilidade. Problemas pseudo-polinomiais. Problemas NP-Completos. Algoritmos Randômicos e Aproximativos. ";
							informacao[i][j]["Biografia"] = "-T. H. Cormen, C. E. Leiserson, R.L.Rivest,C. Stein, 'Algoritmos - Teoria e Prática', Ed. Campus, 2002. \n-N. Ziviani, 'Projeto de Algoritmos', 2a. edição, Ed. Thomson, 2004. \n-E.Horowitiz, S.Sahni, S.Rajasekaran, 'Computer Algorithms', Computer Science Press, 1998. \n-C.H.Papadimiotriou 'Computational Complexity', Addison Wesley, 1995. \n-G.Ausiello et al 'Complexity and Approximation', Springer 1999. ";
							break;
						case 23:
							informacao[i][j]["nomeOriginal"] = "Elementos de Lógica";
							informacao[i][j]["nome"] = "Elementos\nde Logica";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "02";
							informacao[i][j]["codigo"] = 10824;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Proporcionar ao aluno conhecimentos sobre Cálculo Proposicional e noções sobre Cálculo de Predicados de primeira ordem. ";
							informacao[i][j]["Conceito"] = "";
							informacao[i][j]["Ementa"] = "Cálculo Proposicional: conectivos lógicos, tabelas verdade, tautologias, regras de inferência, lógica sentencial, formas normais. Álgebra de conjuntos e Álgebras de Boole. Argumentos: demonstração direta e por redução ao absurdo. Cálculo de predicados: linguagem de primeira ordem, teoria e modelos. Decibilidade. ";
							informacao[i][j]["Biografia"] = "-Judith L. Gersting, 'Fundamentos Matemáticos para Ciências da Computação' Ed. LTC, 1995. \n-E. Alencar Filho, 'Iniciação à Lógica Matemática', Ed. Nobel. \n-E. Mendelson. 'Introduction to Mathematical Logic', Chapman & Hall, 1997. ";
							break;
						case 24:
							informacao[i][j]["nomeOriginal"] = "Linguagem de Programação II";
							informacao[i][j]["nome"] = "Linguagem de\nProgramacao 2";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = 10825;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 14;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Linguagem de Programacao 1";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Apresentar ao aluno uma linguagem de programação de computadores orientada a objetos.Desenvolvimento de programas, utilizando serviços do sistema operacional, através de programação orientada a objetos e eventos. ";
							informacao[i][j]["Conceito"] = "Conceitos de Hardware e Software. Linguagem Procedural de Alto Nível. Lógica Booleana. E Estrutura de Dados. Ligadores e Carregadores. Compiladores e Intepretadores. ";
							informacao[i][j]["Ementa"] = "Desenvolvimento de programas em linguagem orientada a objetos: Conceitos básicos de orientação a objetos; Herança e Polimorfismo; Encapsulamento, Sobrecarga e Métodos. Tipos compostos, classes e instâncias. Tratamento de exceções, Programação por eventos, Uso de bibliotecas e pacotes, Desenvolvimento de programas com Interface Gráfica. ";
							informacao[i][j]["Biografia"] = "-N. Dale, C. Weems and M. Headington, 'Programming and Problem Solving with Java', Ed.Jones and Bartlett Publishers. \n-D. J. Barnes & M. Kölling, 'Programação Orientada a Objetos com Java', Pearson Edu. do Brasil, 2004. \n-Rafael Santos, 'Introdução à Programação Orientada a Objetos Usando Java', Editora Campus, 2003. \n-Free Electronic Book: 'Thinking in Java', 3rd Edition. \n-Ken Arnold, J. Gosling, D. Holmes, 'The Java(TM)Programming Language', 3rd Edition, Addison-Wesley, 2000. \n-Cay Horstmann, Gary Cornell. 'Core Java 2, Vol. I: Fundamentals' (6th Edition), Prentice Hall, 2002. ";
							break;
						case 25:
							informacao[i][j]["nomeOriginal"] = "Teoria da Computação";
							informacao[i][j]["nome"] = "Teoria da\nComputacao";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = 10826;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Permitir que o aluno adquira noções dos fundamentos da computação, através de seus modelos abstratos, explorando suas capacidades e limitações. O tratamento é matemático, mas o ponto de vista é o da ciência da computação. Os temas abordados são a teoria dos autômatos e linguagens formais, computabilidade por máquina de Turing e funções recursivas, não-computabilidade, complexidade computacional. Esses fundamentos ajudam o aluno a adquirir habilidade de raciocínio e comunicação mais precisa e serão úteis nas disciplinas mais avançadas da Ciência da Computação.";
							informacao[i][j]["Conceito"] = "Conjuntos, relações e indução, abordados na disciplina Matemática Discreta. Estruturas de dados comuns e Recursão, abordadas nas disciplinas Fundamentos de Computação e Linguagens de Computação I.";
							informacao[i][j]["Ementa"] = "Linguagens formais. Gramáticas. Linguagens Regulares e Autômatos finitos. Linguagens livres de contexto e Autômatos de pilha. Lema de bombeamento. Linguagens tipo O (sem restrição) e Máquinas de Turing. Linguagens sensíveis ao contexto e autômatos linearmente limitados. Teoria da computabilidade: Máquina de Turing, computabilidade efetiva, funções recursivas, tese de Church, teoria da incompleteza de Gödel, problemas indecidíveis. ";
							informacao[i][j]["Biografia"] = "-John E. Hopcroft. Rajeev Motwani. Jeffrey D. Ullman, 'Introdução à Teoria de Autômatos, Linguagens e Computação', Editora Campus. 2002. \n-H.R. Lewis; C.H. Papadimitriou. 'Elementos de Teoria da Computação', Editora Bookman, 2ª edição. ";
							break;
						case 30:
							informacao[i][j]["nomeOriginal"] = "Cálculo Numérico";
							informacao[i][j]["nome"] = "Calculo\nNumerico";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = 10827;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 1;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Calculo 1";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Ao final do curso, o aluno saberá utilizar recursos computacionais na solução de problemas matemáticos, através da aplicação de algoritmos de métodos numéricos";
							informacao[i][j]["Conceito"] = "Derivadas de Funções de uma Variável. Integrais Definidas e Indefinidas";
							informacao[i][j]["Ementa"] = "Teoria dos erros. Séries de Taylor e de MacLaurin. Resolução numérica de equações algébricas e transcendentes. Interpolação numérica. Diferenciação numérica. Integração numérica. Resolução numérica de sistemas de equações. Resolução numérica de equações diferenciais. ";
							informacao[i][j]["Biografia"] = "-Willian S. Dorn; Daniel D. McCraken 'Cálculo Numérico com Estudos de Casos em Fortran IV', Ed. Campus. \n-Marcia Ruggiero; Vera Lucia Lopes, 'Cálculo Numérico (aspectos teóricos e computacionais)' Ed. McGraw.Hill \n-Vicor Mirshawka, 'Cálculo Numérico', Ed. Nobel. ";
							break;
						case 31:
							informacao[i][j]["nomeOriginal"] = "Cálculo IV";
							informacao[i][j]["nome"] = "Calculo 4";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "01";
							informacao[i][j]["codigo"] = 10828;
							informacao[i][j]["creditos"] = 6;
							informacao[i][j]["cargaHoraria"] = 90;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 11;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Calculo 2";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Ao final do curso o aluno deverá reconhecer e manusear bem os critérios de convergência. Exprimir funções em séries e aplicá-las adequadamente no cálculo de integrais. Resolver equações em derivadas parciais. Aprender as técnicas mais simples de soluções de equações diferenciais. ";
							informacao[i][j]["Conceito"] = "O aluno deverá ter familiaridade com os conceitos de derivada e integral de funções de uma variável ou mais variáveis, para compreender melhor a solução de derivadas parciais e de equações diferenciais";
							informacao[i][j]["Ementa"] = "Seqüências Numéricas: Convergências; Testes Clássicos, Seqüência e Séries de Funções;Séries de potências; Série de Taylor; Derivação e Integração de Série de Potências; Série de Fourier; Equações Diferenciais de 1ª ordem. Equações Diferenciais Lineares de 2ª ordem. Sistemas de Equações Diferenciais Lineares com Coeficientes Constantes. Transformada de Laplace e aplicações. Transformada de Fourier. ";
							informacao[i][j]["Biografia"] = "-Willian Boyce, Richard Di Prima, 'Equações Diferenciais Elementares e Problemas de Valores de Contorno', Ed. LTC. \n-Nikolai Piskunov, 'Differential and Integral Calculus' , MIR Publish. \n-Richard Bronson, 'Moderna Introdução às Equações Diferenciais', Ed. Makron Books.\n-Leithold, L. 'O Cálculo com Geometria Analítica II', Ed. Harper & Row, Brasil. \n-Sérgio Abunahaman, 'Equações Diferenciais', Ed. Rio de Janeiro. ";
							break;
						case 32:
							informacao[i][j]["nomeOriginal"] = "Algoritmos em Grafos";
							informacao[i][j]["nome"] = "Algoritmos\nem Grafos";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = 11311;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 22;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Algoritmos e Estruturas de Dados 2";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Capacitar o aluno a compreender as propriedades matemáticas de grafos, bem como de suas aplicações. Em particular, para a compreensão das aplicações computacionais, o aluno deverá ficar apto a compreender as representações computacionais de grafos e os principais algoritmos utilizados na solução de problemas usando a teoria estudada. ";
							informacao[i][j]["Conceito"] = "Medidas de complexidade de algoritmos. Técnicas avançadas de construção de algoritmos. ";
							informacao[i][j]["Ementa"] = "Conceitos básicos sobre grafos. Representação computacional de grafos. Buscas em grafos simple, busca em largura, profundidade e irrestrita. Determinação de elementos estruturais: pontes, pontos de articulação, blocos. Dígrafos: busca, determinação de componentes fortemente conexas, 2-SAT, ordenação topológica, alcançabilidade e fechamento transitivo. Algoritmos para determinação de ciclos eulerianos e hamiltonianos. Planaridade. ";
							informacao[i][j]["Biografia"] = "-J. Bondy e U. Murty, 'Graph Theory With Applications'. Internet, 2004. \n-D.West, 'Introduction to Graph Theory', 2nd edition, Prentice Hall, 2001. \n-R. Sedgwick, 'Algorithms in C, Part 5 – Graph algorithms,' 3rd edition, Addison Wesley, 2002. \n-T.H. Cormen et al, 'Introduction to Algorithms', MIT Press e McGraw-Hill, 1990. \n-J.L. Szwarcfiter, 'Algoritmos em Grafos', Editora Campus, 1987.";
							break;
						case 33:
							informacao[i][j]["nomeOriginal"] = "Engenharia de Software";
							informacao[i][j]["nome"] = "Engenharia de\nSoftware";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = 10830;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 59;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "O objetivo do curso é apresentar os conceitos básicos sobre processo de desenvolvimento de software, métodos, técnicas e ferramentas de construção, qualidade e gerência de desenvolvimento e manutenção de software.";
							informacao[i][j]["Conceito"] = "Noções de algoritmos e programação";
							informacao[i][j]["Ementa"] = "Processo de desenvolvimento de software. Modelos de processo de desenvolvimento de software. ualidade de software. Planejamento e Gerência de projetos de software. Métricas. Análise de riscos. Engenharia de Requisitos. Métodos e Técnicas de análise e projeto de software.Verificação, validade e teste de software. Gerência de Configuração. Manutenção. Documentação. Ferramentas e ambientes de software. ";
							informacao[i][j]["Biografia"] = "-I. Sommerville, “Software Engineering”, Hardcover, 7th edition, Addison-Wesley, 2004, 759, ISBN 0321210263. \n-R.S. Pressman, “Software Engineering. A practitioner’s approach”, McGraw-Hill, Hardcover, 6th edition, 2004, ISBN 007301933X. \n-S.L. Pfleeger, et al, “Software Engineering”, Prentice Hall, 2005, 3rd edition, ISBN 0131469134. ";
							break;
						case 34:
							informacao[i][j]["nomeOriginal"] = "Arquitetura de Computadores I";
							informacao[i][j]["nome"] = "Arquitetura de\nComputadores 1";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = 10831;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 14;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Linguagem de Programacao 1";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Ao final do período o aluno deverá ter conhecimento sobre os conceitos básicos relacionados às funções lógicas, suas formas de representação e utilização em circuitos lógicos combinacionais e seqüenciais. Além disso, deverá estar apto a identificar, em um sistema computacional, diferentes formas de análise de desempenho, de modos de endereçamento e de conjuntos de instruções.";
							informacao[i][j]["Conceito"] = "Os alunos devem ter familiaridades com conceitos fundamentais abordados em estruturas de dados básicas, para compreender os conceitos de programação de linguagem de montagem (assembly), ligadores (linkers) e compiladores, além dos conceitos de representação numérica. ";
							informacao[i][j]["Ementa"] = "Álgebra das variáveis lógicas. Funções lógicas. Circuitos combinacionais e seqüenciais básicos. Sistemas Numéricos e sua representação. Modelos de sistemas digitais: unidade de controle e unidade de processamento, modelo de um sistema de computação. Modelagem e análise de desempenho. Conceitos básicos de arquitetura: modo de endereçamento, representação interna de dados, conjunto de instruções básicas, tratamento de interrupções e exceções. ";
							informacao[i][j]["Biografia"] = " 1- David. A. Patterson and John. L. Hennessy, “Computer Organization & Design, the Hardware Software Interface”, Morgan Kauffman Publishers, 2005; 2- David. A. Patterson and John. L. Hennesy,  “Organização e Projetos de Computadores: A Interface de Hardware e Software”, Ed. Campus, 2005.";
							break;
						case 35:
							informacao[i][j]["nomeOriginal"] = "Física II";
							informacao[i][j]["nome"] = "Fisica 2";
							informacao[i][j]["instituto"] = "FIS";
							informacao[i][j]["departamento"] = "01";
							informacao[i][j]["codigo"] = 10983;
							informacao[i][j]["creditos"] = 5
							informacao[i][j]["cargaHoraria"] = 90;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 15;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Fisica 1";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "";
							informacao[i][j]["Conceito"] = "";
							informacao[i][j]["Ementa"] = "Cargas e forças elétricas. Campo elétrico. Lei de Gauss. Potencial elétrico. Capacitância. Corrente elétrica: leis de Ohm e de Joule, circuitos elétricos. Campo magnético: fluxo e indução magnética. Leis de ampère e de Biot-Savart, interação eletromagnética. Leis de Faraday e Lens, indução eletromagnética. Indutância: Circuitos LRe LC. Correntes alternadas. Propriedades magnéticas da matéria. Reflexão e refração da luz. Diótricos planos esféricos. Lentes aberrações. ";
							informacao[i][j]["Biografia"] = "";
							break;
						case 40:
							informacao[i][j]["nomeOriginal"] = "Estruturas de Linguagens";
							informacao[i][j]["nome"] = "Estruturas de\nLinguagens";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = 10834;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 14;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Linguagem de Programacao 1";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Permitir ao aluno, através do estudo de técnicas de projeto de linguagens, uma melhor compreensão dos seguintes aspectos de uma linguagem de programação: seu papel no desenvolvimento de software; o inter-relacionamento de suas construções; sua implementação. Essa compreensão, amplia o repertório de soluções para a programação e projeto de software. ";
							informacao[i][j]["Conceito"] = "Habilidade de programação em pelo menos uma linguagem, adquirida em uma das disciplinas Linguagem de Programação I ou Linguagem de Programação II. ";
							informacao[i][j]["Ementa"] = "Sintaxe e semântica. Compilação e Interpretação. Estruturas clássicas de linguagens: amarrações, implementação de subprogramas, alocação dinâmica de espaço em pilha, passagem de parâmetro. Estruturação dos dados: tipos simples, agregados, definidos pelo usuário, tipos abstratos de dados,unidades genéricas, sistema de tipos, modelos de implementação, alocação dinâmica na heap e coleta de lixo. Estruturas de Controle – mecanismos internos à unidade de programa: estruturas de controle comuns e chamadas de subprogramas e mecanismos de transferência entre unidades: tratamento de exceções, paralelismo, co-rotinas, chamadas remotas. Estrutura da programação: métodos de projeto, conceitos e ferramentas para modularização, encapsulamento, interface e implementação. Linguagens e paradigmas não convencionais de programação: programação em lógica, programação funcional, programação orientada a objetos. ";
							informacao[i][j]["Biografia"] = "-R.W. Sebesta. 'Conceitos de Linguagens de Programação'. Ed. Bookman, 2003. \n-C. Ghezzi, M. Jazayeri. 'Conceito de Linguagens de Programação'. Ed. Campus. \n-F. Varejão. “Linguagens de Programação Java, C e C++ e outras”. Ed. Campus, 2004. ";
							break;
						case 41:
							informacao[i][j]["nomeOriginal"] = "Banco de Dados I";
							informacao[i][j]["nome"] = "Bancos de\nDados 1";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = 10832;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 69;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "O objetivo do curso é apresentar os conceitos básicos sobre bancos de dados, arquitetura de sistemas de gerenciamento de banco de dados, modelos de dados: relacional, E-R e outros; modelagem de dados, formas normais, consultas e linguagens de consultas";
							informacao[i][j]["Conceito"] = "";
							informacao[i][j]["Ementa"] = "Arquitetura de Sistemas Gerenciador de Banco de Dados (SGBD). Projeto de Banco de Dados: modelos de entidades e relacionamentos e suas extensões, modelo de dados relacional, algoritmos de decomposição e formas normais. Controle de restrições de integridade. Noções básicas de transações. Linguagens de consultas: Cálculo relacional, álgebra relacional e SQL, Visões e índices secundários. ";
							informacao[i][j]["Biografia"] = "-S. Navathe e R. Elmasri; “Fundamental of Database Systems/Oracle 9i Programming”, 4th Edition Sham, Addison-Wesley, 2003, 4th edition, ISBN 0321206746. \n-C.J. Date, “Introduction to Database Systems”, Addison-Wesley, 2003, 8th edition, ISBN 0321197844. ";
							break;
						case 42:
							informacao[i][j]["nomeOriginal"] = "Otimização em Grafos";
							informacao[i][j]["nome"] = "Otimizacao\nem Grafos";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = 11312;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 32;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Algoritmos em Grafos";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Apresentar ao aluno os problemas clássicos de otimização em grafos, suas principais aplicações e seus algoritmos de solução com o estudo de suas complexidades. Ao final do curso o aluno deverá estar apto a reconhecer as aplicações que podem ser resolvidas com a teoria estudada";
							informacao[i][j]["Conceito"] = "Medidas de complexidade de algoritmos. Técnicas avançadas de construção de algoritmos. Propriedades";
							informacao[i][j]["Ementa"] = "Conceitos básicos sobre grafos. Representação computacional de grafos. Buscas em grafos, determinação de componentes fortemente conexas, ordenação topológica. Árvore geradora mínima: algoritmos de Prim e de Kruskal. Caminhos mínimos: fonte única, algoritmo de Dijkstra, algoritmo de Jonhson, caminhos mínimos entre todos os pares de nós, algoritmo de Floyd. Fluxo máximo: teorema do fluxo máximo e corte mínimo e suas implicações combinatórias, algoritmo de Ford-Fulkerson, algoritmo do tipo preflow-push.";
							informacao[i][j]["Biografia"] = "-J. Bondy e U. Murty, 'Graph Theory With Applications'. Internet, 2004. \n-D.West, 'Introduction to Graph Theory', 2nd edition, Prentice Hall, 2001. \n-R. Sedgwick, 'Algorithms in C, Part 5 – Graph algorithms,' 3rd edition, Addison Wesley, 2002. \n-T.H. Cormen et al, “Introduction to Algorithms”, MIT Press e McGraw-Hill, 1990. \n-J.L. Szwarcfiter, “Algoritmos em Grafos”, Editora Campus, 1987. ";
							break;
						case 43:
							informacao[i][j]["nomeOriginal"] = "Análise e Projeto de Sistemas";
							informacao[i][j]["nome"] = "Analise e Projeto\nde Sistemas";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = 10833;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 33;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Engenharia de Software";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "O objetivo do curso é capacitar os alunos a analisar e projetar sistemas com qualidade, utilizando técnicas de orientadas a objetos com linguagem padrão UML (Unified Modeling Language) e modelo de processo unificado RUP. (Rational Unified Process). ";
							informacao[i][j]["Conceito"] = "Técnicas de modelagem e desenvolvimento de software. ";
							informacao[i][j]["Ementa"] = "Orientação a objetos com ferramentas para especificação e documentação. Linguagem unificada de modelo – UML. Casos de uso. Cartão de responsabilidades e colaboradores (CRC). Projeto de sistemas orientados a objetos. Padrões e Frameworks. Reuso de Software. Processo de Desenvolvimento Unificado e RUP. Estudos de Casos. ";
							informacao[i][j]["Biografia"] = "-G. Booch, I. Jacobson, e J. Rumbaugh, “The Unified Modeling Language User Guide”, Addison-Wesley, -2005, 2nd edition, ISBN 0321267974. Addison-Wesley, 1998, ISBN 0201571684. \n-M. Flower C. Kobryn, G. Booch et al, “UML Essential”, 3ª Edição, Bookman, 2005.  \n-J. Arlow et al, “UML 2.0 and the Unified Ptocess: Practical Object-Oriented Analysis and Design”, Addison-Wesley, 2005, 2nd edition, ISB 0321321278. \n-H. Gomaa, “Designing Software Product Lines with UML: From Use Cases to Pattern-Based Software Architectures”, Addison-Wesley, 2004, ISBN 0201775956. ";
							break;
						case 44:
							informacao[i][j]["nomeOriginal"] = "Sistemas Operacionais I";
							informacao[i][j]["nome"] = "Sistemas\nOperacionais 1";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = 10835;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 34;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Arquitetura de Computadores 1";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "O objetivo do curso é apresentar os conceitos básicos sobre sistemas operacionais modernos. Durante o curso, os conceitos estudados são ilustrados com exemplos de sistemas operacionais reais. ";
							informacao[i][j]["Conceito"] = "Conceito de hardware e software. Organização e arquitetura de computadores. Linguagem de programação de alto nível como C e Java. Conceito de linguagem Assembly. ";
							informacao[i][j]["Ementa"] = "Visão geral sobre sistemas operacionais. Histórico. Estruturas dos sistemas operacionais. Ligação estática e dinâmica de programas. Modelo de processos e threads. Concorrência e sincronização. Mecanismos para programação concorrente. Alocação de recursos e deadloks. Gerência do processador. Políticas de escalonamento. Estudos de casos de sistemas operacionais. ";
							informacao[i][j]["Biografia"] = "-Abrahan Silbershatz, Peter Galvin e Greg Gagne, “Sistemas Operacionais – Conceitos e Aplicações”, Ed. Campus, Brasil, 2001. \n-A. S. Tanembaum, “Sistemas Operacionais Modernos” 2ª Edição, Ed. Pearson/Prentice Hall, Brasil 2003. \n-Rômulo Silva de oliveira, Alexandre Carissimi e Simão9 Toscani, “Sistemas Operacionais – Série Livros Didáticos – No 11”, Editora Sagra Luzzatto – UFRGS, 2003. \n-Francis B. Machado e Luiz Paulo Maia, “Arquitetura de Sistemas Operacionais”, 3ª Edição, Editora LTC, 2004. ";
							break;
						case 45:
							informacao[i][j]["nomeOriginal"] = "Arquitetura de Computadores II";
							informacao[i][j]["nome"] = "Arquitetura de\nComputadores 2";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = 10836;
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 34;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Arquitetura de Computadores 1";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Ao final do período o aluno deverá estar apto a conhecer todos os componentes básicos que existem em um sistema computacional (processador, memória e dispositivos de entrada e saída), suas funcionalidades e a maneira como interagem. ";
							informacao[i][j]["Conceito"] = "Os conceitos necessários que o aluno deve ter para realizar esta disciplina incluem: estruturas de dados básicas, funções lógicas, circuitos combinacionais e seqüenciais, e linguagem de montagem (assembly). ";
							informacao[i][j]["Ementa"] = "Arquitetura básica de um processador: seção de processamento e seção de controle. Projeto monociclo e multiciclo. Sub-sistema de memória. Hierarquia de memória. Sub-sistema de entrada e saída. ";
							informacao[i][j]["Biografia"] = "-David. A. Patterson and John. L. Hennessy, “Computer Organization & Design, the Hardware Software Interface”, Morgan Kauffman Publishers, 2005. \n-David. A. Patterson and John. L. Hennesy, “Organização e Projetos de Computadores: A Interface de Hardware e Software”, Ed. Campus, 2005. ";
							break;
						case 50:
							informacao[i][j]["nomeOriginal"] = "Otimização Combinatória";
							informacao[i][j]["nome"] = "Otimizacao\nCombinatoria";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "06";
							informacao[i][j]["codigo"] = "10837";
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 10;
							informacao[i][j]["IdPreRequisito2"] = 11;
							informacao[i][j]["NomePreRequisito1"] = "Calculo 2";
							informacao[i][j]["NomePreRequisito2"] = "Algebra Linear";
							informacao[i][j]["Objetivo"] = "Introduzir as técnicas tradicionais baseadas em programação Linear e Inteira para resolução de problemas de otimização combinatória. Munir o aluno de ferramental teórico que o capacite na avaliação da qualidade de uma formulação de programação linear inteira. Capacitar o aluno na compreensão das vantagens e limitações das técnicas de solução estudada. ";
							informacao[i][j]["Conceito"] = "Espaços vetoriais, transformações lineares, solução de sistemas lineares, aproximação linear, derivada e integrais para várias variáveis. ";
							informacao[i][j]["Ementa"] = "Programação Linear: modelagem em programação linear; o método simplex; dualidade em programação linear; análise de sensibilidade;  Programação inteira: modelagem em programação inteira; otimalidade, relaxação e limites; problemas bem resolvidos; Branch and Bound;";
							informacao[i][j]["Biografia"] = "-M. Goldbarg e H.P. Luna, “Otimização Combinatória e Programação Linear”, Campus, 2000. \n-M. Bazaraa, J. Jarvis e H. Sherali, “Linear Programming and Network Flows”, John Wiley and Sons, 1990. \n-L. Wolsey, “Integer Programming”, Wiley-Interscience, 1998. ";
							break;
						case 51:
							informacao[i][j]["nomeOriginal"] = "Banco de Dados II";
							informacao[i][j]["nome"] = "Banco de\nDados 2";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = "10838";
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 41;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Banco de Dados 1";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "O objetivo do curso é apresentar os conceitos avançados sobre banco de dados, controles operacionais em sistemas de banco de dados e organização física de banco de dados. ";
							informacao[i][j]["Conceito"] = "Elementos da Arquitetura de Sistemas Gerenciador de Banco de Dados (SGBD). Técnicas de Projeto de Banco de Dados. Noções básicas de transações. Linguagens de consultas a Bancos de Dados. ";
							informacao[i][j]["Ementa"] = "Conceitos avançados em Banco de Dados. Modelos relacional estendido e orientado a objetos. Processamento de transações, protocolos de controle de concorrência, mecanismos de recuperação, sistemas de autorização e segurança. Processamento e otimização de consultas, organização física e índices, ambiente C/S, triggers e processamentos armazenados. ";
							informacao[i][j]["Biografia"] = "-S. Navathe e R. Elmasri; “Fundamental of Database Systems/Oracle 9i Programming”, 4th Edition Sham, Addison-Wesley, 2003, 4th edition, ISBN 0321206746. \n-C.J. Date, “Introduction to Database Systems”, Addison-Wesley, 2003, 8th edition, ISBN 0321197844.";
							break;
						case 52:
							informacao[i][j]["nomeOriginal"] = "Interfaces Humano-Computador";
							informacao[i][j]["nome"] = "Interfaces\nHumano-Computador";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = "10839";
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 99;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Dar aos alunos uma noção geral da área de IHC, bases teóricas, modelos e métodos para projeto e avaliação de interfaces. Ao fim do curso o aluno terá aprendido a aplicar os métodos e modelos, e, mais do que isso, sobre o objetivo, custo e benefício em aplicar cada um deles, estando assim capacitado a selecionar o mais adequado em um determinado contexto. ";
							informacao[i][j]["Conceito"] = "";
							informacao[i][j]["Ementa"] = "Conceitos básicos de interação humano-computador (interface, interação, usabilidade, comunicabilidade, perspectivas de interação, componentes de hardware e software, aspectos cognitivos). Estilos de interação (linguagens de comandos, seleção por menus, linguagem natural, manipulação direta, ícones e linguagens visuais). Fundamentação teórica (Engenharia Cognitiva e Engenharia Semiótica) Modelagem de interfaces: modelos de tarefas, modelos de usuários, modelos de interação. Processo de design de interfaces. Avaliação de interfaces. Outros aspectos a serem considerados no projeto de interação (sistemas de ajuda e documentação, interfaces multi-usuário, interfaces WWW, programação feita pelos usuários, estilos e tecnologias recentes). ";
							informacao[i][j]["Biografia"] = "-Preece, J.; Rogers, Y; Sharp, H., “Design de Interação”, Editora Bookman, 2005. \n-Prates, R. e Barbosa, S., “Avaliação de Interfaces de Usuário – Conceitos e Métodos”, Jornada de Atualização em Informática, SBC, 2003, pp 425-476. \n-De Souza, C.S., Leite, J. C., Prates, R. O. Barbosa, S.D.J. “Projeto de Interfaces de Usuário- Perspectivas Cognitivas e Semióticas”, Jornada de Atualização em Informática (JAI), SBC, Volume 2, pp 425-476, 1999. ";
							break;
						case 54:
							informacao[i][j]["nomeOriginal"] = "Sistemas Operacionais II";
							informacao[i][j]["nome"] = "Sistemas\nOperacionais 2";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = "10840";
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 44;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Sistemas Operacionais 1";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "O objetivo deste curso e complementar o curso de Sistemas Operacionais I, apresentando conceitos básicos sobre sistemas operacionais modernos. Durante o curso, os conceitos estudados são ilustrados com exemplos de sistemas operacionais reais. ";
							informacao[i][j]["Conceito"] = "Conceitos adquiridos na disciplina Sistemas Operacionais I (Processos e Threads; Escalonamento, Programação Concorrente; Comunicação entre Processos). ";
							informacao[i][j]["Ementa"] = "Gerência de Memória: Organização, Carregamento de4 programas, Alocação contínua, Partições. Swapping de processos, Paginação, suporte do HW a paginação e Segmentação. Memória Virtual: Alocação e substituição de páginas físicas, Paginação sob demanda, Segmentação com paginação, Thrashing, Working-Set. Gerência de Arquivos: Operações sobre arquivos, Estrutura de arquivos, Métodos de acesso, Diretórios, Proteção de arquivos, Alocação de arquivos, Gerência de espaço livre, Layout de disco, Arquivo em uso, Desempenho, Consistência. Gerência de recursos de entrada e saída. Device drivers. Dispositivos de armazenamento de massa: Tipos, Linearização, Algoritmos de escalonamento, Confiabilidade. Estudo de casos de sistemas operacionais. ";
							informacao[i][j]["Biografia"] = "-A. Silbershatz, P. Galvin e G. Gagne, “Sistemas Operacionais – Conceitos e Aplicações”, Ed. Campus, 2001. \n-A. S. Tanembaum, “Sistemas Operacionais Modernos” ,2ª ed., Ed. Pearson/Prentice Hall Brasil, 2003. \n-Rômulo Silva de Oliveira, Alexandre Carissimi e Simão Toscani, “Sistemas Operacionais – Série Livros Didáticos – NO 11” Editora Sagra Luzzatto – UFRGS, 2003. \n-F. B. Machado e L. P. Maia, “Arquitetura de Sistemas Operacionais”, 3ª Ed., Editora LTC, 2004. ";
							break;
						case 55:
							informacao[i][j]["nomeOriginal"] = "Compiladores";
							informacao[i][j]["nome"] = "Compiladores";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = "10841";
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 25;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Teoria da Computacao";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Ao final do período o aluno deverá conhecer, em detalhes, os componentes de um compilador, seu processo e suas estruturas de dados. Além de alcançar o domínio desse processo, tomar conhecimento e experimentar os construtores automáticos de compiladores obtidos a partir de especificações. ";
							informacao[i][j]["Conceito"] = "Estruturas de dados comuns e Recursão da disciplina Estrutura de Dados. Gramáticas e autômatos reconhecedores das cadeias das linguagens regulares e livres de contexto da disciplina Teoria da Computação.";
							informacao[i][j]["Ementa"] = "O processo de compilação e a estrutura global do compilador. Análise léxica. Análise sintática: análise sintática descendente e ascendente, coleta de informações sobre a gramática, geração de cadeia vazia, iniciadores, os métodos para análise LL (1), LR(1) e derivados. Esquemas de tradução. Construtores automáticos. Ambientes de tempo de execução. Linguagens intermediárias. Geração de código. Montadores e ligadores.";
							informacao[i][j]["Biografia"] = "-A. V. Aho, R. Sethi, J. D. Ullman. “Compiladores Princípios,Técnicas e Ferramentas”. Editora LTC, 1995. \n-Andrew W. Appel, 'Modern Compiler Implementation in Java', Cambridge University Press, 1998. \n-C.J.H. Jacobs, D. Grune, H. E. Bal, K. G. Langendoen. 'Projeto Moderno de Compiladores'. Editora Campus, 2002. ";
							break;
						case 60:
							informacao[i][j]["nomeOriginal"] = "Computação Gráfica";
							informacao[i][j]["nome"] = "Computacao\nGrafica";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = "10842";
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 108;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Introduzir os principais modelos matemáticos e métodos computacionais utilizados para a manipulação de dados e imagens, permitindo assim que os alunos sejam capazes de desenvolver aplicações gráficas, tanto passivas quanto interativas";
							informacao[i][j]["Conceito"] = "";
							informacao[i][j]["Ementa"] = "Introdução à Computação Gráfica interativa: conceitos básicos e aplicações. Equipamentos gráficos: arquitetura básica e dispositivos de entrada e saída. Processos de formação de cores, sistemas de cores, dithering. Pacotes gráficos e suas padronizações. Programação gráfica passiva, algoritmo de rasterização de objetos bi-dimensionais. Programação gráfica interativa, métodos de entrada de dados, algoritmos de seleção. Processo de visualização, enquadramento e corte. Transformadas geométricas em 2D e 3D, projeções paralela e perspectiva. Noções de modelagem geométrica. Noções de realismo visual: tratamento de linhas escondidas, modelos de iluminação.";
							informacao[i][j]["Biografia"] = "-Jonas Gomes e Luiz Velho, “Fundamentos da Computação Gráfica”, IMPA, 2003 \n-Eduardo Azevedo e Aura Conci, “Computação Gráfica: Teoria e Prática”, Elsevier Editora. \n-James Foley, Andries van Dam, Steve Feiner e John Hughes, “Computer Graphics – Principles and Applicatinos”, Addison Wesley. \n-Mason W., Jackie N., D. Tom e S., Dave, “OpenGL Programming Guide”, Terceira Edição, Addison Wesley. ";
							break;
						case 61:
							informacao[i][j]["nomeOriginal"] = "Inteligência Artificial";
							informacao[i][j]["nome"] = "Inteligencia\nArtificial";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = "10843";
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 108;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Capacitar o aluno para a compreensão das diferentes linhas de desenvolvimento da Inteligência Artificial, assim como as principais técnicas utilizadas no desenvolvimento de aplicações. ";
							informacao[i][j]["Conceito"] = "Algoritmos de recursão e Backtracking.";
							informacao[i][j]["Ementa"] = "Histórico da I.A. Métodos de resolução de problemas; busca em espaço de estados , redução de problemas, busca em profundidade, busca em largura, uso de heurísticas. Agentes Inteligentes. Representação do conhecimento: regras de produção, redes semânticas, ontologias e frames. Cálculo Proporcional e Lógica de Primeira Ordem. Prolog. Sistemas Especialistas. Sistemas Tutores Inteligentes. Visão geral de Algoritmos Genéticos. Visão de Redes Neuronais.";
							informacao[i][j]["Biografia"] = "-Russel, Norvig, “Inteligência Artificial”, 2004, Ed. Campus. \n-Araribóia, “Inteligência Artificial: Um Curso Prático”, 1988, Ed. LTC. \n-L.A. Carvalho, “Datamining”, 2001, Ed. Érica. \n-A. Braga, T. Ludermir, “Redes Neurais Artificiais Teoria e Aplicações”, 2002, Ed. LTC. ";
							break;
						case 62:
							informacao[i][j]["nomeOriginal"] = "Ética,Computadores e Sociedade";
							informacao[i][j]["nome"] = "Etica, Computadores\ne Sociedade";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = "10844";
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 118;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Capacitar o aluno para a compreensão dos fatores globais que influenciam o desenvolvimento da Informática, bem como dos impactos sociais, econômicos, culturais e políticos dessa atividade.";
							informacao[i][j]["Conceito"] = "";
							informacao[i][j]["Ementa"] = "Ciência e Tecnologia. Aspectos sociais, econômicos, legais e profissionais de computação. Aspectos estratégicos do controle da tecnologia: produção e transferência de tecnologia. Mercado de trabalho. Aplicações da computação: educação, medicina, etc. Previsões de evolução da computação. Ética profissional. Segurança, privacidade, direitos de propriedade, acesso não autorizado. ";
							informacao[i][j]["Biografia"] = "-Davis, P.J.; Hesh, R. 'O sonho de Descartes'. Francisco Alves, 1988. \n-Roszak, T. 'O culto da informação'. Ed. Brasiliense, 1988. \n-Rifkin, J. 'O fim dos empregos'. Makron Books, 1996. \n-Dimenstein, G. 'Aprendiz do futuro: Cidadania hoje e amanhã'. Ed. Ática, 1999. \n-Kaku, M. 'Visões do futuro'. Ed. Ciência, 1997. ";
							break;
						case 63:
							informacao[i][j]["nomeOriginal"] = "Metodologia Científica no Projeto Final";
							informacao[i][j]["nome"] = "Metodoligia Cientifica\nno Projeto Final";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = "10845";
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 118;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Dar aos alunos conhecimentos sobre o método científico, visando, no nível teórico, leva-los a entender os princípios da ciência e no nível prático, induzir a construção e redação de trabalhos de pesquisa. Ao final do período o aluno deve elaborar o ante-projeto do Projeto Final e ter encaminhado a elaboração da dissertação";
							informacao[i][j]["Conceito"] = "";
							informacao[i][j]["Ementa"] = "Estatuto da ciência. O método científico. A verdade científica. Três paradigmas na pesquisa: Descartes, Popper e Kuhn. Designs de pesquisa. Pesquisa quantitativa: pesquisa experimental e pesquisa não experimental (expost-facto). Pesquisa qualitativa: estudos experimentais, estudos exploratórios, estudo de caso. O Problema de Pesquisa, as Hipóteses e as Variáveis. Coleta e interpretação de dados. Análise dos resultados. Limites da generalização dos resultados. O Projeto e o Relatório de Pesquisa: Principais Etapas. Elaboração de um Projeto de Pesquisa.";
							informacao[i][j]["Biografia"] = "-Kuhn, Thomas. 'A Estrutura das Revoluções Científicas', 5ª ed. São Paulo: Perspectiva, 1997. \n-Castro, Cláudio de Moura, 'A Prática da Pesquisa', São Paulo: McGraw-Hill do Brasil, 1978. \n-Cervo, Amado Luiz e Bervian, Pedro Alcino. 'Metodologia Científica: para uso de estudantes universitários', 3ª ed. São Paulo: McGraw-Hill, 1996. \n-Demo, Pedro. 'Introdução à  Metodologia da Ciência'. 2ª ed. São Paulo: Atlas, 1995. \n-Eco, Umberto. 'Como se faz uma tese', São Paulo: Perspectiva, 1996. \n-Lakatos, E. Maria; Marconi, M. de Andrade. 'Metodologia Científica', SÃ£o Paulo: Atlas, 2000. ";
							break;
						case 64:
							informacao[i][j]["nomeOriginal"] = "Redes de Computadores I";
							informacao[i][j]["nome"] = "Redes de\nComputadores 1";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = "10846";
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 54;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Sistemas Operacionais 2";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Ao final do período, o aluno deverá ser capaz de entender e elaborar os conceitos envolvidos no desenvolvimento de sistemas de redes de computadores, podendo entender os principais problemas que surgem, as principais propostas de soluções destes problemas, acompanhar mudanças de tecnologia na área.";
							informacao[i][j]["Conceito"] = "Conceitos sobre Sistemas Operacionais. Linguagem de Programação de Alto Nível. Cálculo. Desejável familiaridade com técnicas de Série de Fourier, Transformada de Laplace e Processos Estocásticos. ";
							informacao[i][j]["Ementa"] = "Introdução a redes de computadores: transmissão, topologias, classificações, técnicas de comutação, modelo em camadas, modelo OSI, modelo TCP/IP. Estudo de caso. Nível físico: meios de transmissão, padrões. Camada de enlace: subcamada de acesso ao meio. Camada de rede: roteamento e protocolos. Camada de transporte: protocolos. Dispositivos, equipamentos e cabeamento. Camada de aplicação: serviços e protocolos.";
							informacao[i][j]["Biografia"] = "-Andrews. S. Tanembaum, “Rede de Computadores”, 3ª edição, Ed. Campus, 2003. \n-Luiz Fernando Soares, Guido Lemos e Sergio Colcher, “Das Lans, Mans e Wans às Redes ATM”, Ed. Campus, 2ª Edição, 1995. ";
							break;
						case 65:
							informacao[i][j]["nomeOriginal"] = "Arquiteturas Avançadas de Computadores";
							informacao[i][j]["nome"] = "Arquiteturas\nAvancadas de Comp.";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = "10847";
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 45;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Arquitetura de Computadores 2";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Ao final do período o aluno deverá ser capaz de entender os conceitos e técnicas de paralelismo no nível de instruções, no projeto de processadores implementados por técnicas de pipelining e superescalares. Ele também deverá dominar conceitos e técnicas utilizados no desenvolvimento de sistemas de arquitetura paralela e distribuída.";
							informacao[i][j]["Conceito"] = "Os alunos devem ter familiaridades com conceitos fundamentais abordados em arquitetura de computadores convencionais, incluindo o projeto de desenvolvimento de processadores, as possíveis hierarquias de memória e do sistema de entrada e saída de dados.";
							informacao[i][j]["Ementa"] = "Introdução ao pipelining avançado e paralelismo no nível das instruções básicas. Processadores vetoriais. Processadores superescalares. Projeto de sistemas avançados de memória. Processamento paralelo e distribuído. Sistemas de interconexão.";
							informacao[i][j]["Biografia"] = "-D. A. Patterson and J. L. Hennessy, “ Computer Organization & Design, The Hardware Software Interface” , Morgan Kauffman Publishers, 2005. Ed. Campus. \n-David. A. Patterson and John. L. Hennesy, “Organização e Projetos de Computadores: A Interface de Hardware e Software”, Ed. Campus, 2005. ";
							break;
						case 72:
							informacao[i][j]["nomeOriginal"] = "Projeto Final";
							informacao[i][j]["nome"] = "Projeto Final";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = "10848";
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 63;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Metodologia Cientifica";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "Ao final do período o aluno deverá ter concluído uma monografia completa sobre algum tópico relevante na área de Ciência da Computação, utilizando técnicas aprendidas ao longo do curso e as metodologias ensinadas na disciplina METODOLOGIA CIENTÍFICA NO PROJETO FINAL";
							informacao[i][j]["Conceito"] = "Os conceitos necessários para realizar esta disciplina incluem: as disciplinas básicas e da área tecnológica do curso, além das metodologias de pesquisa, que são utilizadas no desenvolvimento do projeto de final de curso. ";
							informacao[i][j]["Ementa"] = "Ementa aberta. Desenvolvimento do Projeto Final, cujo conteúdo é definido pelo Professor Orientador em conjunto com o aluno. ";
							informacao[i][j]["Biografia"] = "";
							break;
						case 73:
							informacao[i][j]["nomeOriginal"] = "Sistemas Distribuídos";
							informacao[i][j]["nome"] = "Sistemas\nDistribuidos";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "04";
							informacao[i][j]["codigo"] = "10849";
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = 44;
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "Sistemas Operacionais 1";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = " O objetivo desta disciplina é fornecer ao aluno conhecimentos dos princípios e práticas de projetos de sistemas distribuídos, esperando que possam avaliar os sistemas existentes e projetar novos sistemas. ";
							informacao[i][j]["Conceito"] = "Conceitos sobre Sistemas Operacionais. Estruturas de Dados. Linguagem de Programação de Alto Nível e Orientada a Objetos. Conceitos sobre Redes de Computadores";
							informacao[i][j]["Ementa"] = "Introdução aos sistemas distribuídos: técnicas básicas, paradigmas de interação entre processos, classes de aplicações paralelas e distribuídas. Serviços Básicos: diretório, descoberta, localização e gerenciamento de recursos, segurança, transações, e qualidade de serviço (QoS). Ferramentas e suporte para desenvolvimento de aplicações paralelas e distribuídas: bibliotecas, linguagens e middleware. Estudo de casos. ";
							informacao[i][j]["Biografia"] = "-G. Coulouris, J. Dollimore and T. Kidberg,”Distributed Systems: Concepts and Design”, Addison-Wesley. \n-A. Tanembaum e M. van Stten, “Distributed Systems: Principles and Paradigms”, Prentice Hall, 2002. \n-K.P. Birman, “Building Secure and Reliable Network Applications”, Manning Publications Co., 1996.";
							break;
						default:
							informacao[i][j]["nomeOriginal"] = "!";
							informacao[i][j]["nome"] = "Eletiva";
							informacao[i][j]["instituto"] = "IME";
							informacao[i][j]["departamento"] = "";
							informacao[i][j]["codigo"] = "          ";
							informacao[i][j]["creditos"] = 4;
							informacao[i][j]["cargaHoraria"] = 60;
							informacao[i][j]["TravaCreditos"] = 0;
							informacao[i][j]["IdPreRequisito1"] = "";
							informacao[i][j]["IdPreRequisito2"] = "";
							informacao[i][j]["NomePreRequisito1"] = "";
							informacao[i][j]["NomePreRequisito2"] = "";
							informacao[i][j]["Objetivo"] = "";
							informacao[i][j]["Conceito"] = "";
							informacao[i][j]["Ementa"] = "";
							informacao[i][j]["Biografia"] = "";
							break;
						}	
						
					informacao[i][j]["texto1"] = new PointText({
						point: disciplina[i][j].bounds.center + [0,-6],
						content: informacao[i][j]["nome"],
						justification: 'center',
						fontSize: 11,
						fillColor: corLetraACursar
					});
					informacao[i][j]["texto2"] = new PointText({
						point: disciplina[i][j].bounds.bottomCenter + [0,-2],
						content: informacao[i][j]["instituto"]+informacao[i][j]["departamento"]+"-"+informacao[i][j]["codigo"]+"    "+informacao[i][j]["creditos"]+"    "+informacao[i][j]["cargaHoraria"],
						justification: 'center',
						fontSize: 9,
						fillColor: corLetraACursar
					});
					var divisao = new Path();
					divisao.strokeColor = corBordas;
					divisao.add(new Point(disciplina[i][j].bounds.leftCenter + [0,disciplina[i][j].bounds.height/4]), new Point(disciplina[i][j].bounds.rightCenter + [0,disciplina[i][j].bounds.height/4]));
					
					disciplina[i][j].selected = false;
					console.log(disciplina[i][j]);
					
					// DESENHAR SETAS DO FLUXOGRAMA
					
					var grossuraSetas = 2.5;
					var corSetas = corBordas;
					if((j==0 && i==0)||(j==1&&(i!=2 && i!=3 && i!=5 && i!=6 && i!=7))||(j==2&&(i==2 || i==3))||(j==3 && i==3)||(j==4&&(i!=2 && i!=6 && i!=7))){
						var ponto1 = new Point( disciplina[i][j].bounds.rightCenter );
						var ponto2 = new Point( disciplina[i][j].bounds.rightCenter ) + [20,0];
						var ponto3 = new Point( disciplina[i][j].bounds.rightCenter ) + [20,-4];
						var ponto4 = new Point( disciplina[i][j].bounds.rightCenter ) + [30,0];
						var ponto5 = new Point( disciplina[i][j].bounds.rightCenter ) + [20,4];
						var ponto6 = new Point( disciplina[i][j].bounds.rightCenter ) + [20,0];
						var seta1 = new Path();
						seta1.strokeWidth = grossuraSetas;
						seta1.strokeColor = corSetas;
						seta1.add(ponto1, ponto2, ponto3, ponto4, ponto5,ponto6);
					}
					if((j==3 && i==1)||(j==3 && i==6)){
						var ponto1 = new Point( disciplina[i][j].bounds.rightCenter );
						var ponto2 = new Point( disciplina[i][j].bounds.rightCenter + [15,0]);
						var ponto3 = new Point( disciplina[i][j].bounds.rightCenter + [15,-30-disciplina[i][j].bounds.height]);
						var ponto4 = new Point( disciplina[i][j].bounds.rightCenter + [20,-30-disciplina[i][j].bounds.height]);
						var ponto5 = new Point( disciplina[i][j].bounds.rightCenter ) + [20,-34-disciplina[i][j].bounds.height];
						var ponto6 = new Point( disciplina[i][j].bounds.rightCenter ) + [30,-30-disciplina[i][j].bounds.height];
						var ponto7 = new Point( disciplina[i][j].bounds.rightCenter ) + [20,-26-disciplina[i][j].bounds.height];
						var ponto8 = new Point( disciplina[i][j].bounds.rightCenter ) + [20,-30-disciplina[i][j].bounds.height];
						var seta1 = new Path();
						seta1.strokeWidth = grossuraSetas;
						seta1.strokeColor = corSetas;
						seta1.add(ponto1, ponto2, ponto3, ponto4, ponto5,ponto6, ponto7, ponto8);
					}
					if(j==4 && i==0){// Fundamentos -> AED 1
						var ponto1 = new Point( disciplina[i][j].bounds.rightCenter + [0,-7]);
						var ponto2 = new Point( disciplina[i][j].bounds.rightCenter + [15,-7]);
						var ponto3 = new Point( disciplina[i][j].bounds.rightCenter + [15,-30-disciplina[i][j].bounds.height]);
						var ponto4 = new Point( disciplina[i][j].bounds.rightCenter + [20,-30-disciplina[i][j].bounds.height]);
						var ponto5 = new Point( disciplina[i][j].bounds.rightCenter ) + [20,-34-disciplina[i][j].bounds.height];
						var ponto6 = new Point( disciplina[i][j].bounds.rightCenter ) + [30,-30-disciplina[i][j].bounds.height];
						var ponto7 = new Point( disciplina[i][j].bounds.rightCenter ) + [20,-26-disciplina[i][j].bounds.height];
						var ponto8 = new Point( disciplina[i][j].bounds.rightCenter ) + [20,-30-disciplina[i][j].bounds.height];
						var seta1 = new Path();
						seta1.strokeWidth = grossuraSetas;
						seta1.strokeColor = corSetas;
						seta1.add(ponto1, ponto2, ponto3, ponto4, ponto5,ponto6, ponto7, ponto8);
					}
					if((j==1 && i==0)||(j==4 && i==3)){
						var ponto1 = new Point( disciplina[i][j].bounds.rightCenter + [0,7]);
						var ponto2 = new Point( disciplina[i][j].bounds.rightCenter + [15,7]);
						var ponto3 = new Point( disciplina[i][j].bounds.rightCenter + [15,30+disciplina[i][j].bounds.height]);
						var ponto4 = new Point( disciplina[i][j].bounds.rightCenter + [20,30+disciplina[i][j].bounds.height]);
						var ponto5 = new Point( disciplina[i][j].bounds.rightCenter ) + [20,34+disciplina[i][j].bounds.height];
						var ponto6 = new Point( disciplina[i][j].bounds.rightCenter ) + [30,30+disciplina[i][j].bounds.height];
						var ponto7 = new Point( disciplina[i][j].bounds.rightCenter ) + [20,26+disciplina[i][j].bounds.height];
						var ponto8 = new Point( disciplina[i][j].bounds.rightCenter ) + [20,30+disciplina[i][j].bounds.height];
						var seta1 = new Path();
						seta1.strokeWidth = grossuraSetas;
						seta1.strokeColor = corSetas;
						seta1.add(ponto1, ponto2, ponto3, ponto4, ponto5,ponto6, ponto7, ponto8);
					}
					if((j==5 && i==1)||(j==5 && i==4)){// F�sica 1 -> F�sica 2     e   Arq 2 -> AAC
						var ponto1 = new Point( disciplina[i][j].bounds.rightCenter + [0,-7]);
						var ponto2 = new Point( disciplina[i][j].bounds.rightCenter + [15,-7]);
						var ponto3 = new Point( disciplina[i][j].bounds.rightCenter + [15, -10-disciplina[i][j].bounds.height/2]);
						var ponto4 = new Point( disciplina[i][j].bounds.rightCenter + [45+disciplina[i][j].bounds.width, -10-disciplina[i][j].bounds.height/2]);
						var ponto5 = new Point( disciplina[i][j].bounds.rightCenter + [45+disciplina[i][j].bounds.width, 0]);

						var ponto6 = new Point( disciplina[i][j].bounds.rightCenter + [50+disciplina[i][j].bounds.width,0]);
						var ponto7 = new Point( disciplina[i][j].bounds.rightCenter ) + [50+disciplina[i][j].bounds.width,4];
						var ponto8 = new Point( disciplina[i][j].bounds.rightCenter ) + [60+disciplina[i][j].bounds.width,0];
						var ponto9 = new Point( disciplina[i][j].bounds.rightCenter ) + [50+disciplina[i][j].bounds.width,-4];
						var ponto10 = new Point( disciplina[i][j].bounds.rightCenter ) + [50+disciplina[i][j].bounds.width,0];
						var seta1 = new Path();
						seta1.strokeWidth = grossuraSetas;
						seta1.strokeColor = corSetas;
						seta1.add(ponto1, ponto2, ponto3, ponto4, ponto5,ponto6, ponto7, ponto8, ponto9, ponto10);
					}
					if((j==1 && i==1)||(j==4 && i==1)){// Calc 2-> C�lc 4    e   LP 1 -> Arq 1
						var ponto1 = new Point( disciplina[i][j].bounds.rightCenter + [0,7]);
						var ponto2 = new Point( disciplina[i][j].bounds.rightCenter + [15,7]);
						var ponto3 = new Point( disciplina[i][j].bounds.rightCenter + [15, 12+disciplina[i][j].bounds.height/2]);
						var ponto4 = new Point( disciplina[i][j].bounds.rightCenter + [45+disciplina[i][j].bounds.width, 12+disciplina[i][j].bounds.height/2]);
						var ponto5 = new Point( disciplina[i][j].bounds.rightCenter + [45+disciplina[i][j].bounds.width, 0]);

						var ponto6  = new Point( ponto5 + [5,0]);
						var ponto7  = new Point( ponto6 + [0,-4]);
						var ponto8  = new Point( ponto7 + [10,4]);
						var ponto9  = new Point( ponto8 + [-10,4]);
						var ponto10 = new Point( ponto9 + [0,-4]);
						var seta1 = new Path();
						seta1.strokeWidth = grossuraSetas;
						seta1.strokeColor = corSetas;
						seta1.add(ponto1, ponto2, ponto3, ponto4, ponto5,ponto6, ponto7, ponto8, ponto9, ponto10);
					}
					if(j==5 && i==2){// Teoria -> Compiladores
						var ponto1 = new Point( disciplina[i][j].bounds.bottomCenter + [0,0]);
						var ponto2 = new Point( disciplina[i][j].bounds.bottomCenter + [0,15]);
						var ponto3 = new Point( disciplina[i][j].bounds.bottomCenter + [(30+disciplina[i][j].bounds.width)*2.5,15]);
						var ponto4 = new Point( disciplina[i][j].bounds.bottomCenter + [(30+disciplina[i][j].bounds.width)*2.5,-disciplina[i][j].bounds.height/2]);

						var ponto5 = new Point( disciplina[i][j].bounds.bottomCenter + [5+(30+disciplina[i][j].bounds.width)*2.5,-disciplina[i][j].bounds.height/2]);
						var ponto6 = new Point( disciplina[i][j].bounds.bottomCenter ) + [5+(30+disciplina[i][j].bounds.width)*2.5,+4-disciplina[i][j].bounds.height/2];
						var ponto7 = new Point( disciplina[i][j].bounds.bottomCenter ) + [5+10+(30+disciplina[i][j].bounds.width)*2.5,-disciplina[i][j].bounds.height/2];
						var ponto8 = new Point( disciplina[i][j].bounds.bottomCenter ) + [5+(30+disciplina[i][j].bounds.width)*2.5,-4-disciplina[i][j].bounds.height/2];
						var ponto9 = new Point( disciplina[i][j].bounds.bottomCenter ) + [5+(30+disciplina[i][j].bounds.width)*2.5,-disciplina[i][j].bounds.height/2];
						var seta1 = new Path();
						seta1.strokeWidth = grossuraSetas;
						seta1.strokeColor = corSetas;
						seta1.add(ponto1, ponto2, ponto3, ponto4, ponto5,ponto6, ponto7, ponto8, ponto9);
					}
					if(j==4 && i==4){// SO1 -> Sist. Distribuidos
						var ponto1 = new Point( disciplina[i][j].bounds.rightCenter + [0,-7]);
						var ponto2 = new Point( disciplina[i][j].bounds.rightCenter + [15,-7]);
						var ponto3 = new Point( disciplina[i][j].bounds.rightCenter + [15,-15-disciplina[i][j].bounds.height/2]);
						var ponto4 = new Point( disciplina[i][j].bounds.rightCenter + [15+ 2*(30+disciplina[i][j].bounds.width),-15-disciplina[i][j].bounds.height/2]);
						var ponto5 = new Point( disciplina[i][j].bounds.rightCenter + [15+ 2*(30+disciplina[i][j].bounds.width),-45-disciplina[i][j].bounds.height/2]);
						
						var ponto6  = new Point( ponto5 + [5,0]);
						var ponto7  = new Point( ponto6 + [0,-4]);
						var ponto8  = new Point( ponto7 + [10,4]);
						var ponto9  = new Point( ponto8 + [-10,4]);
						var ponto10 = new Point( ponto9 + [0,-4]);
						var seta1 = new Path();
						seta1.strokeWidth = grossuraSetas;
						seta1.strokeColor = corSetas;
						seta1.add(ponto1, ponto2, ponto3, ponto4, ponto5,ponto6, ponto7, ponto8, ponto9, ponto10);
					}
					if(j==4 && i==1){// LP1 -> Estruturas de Linguagens
						var ponto1 = new Point( disciplina[i][j].bounds.rightCenter + [0,-7]);
						var ponto2 = new Point( disciplina[i][j].bounds.rightCenter + [15,-7]);
						var ponto3 = new Point( disciplina[i][j].bounds.rightCenter + [15,-15-disciplina[i][j].bounds.height/2]);
						var ponto4 = new Point( disciplina[i][j].bounds.rightCenter + [15+ 2*(30+disciplina[i][j].bounds.width),-15-disciplina[i][j].bounds.height/2]);
						var ponto5 = new Point( disciplina[i][j].bounds.rightCenter + [15+ 2*(30+disciplina[i][j].bounds.width),-45-(30+disciplina[i][j].bounds.height)*3.5]);
						
						var ponto6  = new Point( ponto5 + [5,0]);
						var ponto7  = new Point( ponto6 + [0,-4]);
						var ponto8  = new Point( ponto7 + [10,4]);
						var ponto9  = new Point( ponto8 + [-10,4]);
						var ponto10 = new Point( ponto9 + [0,-4]);
						var seta1 = new Path();
						seta1.strokeWidth = grossuraSetas;
						seta1.strokeColor = corSetas;
						seta1.add(ponto1, ponto2, ponto3, ponto4, ponto5,ponto6, ponto7, ponto8, ponto9, ponto10);
					}
					if(j==1 && i==1){// C�lculo 2 -> Otm. Combinatoria
						var ponto1 = new Point( disciplina[i][j].bounds.rightCenter + [0,-7]);
						var ponto2 = new Point( disciplina[i][j].bounds.rightCenter + [15,-7]);
						var ponto3 = new Point( disciplina[i][j].bounds.rightCenter + [15,-10-disciplina[i][j].bounds.height/2]);
						var ponto4 = new Point( disciplina[i][j].bounds.rightCenter + [15+ 3*(30+disciplina[i][j].bounds.width),-10-disciplina[i][j].bounds.height/2]);
						var ponto5 = new Point( disciplina[i][j].bounds.rightCenter + [15+ 3*(30+disciplina[i][j].bounds.width),-45-disciplina[i][j].bounds.height/2]);
						
						var ponto6  = new Point( ponto5 + [5,0]);
						var ponto7  = new Point( ponto6 + [0,-4]);
						var ponto8  = new Point( ponto7 + [10,4]);
						var ponto9  = new Point( ponto8 + [-10,4]);
						var ponto10 = new Point( ponto9 + [0,-4]);
						var seta1 = new Path();
						seta1.strokeWidth = grossuraSetas;
						seta1.strokeColor = corSetas;
						seta1.add(ponto1, ponto2, ponto3, ponto4, ponto5,ponto6, ponto7, ponto8, ponto9, ponto10);
					}			
					if(j==1 && i==0){// Calculo 1 -> C�lc. Num�rico
						var ponto1 = new Point( disciplina[i][j].bounds.rightCenter + [0,-7]);
						var ponto2 = new Point( disciplina[i][j].bounds.rightCenter + [15,-7]);
						var ponto3 = new Point( disciplina[i][j].bounds.rightCenter + [15,-20-disciplina[i][j].bounds.height/2]);
						var ponto4 = new Point( disciplina[i][j].bounds.rightCenter + [15+ 2*(30+disciplina[i][j].bounds.width),-20-disciplina[i][j].bounds.height/2]);
						var ponto5 = new Point( disciplina[i][j].bounds.rightCenter + [15+ 2*(30+disciplina[i][j].bounds.width),-45-disciplina[i][j].bounds.height/2]);
						
						var ponto6  = new Point( ponto5 + [5,0]);
						var ponto7  = new Point( ponto6 + [0,-4]);
						var ponto8  = new Point( ponto7 + [10,4]);
						var ponto9  = new Point( ponto8 + [-10,4]);
						var ponto10 = new Point( ponto9 + [0,-4]);
						var seta1 = new Path();
						seta1.strokeWidth = grossuraSetas;
						seta1.strokeColor = corSetas;
						seta1.add(ponto1, ponto2, ponto3, ponto4, ponto5,ponto6, ponto7, ponto8, ponto9, ponto10);
					}
					if(j==0 && i==1){// Algebra Linear -> Otm. Combinatoria
						var ponto1 = new Point( disciplina[i][j].bounds.rightCenter + [0,-7]);
						var ponto2 = new Point( disciplina[i][j].bounds.rightCenter + [15,-7]);
						var ponto3 = new Point( disciplina[i][j].bounds.rightCenter + [15,-5-disciplina[i][j].bounds.height/2]);
						var ponto4 = new Point( disciplina[i][j].bounds.rightCenter + [15+ 3*(30+disciplina[i][j].bounds.width),-5-disciplina[i][j].bounds.height/2]);
						var ponto5 = new Point( disciplina[i][j].bounds.rightCenter + [15+ 3*(30+disciplina[i][j].bounds.width),-30+disciplina[i][j].bounds.height/2]);
						
						var ponto6  = new Point( ponto5 + [5,0]);
						var ponto7  = new Point( ponto6 + [0,-4]);
						var ponto8  = new Point( ponto7 + [10,4]);
						var ponto9  = new Point( ponto8 + [-10,4]);
						var ponto10 = new Point( ponto9 + [0,-4]);
						var seta1 = new Path();
						seta1.strokeWidth = grossuraSetas;
						seta1.strokeColor = corSetas;
						seta1.add(ponto1, ponto2, ponto3, ponto4, ponto5,ponto6, ponto7, ponto8, ponto9, ponto10);
					}					
				};
			};
		};
		
		// Pintar Disciplinas
		var qtdEletivas = document.getElementById('qtdEletivas').innerHTML;
		var qtdAprovada = document.getElementById('qtdAprovacao').innerHTML;
		var listagem = document.getElementById('listagem').innerHTML;
		listagem = listagem.split("#");
		for (i=0; i<8; i++){
			for (j=0; j<7; j++){
				if (!(((i==0 || i==7)&& j==5 ) || (i!=4 && j==6))){
					if((informacao[i][j]["nomeOriginal"]=="!") && (qtdEletivas>0)){// SE (é eletiva E sobrou eletivas)
						disciplina[i][j].fillColor = corCursada;//pintar caixinha
						informacao[i][j]["texto1"].fillColor = corLetraCursada;//pintar letrinhas
						informacao[i][j]["texto2"].fillColor = corLetraCursada;//pintar letrinhas
						qtdEletivas--;
					}
					for(var k=2; k<qtdAprovada+0; k++){	//ler cada disciplina aprovada
						if(listagem[k]==informacao[i][j]["nomeOriginal"]){	// Se (nomes iguais)
							disciplina[i][j].fillColor = corCursada;//pintar caixinha
							informacao[i][j]["texto1"].fillColor = corLetraCursada;//pintar letrinhas
							informacao[i][j]["texto2"].fillColor = corLetraCursada;//pintar letrinhas
						}
					};
				}
			};
		};
		
		// Interação do Mouse
		var click = new Point();
		var posicao = new Point();
		function onMouseUp(event) {
			click = event.point % (espaco + disciplina[0][0].bounds.size);
			posicao = (event.point / (espaco + disciplina[0][0].bounds.size));
			posicao = posicao.floor(posicao);
			click.y-=7;
			if(document.getElementById('pop').style.display=='none'){
				if(((click.x < disciplina[0][0].bounds.width)&&(click.y < disciplina[0][0].bounds.height))&&(((posicao.x<=7)&&(posicao.y<=5))||(posicao==[4,6]))&&((posicao!=[0,5])&&(posicao!=[7,5]))){ // Se clique dentro dos limites do Retângulo Disciplina...
					document.getElementById('pop').style.display='block';
					
					document.getElementById("DetalhesNome").innerHTML=informacao[posicao.x][posicao.y]["nomeOriginal"];
					document.getElementById("DetalhesObjetivoConteudo").innerHTML=informacao[posicao.x][posicao.y]["Objetivo"];
					document.getElementById("DetalhesCreditosConteudo").innerHTML=informacao[posicao.x][posicao.y]["creditos"];
					document.getElementById("DetalhesCodigoConteudo").innerHTML=informacao[posicao.x][posicao.y]["codigo"];
					document.getElementById("DetalhesCargaHorariaConteudo").innerHTML=informacao[posicao.x][posicao.y]["cargaHoraria"];
					document.getElementById("DetalhesPreRequisitoConteudo1").innerHTML=informacao[posicao.x][posicao.y]["NomePreRequisito1"];
					document.getElementById("DetalhesPreRequisitoConteudo2").innerHTML=informacao[posicao.x][posicao.y]["NomePreRequisito2"];
					document.getElementById("DetalhesEmentaConteudo").innerHTML=informacao[posicao.x][posicao.y]["Ementa"];
					document.getElementById("DetalhesBiografiaConteudo").innerHTML=informacao[posicao.x][posicao.y]["Biografia"];
					if (disciplina[posicao.x][posicao.y].fillColor=='black'){
						DetalhesStatusConteudo.content = "Concluída";
					}else if(disciplina[posicao.x][posicao.y].fillColor=="white"){
						document.getElementById("DetalhesStatusConteudo").innerHTML="A Cursar";
						if(0){
							document.getElementById("DetalhesStatusConteudo").innerHTML="Bloqueada";
						}else if(0){
							document.getElementById("DetalhesStatusConteudo").innerHTML="Habilitada";
						}
					}else{
						document.getElementById("DetalhesStatusConteudo").innerHTML="Em Andamento";
					};
					if(document.getElementById("DetalhesPreRequisitoConteudo1").innerHTML=="" && informacao[posicao.x][posicao.y]["TravaCreditos"]>0){
						document.getElementById("DetalhesPreRequisitoConteudo1").innerHTML="Trava de "+informacao[posicao.x][posicao.y]["TravaCreditos"]+" Créditos";
					}else if(document.getElementById("DetalhesPreRequisitoConteudo1").innerHTML=="" && informacao[posicao.x][posicao.y]["TravaCreditos"]==0){
						document.getElementById("DetalhesPreRequisitoConteudo1").innerHTML="< Sem Pre-requisitos >";
					}				
					
				}
			}else{
					document.getElementById('pop').style.display='none';
			}
		};
		var mousePos = new Point();
		var idDisc = new Point();
		function onMouseMove(event) {
			mousePos = event.point % (espaco + disciplina[0][0].bounds.size);
			idDisc = (event.point / (espaco + disciplina[0][0].bounds.size));
			idDisc = idDisc.floor(idDisc);
			mousePos.y-=7;
			if(document.getElementById('pop').style.display=='none'){
				if(((mousePos.x < disciplina[0][0].bounds.width)&&(mousePos.y < disciplina[0][0].bounds.height))&&(((idDisc.x<=7)&&(idDisc.y<=5))||(idDisc==[4,6]))&&((idDisc!=[0,5])&&(idDisc!=[7,5]))){ // Se clique dentro dos limites do Retângulo Disciplina...
					disciplina[idDisc.x][idDisc.y].strokeColor=corEmCurso;
				}else{
					for(var f=idDisc.x-3;f<idDisc.x+3;f++){
						if(f>=0){
							for(var g=idDisc.y-3;g<idDisc.y+3;g++){
								if(g>=0){
									disciplina[f][g].strokeColor=corSetas;
								}
							}
						}
					}
				}
			}
		};
		
	</script>
</head>
<body>
<div id='pagina'>

<?php
	class DisciplinaCursada{
		public $disciplina="-";
		public $tipo="";
		public $situacao="";
	}
	$DisciplinasCursadas=array();
	
	$qtdAprovacoes=0;
	$listaAprovacoes=array();
	$qtdEletivas=0;

	$info_per=array();
	$info_disc=array();

	$str="vazio";
	if(isset($_REQUEST['CacheHistorico2'])){
		$str=$_REQUEST['CacheHistorico2'];
		$matricula=$_REQUEST['indexMatricula2'];
		$curso=$_REQUEST['indexCurso2'];
		$curso=trim($curso);
		$nome=$_REQUEST['indexNome2'];
	}
	else{
		$str=" não chegou nenhuma REQUEST";
	}
	$str=explode("\r\n",$str);
	if($curso!="Ciência da Computação") echo"<div style='text-align:center; padding-top:10px; padding-bottom:10px;'>A Ferramenta de Fluxograma Personalizado está disponível somente para alunos de Ciência da Computação</div>";
	?>
	<canvas id="canvas" resize></canvas>
	
	<script src="http://code.highcharts.com/highcharts.js"></script>
	<script src="http://code.highcharts.com/modules/exporting.js"></script>
	<table style="text-align: left;" border="0" cellpadding="2" cellspacing="2">
		<tbody>	
	<?php
	if (isset($str[144]))
	for($i=114; ; ){ //verifica novo per�odo
		$str[$i]=trim($str[$i]);
		if((strlen($str[$i])!=6)&&($i!=114)){break;}//verifica se n�o � um per�odo
	//	echo "<br>$tam | [$i] => <b>$str[$i]</b>"; //  24 | [114] => 2011/1	
		$tam=strlen($str[$i]);
		for(;;){ //verifica nova disciplina
			$qtd_disciplinas++;
			$DisciplinasCursadas[$qtd_disciplinas]=new DisciplinaCursada();
			for($k=1;$k<=7;$k++){
				$i=$i+6;
				$str[$i]=trim($str[$i]);
				$tam=strlen($str[$i]);
			//	echo "<br>$tam | [$i] => $str[$i]";  //   29 | [120] => C?lculo I
				switch ($k) {
					case 1:
						$DisciplinasCursadas[$qtd_disciplinas]->disciplina=$str[$i];
						break;
					case 2:
						break;
					case 3:
						break;
					case 4:
						$DisciplinasCursadas[$qtd_disciplinas]->tipo=$str[$i];
						if($str[$i]=="Obrigatória")//
							$DisciplinasCursadas[$qtd_disciplinas]->tipo="obrigatória";
						else if(!($str[$i]=="E. Universal"))
							$DisciplinasCursadas[$qtd_disciplinas]->tipo="eletiva";
                                                else if($str[$i]=="E. Universal")
                                                        $DisciplinasCursadas[$qtd_disciplinas]->tipo="eletiva_universal";
						break;
					case 5:
						break;
					case 6:
						break;
					case 7:
						if((strlen($str[$i])==11)||($str[$i]=="Isento")){// Se for Aprovado ou Isento...
							$qtdAprovacoes++;
							$listaAprovacoes[$qtdAprovacoes]=$DisciplinasCursadas[$qtd_disciplinas]->disciplina;
							if($DisciplinasCursadas[$qtd_disciplinas]->tipo=="eletiva"){
								$qtdEletivas++;
							}
						}break;
				}
			}
			$i=$i+5;
			if((strlen($str[$i])==14)&&(strlen($str[$i+6])==14)){ // verifica se n�o � uma disciplina
				$i=$i+9;
				break;
			}
			else{
				if((strlen($str[$i])==10)&&(strlen($str[$i+21])==98)){// verifica se chegou ao fim do vetor
					$i=$i+9;
					break;
				}
			}
		}
	}
	$text="#";
	for($i=0;$i<=$qtdAprovacoes;$i++){
		$text=$text.$listaAprovacoes[$i]."#";
	}
	echo"<div id='listagem' style='display:none;'>$text</div>
	    <div id='qtdAprovacao' style='display:none;'>$qtdAprovacoes</div>
	    <div id='qtdEletivas' style='display:none;'>$qtdEletivas</div>
	";
?>	
	<div id="pop">
		<div class='cabecalho'><a class="linkCabecalho" href="#" onclick="document.getElementById('pop').style.display='none';">[X]</a></div>
		<div style="text-align:center;" class='titulo' id='DetalhesNome'></div>
		<div class='subtitulo'> Objetivo:</div><div class='dadosTexto' id='DetalhesObjetivoConteudo'> </div>
		<div style="margin-top:10px; float:left; width:50%; height:80px;">
			<div class='subtitulo' style="float:left;">Código:</div><div class='dados' id='DetalhesCodigoConteudo'> </div>
			<div class='subtitulo' style="float:left;">Créditos:</div><div class='dados' id='DetalhesCreditosConteudo'> </div>
			<div class='subtitulo' style="float:left;">Carga Horária:</div><div class='dados' id='DetalhesCargaHorariaConteudo'> </div>
		</div>
		<div style="margin-top:10px; float:right; width:50%; height:80px;">
			<div class='subtitulo' style="float:left;">Status:</div><div class='dados' id='DetalhesStatusConteudo'> </div>
			<div class='subtitulo'>Pré-Requisito:</div>
				<div class='dados' id='DetalhesPreRequisitoConteudo1'> </div>
				<div class='dados' id='DetalhesPreRequisitoConteudo2'> </div>
		</div>
		<div style="margin-top:10px;" class='subtitulo'>Ementa:</div><div class='dadosTexto' id='DetalhesEmentaConteudo'> </div>
		<div style="margin-top:10px;" class='subtitulo'>Biografia:</div><div class='dadosTexto' id='DetalhesBiografiaConteudo'> </div>
	</div>
</div>
</body>
</html>