import $ from "jquery";

export class Render {

    ytSearch(results){
        let printString = "";
        let {items} = results;
               items.forEach((video, index)=>{
            printString += `
            <div class="ytSong"> 
                <div class="ytSong-video">
                    <iframe id="player" type="text/html" src="http://www.youtube.com/embed/${video.id.videoId}" frameborder="0"></iframe>
                </div>
            <div class="ytSong-info">
                <h4 class="ytSong-title"> ${video.snippet.title} </h4>
                <p class="ytSong-description">${video.snippet.description}</p>
                <div class="module-border-wrap">
                    <button id="${index}" class="module hvr-sweep-to-right hvr-icon-forward" type="button">Add Song   <i class="hvr-icon fas fa-arrow-right"></i> </button>
                </div>
            </div>
            </div>`
        });
        $(".search-results").html(printString);
    }

    playlist(results){
        let printString = "";
        results.forEach((item) => {
            printString += `
            <div name="${item.data().videoLink}" id="${item.id}" class="playlist-box">
                 <img src="${item.data().img}">
                <div class="info-container"
                <p class ="playlist-title"> ${item.data().videoName} </p>
                <h6 class="playlist-user"> ${item.data().user} </h6>
                </div>
                <div class="playlist-buttons">
                    <button class="delete" name="${item.id}"><i class="fas fa-trash"></i></button>
                    <button class="moveUp" name="${item.id}" value="${item.data().order}"><i class="fas fa-arrow-up"></i></button>
                    <button class="moveDown" name="${item.id}" value="${item.data().order}"><i class="fas fa-arrow-down"></i></button>
                </div>
            </div>`
        });
        $(".playlist-render").html(printString);
    }
}