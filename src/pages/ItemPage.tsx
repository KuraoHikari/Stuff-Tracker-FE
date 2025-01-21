import { DataTable } from "./item/components/data-table";
import { columns } from "./item/components/columns";

import useGetItem from "@/hooks/useGetItem";

const ItemPage = () => {
 const { data } = useGetItem();
 console.log("🚀 ~ ItemPage ~ data:", data);

 return (
  <>
   <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div className="flex items-center justify-between space-y-2">
     <div>
      <h2 className="text-2xl font-bold tracking-tight">Item!</h2>
      <p className="text-muted-foreground">Here&apos;s a list of your Itemes</p>
     </div>
    </div>
    <DataTable data={data ?? []} columns={columns} />
   </div>
  </>
 );
};

export default ItemPage;
