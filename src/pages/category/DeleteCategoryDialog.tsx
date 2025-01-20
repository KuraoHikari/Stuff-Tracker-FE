import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";

import { Category } from "./data/schema";
import useDeleteCategoryMutation from "@/hooks/useDeleteCategoryMutation";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";

interface DeletePostDialogProps {
 category: Category;
 open: boolean;
 onClose: () => void;
}

export default function DeletePostDialog({
 category,
 open,
 onClose,
}: DeletePostDialogProps) {
 const mutation = useDeleteCategoryMutation(category.id);

 function handleOpenChange(open: boolean) {
  if (!open || !mutation.isPending) {
   onClose();
  }
 }

 return (
  <Dialog open={open} onOpenChange={handleOpenChange}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Delete post?</DialogTitle>
     <DialogDescription>
      Are you sure you want to delete this post? This action cannot be undone.
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
