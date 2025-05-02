import { Router } from 'express';

import { CitiesController, PersonsController, UsersController } from './../controllers';
import { ensureAuthenticated } from '../shared/middlewares';


const router = Router();

router.get('/', (_, res) => {
  res.status(200).json({
    message: 'Welcome to the REST API',
    version: '1.0.0',
  });
});

router.get('/cities', ensureAuthenticated, CitiesController.getAllValidation, CitiesController.getAll);
router.post('/cities', ensureAuthenticated, CitiesController.createValidation, CitiesController.create);
router.get('/cities/:id', ensureAuthenticated, CitiesController.getByIdValidation, CitiesController.getById);
router.put('/cities/:id', ensureAuthenticated, CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete('/cities/:id', ensureAuthenticated, CitiesController.deleteByIdValidation, CitiesController.deleteById);

router.get('/persons', ensureAuthenticated, PersonsController.getAllValidation, PersonsController.getAll);
router.post('/persons', ensureAuthenticated, PersonsController.createValidation, PersonsController.create);
router.get('/persons/:id', ensureAuthenticated, PersonsController.getByIdValidation, PersonsController.getById);
router.put('/persons/:id', ensureAuthenticated, PersonsController.updateByIdValidation, PersonsController.updateById);
router.delete('/persons/:id', ensureAuthenticated, PersonsController.deleteByIdValidation, PersonsController.deleteById);

router.post('/login', UsersController.signInValidation, UsersController.signIn);
router.post('/register', UsersController.signUpValidation, UsersController.signUp);

export { router };
