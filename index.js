/*global $ APIKEY*/
$(document).ready(function(){
    $.ajax({
          method: "GET",
          url: "https://newsapi.org/v2/sources",
          data: { category: "business", country: "us", language: "en", apiKey:APIKEY},
          success:function(data){
              if(data.status === "ok"){
                  console.log(data);
                  for (var i=0; i < data.sources.length; i++){
                      var source = document.createElement("OPTION");
                      source.setAttribute("value", data.sources[i].id);
                      source.innerHTML = data.sources[i].name;
                      document.getElementById('selection').appendChild(source);
                  }
                } 
            }
        });
    $('#source').submit(function(event){
        event.preventDefault();
        //alert(document.getElementById("selection").value);
        var sourceId = document.getElementById("selection").value;
        var articles = document.getElementById('list');
        while(articles.firstChild){
            articles.removeChild(articles.firstChild);
        }
        $.ajax({
          method: "GET",
          url: "https://newsapi.org/v2/top-headlines",
          data: { sources:sourceId, apiKey:APIKEY},
          success:function(data){
            if(data.status === "ok"){
                  //console.log(data);
                 }
                for (var i=0; i < data.articles.length; i++){
                      var articles = document.createElement("LI");
                      var description = document.createElement("LI");
                      articles.innerHTML = `<a href ="${data.articles[i].url}">${data.articles[i].title}</a>`;
                      description.innerHTML = data.articles[i].description;
                      document.getElementById('list').appendChild(articles);
                      document.getElementById('list').appendChild(description);
                }
            }
        });
                 
    });
    
});
