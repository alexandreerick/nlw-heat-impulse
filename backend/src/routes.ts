import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateMessageController } from './controllers/CreateMessageController';
import { GetLastThreeMessagesController } from './controllers/GetLastThreeMessagesController';
import { GetUserProfileController } from './controllers/GetUserProfileController';
import { ensureAuthenticated } from './middleware/ensureAuthenticated';

const router = Router();

// Authenticate User
router.post('/authenticate', new AuthenticateUserController().handle);

// Send messages
router.post('/messages', ensureAuthenticated, new CreateMessageController().handle);

// Get last three messages
router.get('/last-messages', new GetLastThreeMessagesController().handle);

// Get User Profile
router.get('/user/profile', ensureAuthenticated, new GetUserProfileController().handle);

export { router };