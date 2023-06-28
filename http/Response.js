



export default class Response {
    constructor(data, statusCode = 200, headers = {}) {
        this.appendDefaultHeaders(headers);
        this.data = data;
        this.statusCode = statusCode;
        this.headers = headers;
    }

    appendDefaultHeaders(headers) {
        headers['Content-Type'] = 'application/json';
    }
}