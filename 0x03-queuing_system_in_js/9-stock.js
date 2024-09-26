import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

// Initialize Redis client
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Initialize Express app
const app = express();
const port = 1245;

// List of products
const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

// Function to get a product by its ID
const getItemById = (id) => {
  return listProducts.find(product => product.itemId === parseInt(id));
};

// Function to reserve stock for a product by ID
const reserveStockById = async (itemId, stock) => {
  await setAsync(`item.${itemId}`, stock);
};

// Function to get the current reserved stock for a product by ID
const getCurrentReservedStockById = async (itemId) => {
  const stock = await getAsync(`item.${itemId}`);
  return stock ? parseInt(stock) : null;
};

// Route to get the list of all products
app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

// Route to get a product by ID and its current stock
app.get('/list_products/:itemId', async (req, res) => {
  const item = getItemById(req.params.itemId);
  if (!item) {
    return res.json({ status: 'Product not found' });
  }
  
  const currentStock = await getCurrentReservedStockById(req.params.itemId) || item.initialAvailableQuantity;
  res.json({ ...item, currentQuantity: currentStock });
});

// Route to reserve a product by ID
app.get('/reserve_product/:itemId', async (req, res) => {
  const item = getItemById(req.params.itemId);
  if (!item) {
    return res.json({ status: 'Product not found' });
  }

  const currentStock = await getCurrentReservedStockById(req.params.itemId) || item.initialAvailableQuantity;
  
  if (currentStock <= 0) {
    return res.json({ status: 'Not enough stock available', itemId: item.itemId });
  }

  await reserveStockById(req.params.itemId, currentStock - 1);
  res.json({ status: 'Reservation confirmed', itemId: item.itemId });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
