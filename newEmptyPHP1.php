<html>
    <head>
        <style>
            
            
        </style>
    </head>
    <body>
        <?php
            include("funcoes.php");
            echo "<b>";
            for($i=0;$i<10;$i=$i+0.01)
                echo" | ".colorirNota($i);
            echo "</b>";
        ?>
        <div style='position:relative; top:0px; left:0px;'>
        <img src='imagens/camisa1.jpg'>
        <div style='position:absolute; top:110px; left:6px;'>
        <img src='imagens/indisponivel.jpg'>
    </body>
</html>