const {School} = require('./index');
const {sequelize} = require('../db');

describe('School Model', () => {
	beforeAll(async () => {
		await sequelize.sync({force: true})
	});

	test('can find a School', async() => {
		const testSchool = await School.findOne({name : 'Spelman College'})
		expect(testSchool.name).toBe('Spelman College')
	})


})