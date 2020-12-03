'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Ha-bicho Server is On' }
})

// Rotas de Doadores
Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.get('/show', 'AuthController.show').middleware(["auth"])

// Rotas de Doações
Route.post('/donations/:abrigoId/:userId', 'DonationController.store').middleware(["auth"])
Route.get('/donations', 'DonationController.index')
Route.get('/donations/:id', 'DonationController.show');

// Rotas de Pagamentos
Route.get('/payments/checkout/:id/:abrigo/:amount', 'PaymentController.checkout')

// Rotas de Abrigos
Route.resource('abrigos', 'AbrigoController').apiOnly()
Route.get('/abrigos-mapa', 'AbrigoController.mapIndex')
Route.get('/find/:email', 'AbrigoController.find').middleware(["auth"])

// Rotas de Imagens
Route.post('abrigos/:id/images', 'AbrigoImageController.store').middleware(["auth"])
Route.get('abrigo-images/:path', 'AbrigoImageController.show')
