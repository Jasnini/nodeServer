

    let obj= document.getElementsByClassName('list2');
    //console.log(obj);
    for (i in Object.keys(obj)){
        obj[i].onclick=function(){
            let fileName=this.firstChild.nodeValue;
            console.log(fileName);

            let xhr= new XMLHttpRequest();
            
            xhr.onload= function (){
                let text1=xhr.responseText;
                console.log(text1);
                document.getElementById('article').innerHTML=text1;
                document.getElementsByTagName('pre').className= 'prettyprint';
            };
            xhr.open("get","/front-note/"+encodeURIComponent(fileName), true);
            xhr.send(null);
        }
    }
