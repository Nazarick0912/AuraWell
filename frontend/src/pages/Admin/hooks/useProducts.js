import { useState, useEffect, useCallback } from 'react';
import { productsAPI, adminAPI } from '../../../services/api';

// Transform backend product data to frontend format
const transformProduct = (product) => ({
    id: product.id,
    name: product.name,
    description: product.description || '',
    price: product.price,
    stock: product.stock,
    category: product.category 
        ? product.category.charAt(0).toUpperCase() + product.category.slice(1) 
        : 'Vitamins',
    ageGroup: product.ageGroup 
        ? product.ageGroup.charAt(0).toUpperCase() + product.ageGroup.slice(1) 
        : 'Adult',
    image: product.imageUrl || 'https://via.placeholder.com/200x200?text=No+Image'
});

// Transform frontend form data to API format
const transformProductForAPI = (formData) => ({
    name: formData.name,
    description: formData.description || '',
    price: parseFloat(formData.price) || 0,
    stock: parseInt(formData.stock) || 0,
    category: formData.category.toLowerCase(),
    ageGroup: formData.ageGroup.toLowerCase(),
    imageUrl: formData.image || "https://via.placeholder.com/200x200?text=No+Image"
});

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products on mount
    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const data = await productsAPI.getAll();
                setProducts(data.map(transformProduct));
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // Update existing product
    const updateProduct = useCallback(async (id, formData) => {
        const processedData = transformProductForAPI(formData);
        const result = await adminAPI.updateProduct(id, processedData);
        
        if (result.success) {
            const updatedProduct = transformProduct(result.product);
            setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
            return { success: true };
        }
        return { success: false, error: result.error || 'Unknown error' };
    }, []);

    // Delete product
    const deleteProduct = useCallback(async (product) => {
        const result = await adminAPI.deleteProduct(product.id);
        if (result.success) {
            setProducts(prev => prev.filter(p => p.id !== product.id));
            return { success: true };
        }
        return { success: false, error: result.error || 'Unknown error' };
    }, []);

    // Add new product
    const addProduct = useCallback(async (formData) => {
        const processedData = transformProductForAPI(formData);
        const result = await adminAPI.createProduct(processedData);
        
        if (result.success) {
            const newProduct = transformProduct(result.product);
            setProducts(prev => [newProduct, ...prev]);
            return { success: true };
        }
        return { success: false, error: result.error || 'Unknown error' };
    }, []);

    return { 
        products, 
        loading, 
        updateProduct, 
        deleteProduct, 
        addProduct 
    };
}

