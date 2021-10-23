import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateMessageController } from './controllers/CreateMessageController';
import { ensureAuthenticated } from './middleware/ensureAuthenticated';

const router = Router();

// Authenticate User
router.post('/authenticate', new AuthenticateUserController().handle);

// Send messages
router.post('/messages', ensureAuthenticated, new CreateMessageController().handle);

export { router };