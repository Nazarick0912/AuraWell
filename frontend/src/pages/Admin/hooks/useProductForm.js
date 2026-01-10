import { useState, useCallback } from 'react';

const initialFormState = {
    id: null,
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Vitamins',
    ageGroup: 'Adult',
    image: ''
};

export function useProductForm() {
    const [formData, setFormData] = useState(initialFormState);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const openAddModal = useCallback(() => {
        setFormData(initialFormState);
        setIsEditing(false);
        setIsModalOpen(true);
    }, []);

    const openEditModal = useCallback((product) => {
        // Ensure all form fields are properly formatted for the form inputs
        setFormData({
            id: product.id,
            name: product.name || '',
            description: product.description || '',
            price: product.price?.toString() || '',
            stock: product.stock?.toString() || '',
            category: product.category || 'Vitamins',
            ageGroup: product.ageGroup || 'Adult',
            image: product.image || ''
        });
        setIsEditing(true);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const resetForm = useCallback(() => {
        setFormData(initialFormState);
    }, []);

    return {
        formData,
        isEditing,
        isModalOpen,
        handleInputChange,
        openAddModal,
        openEditModal,
        closeModal,
        resetForm
    };
}


