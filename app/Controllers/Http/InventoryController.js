'use strict';

const Inventory = use('App/Models/Inventory');
const Company = use('App/Models/Company');

/**
 * Resourceful controller for interacting with inventories
 */
class InventoryController {
    /**
   * Show a list of all inventories.
   * GET inventories
   */
    async index({ params: { companyId }, request, response, view }) {
        const company = await Company.find(companyId);
        //const user = await auth.getUser()

        const inventory = new Inventory();
        inventory = await company.inventory().fetch();

        response.status(200).json({
            message: 'Inventario',
            data: inventory,
        });
    }

    /**
   * Render a form to be used for creating a new inventory.
   * GET inventories/create
   */
    async create({ request, response, view }) {}

    /**
   * Create/save a new inventory.
   * POST inventories
   */
    async store({ request, response }) {}

    /**
   * Display a single inventory.
   * GET inventories/:id
   */
    async show({ params, request, response, view }) {}

    /**
   * Render a form to update an existing inventory.
   * GET inventories/:id/edit
   */
    async edit({ params, request, response, view }) {}

    /**
   * Update inventory details.
   * PUT or PATCH inventories/:id
   */
    async update({ params, request, response }) {}

    /**
   * Delete a inventory with id.
   * DELETE inventories/:id
   */
    async destroy({ params, request, response }) {}
}

module.exports = InventoryController;
