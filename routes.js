import Router from './http/Router.js';
import MovieHandler from './http/handlers/MovieHandler.js';





export const router = new Router();

router.get('/movies', [MovieHandler, 'index']);
router.get('/movies/{movieId}', [MovieHandler, 'show']);
router.post('/movies', [MovieHandler, 'store']);
router.put('/movies/{movieId}', [MovieHandler, 'update']);
router.delete('/movies/{movieId}', [MovieHandler, 'delete'])



