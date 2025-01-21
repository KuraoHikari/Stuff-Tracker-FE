import { Button } from "@/components/ui/button";

import { DataTable } from "./location/components/data-table";
import { columns } from "./location/components/columns";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateLocationDialog from "./location/CreateLocationDialog";
import useGetLocation from "@/hooks/useGetLocation";

import "leaflet/dist/leaflet.css";

const LocationPage = () => {
 const [showCreateLocationDialog, setShowCreateLocationDialog] =
  useState<boolean>(false);
 const { data } = useGetLocation();

 const createLocationDialog = (
  e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
 ) => {
  e.preventDefault();

  setShowCreateLocationDialog(true);
 };

 return (
  <>
   <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <CreateLocationDialog
     open={showCreateLocationDialog}
     onClose={() => setShowCreateLocationDialog(false)}
    />
    <div className="flex items-center justify-between space-y-2">
     <div>
      <h2 className="text-2xl font-bold tracking-tight">Location!</h2>
      <p className="text-muted-foreground">
       Here&apos;s a list of your Locationes
      </p>
     </div>
     <div className="flex items-center space-x-2">
      <Button
       variant={"outline"}
       onClick={(e) => {
        createLocationDialog(e);
       }}
      >
       <Plus />
       Add Location
      </Button>
     </div>
    </div>
    <DataTable data={data ?? []} columns={columns} />
   </div>
  </>
 );
};

export default LocationPage;
