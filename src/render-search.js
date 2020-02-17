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
}