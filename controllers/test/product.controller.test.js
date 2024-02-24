import {
    createProductController,
    findAllProductsByUserController,
    findAllProductsController,
    findProductByIdController,
    updateProductController,
    deleteProductController,
  } from '../product.controller.js';
  import {
    createProduct,
    findAllProductsByUser,
    findAllProducts,
    findProductById,
    updateProduct,
    deleteProduct,
  } from '../../services/index.js';
  
  // Mocked request and response objects
  const mockRequest = (body, params) => ({ body, params });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  
  // Mocked product data for testing
  const mockProduct = {
    id: 1,
    name: 'Sample Product',
    price: 10.99,
    userId: 1,
  };
  
  // Mocked error object for testing
  const mockError = new Error('Test Error');
  
  // Mocked service functions
  jest.mock('../../services/index.js', () => ({
    createProduct: jest.fn(),
    findAllProductsByUser: jest.fn(),
    findAllProducts: jest.fn(),
    findProductById: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
  }));
  
  describe('Product Controller Tests', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear all mock calls before each test
    });
  
    describe('createProductController', () => {
      it('should create a new product successfully', async () => {
        createProduct.mockResolvedValue(mockProduct);
        const req = mockRequest({ name: 'Sample Product', price: 10.99, userId: 1 });
        const res = mockResponse();
  
        await createProductController(req, res);
  
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockProduct);
      });
  
      it('should handle error when creating a new product', async () => {
        createProduct.mockRejectedValue(mockError);
        const req = mockRequest({ name: 'Sample Product', price: 10.99, userId: 1 });
        const res = mockResponse();
  
        await createProductController(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error creating product');
      });
    });
  
    describe('findAllProductsByUserController', () => {
        it('should find all products by user successfully', async () => {
          const userId = 1;
          const mockProducts = [mockProduct, mockProduct]; // Mocked array of products
          findAllProductsByUser.mockResolvedValue(mockProducts);
          const req = mockRequest({}, { userId });
          const res = mockResponse();
      
          await findAllProductsByUserController(req, res);
      
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(mockProducts);
        });
      
        it('should handle error when finding products by user', async () => {
          const userId = 1;
          findAllProductsByUser.mockRejectedValue(mockError);
          const req = mockRequest({}, { userId });
          const res = mockResponse();
      
          await findAllProductsByUserController(req, res);
      
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith('Error finding products by user');
        });
      });
      
      describe('findAllProductsController', () => {
        it('should find all products successfully', async () => {
          const mockProducts = [mockProduct, mockProduct]; // Mocked array of products
          findAllProducts.mockResolvedValue(mockProducts);
          const req = mockRequest({});
          const res = mockResponse();
      
          await findAllProductsController(req, res);
      
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(mockProducts);
        });
      
        it('should handle error when finding all products', async () => {
          findAllProducts.mockRejectedValue(mockError);
          const req = mockRequest({});
          const res = mockResponse();
      
          await findAllProductsController(req, res);
      
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith('Error finding all products');
        });
      });
      
      describe('findProductByIdController', () => {
        it('should find a product by ID successfully', async () => {
          const productId = 1;
          findProductById.mockResolvedValue(mockProduct);
          const req = mockRequest({}, { productId });
          const res = mockResponse();
      
          await findProductByIdController(req, res);
      
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(mockProduct);
        });
      
        it('should handle error when finding a product by ID', async () => {
          const productId = 1;
          findProductById.mockRejectedValue(mockError);
          const req = mockRequest({}, { productId });
          const res = mockResponse();
      
          await findProductByIdController(req, res);
      
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith('Error finding product by ID');
        });
      
        it('should handle not found case', async () => {
          const productId = 1;
          findProductById.mockResolvedValue(null); // Product not found
          const req = mockRequest({}, { productId });
          const res = mockResponse();
      
          await findProductByIdController(req, res);
      
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.send).toHaveBeenCalledWith('Product not found');
        });
      });
      
      describe('updateProductController', () => {
        it('should update a product successfully', async () => {
          const productId = 1;
          const updatedProduct = { ...mockProduct, name: 'Updated Name' };
          updateProduct.mockResolvedValue(updatedProduct);
          const req = mockRequest({ name: 'Updated Name', price: 10.99 }, { productId });
          const res = mockResponse();
      
          await updateProductController(req, res);
      
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(updatedProduct);
        });
      
        it('should handle error when updating a product', async () => {
          const productId = 1;
          updateProduct.mockRejectedValue(mockError);
          const req = mockRequest({ name: 'Updated Name', price: 10.99 }, { productId });
          const res = mockResponse();
      
          await updateProductController(req, res);
      
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith('Error updating product');
        });
      });
      
      describe('deleteProductController', () => {
        it('should delete a product successfully', async () => {
          const productId = 1;
          deleteProduct.mockResolvedValue(mockProduct);
          const req = mockRequest({}, { productId });
          const res = mockResponse();
      
          await deleteProductController(req, res);
      
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(mockProduct);
        });
      
        it('should handle error when deleting a product', async () => {
          const productId = 1;
          deleteProduct.mockRejectedValue(mockError);
          const req = mockRequest({}, { productId });
          const res = mockResponse();
      
          await deleteProductController(req, res);
      
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith('Error deleting product');
        });
      });      
  });
  