const { StatusCodes } = require('http-status-codes');
const { ReasonPhrases } = require('http-status-codes');
const { QueryTypes } = require('sequelize');
// const { console } = require('../../services/console');
const ErrorKey = require('../constants/errorKeys');
const ResponseModel = require('../constants/response.constant');
// const { models } = require('../sequelize');
const sequelize = require('../sequelize');

// exports.getAllStudent = async (req, res, next) => {
// 	const response = new ResponseModel();
// 	try {
// 		const parents =  await sequelize.query(`
// 		select s.studentName, p.parentFullName from student s 
// 		inner join parent p on p.parentId = s.parentId 
// 		-- where s.stuentId = 4
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


exports.postStudent = async (req, res, next) => {
	const response = new ResponseModel();

	const {
		studentName,  
		parentId
	} = req.body;
	
	try {
		const parents =  await sequelize.query(`
		INSERT INTO schooldatabase.student
		(studentName, parentId)
		VALUES('${studentName}','${parentId}' ) 
		`, {
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

exports.Studentupdate = async (req, res, next) => {
	const response = new ResponseModel();
	const {
		studentName,  
		parentId
	} = req.body;

	try {
		const parents =  await sequelize.query(`
		Update schooldatabase.student
		SET studentName = '${studentName}'
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

exports.Studentdelete = async (req, res, next) => {
	const response = new ResponseModel();

	try {
		const parents =  await sequelize.query(`
		DELETE FROM schooldatabase.student
		WHERE parentId = ${req.body.parentId}
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
