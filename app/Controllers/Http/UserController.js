'use strict';

const User = use('App/Models/User');
const Company = use('App/Models/Company');

class UserController {
	async signUp({ request, response }) {
		const { email, password, first_names, last_names, phone, company_name } = request.post();
		const user = await User.create({
			email,
			password,
			username: email,
			first_names,
			last_names,
			phone
		});

		const company = new Company();
		company.fill({ name: company_name, description: '' });
		await user.company().save(company);

		return this.signIn(...arguments);
		//response.status(200).json({
		//    user: user,
		//});
	}

	async signIn({ request, response, auth }) {
		const { email, password } = request.post();
		const token = await auth.attempt(email, password);
		return token;
		//response.status(200).json({
		//    token: token,
		//})
	}

	async getUser({ request, response, auth }) {
		try {
			const user = await auth.getUser();

			response.status(200).json({
				user: user
			});
		} catch (error) {
			response.send('You are not logged in');
		}
	}
}

module.exports = UserController;
