import { Button } from "@/components/ui/button";

import { DataTable } from "./condition/components/data-table";
import { columns } from "./condition/components/columns";
import { Plus } from "lucide-react";
import { useState } from "react";
// import CreateConditionDialog from "./Condition/CreateStatusDialog";

import useGetCondition from "@/hooks/useGetCondition";
import CreateConditionDialog from "./condition/CreateConditionDialog";

const ConditionPage = () => {
 const [showCreateConditionDialog, setShowCreateConditionDialog] =
  useState<boolean>(false);
 const { data } = useGetCondition();

 const createConditionDialog = (
  e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
 ) => {
  e.preventDefault();

  setShowCreateConditionDialog(true);
 };

 return (
  <>
   <div className="h-full flex-1 flex-col space-y-8 p-8">
    <CreateConditionDialog
     open={showCreateConditionDialog}
     onClose={() => setShowCreateConditionDialog(false)}
    />
    <div className="flex items-center justify-between space-y-2">
     <div>
      <h2 className="text-2xl font-bold tracking-tight">Condition!</h2>
      <p className="text-muted-foreground">
       Here&apos;s a list of your Conditiones
      </p>
     </div>
     <div className="flex items-center space-x-2">
      <Button
       variant={"outline"}
       onClick={(e) => {
        createConditionDialog(e);
       }}
      >
       <Plus />
       Add Condition
      </Button>
     </div>
    </div>
    <DataTable data={data ?? []} columns={columns} />
   </div>
  </>
 );
};

export default ConditionPage;
