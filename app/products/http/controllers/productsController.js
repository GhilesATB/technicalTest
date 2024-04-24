const {matchedData} = require("express-validator");
const ProductModel = require("../../models/product");
const {productNotFoundError, productAlreadyExists} = require("../../errors/productError");
const {Sequelize} = require("sequelize");
const {writeFileAsync, unlinkAsync, fileExistsSync, makeStoragePath} = require("../../../common/storage/storage");
const {hasAccessTo} = require("../../../users/permissions/userPermissions");

exports.index = async (req, res, next) => {

    try {
        //check right to the endpoint
        await hasAccessTo(req?.user,'product-index');

        //pagination, filtering and sorting params
        const pageSize = 10;
        const page = parseInt(req?.query?.page) > 0 ? parseInt(req?.query?.page) : 1
        const currentPage = Number.isInteger(page) ? page : 1;
        const offset = (currentPage - 1) * pageSize;
        const category = req?.query?.category ?? null;
        const whereClause = (category) ? {category: category} : {};
        const sort = req?.query?.order === "desc" ? "desc" : "asc";

        const products = await ProductModel.findAndCountAll({
            limit: pageSize,
            offset: offset,
            where: whereClause,
            order: [
                ['price', sort] // Sort by price in ascending order
            ]
        });

        const pageCount = Math.ceil(products.count / pageSize);

        res.status(200).send({
            data: {
                currentPage: currentPage,
                nextPage: currentPage === pageCount ? pageCount : currentPage + 1,
                previousPage: currentPage > 1 ? currentPage - 1 : currentPage,
                pageCount: pageCount === 0 ? 1 : pageCount,
                ...products,
            },
        });

    } catch (err) {

        //pass the resulting error to express global errorHandler
        next(err);
    }
}

exports.store = async (req, res, next) => {

    try {
        //check right access to the endpoint
        await hasAccessTo(req?.user,'product-index');

        const productData = matchedData(req);
        const productExists = await ProductModel.findOne({
            where: {
                name: productData?.name
            }
        })

        //if product with same name exists
        if (productExists) {
            throw productAlreadyExists();
        }

        const image = makeStoragePath(req.files[0], 'uploads');

        if (image) {
            await writeFileAsync(image, req.files[0].buffer);
        }

        const products = await ProductModel.create({...productData, image: image});

        res.status(201).send({data: products});

    } catch (err) {
        //pass the resulting error to express global errorHandler
        next(err);
    }
}

exports.view = async (req, res, next) => {

    try {

        //check right to the endpoint
        await hasAccessTo(req?.user,'product-view');

        const product = await ProductModel.findByPk(req?.params?.productId);

        if (!product) {
            throw productNotFoundError();
        }

        res.status(201).send({data: product});

    } catch (err) {
        //pass the resulting error to express global errorHandler
        next(err);
    }

}

exports.update = async (req, res, next) => {

    try {

        //check right to the endpoint
        await hasAccessTo(req?.user,'product-update');

        const productToUpdate = await ProductModel.findByPk(req?.params?.productId);

        if (!productToUpdate) {
            throw productNotFoundError();
        }

        const productData = matchedData(req);

        const productExists = await ProductModel.findOne({
            where: {
                name: productData?.name,
                id: {
                    [Sequelize.Op.not]: productToUpdate.id
                }
            }
        });

        //if product with same name exists
        if (productExists) {
            throw productAlreadyExists();
        }

        const image = makeStoragePath(req.files[0], 'uploads');

        if (image) {
            await writeFileAsync(image, req.files[0].buffer);
            if (fileExistsSync(productToUpdate.image)) {
                await unlinkAsync(productToUpdate.image);
            }
        }

        const productUpdated = await productToUpdate.update(productData);

        res.status(200).send({data: productUpdated});

    } catch (err) {
        //pass the resulting error to express global errorHandler
        next(err);
    }
}

exports.destroy = async (req, res, next) => {
    try {

        //check right to the endpoint
        await hasAccessTo(req?.user,'product-destroy');

        const productToDelete = await ProductModel.findByPk(req?.params?.productId);

        if (!productToDelete) {
            throw productNotFoundError();
        }

        await productToDelete.destroy();

        res.status(204).send({});

    } catch (err) {
        //pass the resulting error to express global errorHandler
        next(err);
    }
}