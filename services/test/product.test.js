import { 
    createProduct, 
    findAllProductsByUser, 
    findAllProducts,
    findProductById,
    updateProduct,
    deleteProduct,
} from '../index.js';
import { PrismaClient } from '@prisma/client'

// Connect to the test database
const prisma = new PrismaClient();

const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 10.99,
  userId: 1
};

jest.mock('@prisma/client', () => {
  const mockProductCreate = jest.fn(()=>mockProduct);
  const mockProductFindMany = jest.fn(()=>[mockProduct]);
  const mockProductFindUnique = jest.fn(()=>mockProduct);
  const mockProductUpdate = jest.fn(()=>{
    return {
      ...mockProduct,
      name: 'Updated Product Name',
      price: 20.99,
    }
  });
  const mockProductDelete = jest.fn(()=>mockProduct);

  return {
    PrismaClient: jest.fn(() => ({
      product: {
        create: mockProductCreate,
        findMany: mockProductFindMany,
        findUnique: mockProductFindUnique,
        update: mockProductUpdate,
        delete: mockProductDelete,
      },
      $disconnect: jest.fn(),
    })),
    __mockProductCreate: mockProductCreate,
    __mockProductFindMany: mockProductFindMany,
    __mockProductFindUnique: mockProductFindUnique,
    __mockProductUpdate: mockProductUpdate,
    __mockProductDelete: mockProductDelete,
  };
});

afterAll(async () => {
  // Disconnect Prisma Client
  await prisma.$disconnect();
});

describe('Product', () => {
    describe('Create Product', () => {
        it('create a product', async () => {
          const product = await createProduct('Test Product', 10.99, 1);
          expect(product).toHaveProperty('id');
          expect(product.name).toBe('Test Product');
          expect(product.price).toBe(10.99);
          expect(product.userId).toBe(1);
        });
      });
      
      describe('Find All Products by User', () => {
          it('find all products belonging to a user', async () => {
            const products = await findAllProductsByUser(1);
            expect(products.length).toBeGreaterThan(0);
            products.forEach(product => {
              expect(product.userId).toBe(1);
            });
          });
      });
      
      describe('Find All Products', () => {
          it('should find all products', async () => {
            const products = await findAllProducts();
            expect(products.length).toBeGreaterThan(0);
          });
      });
      
      describe('Find Product by ID', () => {
          it('should find a product by ID', async () => {
            const product = await findProductById(1);
            expect(product).toBeTruthy();
            expect(product.id).toBe(1);
          });
      });
      
      describe('Update Product', () => {
          it('should update a product', async () => {
            const updatedProduct = await updateProduct(1, 'Updated Product Name', 20.99);
            expect(updatedProduct).toHaveProperty('id');
            expect(updatedProduct.name).toBe('Updated Product Name');
            expect(updatedProduct.price).toBe(20.99);
          });
      });
      
      describe('Delete Product', () => {
          it('should delete a product', async () => {
            const deletedProduct = await deleteProduct(1);
            expect(deletedProduct).toHaveProperty('id');
          });
      });
});
