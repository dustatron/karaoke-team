export class YtSearch {
  constructor() {
    this.errorMessage;
    this.keys = [];
    this.currentKey = 0;
  }
  async getSongByTitle(song) {
    try {
      console.log("keys", this.keys);
      let response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${song} karaoke&type=video&videoEmbeddable=true&key=${this
          .keys[this.currentKey]}`
      );
      if (response.status != 200) {
        this.errorMessage = response.status;
        return false;
      }
      let makeJson = await response.json();
      return makeJson;
    } catch (error) {
      console.log("Youtube api search error ", error);
      return false;
    }
  }
}
