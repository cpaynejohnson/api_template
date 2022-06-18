const {School} = require('./index');
const {sequelize} = require('../db');

describe('School Model', () => {
	beforeAll(async () => {
		await sequelize.sync({force: true})
	});

	// test('can find a School', async() => {
	// 	const testSchool = await School.findOne({name : 'Spelman College'})
	// 	expect(testSchool.name).toBe('Spelman College')
	// })

		test('School has a website', async () => {
			const websiteStr = "https://www.spelman.edu/";
			const testSchool = await School.create({ name: "Spelman College" , website: websiteStr});
      expect(testSchool.website).toBe(websiteStr);
    });

})
