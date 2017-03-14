StartReq("site:. filetype:action",1,100);
var tmp = [];
var HerfRegExp = /http:\/\/\w.*\/|https:\/\/\w.*\//;
document.body.appendChild(document.createElement('script')).src='//code.jquery.com/jquery-1.9.1.min.js';
function StartReq(q,startpage,endpage){
    for(var i=startpage;i<=endpage;i++){
        if(i==1){
            Req("q="+encodeURIComponent(q)+"&start=100&num=100&newwindow="+i);
        }
        else{
            Req("q="+encodeURIComponent(q)+"&start="+(i*100)+"&num=100&newwindow="+i);
        }
    }
    Print(tmp);
}
function Connection(Sendtype,url,content,callback){
    if (window.XMLHttpRequest){
        var xmlhttp=new XMLHttpRequest();
    }
    else{
        var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4&&xmlhttp.status==200)
        {
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open(Sendtype,url,true);
    xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xmlhttp.send(content);
}
function Req(searchString){
    var searchurl = "https://www.google.com/search?"+searchString;
    Connection("GET",searchurl,"",function(callback){
        var result = $(callback);
        result.find('div.rc h3.r a').each(function(i,o){
            var o = $(o);
            tmp.push(o.attr('href'));
            //tmp.push(String(HerfRegExp.exec(o.attr('href'))));
        })
    })
}

function Print(tmp){
    for(var i = 0; i < tmp.length; i++) {document.write(tmp[i]+'</br>')}
}