import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Category,
} from '../../../../store/Slices/categoryApi';
import { Spinner } from '@/components/ui/spinner';
import { useCreateNewCategoryMutation, useDeleteCategoryByIdMutation, useGetAllCategoriesQuery, useUpdateCategoryByIdMutation } from '@/Redux/Features/categories/categories.api';
import { useAppSelector } from '@/hooks/useRedux';
import Swal from 'sweetalert2'

const SellerCategory = () => {
  // RTK Query hooks
  const { 
    data: categories = [], 
    isLoading, 
    error: fetchError,
    refetch 
  } = useGetAllCategoriesQuery({});
  const [createNewCategory, { isLoading: isCreating, isSuccess }] = useCreateNewCategoryMutation();
  const [updateCategoryById, { isLoading: isUpdating }] = useUpdateCategoryByIdMutation();
  const [deleteCategoryById] = useDeleteCategoryByIdMutation();
  const token = useAppSelector(state=> state?.auth?.user?.token)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    image: null as File | null,
    imagePreview: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          image: 'Please upload a valid image file'
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'Image size must be less than 5MB'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result as string
        }));
      };
      reader.readAsDataURL(file);

      if (errors.image) {
        setErrors(prev => ({
          ...prev,
          image: ''
        }));
      }
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }

    if (!editingCategory && !formData.image) {
      newErrors.image = 'Category image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Open modal for creating category
  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      image: null,
      imagePreview: ''
    });
    setErrors({});
    setIsModalOpen(true);
  };

  // Open modal for editing category
  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.categoryName,
      image: null,
      imagePreview: category.imageUrl as string
    });
    setErrors({});
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      image: null,
      imagePreview: ''
    });
    setErrors({});
  };

  // Create or update category with RTK Query
  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const categoryFormData = new FormData();
      categoryFormData.append('categoryName', formData.name.trim());
      if (formData.image) {
        categoryFormData.append('image', formData.image);
      }

      if (editingCategory) {
       
          try {
            await updateCategoryById({
            id: editingCategory._id, 
            formData: categoryFormData 
          }).unwrap();
          } catch (error) {
            console.log(error)
          }
          toast.success('Category updated successfully!');
        
      } else {

        await createNewCategory({categoryFormData,token}).unwrap();
        if(isSuccess){
          toast.success('Category created successfully!');
          refetch()
        }
      }

      closeModal();
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong!';
      if (typeof error === 'object' && error !== null && 'data' in error && typeof (error as { data?: { message?: string } }).data?.message === 'string') {
        errorMessage = (error as { data?: { message?: string } }).data!.message!;
      }
      toast.error(errorMessage);
    }
  };

  // Delete category with RTK Query
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
     const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete this category?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    focusCancel: true,
  });
    if (result.isConfirmed) {
      try {
        await deleteCategoryById(id).unwrap();
        toast.success('Category deleted successfully!');
      } catch (error: unknown) {
      let errorMessage = 'Failed to delete category!';
      if (typeof error === 'object' && error !== null && 'data' in error && typeof (error as { data?: { message?: string } }).data?.message === 'string') {
        errorMessage = (error as { data?: { message?: string } }).data!.message!;
      }
      toast.error(errorMessage);
    }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium"><Spinner /></p>
      </div>
    );
  }

  // Error state
  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-medium text-red-600 mb-4">
            Error loading categories
          </p>
          <button 
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Categories Grid */}
        {categories?.data?.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories yet</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first category</p>
            <button
              onClick={openCreateModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer"
            >
              Create Category
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories?.data?.map((category : Category)=> (
              <div key={category._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                {/* Category Image */}
                <div className="aspect-square bg-gray-100 relative">
                  <img
                    src={category.imageUrl}
                    alt={category.categoryName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Category Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">{category.categoryName}</h3>
                  <p className="text-xs text-gray-500">
                    Created {new Date(category.createdAt).toLocaleDateString()}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => openEditModal(category)}
                      className="flex-1 flex items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-3 py-2 rounded-md transition-colors duration-200 text-sm cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, category._id)}
                      className="flex-1 flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 font-medium px-3 py-2 rounded-md transition-colors duration-200 text-sm cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add New Category Card - Beautiful design from your version */}
            <div 
              className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-500 transition-all duration-200 cursor-pointer flex items-center justify-center p-6"
              onClick={openCreateModal}
            >
              <div className="text-center">
                <svg className="w-12 h-12 text-blue-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-semibold text-blue-600 text-lg">Add New Category</span>
                <p className="text-gray-500 text-sm mt-1">Click to create a new category</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal - Using your beautiful modal design */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4">
              {/* Category Name */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter category name"
                  className={`w-full px-4 py-2.5 border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Category Image */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Image {editingCategory ? '' : <span className="text-red-500">*</span>}
                </label>

                {formData.imagePreview ? (
                  <div className="relative">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: '' }))}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className={`border-2 border-dashed ${
                    errors.image ? 'border-red-500' : 'border-gray-300'
                  } rounded-md p-6 text-center hover:border-blue-400 transition-colors duration-200`}>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label htmlFor="image" className="cursor-pointer block">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-blue-600 mb-1">
                        <span className="font-medium underline">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </label>
                  </div>
                )}
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 rounded-md hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isCreating || isUpdating}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isCreating || isUpdating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {editingCategory ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  editingCategory ? 'Update' : 'Create'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerCategory;