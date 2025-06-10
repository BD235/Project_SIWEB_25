import AdminLayout from '@/components/admin/AdminLayout';
import ProductCreateForm from '@/components/admin/ProductCreateForm';

const allowedCategories = ['romantic', 'anniversary', 'valentine', 'lebaran'];

export default function CreateProductPage() {
  return (
    <AdminLayout title="Add New Product">
      <div className="w-full">
        <ProductCreateForm categories={allowedCategories} />
      </div>
    </AdminLayout>
  );
}
