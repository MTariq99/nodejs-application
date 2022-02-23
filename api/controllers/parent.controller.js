const { StatusCodes } = require('http-status-codes');
const { ReasonPhrases } = require('http-status-codes');
const { QueryTypes } = require('sequelize');
// const { console } = require('../../services/console');
const ErrorKey = require('../constants/errorKeys');
const ResponseModel = require('../constants/response.constant');
// const { models } = require('../sequelize');
const sequelize = require('../sequelize');

// exports.getAllParent = async (req, res, next) => {
// 	const response = new ResponseModel();
// 	try {
// 		const parents =  await sequelize.query(`
// 		select * from parent
// 		`, {
// 			type: QueryTypes.SELECT
// 		});
// 		// await models.parent.findAll({});
// 		console.info('All records fetched from db');
// 		response.setData(parents);
// 		response.setStatus(ReasonPhrases.OK);
// 		return res.status(StatusCodes.OK).send(response);
// 	} catch (err) {
//         console.log("🚀 ~ file: parent.controller.js ~ line 25 ~ exports.getAllParent= ~ err", err)
// 		console.error(`get All Parent Error! ${err}`);
// 		if (err.ValidationError || err.SyntaxError || err.ForeignKeyConstraintError) {
// 			req.body = {
// 				errorKey: ErrorKey.BAD_REQUEST
// 			};
// 			return next();
// 		}
// 		req.body = {
// 			errorKey: ErrorKey.PARTIAL_CONTENT,
// 		};
// 		return next();
// 	}
// };


exports.postParent = async (req, res, next) => {
	const response = new ResponseModel();
 
	const  {
		parentName,
		Email,
		Password,
		phoneNumber,		
	} = req.body;
    console.log("🚀 ~ file: parent.controller.js ~ line 50 ~ exports.postParent= ~ req.body", req.body)
	
	try {
		const parents =  await sequelize.query(`
		INSERT INTO schooldatabase.parent
		(parentName,
			 Email,
			  Password,
			   phoneNumber)
		VALUES('${parentName}',
		'${Email}',
		'${Password}',
		'${phoneNumber}') `,
		 {
			type: QueryTypes.INSERT
		});

		response.setData(parents);
		response.setStatus(ReasonPhrases.CREATED);

		return res.status(StatusCodes.CREATED).send(parents);
	} catch (err) {
        console.log("🚀 ~ file: parent.controller.js ~ line 65 ~ exports.postParent= ~ err", err)
		console.error(`New blockUser Creating Error! ${err}`);
		if (err.ValidationError || err.SyntaxError || err.ForeignKeyConstraintError) {
			req.body = {
				errorKey: ErrorKey.BAD_REQUEST,
			};
			return next();
		}
		req.body = {
			errorKey: ErrorKey.PARTIAL_CONTENT,
		};
		return next();
	}
};

exports.updateparent = async (req, res, next) => {
    console.log("🚀 ~ file: updateparent.controller.js ~ line 28 ~ exports.updateparent= ~ req.body", req.body)

	const response = new ResponseModel();
	const  {
		
		parentName,  
		Email,   
		Password,
		phoneNumber,
	} = req.body;


	try {
		const parents =  await sequelize.query(`
		Update schooldatabase.parent
		SET
		 parentName = '${parentName}',
		  Email = '${Email}',
		   Password = '${Password}',
		    phoneNumber =  '${phoneNumber}'
		WHERE parentId = ${req.body.parentId}
		`, {
			type: QueryTypes.UPDATE
		});

		console.info('blockUser Updated');
		response.setData(parents);
		response.setStatus(ReasonPhrases.OK);
		return res.status(StatusCodes.OK).send(response);
	} catch (err) {
		console.error(`blockUser Updating Error! ${err}`);
		if (err.ValidationError || err.SyntaxError) {
			req.body = {
				errorKey: ErrorKey.BAD_REQUEST,
			};
			return next();
		}
		req.body = {
			errorKey: ErrorKey.PARTIAL_CONTENT,
		};
	}
	return null;
};



exports.deleteParent = async (req, res, next) => {
	console.log("🚀 ~ file: parent.controller.js ~ line 142 ~ exports.deleteParent ~ req.body", req.body)

	const response = new ResponseModel();

	try {
		const parents =  await sequelize.query(`

		DELETE FROM  schooldatabase.parent
		WHERE parentId ='${req.body.parentId}'
		`, {

			type: QueryTypes.DELETE
		});
		// if (deletedRow === 1) {
			console.info('blockUser Deleted');
			response.setData('Successfully deleted');
			response.setStatus(ReasonPhrases.OK);
			return res.status(StatusCodes.OK).send('Successfully deleted');
		//}
		// req.body = {
		// 	errorKey: ErrorKey.BAD_REQUEST,
		// };
		// return next();
	} catch (err) {
		console.error(`blockUser Deleting Error! ${err}`);
		if (err.ValidationError || err.SyntaxError || err.ForeignKeyConstraintError) {
			req.body = {
				errorKey: ErrorKey.BAD_REQUEST,
			};
			return next();
		}
		req.body = {
			errorKey: ErrorKey.PARTIAL_CONTENT,
		};
		return next();
	}

};
