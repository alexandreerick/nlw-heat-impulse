import { Request, Response } from 'express';
import { GetUserProfileService } from '../services/GetUserProfileService';

class GetUserProfileController {
 async handle(req: Request, res: Response) {

  const { user_id } = req;

  if (!user_id) {
    return res.json({ error: 'user_id was not provided' })
  }

  const service = new GetUserProfileService();

  const result = await service.execute(user_id);

  return res.json(result);
    
  }
}

export { GetUserProfileController }