



export default class Request {
    parseRequest(request) {
        this.method = request.method;
        this.path = request.url;
        this.body = this.#parseBody(request)
            .catch(err => {
                throw new Error(err);
            });

        return this;
    }

    #parseBody(request) {
        return new Promise((resolve, reject) => {
            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                if (body.length === 0) {
                    return resolve('');
                }

                body = Buffer.concat(body).toString();
                try {
                    resolve(JSON.parse(body));
                } catch {
                    reject('Invalid JSON payload provided.');
                }
            });
        })
    }
}