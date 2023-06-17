import express from "express";
import {productService} from "../services/products.service.js";

export const routerVistaProducts = express.Router();

routerVistaProducts.get("/", async (req, res) => {
    const limit = req.query.limit || 3;
    const page = req.query.page || 1;
    const query = req.query.query;
    const sort = req.query.sort;
    const requestUrl = req.originalUrl;
    const allProducts = await productService.getAllProducts(limit,page,query,sort);
    const previusLink = await productService.getPrevLink(requestUrl,page,allProducts.hasPrevPage)
    const postLink = await productService.getNextLink(requestUrl,page,allProducts.hasNextPage)
  
    res.status(200).render("products", {
      p: allProducts.docs.map((product) => ({
        name: product.title,
        description: product.description,
        price: product.price,
      })),
      pagingCounter: allProducts.pagingCounter,
      page: allProducts.page,
      totalPages: allProducts.totalPages,
      hasPrevPage: allProducts.hasPrevPage,
      hasNextPage: allProducts.hasNextPage,
      prevPage: allProducts.prevPage,
      nextPage: allProducts.nextPage,
      prevLink: previusLink,
      nextLink: postLink
    });
  });

/*routerVistaProducts.get("/", async (req, res) => {
    const limit=3;
    const page=1;
    const sort= "asc";
    const products = await productService.getAllProducts(limit,page,null,sort)
    const productsData = {
        docs: products.docs,
        totalDocs: products.totalDocs,
        limit: products.limit,
        totalPages: products.totalPages,
        page: products.totalPages,
        pagingCounter: products.pagingCounter,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage
      };
    console.log(productsData)
  return res.render("products", {
    products: productsData.docs,
    totalDocs: productsData.totalDocs,
    limit: productsData.limit,
    totalPages: productsData.totalPages,
    page:productsData.totalPages,
    pagingCounter:productsData.pagingCounter,
    hasPrevPage:productsData.hasPrevPage,
    hasNextPage:productsData.hasNextPage,
    prevPage:productsData.prevPage,
    nextPage:productsData.nextPage
  });
});*/