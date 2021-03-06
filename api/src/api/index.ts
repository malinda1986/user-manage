import { Router } from 'express'
import user from '../modules/user/routes'
import login from '../modules/login/routes'
export default () => {
    const app = Router()
    user(app)
    login(app)

    return app
}
