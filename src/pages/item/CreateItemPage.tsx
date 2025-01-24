// Import the CreateItemForm component from the specified path
import CreateItemForm from "./CreateItemForm";

// Define the CreateItemPage functional component
const CreateItemPage = () => {
 return (
  // Return a fragment containing the page structure
  <>
   {/* Main container with styling */}
   <div className="h-full flex-1 flex-col space-y-8 p-8">
    {/* Commented out CreateItemDialog component */}
    {/* <CreateItemDialog
          open={showCreateItemDialog}
          onClose={() => setShowCreateItemDialog(false)}
        /> */}

    {/* Header section with styling */}
    <div className="flex items-center justify-between space-y-2">
     <div>
      {/* Page title */}
      <h2 className="text-2xl font-bold tracking-tight">Create Item</h2>
      {/* Page description */}
      <p className="text-muted-foreground">Create Item's Page</p>
     </div>
    </div>

    {/* Render the CreateItemForm component */}
    <CreateItemForm />
   </div>
  </>
 );
};

// Export the CreateItemPage component as the default export
export default CreateItemPage;
