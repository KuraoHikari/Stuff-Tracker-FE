import EditItemForm from "./EditItemForm";

const EditItemPage = () => {
 return (
  <>
   <div className="h-full flex-1 flex-col space-y-8 p-8">
    {/* <CreateItemDialog
     open={showCreateItemDialog}
     onClose={() => setShowCreateItemDialog(false)}
    /> */}
    <div className="flex items-center justify-between space-y-2">
     <div>
      <h2 className="text-2xl font-bold tracking-tight">Edit Item</h2>
      <p className="text-muted-foreground">Create Item's Page</p>
     </div>
    </div>
    <EditItemForm />
   </div>
  </>
 );
};

export default EditItemPage;
