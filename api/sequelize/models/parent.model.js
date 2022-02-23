const DataType = require('sequelize');
const dbConfig = require('../../../config').dbconfig;

module.exports = (sequelize) => {
	sequelize.define('parent', {
		parentId: {
			type: DataType.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		parentname: {
			type: DataType.STRING,
			allowNull: false,
		},
		email: {
			type: DataType.STRING,
			 allowNull: false,
			// references: {
			// 	model: 'user',
			// 	key: 'userId',
			// },
		},
		password: {
			type: DataType.STRING,
			allowNull: false,
			// references: {
			// 	model: 'question',
			// 	key: 'questionId',
			// },
		},
		phonenumber: {
			type: DataType.STRING,
			allowNull: false,
			// references: {
			// 	model: 'question',
			// 	key: 'questionId',
			// },
		},
		// createdAt: {
		// 	type: DataType.DATE,
		// },
		// updatedAt: {
		// 	type: DataType.DATE,
		// },

	}, {
		tableName: 'parent',
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

