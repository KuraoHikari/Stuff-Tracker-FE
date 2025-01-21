import CreateItemForm from "./CreateItemForm";

const CreateItemPage = () => {
 return (
  <>
   <div className="h-full flex-1 flex-col space-y-8 p-8">
    {/* <CreateItemDialog
     open={showCreateItemDialog}
     onClose={() => setShowCreateItemDialog(false)}
    /> */}
    <div className="flex items-center justify-between space-y-2">
     <div>
      <h2 className="text-2xl font-bold tracking-tight">Create Item</h2>
      <p className="text-muted-foreground">Create Item's Page</p>
     </div>
    </div>
    <CreateItemForm />
   </div>
  </>
 );
};

export default CreateItemPage;
