export class YtSearch {
    async getSongByTitle(song) {
        try {
            let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${song} karaoke&key=AIzaSyCqqGCYK2fd9-paR8We9R99Mb_k7KdGHHI`)
            if (response.status != 200) {
                console.log(`bad response`,response.status)
            }
            let makeJson = await response.json();
            console.log(makeJson);
            return makeJson
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}