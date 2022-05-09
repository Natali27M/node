import { Router } from 'express';
import { commentController } from '../controller';

const router = Router();

router.get('/', commentController.getComments);
router.get('/:userId', commentController.getCommentsByUserId);
router.post('/:action', commentController.postLikeOrDislike);

export const commentRouter = router;
