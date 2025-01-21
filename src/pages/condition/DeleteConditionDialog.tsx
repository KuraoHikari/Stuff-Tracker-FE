import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";

import { Condition } from "./data/schema";

import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import useDeleteConditionMutation from "@/hooks/useDeleteConditionMutation";

interface DeleteConditionDialogProps {
 condition: Condition;
 open: boolean;
 onClose: () => void;
}

export default function DeleteConditionDialog({
 condition,
 open,
 onClose,
}: DeleteConditionDialogProps) {
 const mutation = useDeleteConditionMutation(condition.id);

 function handleOpenChange(open: boolean) {
  if (!open || !mutation.isPending) {
   onClose();
  }
 }

 return (
  <Dialog open={open} onOpenChange={handleOpenChange}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Delete Condition?</DialogTitle>
     <DialogDescription>
      Are you sure you want to delete this Condition? This action cannot be
      undone.
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
