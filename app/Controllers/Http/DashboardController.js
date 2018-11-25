'use strict';

class DashboardController {
    async index({ request, response, auth }) {
        const user = await auth.getUser();

        const company = await user.company().fetch();

        const productsA = await company
            .products()
            .with('sales')
            .with('purchases')
            .fetch();

        const products = productsA.toJSON();
        const salesQ = [];
        const salesA = [];
        let ventasT = 0;
        let cantidadesT = 0;

        const purchasesQ = [];
        const purchasesA = [];
        let comprasP = 0;
        let cantidadesP = 0;

        products.forEach((element) => {
            let itemQ = 0;
            let itemA = 0;
            for (let j = 0; j < element.sales.length; j++) {
                const elementB = element.sales[j];
                itemQ += elementB.pivot.quantity;
                itemA += elementB.pivot.quantity * element.price;
            }
            ventasT += itemA;
            cantidadesT += itemQ;
            salesQ.push([element.name, itemQ]);
            salesA.push([element.name, itemA]);
        });

        products.forEach((element) => {
            let itemQ = 0;
            let itemA = 0;
            for (let j = 0; j < element.purchases.length; j++) {
                const elementB = element.purchases[j];

                const amount = parseFloat(elementB.pivot.amount);
                itemQ += elementB.pivot.quantity;
                itemA += amount;
            }
            comprasP += itemA;
            cantidadesP += itemQ;
            purchasesQ.push([element.name, itemQ]);
            purchasesA.push([element.name, itemA]);
        });

        response.status(200).json({
            salesQ: salesQ,
            salesA: salesA,
            cantidadesS: cantidadesT,
            ventas: ventasT,
            purchasesQ: purchasesQ,
            purchasesA: purchasesA,
            cantidadesP: cantidadesP,
            compras: comprasP,
        });
    }
}

module.exports = DashboardController;
