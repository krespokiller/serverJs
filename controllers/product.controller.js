import { 
    createProduct,
    findAllProductsByUser,
    findAllProducts,
    findProductById,
    updateProduct,
    deleteProduct,
  } from "../services/index.js";
  
  export const createProductController = async (req, res) => {
    try {
      const { name, price, userId } = req.body;
      const product = await createProduct(name, price, userId);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).send("Error creating product");
    }
  }
  
  export const findAllProductsByUserController = async (req, res) => {
    try {
      const { userId } = req.body;
      const products = await findAllProductsByUser(parseInt(userId));
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send("Error finding products by user");
    }
  }
  
  export const findAllProductsController = async (req, res) => {
    try {
      const products = await findAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send("Error finding all products");
    }
  }
  
  export const findProductByIdController = async (req, res) => {
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
  }
  
  export const updateProductController = async (req, res) => {
    try {
      const { name, price, productId } = req.body;
      const updatedProduct = await updateProduct(parseInt(productId), name, price);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).send("Error updating product");
    }
  }
  
  export const deleteProductController = async (req, res) => {
    try {
      const { productId } = req.body;
      const deletedProduct = await deleteProduct(parseInt(productId));
      res.status(200).json(deletedProduct);
    } catch (error) {
      res.status(500).send("Error deleting product");
    }
  }
  