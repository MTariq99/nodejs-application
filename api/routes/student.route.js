const express = require('express');
const Controller = require('../controllers/student.controller');
const ErrorHandler = require('../middleware/errorhandler');

const Router = express.Router();



/**
  * @swagger
  * /student:
  *  post:
  *      tags:
  *          - student
  *      name: student
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should add new student.
  *      requestBody:
  *         content:
  *            application/json:
  *               schema:
  *                  type: object
  *                  properties:
  *                     studentName:
  *                        type: string
  *                     parentId:
  *                        type: integer
  *      responses:
  *          '200':
  *              description: New student created.
  */
Router.post('/', [Controller.postStudent]);


/**
  * @swagger
  * /student:
  *  put:
  *      tags:
  *          - student
  *      name: student
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This will update student BioData.
  *      requestBody:
  *         content:
  *            application/json:
  *               schema:
  *                  type: object
  *                  properties:
  *                     studentName:
  *                        type: string
  *                     parentId:
  *                        type: integer
  *      responses:
  *          '200':
  *              description: student name updated.
  */
 Router.put('/', [Controller.Studentupdate]);


 /**
  * @swagger
  * /student:
  *  delete:
  *      tags:
  *          - student
  *      name: student
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This will delete by Parent ID.
  *      requestBody:
  *         content:
  *            application/json:
  *               schema:
  *                  type: object
  *                  properties:
  *                     parentId:
  *                        type: integer
  *      responses:
  *          '200':
  *              description: STUDENT IS DELETED BY PARENT.
  */
  Router.delete('/', [Controller.Studentdelete]);



module.exports = Router;
