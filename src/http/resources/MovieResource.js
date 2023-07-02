import JsonResource from "./JsonResource.js";




export default class MovieResource extends JsonResource {
    apply(document) {
        return {
            id: document._id,
            title: document.title,
            cast: document.cast,
            director: document.director,
            releaseDate: document.releaseDate,
            description: document.description
        };
    }
}




