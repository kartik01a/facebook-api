import {Router} from 'express'

import {registerUser} from '../controllers/controller';

import {loginUser} from '../controllers/login';

import { getuserdata } from '../controllers/getUserData';

import {checkAuth, ownership} from '../middleware/checkAuthToken';

import { logout } from '../controllers/logout';

import { updateUser } from '../controllers/updateUser';

import { deleteUser } from '../controllers/deleteUsers';

import { getAllUsers } from '../controllers/getAllUsers';

import { fileUploader } from '../middleware/cloudinaryWorking';

import {upload} from "../middleware/multer"

const router = Router()

router.post('/registerUser',registerUser);
router.post('/uploadImage',upload.single('image'),fileUploader);
router.route('/loginUser').post(loginUser);
router.get('/getuserdata/:id',checkAuth, ownership, getuserdata);
router.get('/logout', logout);
router.put('/user/:id',checkAuth, ownership, updateUser);
router.delete('/user/:id',checkAuth, ownership, deleteUser);
router.get('/getAllUsers',getAllUsers )

export default router;