import { Router } from 'express';

import { postController } from '../controller';

const router = Router();

router.get('/', postController.getPosts);
router.get('/:userId', postController.getPostsUserById);
router.patch('/:id', postController.updatePostsById);

export const postRouter = router;
