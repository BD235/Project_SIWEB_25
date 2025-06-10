// app/admin/transaction/create/page.tsx
import AdminLayout from '@/components/admin/AdminLayout';
import TransactionCreateForm from '@/components/admin/TransactionCreateForm';

export default function CreateTransactionPage() {
  return (
    <AdminLayout title="Add New Transaction">
      <div className="w-full">
        <TransactionCreateForm />
      </div>
    </AdminLayout>
  );
}