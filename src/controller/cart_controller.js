// controllers/cartController.js
import { Cart } from '../models/cartModel.js';
import { Product } from '../models/productModel.js'; // for optional checks

export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id || req.body.userId; // depends on your auth setup
    const { productId, quantity = 1, selectedSize } = req.body;

    // Optional: Validate product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create new cart for user
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity, selectedSize }]
      });
    } else {
      // Check if product is already in cart
      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId &&
                (!selectedSize || item.selectedSize === selectedSize)
      );

      if (itemIndex > -1) {
        // Product exists in cart, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.items.push({ product: productId, quantity, selectedSize });
      }
    }

    cart.updatedAt = new Date();
    await cart.save();

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add product to cart' });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id || req.body.userId; // depends on your auth setup
    const { productId, selectedSize } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the item(s) to remove
    cart.items = cart.items.filter(item => {
      const sameProduct = item.product.toString() === productId;
      const sameSize = selectedSize ? item.selectedSize === selectedSize : true;
      return !(sameProduct && sameSize); // keep only items that don't match
    });

    cart.updatedAt = new Date();
    await cart.save();

    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to remove product from cart' });
  }
};
export const decrementCartItem = async (req, res) => {
  try {
    const userId = req.user._id || req.body.userId;
    const { productId, selectedSize } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item =>
      item.product.toString() === productId &&
      (!selectedSize || item.selectedSize === selectedSize)
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Decrease quantity or remove if quantity is 1
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1); // remove the item
    }

    cart.updatedAt = new Date();
    await cart.save();

    res.status(200).json({ message: 'Cart updated', cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update cart' });
  }
};
