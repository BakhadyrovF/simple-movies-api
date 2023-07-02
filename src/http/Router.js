import Response from './Response.js';


export default class Router {
    constructor() {
        this.routes = new Map();
    }

    get(path, callable) {
        this.#addRoute('GET', path, callable);
    }

    post(path, callable) {
        this.#addRoute('POST', path.startsWith('/') ? path : `/${path}`, callable);
    }

    put(path, callable) {
        this.#addRoute('PUT', path.startsWith('/') ? path : `/${path}`, callable);
    }

    delete(path, callable) {
        this.#addRoute('DELETE', path.startsWith('/') ? path : `/${path}`, callable);
    }

    async handleRequest(request) {
        if (this.#hasRoute(request.method, request.path)) {
            const requestHandler = this.#getActionOfPath(request.method, request.path);
            const handlerArguments = [request];

            const pathParameter = this.#getPathParameter(request.path);
            if (pathParameter) handlerArguments.push(pathParameter);
            let appResponse = null;

            if (Array.isArray(requestHandler)) {
                const [handler, method] = requestHandler;
                appResponse = await (new handler)[method](...handlerArguments);
            } else {
                appResponse = await requestHandler(request);
            }

            if (appResponse instanceof Response) {
                return appResponse;
            }

            return new Response(appResponse, 200);
        } else {
            return new Response({
                message: `Requested path: ${request.path} with method: ${request.method} is not found!`
            }, 404);
        }
    }

    #hasRoute(method, path) {
        return Boolean(this.#getActionOfPath(method, path));
    }

    #addRoute(method, path, callable) {
        if (this.routes.has(method)) {
            this.routes.get(method).set(path, callable);
        } else {
            this.routes.set(method, new Map().set(path, callable));
        }
    }

    #getActionOfPath(method, path) {
        if (!this.routes.has(method)) {
            return null;
        }

        if (this.routes.get(method).has(path)) {
            return this.routes.get(method).get(path);
        }

        let lastIndexOfSlash = path.lastIndexOf('/');
        let pathParameter = path.slice(lastIndexOfSlash + 1);
        if (!pathParameter) {
            return null;
        }
        let pathWithoutParameter = path.slice(0, lastIndexOfSlash);

        for (let [route] of this.routes.get(method)) {
            if (route.startsWith(pathWithoutParameter)) {
                let routeBinding = this.#getRouteBinding(route);
                if (!routeBinding) {
                    continue;
                }

                let parameterReplacedWithBinding = path.replace(pathParameter, routeBinding);
                if (parameterReplacedWithBinding === route) {
                    return this.routes.get(method).get(route);
                }
            }
        }
        return this.routes.get(method)?.get(path);
    }

    #getRouteBinding(path) {
        let bindingStartIdx = path.indexOf('{');
        let bindingEndIdx = path.indexOf('}');

        return path.slice(bindingStartIdx, bindingEndIdx + 1);
    }

    #getPathParameter(path) {
        let lastIndexOfSlash = path.lastIndexOf('/');
        let pathParameter = path.slice(lastIndexOfSlash + 1);

        return pathParameter ?? null;
    }
}