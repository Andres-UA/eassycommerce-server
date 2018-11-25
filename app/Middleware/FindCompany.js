'use strict'

const Company = use ('App/Models/Company')

class FindCompany {
  async handle({ request, response, params: { id } }, next) {

    // call next to advance the request
    const company = await Company.find(id)

    if (!company) {
      return response.status(404).json({
        message: 'Empresa no encontrada.'
      })
    }

    request.body.company = company

    await next()
  }
}

module.exports = FindCompany
