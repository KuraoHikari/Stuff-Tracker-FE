import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";

import { Location } from "./data/schema";

import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import useDeleteLocationMutation from "@/hooks/useDeleteLocationMutation";

interface DeleteLocationDialogProps {
 location: Location;
 open: boolean;
 onClose: () => void;
}

export default function DeleteLocationDialog({
 location,
 open,
 onClose,
}: DeleteLocationDialogProps) {
 const mutation = useDeleteLocationMutation(location.id);

 function handleOpenChange(open: boolean) {
  if (!open || !mutation.isPending) {
   onClose();
  }
 }

 return (
  <Dialog open={open} onOpenChange={handleOpenChange}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Delete Location?</DialogTitle>
     <DialogDescription>
      Are you sure you want to delete this Location? This action cannot be
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
