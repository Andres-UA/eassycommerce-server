'use strict'

/**
 * Resourceful controller for interacting with outputs
 */
class OutputController {
  /**
   * Show a list of all outputs.
   * GET outputs
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new output.
   * GET outputs/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new output.
   * POST outputs
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single output.
   * GET outputs/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing output.
   * GET outputs/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update output details.
   * PUT or PATCH outputs/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a output with id.
   * DELETE outputs/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = OutputController
