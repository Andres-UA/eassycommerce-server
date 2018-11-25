'use strict';

const Product = use('App/Models/Product');
const Company = use('App/Models/Company');
const Kardex = use('App/Models/Kardex');

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
    /**
     * Show a list of all products.
     * GET products
     */
    async index({ request, response, auth }) {
        const user = await auth.getUser();

        const company = await user.company().fetch();

        const products = await company
            .products()
            .with('stocks')
            .fetch();

        response.status(200).json({
            message: 'Listado de productos',
            products: products,
        });
    }

    /**
     * Create/save a new product.
     * POST products
     */
    async store({ params: { companyId }, request, response, auth }) {
        const { name, price, description, image } = request.post();

        const user = await auth.getUser();
        const company = await user.company().fetch();
        //const kardex = new Kardex();
        const product = new Product();

        product.fill({ name, price, description, image });
        //await product.kardex().save(kardex);

        await company.products().save(product);

        response.status(201).json({
            message: 'Se ha creado el producto satisfactoriamente.',
            product: product,
        });
    }

    /**
     * Display a single product.
     * GET companies/:id/product/:id
     */
    async show({ params: { companyId, productId }, request, response, auth }) {
        //const user = await auth.getUser()
        const product = await Product.find(productId);

        //AuthorizationService.verifyPermission(company, user)

        response.status(200).json({
            data: product,
        });
    }

    /**
     * Update product details.
     * PUT or PATCH products/:id
     */
    async update({ params: { companyId, productId }, request, response, auth }) {
        const { name, description, price } = request.post();
        
        const user = await auth.getUser();
        const company = await user.company().fetch();

        const product = await Product.find(productId);

        product.merge({ name, description, price });
        await product.save();

        response.status(200).json({
            message: 'Se ha actualizada el producto satisfactoriamente.',
            data: product,
        });
    }

    /**
     * Delete a product with id.
     * DELETE products/:id
     */
    async destroy({ params: { companyId, productId }, request, response, auth }) {
        
        const user = await auth.getUser();
        const company = await user.company().fetch();

        const product = await Product.find(productId);

        await product.delete();

        response.status(200).json({
            message: 'Se ha eliminado el producto correctamente.',
        });
    }
}

module.exports = ProductController;
