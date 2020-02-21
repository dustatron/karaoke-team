import $ from "jquery";

export class Render {
  constructor() {
    this.listObj = [];
    this.currentSong = {};
  }

  ytSearch(results) {
    let printString = "";
    let { items } = results;
    items.forEach((video, index) => {
      printString += `
        <div class="playlist-box"> 
          <img src="${video.snippet.thumbnails.medium.url}">
          <div class="ytSong-info">
            <p class="ytSong-title"> ${video.snippet.title} </p>
            <div class="result-button-wrap">
              <button id="${index}" class="result-button hvr-sweep-to-right hvr-icon-forward" type="button">Add Song   <i class="hvr-icon fas fa-arrow-right"></i> </button>
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
      printString += `
            <div name="${item.data().videoLink}" id="${item.id}" class="playlist-box">
                <img src="${item.data().img}">
                <div class="info-container"
                <p class ="playlist-title"> ${item.data().videoName} </p>
                <p class="playlist-user">Singer: ${item.data().user} </p>
                </div>
                <div class="playlist-buttons">
                    <button class="delete" name="${item.id}"><i class="fas fa-trash"></i></button>
                    <button class="moveUp" name="${item.id}" value="${item.data()
        .order}"><i class="fas fa-arrow-up"></i></button>
                    <button class="moveDown" name="${item.id}" value="${item.data()
        .order}"><i class="fas fa-arrow-down"></i></button>
                </div>
            </div>`;
    });
    $(".playlist-render").html(printString);
  }

  roomList(rooms) {
    let printString = "";
    let formString = `
        <div class='module-add-wrap' >
          <div class='room add'>
            <form class='room-btns'>
              <input id="room-name" aria-describedby="input" class='room-add' type="text" placeholder="New Room" autofocus required>
              <button id="room-name-btn" type="submit"><i class="add-btn fas fa-plus"></i></button>
            </form>
          </div>
        </div>`;

    // for (let i = rooms.length -1; i >= 0; i--){

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
        <div id="share-link-${item.id}" class='share-link-cont' style="display:none;">
            <input read id="${item.id}-input" type="text" class="copy-to-clipboard-input" value="https://karaoke-team.web.app/?1${item.id}"> 
            <button name="${item.id}" class="copy-to-clipboard"> <i class="fas fa-link"></i></button>
        </div>
        </div>
        `;
    });
    $(".rooms").html(formString + printString);
  }

  clearPlayListObj() {
    this.listObj = [];
  }

  updateCurrentSong() {
    this.currentSong = this.listObj[0];
    $(".current-song").html(`
    <div><h3 class="song-title">${this.currentSong.videoName}</h3></div>
    <div class="sung-by"><p><strong>Sung by: </strong>${this.currentSong.user}</p></div>`);
  }
}
