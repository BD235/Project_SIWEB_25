import AdminLayout from '@/components/admin/AdminLayout';
import TransactionCreateForm from '@/components/admin/TransactionCreateForm';
import { getAllProducts } from '@/lib/queries/getProducts';

export default async function CreateTransactionPage() {
  // Make sure getAllProducts returns: { id: number; name: string; harga: number }[]
  const products = await getAllProducts();

  return (
    <AdminLayout title="Add New Transaction">
      <div className="w-full">
        <TransactionCreateForm products={products} />
      </div>
    </AdminLayout>
  );
}