import { Button } from '@/components/ui/button';
import { useAuth } from '@/modules/Auth/hooks/useAuth';
import { useDialog } from '@/shared/providers/dialog/useDialog';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const dialog = useDialog();

  const handleDeleteClick = () => {
    dialog.confirmDelete({
      title: 'Delete Item',
      content: 'Are you sure you want to delete this item?',
      onDelete: () => {
        // Handle delete
        console.log('Deleted!');
      }
    });
  };

  const handleConfirmClick = () => {
    dialog.confirm({
      title: 'Confirm Action',
      content: 'Are you sure you want to proceed?',
      onConfirm: () => {
        // Handle confirmation
        console.log('Confirmed!');
      },
      showCancel: true
    });
  };

  const handleCustomDialog = () => {
    dialog.custom({
      content: (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Custom Dialog</h2>
          <p className="text-gray-600">This is a custom dialog with any content you want!</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={dialog.close}>
              Close
            </Button>
            <Button variant="default">Save</Button>
          </div>
        </div>
      )
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Custom Dialogs</h1>

            <div className="flex gap-2">
              <Button onClick={handleDeleteClick}>Delete Item</Button>
              <Button onClick={handleConfirmClick}>Confirm Action</Button>
              <Button onClick={handleCustomDialog}>Open Custom Dialog</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
