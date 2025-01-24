// Importing necessary components and hooks
import { DataTable } from "./item/components/data-table";
import { columns } from "./item/components/columns";
import useGetItem from "@/hooks/useGetItem";

// ItemPage component definition
const ItemPage = () => {
 // Fetching item data using the useGetItem hook
 const { data } = useGetItem();

 return (
  <>
   {/* Main container for the page */}
   <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    {/* Header section with title and description */}
    <div className="flex items-center justify-between space-y-2">
     <div>
      <h2 className="text-2xl font-bold tracking-tight">Item!</h2>
      <p className="text-muted-foreground">Here&apos;s a list of your Items</p>
     </div>
    </div>
    {/* DataTable component to display the items */}
    <DataTable data={data ?? []} columns={columns} />
   </div>
  </>
 );
};

// Exporting the ItemPage component as default
export default ItemPage;
