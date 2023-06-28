



export default class JsonResource {
    static collection(documents) {
        return {
            data: documents.map(document => new this().apply(document))
        }
    }
}