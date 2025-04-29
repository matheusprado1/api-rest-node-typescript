import { Router } from 'express';

import { CitiesController, PersonsController, UsersController } from './../controllers';


const router = Router();

router.get('/', (_, res) => {
  res.status(200).json({
    message: 'Welcome to the API',
    version: '1.0.0',
  });
});

router.get('/cities', CitiesController.getAllValidation, CitiesController.getAll);
router.post('/cities', CitiesController.createValidation, CitiesController.create);
router.get('/cities/:id', CitiesController.getByIdValidation, CitiesController.getById);
router.put('/cities/:id', CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete('/cities/:id', CitiesController.deleteByIdValidation, CitiesController.deleteById);

router.get('/persons', PersonsController.getAllValidation, PersonsController.getAll);
router.post('/persons', PersonsController.createValidation, PersonsController.create);
router.get('/persons/:id', PersonsController.getByIdValidation, PersonsController.getById);
router.put('/persons/:id', PersonsController.updateByIdValidation, PersonsController.updateById);
router.delete('/persons/:id', PersonsController.deleteByIdValidation, PersonsController.deleteById);

router.post('/login', UsersController.signInValidation, UsersController.signIn);
router.post('/register', UsersController.signUpValidation, UsersController.signUp);

export { router };
