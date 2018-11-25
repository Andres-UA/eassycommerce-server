"use strict";

const Sale = use("App/Models/Sale");
const Company = use("App/Models/Company");
const Product = use("App/Models/Product");
const Kardex = use("App/Models/Kardex");
const Output = use("App/Models/Output");
const Stock = use("App/Models/Stock");

/**
 * Resourceful controller for interacting with sales
 */
class SaleController {
    /**
     * Show a list of all sales.
     * GET sales
     */
    async index({ params: { companyId }, request, response, auth }) {
        const user = await auth.getUser();
        const company = await user.company().fetch();
        const sales = await company
            .sales()
            .with("products")
            .with("outputs")
            .fetch();

        response.status(200).json({
            message: "Listado de ventas",
            sales: sales
        });
    }

    /**
     * Create/save a new sale.
     * POST sales
     */
    async store({ params: { companyId }, request, response, auth }) {
        const { total_amount, products } = request.post();
        const user = await auth.getUser();
        const company = await user.company().fetch();

        const products_id = [];
        const sale = new Sale();

        sale.fill({ total_amount });
        for (let i = 0; i < products.length; i++) {
            products_id[i] = products[i].product_id;

            const product = await Product.find(products[i].product_id);
            const kardexTotal = await product.kardex().fetch();

            // Comprobar si es la primera entrada
            const first = kardexTotal.toJSON().length === 0 ? true : false;

            // Si es la primera entrada
            if (first) {
                return response.status(200).json({
                    error: true
                });
            } else {
                const kardexTotal = await product
                    .kardex()
                    .with("stocks")
                    .fetch();
                const lastKardex = kardexTotal.toJSON();
                const lastStocks = lastKardex[lastKardex.length - 1].stocks;
                let esta = false;
                let continuar = true;
                const kardex = new Kardex();
                kardex.fill({ detail: "Venta" });
                let contador = parseInt(products[i].quantity, 10);

                for (let j = 0; j < lastStocks.length; j++) {
                    if (contador > 0) {
                        const element = lastStocks[j];
                        const valueA = parseInt(element.quantity, 10);
                        const valueB = parseInt(products[i].quantity, 10);

                        if (valueB <= valueA) {
                            const quantityA = parseInt(element.quantity, 10);
                            //const quantityB = parseInt(products[i].quantity, 10);
                            const quantityT = quantityA - contador;
                            const total = quantityT.toString();
                            element.quantity = total;

                            const totalA = parseInt(element.unit_value, 10);
                            const totalB = parseInt(element.total_value, 10);
                            const totalC = totalA * contador;
                            const totalT = totalB - totalC;
                            const totalD = totalT.toString();
                            element.total_value = totalD;

                            const outputs = new Output();
                            outputs.fill({
                                quantity: contador,
                                unit_value: element.unit_value,
                                total_value: element.unit_value * contador
                            });
                            await kardex.outputs().save(outputs);
                            await sale.outputs().save(outputs);
                            contador -= contador;
                        } else {
                            const quantityA = parseInt(element.quantity, 10);
                            //const quantityB = parseInt(products[i].quantity, 10);
                            //const quantityT = quantityA - quantityB;
                            //const total = quantityT.toString();
                            element.quantity = 0;

                            const totalA = parseInt(element.unit_value, 10);
                            //const totalB = parseInt(element.total_value, 10);
                            //const totalC = totalA * quantityB;
                            //const totalT = totalB - totalC;
                            const totalD = totalA.toString();
                            element.total_value = totalD;

                            const outputs = new Output();
                            outputs.fill({
                                quantity: quantityA,
                                unit_value: element.unit_value,
                                total_value: element.unit_value * quantityA
                            });
                            await kardex.outputs().save(outputs);
                            await sale.outputs().save(outputs);

                            contador -= quantityA;
                        }
                    }
                }

                for (let k = 0; k < lastStocks.length; k++) {
                    const element = lastStocks[k];
                    const quantityA = parseInt(element.quantity, 10);
                    if (quantityA > 0) {
                        const stocks = new Stock();
                        stocks.fill({
                            quantity: element.quantity,
                            unit_value: element.unit_value,
                            total_value: element.total_value
                        });
                        await kardex.stocks().save(stocks);
                    }
                }

                if (esta) {
                    const stocks = new Stock();
                    stocks.fill({
                        quantity: products[i].quantity,
                        unit_value: products[i].amount / products[i].quantity,
                        total_value: products[i].amount
                    });
                    await kardex.stocks().save(stocks);
                }
                await product.kardex().save(kardex);
            }
        }

        await company.sales().save(sale);

        if (products && products.length > 0) {
            await sale.products().attach(products_id, row => {
                for (let j = 0; j < products.length; j++) {
                    if (row.product_id === products[j].product_id) {
                        row.quantity = products[j].quantity;
                    }
                }
            });
            sale.products = await sale.products().fetch();
        }

        sale.outputs = await sale.outputs().fetch();

        response.status(201).json({
            message: "Se ha creado la venta satisfactoriamente.",
            sale: sale,
            error: false
        });
    }

    /**
     * Display a single sale.
     * GET sales/:id
     */
    async show({ params: { companyId, saleId }, request, response, view }) {
        //const user = await auth.getUser()
        const sale = await Sale.find(saleId);

        //AuthorizationService.verifyPermission(company, user)

        response.status(200).json({
            data: sale
        });
    }

    /**
     * Update sale details.
     * PUT or PATCH sales/:id
     */
    async update({ params: { companyId, saleId }, request, response }) {
        const { total_amount } = request.post();
        //const user = await auth.getUser();
        //const company = await Company.find(companyId);
        const sale = await Sale.find(saleId);

        sale.merge({ total_amount });
        await sale.save();

        response.status(200).json({
            message: "Se ha actualizada la venta satisfactoriamente.",
            data: sale
        });
    }

    /**
     * Delete a sale with id.
     * DELETE sales/:id
     */
    async destroy({ params: { companyId, saleId }, request, response }) {
        //const user = await auth.getUser();
        //const company = await Company.find(companyId);
        const sale = await Sale.find(saleId);

        await sale.delete();

        response.status(200).json({
            message: "Se ha eliminado la venta correctamente."
        });
    }
}

module.exports = SaleController;
