/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import apiV1Routes from './api/v1/routes.js'

router.get('/', async () => {
  return {
    message: 'This is Backend',
  }
})

router.group(() => {
  apiV1Routes(router)
})
