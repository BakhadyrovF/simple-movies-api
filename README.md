## Installation
1. Install node dependencies using npm (clean installation):
``` 
npm ci
```
2. Copy contents of `.env.example` to `.env` file:
``` 
cp .env.example .env
```
3. Change database credentials in `.env` file to your own:
```
MONGODB_DATABASE=db
MONGODB_CONNECTION_URI=mongodb://localhost:27017
```
4. Run node server (default port is 8000):
``` 
node server.js --port=8888
```
5. Now, you can access `nodejs` app at http://localhost:8888 
6. Routes list:
```
GET api/movies (read collection of documents)
POST api/movies (create a document)
GET api/movies/{movieId} (read specific document by id)
PUT api/movies/{movieId} (update specific document by id)
DELETE api/movies/{movieId} (delete specific document by id)
```