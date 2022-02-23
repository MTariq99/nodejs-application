const express = require('express');
const Controller = require('../controllers/parent.controller');
const errorhandler = require('../middleware/errorhandler');

const Router = express.Router();



/**
  * @swagger
  * /parent:
  *  post:
  *      tags:
  *          - parent
  *      name: Parent
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: This should add new parent.
  *      requestBody:
  *         content:
  *            application/json:
  *               schema:
  *                  type: object
  *                  properties:
  *                     parentName:
  *                        type: string
  *                     Email:
  *                        type: string
  *                     Password:
  *                        type: string
  *                     phoneNumber:
  *                        type: string
  *                        
  *      responses:
  *          '200':
  *              description: New Parent created.
  */
Router.post('/', [Controller.postParent]);


/**
  * @swagger
  * /parent:
  *  put:
  *      tags:
  *          - parent
  *      name: Parent
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: Parent can be updated.
  *      requestBody:
  *         content:
  *            application/json:
  *               schema:
  *                  type: object
  *                  properties:
  *                     parentId:
  *                        type: integer
  *                     parentName:
  *                        type: string
  *                     Email:
  *                        type: string
  *                     Password:
  *                        type: string
  *                     phoneNumber:
  *                        type: string
  *                        
  *      responses:
  *          '200':
  *              description:  Parent is updated.
  */
Router.put('/', [Controller.updateparent]);

/**
  * @swagger
  * /parent:
  *  delete:
  *      tags:
  *          - parent
  *      name: Parent
  *      produces:
  *          - application/json
  *      consumes:
  *          - application/json
  *      summary: A parent can be deleted.
  *      requestBody:
  *         content:
  *            application/json:
  *               schema:
  *                  type: object
  *                  properties:
  *                     parentId:
  *                        type: integer
  *                        
  *      responses: 
  *          '200':
  *              description: parent is deleted by id.
  */
 Router.delete('/', [Controller.deleteParent]);


module.exports = Router;

