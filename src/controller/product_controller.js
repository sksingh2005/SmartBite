// controllers/productController.js
//limited access to the sellers
import { Product } from '../modals/productModel.js'; // adjust path as needed

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      size,
      stock,
      image,
      offer // optional
    } = req.body;

    // Basic validation
    if (!name || !price || !size || !stock || !image) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    // Construct product data
    const newProduct = new Product({
      name,
      price,
      size,
      stock,
      image,
      ...(offer && { offer }) // only add `offer` if it's provided
    });

    // Save to DB
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully.',
      product: savedProduct
    });

  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error. Could not add product.' });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      size,
      stock,
      image,
      offer // optional
    } = req.body;

    // Build the update object dynamically
    const updateData = {
      ...(name && { name }),
      ...(price && { price }),
      ...(size && { size }),
      ...(stock && { stock }),
      ...(image && { image }),
      ...(offer ? { offer } : { $unset: { offer: "" } }) // If offer is provided, update it. If null or undefined, remove it.
    };

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true, // return the updated document
      runValidators: true // validate against the schema
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error. Could not update product.' });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({
      message: 'Product deleted successfully.',
      product: deletedProduct
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error. Could not delete product.' });
  }
};
