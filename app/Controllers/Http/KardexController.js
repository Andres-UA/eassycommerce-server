'use strict';

const Kardex = use('App/Models/Kardex');
const Product = use('App/Models/Product');

/**
 * Resourceful controller for interacting with kardexes
 */
class KardexController {
    /**
     * Show a list of all kardexes.
     * GET kardexes
     */
    async index({ params: { productId }, request, response, auth }) {
        const user = await auth.getUser();
        const product = await Product.find(productId);
        const kardex = await product
            .kardex()
            .with('inputs')
            .with('outputs')
            .with('stocks')
            .fetch();
        //AuthorizationService.verifyPermission(company, user)

        response.status(200).json({
            kardex: kardex,
        });
    }

    /**
     * Render a form to be used for creating a new kardex.
     * GET kardexes/create
     */
    async create({ request, response, view }) {}

    /**
     * Create/save a new kardex.
     * POST kardexes
     */
    async store({ request, response }) {}

    /**
     * Display a single kardex.
     * GET kardexes/:id
     */
    async show({ params, request, response, view }) {}

    /**
     * Render a form to update an existing kardex.
     * GET kardexes/:id/edit
     */
    async edit({ params, request, response, view }) {}

    /**
     * Update kardex details.
     * PUT or PATCH kardexes/:id
     */
    async update({ params, request, response }) {}

    /**
     * Delete a kardex with id.
     * DELETE kardexes/:id
     */
    async destroy({ params, request, response }) {}
}

module.exports = KardexController;
