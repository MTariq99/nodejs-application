const Config = require('../../config');

async function applySequelizeSetup(sequelize) {
	const {
		parent,
		student
	} = sequelize.models;
	// if (Config.environment === 'debug') {
	// 	
	// }
	// await sequelize.sync();
	// student.belongsTo(parent, { foreignKey: 'parentId' });
	// parent.hasMany(student, { foreignKey: 'parentId' });
	
}

module.exports = { applySequelizeSetup };
