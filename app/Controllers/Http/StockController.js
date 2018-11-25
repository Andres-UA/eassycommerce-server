'use strict'

/**
 * Resourceful controller for interacting with stocks
 */
class StockController {
  /**
   * Show a list of all stocks.
   * GET stocks
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new stock.
   * GET stocks/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new stock.
   * POST stocks
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single stock.
   * GET stocks/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing stock.
   * GET stocks/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update stock details.
   * PUT or PATCH stocks/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a stock with id.
   * DELETE stocks/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = StockController
