// Import the EditItemForm component from the specified path
import EditItemForm from "./EditItemForm";

// Define the EditItemPage functional component
const EditItemPage = () => {
 return (
  // Return a fragment containing the page structure
  <>
   {/* Main container with styling */}
   <div className="h-full flex-1 flex-col space-y-8 p-8">
    {/* Header section with styling */}
    <div className="flex items-center justify-between space-y-2">
     <div>
      {/* Page title */}
      <h2 className="text-2xl font-bold tracking-tight">Edit Item</h2>
      {/* Page description */}
      <p className="text-muted-foreground">Edit Item's Page</p>
     </div>
    </div>
    {/* Render the EditItemForm component */}
    <EditItemForm />
   </div>
  </>
 );
};

// Export the EditItemPage component as the default export
export default EditItemPage;
