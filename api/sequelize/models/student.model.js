const DataType = require('sequelize');
const dbConfig = require('../../../config').dbconfig;

module.exports = (sequelize) => {
	sequelize.define('student', {
		studentId: {
			type: DataType.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		studentName: {
			type: DataType.STRING,
			allowNull: false,
		},
		parentId: {
			type: DataType.INTEGER,
			allowNull: false,
			references: {
				model: 'parent',
				key: 'parentId',
			},
		},
		createdAt: {
			type: DataType.DATE,
		},
		updatedAt: {
			type: DataType.DATE,
		},

	}, {
		tableName: 'student',
		timestamps: false,
		// indexes: [
		// 	{
		// 		name: 'answer_pkey',
		// 		unique: true,
		// 		fields: [
		// 			{ name: 'answerId' },
		// 		],
		// 	},
		// 	{
		// 		name: 'answer_question_fkey',
		// 		fields: [
		// 			{ name: 'questionId' },
		// 		],
		// 	},
		// 	{
		// 		name: 'answer_user_fkey',
		// 		fields: [
		// 			{ name: 'userId' },
		// 		],
		// 	},
		// ],
	});
};
