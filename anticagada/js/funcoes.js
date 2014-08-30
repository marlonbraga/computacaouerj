<script>
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