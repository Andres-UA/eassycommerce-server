'use strict'

/**
 * Resourceful controller for interacting with inputs
 */
class InputController {
  /**
   * Show a list of all inputs.
   * GET inputs
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new input.
   * GET inputs/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new input.
   * POST inputs
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single input.
   * GET inputs/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing input.
   * GET inputs/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update input details.
   * PUT or PATCH inputs/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a input with id.
   * DELETE inputs/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = InputController
