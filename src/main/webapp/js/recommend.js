var token="";
var genres;
var main_song;
var mapCanvas=document.getElementById("recommendMap");



function pageInit(){
    mapCanvas.innerHTML="";
}

function enter(event){
    event.preventDefault();
    if (event.code === 'Enter') {
        searchSong();
        return;
    }
}
const getToken=()=>{
    var request = new XMLHttpRequest();

    var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + "MzkyNTkyOTAxNWEwNDEzNmFjZTUwOGJmOGFkNThkZjY6ZTJiNjUzOTVmNzBiNDUyNjk5ZGZmYzY5MThmNTI2ODQ=",
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
    };

    request.onreadystatechange=function(){
    if(this.readyState===4&&this.status===200){
        token=JSON.parse(this.responseText).access_token;
    }
    };
    request.open("POST",authOptions.url,false);
    request.setRequestHeader("Authorization",authOptions.headers.Authorization);
    request.setRequestHeader("Content-Type",'application/x-www-form-urlencoded');
    request.send('grant_type=client_credentials');

}

function searchSong(){
    pageInit();
    getToken();
    console.log("searchSong");
    var request = new XMLHttpRequest();
    var title="q="+document.getElementById("recommendSearchBar").value;
    var type="&type=track";
    var limit="&limit=1&include_external=audio";
    const options={
        url:"https://api.spotify.com/v1/search?"+title+type+limit,
        method:"get",
        headers:{
            Authorization:"Bearer "+token,
            Accept:"application/json",
            "Content-Type":'application/json',
        }
    };
    
    request.onreadystatechange=function(){
        if(this.readyState===4&&this.status===200){
            let parsedData=JSON.parse(this.responseText);
            main_song=parsedData.tracks.items[0];
            getRecommedSongs();
        }
    };
    request.open(options.method,options.url,true);
    request.setRequestHeader("Authorization",options.headers.Authorization);
    request.setRequestHeader("Accept",options.headers.Accept);
    request.setRequestHeader("Content-Type",options.headers["Content-Type"]);
    request.send();
}

function getGenres(id){
    var request = new XMLHttpRequest();
    const options={
        url:"https://api.spotify.com/v1/tracks/"+id,
        method:"get",
        headers:{
            Authorization:"Bearer "+token,
            Accept:"application/json",
            "Content-Type":'application/json',
        }
    };
    request.onreadystatechange=function(){
        if(this.readyState===4&&this.status===200){
            let parsedData=JSON.parse(this.responseText);
            genres=(parsedData.artists[0].genres===undefined)?"":parsedData.artists[0].genres.join();
            
        }
    };
    request.open(options.method,options.url,true);
    request.setRequestHeader("Authorization",options.headers.Authorization);
    request.setRequestHeader("Accept",options.headers.Accept);
    request.setRequestHeader("Content-Type",options.headers["Content-Type"]);
    request.send();
}

function getRecommedSongs(){
    var request = new XMLHttpRequest();
    var limit="limit=20";
    getGenres(main_song["id"]);
    console.log("getRecommend");
    const seeds={
        seed_artists:"&seed_artists="+main_song["artists"][0]["id"],
        seed_track:"&seed_tracks="+main_song["id"],
    }
    const options={
        url:"https://api.spotify.com/v1/recommendations?"+limit+seeds.seed_artists+seeds.seed_track,
        method:"get",
        headers:{
            Authorization:"Bearer "+token,
            Accept:"application/json",
            "Content-Type":'application/json',
        }
    };

    request.onreadystatechange=function(){
        if(this.readyState===4&&this.status===200){
            let parsedData=JSON.parse(this.responseText);
            let orig_tracks=parsedData.tracks;
            let tracks={};
            orig_tracks.map(x=>tracks[x.name]=x.external_urls.spotify);
            drawMap(tracks);
        }
    };
    request.open(options.method,options.url,true);
    request.setRequestHeader("Authorization",options.headers.Authorization);
    request.setRequestHeader("Accept",options.headers.Accept);
    request.setRequestHeader("Content-Type",options.headers["Content-Type"]);
    request.send();
}

function drawMap(tracks){
    console.log("drawMap");
    let main_node=document.createElement('div');
    main_node.innerHTML="<div>"+main_song["name"]+"</div>";
    main_node.id=main_song["name"];
    main_node.className="recommend_map_center";
    mapCanvas.appendChild(main_node);
    for(var key in tracks){
        let node=document.createElement('div');
        node.id=key;
        node.innerHTML='<div class="recommend_map_node_dot"></div><div class="recommend_map_node_title"><a href="'+tracks[key]+'" target="_blank">'+key+"</a></div>";
        node.className="recommend_map_node";
        mapCanvas.appendChild(node);
    }
    letItStar();
}

function letItStar(){
    let main_node=document.getElementById(main_song["name"]);
    let nodes=document.getElementsByClassName("recommend_map_node");
    let x=new Array(20);
    let y=new Array(20);
    main_node.style.position="relative";
    main_node.style.top=Math.floor(window.innerHeight/2)-50+"px";
    main_node.style.left=0+"px";
    console.log("main node >> "+main_node.style.top+' ,'+main_node.style.left);
    for(let i=0;i<20;i++){
        x[i]=Math.floor(Math.random()*(window.innerWidth-200)-window.innerWidth/2+50);
        y[i]=Math.floor(Math.random()*(window.innerHeight-150)-window.innerHeight/3+120);
        nodes[i].style.position="relative";
        nodes[i].style.top=y[i]+"px";
        nodes[i].style.left=x[i]+"px";
        console.log(nodes[i].style.position+': '+nodes[i].style.top+','+nodes[i].style.left);
    }
}

