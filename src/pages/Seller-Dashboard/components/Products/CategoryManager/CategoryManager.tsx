import React, { useState } from 'react';
import { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from '@/store/Slices/categoryApi';
import PrimaryButton from '@/common/PrimaryButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';

const CategoryManager: React.FC = () => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string; description?: string } | null>(null);

  const handleCreateCategory = async () => {
    if (newCategoryName.trim()) {
      const formData = new FormData();
      formData.append('name', newCategoryName);
      if (newCategoryDescription.trim()) {
        formData.append('description', newCategoryDescription);
      }
      await createCategory(formData);
      setNewCategoryName('');
      setNewCategoryDescription('');
    }
  };

  const handleUpdateCategory = async () => {
    if (editingCategory) {
      const formData = new FormData();
      formData.append('name', editingCategory.name);
      if (editingCategory.description) {
        formData.append('description', editingCategory.description);
      }
      await updateCategory({ id: editingCategory.id, formData });
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id);
  };

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories: { (error as any).data?.message || (error as any).error || (error as any).message || 'Unknown error' }</div>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Manage Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Category */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Add New Category</h4>
          <div className="flex gap-2">
            <div className="grid gap-1">
              <Label htmlFor="newCategoryName">Category Name</Label>
              <Input
                id="newCategoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="newCategoryDescription">Description (Optional)</Label>
              <Input
                id="newCategoryDescription"
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>
            <PrimaryButton type="Primary" title="Add Category" onClick={handleCreateCategory} className="mt-auto" />
          </div>
        </div>

        {/* Category List */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Existing Categories</h4>
          {categories && categories.length > 0 ? (
            <ul className="space-y-2">
              {categories.map((category: any) => (
                <li key={category.id} className="flex items-center justify-between p-2 border rounded-md">
                  <span>{category.name} {category.description && `(${category.description})`}</span>
                  <div className="flex gap-2">
                    <Dialog open={editingCategory?.id === category.id} onOpenChange={(isOpen) => !isOpen && setEditingCategory(null)}>
                      <DialogTrigger asChild>
                        <PrimaryButton type="Outline" title="Edit" onClick={() => setEditingCategory(category)} />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Category</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="editCategoryName" className="text-right">Name</Label>
                            <Input
                              id="editCategoryName"
                              value={editingCategory?.name || ''}
                              onChange={(e) => setEditingCategory(prev => prev ? { ...prev, name: e.target.value } : null)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="editCategoryDescription" className="text-right">Description</Label>
                            <Input
                              id="editCategoryDescription"
                              value={editingCategory?.description || ''}
                              onChange={(e) => setEditingCategory(prev => prev ? { ...prev, description: e.target.value } : null)}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <PrimaryButton type="Primary" title="Save Changes" onClick={handleUpdateCategory} />
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <PrimaryButton type="Outline" title="Delete" onClick={() => handleDeleteCategory(category.id)} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No categories found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryManager;
