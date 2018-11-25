'use strict';

const Purchase = use('App/Models/Purchase');
const Company = use('App/Models/Company');
const Product = use('App/Models/Product');
const Kardex = use('App/Models/Kardex');
const Input = use('App/Models/Input');
const Stock = use('App/Models/Stock');

/**
 * Resourceful controller for interacting with purchases
 */
class PurchaseController {
    /**
     * Show a list of all purchases.
     * GET purchases
     */
    async index({ params: { companyId }, request, response, auth }) {
        const user = await auth.getUser();
        const company = await user.company().fetch();
        const purchases = await company
            .purchases()
            .with('products')
            .fetch();

        response.status(200).json({
            message: 'Listado de compras',
            purchases: purchases,
        });
    }

    /**
     * Create/save a new purchase.
     * POST purchases
     */
    async store({ params: { companyId }, request, response, auth }) {
        const { total_amount, products } = request.post();
        const user = await auth.getUser();
        const company = await user.company().fetch();

        const purchase = new Purchase();

        purchase.fill({ total_amount });
        await company.purchases().save(purchase);

        const products_id = [];

        for (let i = 0; i < products.length; i++) {
            products_id[i] = products[i].product_id;
            const product = await Product.find(products[i].product_id);
            const kardexTotal = await product.kardex().fetch();

            // Comprobar si es la primera entrada
            const first = kardexTotal.toJSON().length === 0 ? true : false;

            // Si es la primera entrada
            if (first) {
                const kardex = new Kardex();
                kardex.fill({ detail: 'Compra' });
                const inputs = new Input();
                inputs.fill({
                    quantity: products[i].quantity,
                    unit_value: products[i].amount / products[i].quantity,
                    total_value: products[i].amount,
                });
                await kardex.inputs().save(inputs);

                const stocks = new Stock();
                stocks.fill({
                    quantity: products[i].quantity,
                    unit_value: products[i].amount / products[i].quantity,
                    total_value: products[i].amount,
                });
                await kardex.stocks().save(stocks);

                await product.kardex().save(kardex);
            } else {
                const kardex = new Kardex();
                kardex.fill({ detail: 'Compra' });
                const inputs = new Input();
                inputs.fill({
                    quantity: products[i].quantity,
                    unit_value: products[i].amount / products[i].quantity,
                    total_value: products[i].amount,
                });
                await kardex.inputs().save(inputs);

                const kardexTotal = await product
                    .kardex()
                    .with('stocks')
                    .fetch();
                const lastKardex = kardexTotal.toJSON();
                const lastStocks = lastKardex[lastKardex.length - 1].stocks;
                let esta = false;
                lastStocks.forEach((element) => {
                    const valueA = parseFloat(products[i].amount / products[i].quantity);
                    const valueB = parseFloat(element.unit_value);
                    if (valueA === valueB) {
                        const quantityA = parseInt(element.quantity, 10);
                        const quantityB = parseInt(products[i].quantity, 10);
                        const quantityT = quantityA + quantityB;
                        const total = quantityT.toString();
                        element.quantity = total;

                        const totalA = parseInt(element.total_value, 10);
                        const totalB = parseInt(products[i].amount, 10);
                        const totalT = totalA + totalB;
                        const totalD = totalT.toString();
                        element.total_value = totalD;

                        esta = true;
                    }
                });

                for (let i = 0; i < lastStocks.length; i++) {
                    const element = lastStocks[i];
                    const stocks = new Stock();
                    stocks.fill({
                        quantity: element.quantity,
                        unit_value: element.unit_value,
                        total_value: element.total_value,
                    });
                    await kardex.stocks().save(stocks);
                }

                if (!esta) {
                    const stocks = new Stock();
                    stocks.fill({
                        quantity: products[i].quantity,
                        unit_value: products[i].amount / products[i].quantity,
                        total_value: products[i].amount,
                    });
                    await kardex.stocks().save(stocks);
                }
                await product.kardex().save(kardex);
            }
        }

        if (products && products.length > 0) {
            await purchase.products().attach(products_id, (row) => {
                for (let j = 0; j < products.length; j++) {
                    if (row.product_id === products[j].product_id) {
                        row.quantity = products[j].quantity;
                        row.amount = products[j].amount;
                    }
                }
            });
            purchase.products = await purchase.products().fetch();
        }

        response.status(201).json({
            message: 'Se ha creado la compra satisfactoriamente.',
            purchase: purchase,
        });
    }

    /**
     * Display a single purchase.
     * GET purchases/:id
     */
    async show({ params: { companyId, purchaseId }, request, response, view }) {
        //const user = await auth.getUser()
        const purchase = await Purchase.find(purchaseId);

        //AuthorizationService.verifyPermission(company, user)

        response.status(200).json({
            data: purchase,
        });
    }

    /**
     * Update purchase details.
     * PUT or PATCH purchases/:id
     */
    async update({ params: { companyId, purchaseId }, request, response }) {
        const { total_amount } = request.post();
        //const user = await auth.getUser();
        //const company = await Company.find(companyId);
        const purchase = await Purchase.find(purchaseId);

        purchase.merge({ total_amount });
        await purchase.save();

        response.status(200).json({
            message: 'Se ha actualizada la compra satisfactoriamente.',
            data: purchase,
        });
    }

    /**
     * Delete a purchase with id.
     * DELETE purchases/:id
     */
    async destroy({ params: { companyId, purchaseId }, request, response }) {
        //const user = await auth.getUser();
        //const company = await Company.find(companyId);
        const purchase = await Purchase.find(purchaseId);

        await purchase.delete();

        response.status(200).json({
            message: 'Se ha eliminado la compra correctamente.',
        });
    }
}

module.exports = PurchaseController;
