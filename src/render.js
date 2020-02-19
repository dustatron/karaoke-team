import $ from "jquery";

export class Render {
  constructor() {
    this.listObj = [];
  }

  ytSearch(results) {
    let printString = "";
    let { items } = results;
    items.forEach((video, index) => {
      printString += `
            <div class="ytSong"> 
                <div class="ytSong-video">
                    <iframe id="player" type="text/html" src="http://www.youtube.com/embed/${video.id
                      .videoId}" frameborder="0"></iframe>
                </div>
            <div class="ytSong-info">
                <h4 class="ytSong-title"> ${video.snippet.title} </h4>
                <p class="ytSong-description">${video.snippet.description}</p>
                <div class="module-border-wrap">
                    <button id="${index}" class="module hvr-sweep-to-right hvr-icon-forward" type="button">Add Song   <i class="hvr-icon fas fa-arrow-right"></i> </button>
                </div>
            </div>
            </div>`;
    });
    $(".search-results").html(printString);
  }

  playlist(results) {
    let printString = "";
    this.clearPlayListObj();
    results.forEach((item) => {
      let { videoLink, order, user, createdAt, videoName } = item.data();
      let videoItem = {
        docId: item.id,
        videoLink,
        order,
        user,
        createdAt,
        videoName
      };

      this.listObj.push(videoItem);
      printString += `<div name="${item.data().videoLink}" id="${item.id}" class="playlist-box">
                <div class ="playlist--title"> ${item.data().videoName} </div>
                <div class="playlist--order"> ${item.data().order} <img src="${item.data().img}"></div>
                <div class="playlist--user"> ${item.data().user} </div>
                <div class="playlist--buttons">
                    <button class="btn btn-danger delete" name="${item.id}">delete song</button>
                    <button class="btn btn-success moveUp" name="${item.id}" value="${item.data()
        .order}"><i class="fas fa-arrow-up"></i></button>
                    <button class="btn btn-success moveDown" name="${item.id}" value="${item.data()
        .order}"><i class="fas fa-arrow-down"></i></button>
                </div>
            </div>`;
    });
    $(".playlist-render").html(printString);
  }

  roomList(rooms) {
    let printString = "";
    rooms.forEach((item) => {
      printString += `<li>
                <div>
                    ${item.data().roomName} 
                    <button class="show-playlist" value="${item.id}">show-playlist</button>
                    <button class="show-main-show" value="${item.id}">go to main show</button>
                    <button class="show-invite" value="${item.id}">share link</button>
                    <button class="show-delete" value="${item.id}">Delete Room</button>
                </div>
                <div id="share-link-${item.id}" style="display:none;">
                    <input id="${item.id}-input" type="text" value="https://karaoke-team.web.app/?${item.id}"> 
                    <button name="${item.id}" class="copy-to-clipboard"> Copy Link </button>
                </div>
            </li>`;
    });
    $(".rooms--list").html(printString);
  }

  clearPlayListObj() {
    this.listObj = [];
  }
}
