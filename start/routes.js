'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route');

Route.get('/', () => {
    return { greeting: 'Hello world in JSON' };
});

Route.group(() => {
    // Auth
    Route.post('auth/signup', 'UserController.signUp');
    Route.post('auth/signin', 'UserController.signIn');
    Route.post('auth/user', 'UserController.getUser').middleware(['auth']);

    // Companies
    Route.get('companies', 'CompanyController.index').middleware(['auth']);
    Route.get('companies/:id', 'CompanyController.show').middleware(['auth']);
    Route.post('companies', 'CompanyController.store').middleware(['auth']);
    Route.patch('companies/:id', 'CompanyController.update').middleware(['auth']);
    Route.delete('companies/:id', 'CompanyController.destroy').middleware(['auth']);

    // Products
    Route.get('products', 'ProductController.index').middleware(['auth']);
    Route.get('products/:productId', 'ProductController.show').middleware(['auth']);
    Route.post('products', 'ProductController.store').middleware(['auth']);
    Route.patch('products/:productId', 'ProductController.update').middleware(['auth']);
    Route.delete('products/:productId', 'ProductController.destroy').middleware(['auth']);

    // Sales
    Route.get('sales', 'SaleController.index').middleware(['auth']);
    Route.get('sales/:saleId', 'SaleController.show').middleware(['auth']);
    Route.post('sales', 'SaleController.store').middleware(['auth']);
    Route.patch('sales/:saleId', 'SaleController.update').middleware(['auth']);
    Route.delete('sales/:saleId', 'SaleController.destroy').middleware(['auth']);

    // Purchases
    Route.get('purchases', 'PurchaseController.index').middleware(['auth']);
    Route.get('purchases/:purchaseId', 'PurchaseController.show').middleware(['auth']);
    Route.post('purchases', 'PurchaseController.store').middleware(['auth']);
    Route.patch('purchases/:purchaseId', 'PurchaseController.update').middleware(['auth']);
    Route.delete('purchases/:purchaseId', 'PurchaseController.destroy').middleware(['auth']);

    // Inventory
    Route.get('dashboard', 'DashboardController.index').middleware(['auth']);

    // Kardex
    Route.get('product/:productId/kardex', 'KardexController.index').middleware(['auth']);
}).prefix('api');
