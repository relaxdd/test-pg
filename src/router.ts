import { Router } from 'express'
import controller from './controller'
import NotFoundError from './errors/NotFoundError'
import validateCreateUser from './middlewares/validates/validateCreateUser'
import validateUpdateUser from './middlewares/validates/validateUpdateUser'
import validateGetUser from './middlewares/validates/validateGetUser'

const router = Router()

router.get('/users', controller.getAllUsers)
router.get('/users/:id', validateGetUser, controller.getOneUser)

router.post('/users', validateCreateUser, controller.createUser)
router.patch('/users/:id', validateUpdateUser, controller.updateUser)

router.all('*', (req, res, next) => {
  next(new NotFoundError('Неверный адрес запроса'))
})

export default router
