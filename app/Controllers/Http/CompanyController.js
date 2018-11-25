"use strict"

const Company = use("App/Models/Company")
const AuthorizationService = use("App/Services/AuthorizationService")

/**
 * Resourceful controller for interacting with companies
 */
class CompanyController {
    /**
     * Show a list of all companies.
     * GET companies
     */
    async index({ request, response, auth }) {
        const user = await auth.getUser()
        const companies = await user.companies().fetch()
        //const companies = await Company.all()
        response.status(200).json({
            message: "Listado de empresas",
            data: companies,
        })
    }

    /**
     * Create/save a new company.
     * POST companies
     */
    async store({ request, response, auth }) {
        const { name, description } = request.post()
        const user = await auth.getUser()
        const company = new Company()

        company.fill({ name, description })
        await user.companies().save(company)

        response.status(201).json({
            message: "Se ha creado la empresa satisfactoriamente.",
            data: company,
        })
    }

    /**
     * Display a single company.
     * GET companies/:id
     */
    async show({ params: { id }, request, response, auth }) {
        const user = await auth.getUser()
        const company = await Company.find(id)

        AuthorizationService.verifyPermission(company, user)

        response.status(200).json({
            data: company,
        })
    }

    /**
     * Update company details.
     * PUT or PATCH companies/:id
     */
    async update({ params: { id }, request, response, auth }) {
        const user = await auth.getUser()
        const { name, description } = request.post()
        const company = await Company.find(id)

        AuthorizationService.verifyPermission(company, user)

        company.merge({ name, description })
        await company.save()

        response.status(200).json({
            message: "Empresa actualizada correctamente.",
            data: company,
        })
    }

    /**
     * Delete a company with id.
     * DELETE companies/:id
     */
    async destroy({ params: { id }, request, response, auth }) {
        const user = await auth.getUser()
        const company = await Company.find(id)

        AuthorizationService.verifyPermission(company, user)

        await company.delete()
        response.status(200).json({
            message: "Empresa eliminada correctamente.",
        })
    }
}

module.exports = CompanyController
