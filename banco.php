<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </head>
    <body>
        <?php
        $bd = "caime526_UERJ";
        
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
            //die('<h1>Sucesso na conexão com o Banco de Dados!</h1>');
        }


        $db = mysql_select_db($bd);
        ?>


    </body>
</html>