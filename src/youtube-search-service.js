export class YtSearch {
    async getSongByTitle(song) {
        try {
            let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${song} karaoke&type=video&videoEmbeddable=true&key=AIzaSyCqqGCYK2fd9-paR8We9R99Mb_k7KdGHHI`)
            if (response.status != 200) {
                return false;
            }
            let makeJson = await response.json();
            return makeJson
        } catch (error) {
            console.log('Youtube api search error ',error);
            return false;
        }
    }
}