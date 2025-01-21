import { Button } from "@/components/ui/button";

import { DataTable } from "./status/components/data-table";
import { columns } from "./status/components/columns";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateStatusDialog from "./status/CreateStatusDialog";
import useGetStatus from "@/hooks/useGetStatus";

const StatusPage = () => {
 const [showCreateStatusDialog, setShowCreateStatusDialog] =
  useState<boolean>(false);
 const { data } = useGetStatus();

 const createStatusDialog = (
  e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
 ) => {
  e.preventDefault();

  setShowCreateStatusDialog(true);
 };

 return (
  <>
   <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <CreateStatusDialog
     open={showCreateStatusDialog}
     onClose={() => setShowCreateStatusDialog(false)}
    />
    <div className="flex items-center justify-between space-y-2">
     <div>
      <h2 className="text-2xl font-bold tracking-tight">Status!</h2>
      <p className="text-muted-foreground">
       Here&apos;s a list of your Statuses
      </p>
     </div>
     <div className="flex items-center space-x-2">
      <Button
       variant={"outline"}
       onClick={(e) => {
        createStatusDialog(e);
       }}
      >
       <Plus />
       Add Status
      </Button>
     </div>
    </div>
    <DataTable data={data ?? []} columns={columns} />
   </div>
  </>
 );
};

export default StatusPage;
