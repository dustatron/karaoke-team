import $ from "jquery";

export class Render {

    ytSearch(results){
        let printString = "";
        let {items} = results;
               items.forEach((video, index)=>{
            printString += `<div class="ytSong"> 
            <div class="ytSong--title"> ${video.snippet.title} </div>
            <div class="ytSong--video">
                <iframe id="player" type="text/html" width="640" height="390" src="http://www.youtube.com/embed/${video.id.videoId}" frameborder="0"></iframe>
            </div>
            <div class="ytSong--info">
                <div class="ytSong--description">${video.snippet.description}</div>
                <button id="${index}" class="search-btn btn btn-lg btn-info" type="button">Add Song</button>
            </div>
            </div>`
        });
        $(".search-results").html(printString);
    }

    playlist(results){
        let printString = "";
        results.forEach((item) => {
            printString += `<div id="${item.data().videoLink}" class="playlist-box">
                <div class ="playlist--title"> ${item.data().videoName} </div>
                <div class="playlist--order"> ${item.data().order} </div>
                <div class="playlist--user"> ${item.data().user} </div>
                <div class="playlist--buttons">
                    <button class="btn btn-danger delet" >delete song</button>
                    <button class="btn btn-success moveUp"><i class="fas fa-arrow-up"></i></button>
                    <button class="btn btn-success moveDown"><i class="fas fa-arrow-down"></i></button>
                </div>
            </div>`
        });
        $(".playlist-render").html(printString);
    }
}