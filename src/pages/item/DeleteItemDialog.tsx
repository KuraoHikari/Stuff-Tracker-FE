import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";

import { Item } from "./data/schema";

import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import useDeleteItemMutation from "@/hooks/useDeleteItemMutation";

interface DeleteItemDialogProps {
 item: Item;
 open: boolean;
 onClose: () => void;
}

export default function DeleteItemDialog({
 item,
 open,
 onClose,
}: DeleteItemDialogProps) {
 const mutation = useDeleteItemMutation(item.id);

 function handleOpenChange(open: boolean) {
  if (!open || !mutation.isPending) {
   onClose();
  }
 }

 return (
  <Dialog open={open} onOpenChange={handleOpenChange}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Delete Item?</DialogTitle>
     <DialogDescription>
      Are you sure you want to delete this Item? This action cannot be undone.
     </DialogDescription>
    </DialogHeader>
    <DialogFooter>
     <LoadingButton
      variant="destructive"
      onClick={() => mutation.mutate(undefined, { onSuccess: onClose })}
      loading={mutation.isPending}
     >
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
