<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </head>
    <body>
        <?php
        $bd = "caime526_UERJ";
        //$bd = "caime526";
        
        //$user = "caime526_marlon";
        //$pass = "c0mput@c@0u3rj";
        //$local = "computacaouerj.com.br";
        $user = "caime526";
        $pass = "bYZ5xx57k0";
        $local = "localhost";

        $conect = mysql_connect($local, $user, $pass);

        if (!$conect) {
            die('<h1>Falha na conexão com o Banco de Dados!</h1>');
        } else {
            echo"<h1>Sucesso na conexão com o Banco de Dados!</h1>";
        }

        if($db = mysql_select_db($bd, $conect)) echo"BD é TRUE!";
		else echo"BD é FALSE" . mysql_error();

		$criptoMatricula=md5($matricula);
		$nome="< anonimo >";
		$sql="INSERT INTO  `aluno` (`id` ,`matricula` ,`nome` ,`cr` ,`ano` ,`periodo` ,`conclusao` ,`curso` ,`atualizacao`)
			VALUES (NULL ,  '$criptoMatricula',  '$nome',  '$CR',  '$ano',  '$PeríodosUtilizados',  '$porcentagemConclusao',  '$curso',  '$anoAtual');";
		var_dump($conect);
		if (!mysql_query($sql,$conect)){
			echo "<br><br>$sql<br><br>";
			die('Erro: ' . mysql_error($conect));
		}

		
        ?>

    </body>
</html>


