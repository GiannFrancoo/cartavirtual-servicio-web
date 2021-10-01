const { Router } = require('express');
const router = Router();

const item = require('../controllers/item.controller');
const category = require('../controllers/category.controller');

/**
 * @swagger
 * /categorias:
 *  get:
 *      description: recuperar todas las categorias
 *      tags: 
 *        - Categoria
 *      parameters:
 *          - in: query
 *            name: name
 *            description: nombre de la categoria
 *            required: false
 *            schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Respuesta correcta
 *          default: 
 *              description: Error inesperado
 */
router.get('/categorias', category.getCategories);

/**
 * @swagger
 * /categorias/{id}/items:
 *  get:
 *      description: Recuperar todos los items de una determinada categoria pasada por el id del parametro
 *      tags:
 *          - Item
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la categoria
 *            required: true
 *            schema:
 *              type: integer
 *          - in: query
 *            name: name
 *            description: nombre del item
 *            required: false
 *            schema: 
 *              type: string
 *          - in: query
 *            name: maxPrice
 *            description: precio maximo del item
 *            required: false
 *            schema: 
 *              type: integer           
 *      responses:
 *          '200':
 *              description: Respuesta correcta
 *          '400':
 *              description: Id incorrecta
 *          default: 
 *              description: Error inesperado
 */
router.get('/categorias/:id/items', item.getItemsByCategory);

/**
 * @swagger
 * /items/{id}:
 *  get:
 *      description: Recuperar un item especifico mediante un id
 *      tags:
 *          - Item
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id del item
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          '200':
 *              description: Respuesta correcta
 *          '400':
 *              description: Id incorrecta
 *          '404':
 *              description: Id no encontrado
 *          default: 
 *              description: Error inesperado
 */
router.get('/items/:id', item.getItemById);

/**
 * @swagger
 * /items/{id}/imagen:
 *  get:
 *      description: Recuperar la imagen del item con ese id
 *      tags:
 *          - Item
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id del item
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          '200':
 *              description: Respuesta correcta
 *          '400':
 *              description: Id incorrecta
 *          '404':
 *              description: Id no encontrado
 *          default: 
 *              description: Error inesperado
 */
router.get('/items/:id/imagen', item.getItemImage);


/**
 * @swagger
 * /categorias/{id}/imagen:
 *  get:
 *      description: Recuperar la imagen de la categoria con ese id
 *      tags:
 *          - Categoria
 *      parameters:
 *          - in: path
 *            name: id
 *            description: id de la categoria
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          '200':
 *              description: Respuesta correcta
 *          '400':
 *              description: Id incorrecta
 *          '404':
 *              description: Id no encontrado
 *          default: 
 *              description: Error inesperado
 */
router.get('/categorias/:id/imagen', category.getCategoryImage);

module.exports = router;