import $ from "jquery";

export class Render {

    constructor() {
        this.listObj = [];
    }

    ytSearch(results) {
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

    playlist(results) {
        let printString = "";
        this.clearPlayListObj();
        results.forEach((item) => {
            let { videoLink, order, user, createdAt, videoName } = item.data()
            let videoItem = {
                docId: item.id,
                videoLink,
                order,
                user,
                createdAt,
                videoName
            }

            this.listObj.push(videoItem);
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

    roomList(rooms) {
        let printString = "";
        let formString = `
        <div class='room'>
          <form class='room-btns'>
          <input id="room-name" aria-describedby="input" class='room-add' type="text" placeholder="New Room">
          <button id="room-name-btn"  type="submit"><i class="fas fa-plus"></i></button>
        </form>
        </div>
        `
        rooms.forEach((item) => {
            printString += `
                <div class="room">
                   <h4> ${item.data().roomName} </h4>
                    <div class="room-btns">
                    <button class="show-playlist" value="${item.id}"><i class="fas fa-list"></i></button>
                    <button class="show-main-show" value="${item.id}"><i class="fas fa-play-circle"></i></button>
                    <button class="show-invite" value="${item.id}"><i class="fas fa-share-square"></i></button>
                    <button class="show-delete" value="${item.id}"><i class="fas fa-trash"></i></button>
                </div>
                <div id="share-link-${item.id}" style="display:none;">
                    <input id="${item.id}-input" type="text" value="https://karaoke-team.web.app/?${item.id}"> 
                    <button name="${item.id}" class="copy-to-clipboard"> Copy Link </button>
                </div>
                </div>
           `
        });
        $(".rooms").html(formString + printString);
    }

    clearPlayListObj(){
        this.listObj = [];
    }

    roomListListen() {
        $('.rooms--list').on('click', '.copy-to-clipboard', function () {
            let nameValue = this.name;
            let copyInput = document.getElementById(`${nameValue}-input`);
            copyInput.select();
            copyInput.setSelectionRange(0, 99999);
            document.execCommand("copy");
        });

        // $('.rooms--list').on('click', '.show-playlist', function () {
        //     console.log('click');
        // });
        $('.rooms--list').on('click', '.show-main-show', function () {
            console.log('click');
        });
        $('.rooms--list').on('click', '.show-invite', function () {
            let valueOfButton = this.value;
            $(`#share-link-${valueOfButton}`).slideToggle();
        });
    }

        
        
        
}