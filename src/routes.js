import Router from './http/Router.js';
import MovieHandler from './http/handlers/MovieHandler.js';





export const router = new Router();

router.get('/api/movies', [MovieHandler, 'index']);
router.get('api//movies/{movieId}', [MovieHandler, 'show']);
router.post('/api/movies', [MovieHandler, 'store']);
router.put('/api/movies/{movieId}', [MovieHandler, 'update']);
router.delete('/api/movies/{movieId}', [MovieHandler, 'delete'])



