// Import necessary components from the UI library
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Import the Item type from the data schema
import { Item } from "./data/schema";

// Import the Button component and LoadingButton component
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";

// Import the custom hook for deleting an item
import useDeleteItemMutation from "@/hooks/useDeleteItemMutation";

// Define the props interface for the DeleteItemDialog component
interface DeleteItemDialogProps {
 item: Item; // The item to be deleted
 open: boolean; // Whether the dialog is open
 onClose: () => void; // Function to call when the dialog is closed
}

// Define and export the DeleteItemDialog functional component
export default function DeleteItemDialog({ item, open, onClose }: DeleteItemDialogProps) {
 // Use the custom hook to get the mutation object for deleting the item
 const mutation = useDeleteItemMutation(item.id);

 // Handle the change in the open state of the dialog
 function handleOpenChange(open: boolean) {
  if (!open || !mutation.isPending) {
   onClose(); // Close the dialog if it's not open or the mutation is not pending
  }
 }

 // Return the dialog component with its content
 return (
  <Dialog open={open} onOpenChange={handleOpenChange}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Delete Item?</DialogTitle>
     <DialogDescription>Are you sure you want to delete this Item? This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
     <LoadingButton variant="destructive" onClick={() => mutation.mutate(undefined, { onSuccess: onClose })} loading={mutation.isPending}>
      Delete
     </LoadingButton>
     <Button variant="outline" onClick={onClose} disabled={mutation.isPending}>
      Cancel
     </Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}
