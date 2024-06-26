import { Router} from "express";
import { getUser, checkEmailExists, postRegister} from "../controllers/users.controller";

const usersRouter = Router();

usersRouter.get('/:id', getUser);
usersRouter.get('/mail/:mail/:password', checkEmailExists);
usersRouter.post('/register/', postRegister);

export default usersRouter;