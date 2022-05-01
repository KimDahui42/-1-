window.addEventListener('load',function(){
    let htmlElmnts=document.getElementsByTagName("*");
    Array.prototype.forEach.call(htmlElmnts,function(elmnt){
        var file=elmnt.getAttribute("include-html");
        if(file){
            var xhttp=new XMLHttpRequest();
            xhttp.onreadystatechange=function(){
                if(this.readyState===4&&this.status===200){
                    elmnt.outerHTML=this.responseText;
                }
            }
            xhttp.open("GET",file,true);
            xhttp.send();
        }
    });
});