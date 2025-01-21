import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import { Category } from "./data/schema";
import { EditCategoryForm } from "./EditCategoryForm";

// import { EditContactForm } from "@/components/custom-form/edit-contact-form";

interface EditCategoryDialogProps {
 category: Category;
 open: boolean;
 onClose: () => void;
}

export default function EditCategoryDialog({
 category,
 open,
 onClose,
}: EditCategoryDialogProps) {
 function handleOpenChange(open: boolean) {
  if (!open) {
   onClose();
  }
 }

 return (
  <Dialog open={open} onOpenChange={handleOpenChange}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Edit Category</DialogTitle>
     <DialogDescription>
      Fill in the details below to Edit a category. Make sure to provide a
      unique name and a brief description.
     </DialogDescription>
     <EditCategoryForm onClose={onClose} category={category} />
    </DialogHeader>
   </DialogContent>
  </Dialog>
 );
}
