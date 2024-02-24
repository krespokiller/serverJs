import { 
    createProduct,
    findAllProductsByUser,
    findAllProducts,
    findProductById,
    updateProduct,
    deleteProduct,
  } from "../services/index.js";

  import { isAdmin } from '../middleware/auth.js'
  
  export const createProductController = async (req, res, next) => {
    try {
      const { name, price, userId } = req.body;

      const product = await createProduct(name, price, userId);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).send("Error creating product");
    }
    next()
  }
  
  export const findAllProductsByUserController = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const products = await findAllProductsByUser(parseInt(userId));
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send("Error finding products by user");
    }
    next()
  }
  
  export const findAllProductsController = async (req, res, next) => {
    try {
      if (isAdmin(req.user)) {
        const products = await findAllProducts();
        res.status(200).json(products);
      }else{
        res.status(400).send("Error you need to be an admin to do that");
      }
    } catch (error) {
      res.status(500).send("Error finding all products");
    }
    next()
  }
  
  export const findProductByIdController = async (req, res, next) => {
    try {
      const { productId } = req.body;
      const product = await findProductById(parseInt(productId));
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).send("Product not found");
      }
    } catch (error) {
      res.status(500).send("Error finding product by ID");
    }
    next()
  }
  
  export const updateProductController = async (req, res, next) => {
    try {
      const { name, price, productId } = req.body;
      const updatedProduct = await updateProduct(parseInt(productId), name, price);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).send("Error updating product");
    }
    next()
  }
  
  export const deleteProductController = async (req, res, next) => {
    try {
      const { productId } = req.body;
      const deletedProduct = await deleteProduct(parseInt(productId));
      res.status(200).json(deletedProduct);
    } catch (error) {
      res.status(500).send("Error deleting product");
    }
    next()
  }
  