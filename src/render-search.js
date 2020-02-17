import $ from "jquery";

export class Render {

    ytSearch(results){
        let printString = "";
        results.items.forEach((video)=>{
            printString += `<div class="ytSong"> 
            <div class="ytSong--title"> ${video.snippet.title} </div>
            <div class="ytSong--video">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allow="accelerometer; allowfullscreen></iframe></div>
            <div class="ytSong--info">
                <div class="ytSong--description">${video.snippet.description}</div>
                <button class="btn btn-lg btn-info" type="button">Add Song<btton>
            </div>
            </div>`
        });
        $(".search-results").html(printString);
    }
}