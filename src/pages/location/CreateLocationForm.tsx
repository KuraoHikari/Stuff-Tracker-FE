import * as React from "react";

import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/LoadingButton";
import useCreateLocationMutation from "@/hooks/useCreateLocationMutation";
import {
 MapContainer,
 TileLayer,
 Marker,
 useMapEvents,
 useMap,
} from "react-leaflet";

// Import images at the top of your file
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { LocateFixed } from "lucide-react";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
 iconRetinaUrl,
 iconUrl,
 shadowUrl,
});

interface CreateLocationFormProps extends React.HTMLAttributes<HTMLDivElement> {
 onClose: () => void;
}

interface Position {
 lat: number;
 lng: number;
}

export const createLocationFormSchema = z.object({
 name: z.string(),
 address: z.string().optional(),
 latitude: z
  .union([z.string().transform((val) => parseFloat(val)), z.number()])
  .optional(),
 longitude: z
  .union([z.string().transform((val) => parseFloat(val)), z.number()])
  .optional(),
});

export function CreateLocationForm({ onClose }: CreateLocationFormProps) {
 const formSchema = createLocationFormSchema;
 const [position, setPosition] = React.useState<Position | null>(null);

 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   name: "",
   address: "",
   latitude: 0,
   longitude: 0,
  },
 });

 const { isPending, mutate } = useCreateLocationMutation();

 // Component to handle clicks on the map
 const MapClickHandler = () => {
  useMapEvents({
   click(e) {
    const newPosition: Position = e.latlng;
    setPosition(newPosition);

    form.setValue("latitude", newPosition.lat);
    form.setValue("longitude", newPosition.lng);
   },
  });
  return null;
 };

 // Component to programmatically update map view
 const MapHandler = ({ newPosition }: { newPosition: Position | null }) => {
  const map = useMap();
  React.useEffect(() => {
   if (newPosition) {
    map.setView(newPosition, 15); // Zoom to level 15
   }
  }, [newPosition, map]);
  return null;
 };

 const handleLocation = () => {
  navigator.geolocation.getCurrentPosition(
   (positionGeo: GeolocationPosition) => {
    const { latitude, longitude } = positionGeo.coords;
    const newPosition: Position = { lat: latitude, lng: longitude };
    setPosition(newPosition);

    form.setValue("latitude", newPosition.lat);
    form.setValue("longitude", newPosition.lng);
   },
   (error) => {
    console.error("Error getting location:", error);
   }
  );
 };

 function onSubmit(values: z.infer<typeof formSchema>) {
  mutate(values, { onSuccess: onClose });
 }

 return (
  <div className={cn("grid gap-6")}>
   <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
     <div className="grid gap-2">
      <div className="grid gap-1 text-start">
       <ScrollArea className="h-[500px] px-2">
        <FormField
         control={form.control}
         name="name"
         render={({ field }) => (
          <FormItem className="mx-1">
           <FormLabel>Location Name</FormLabel>
           <FormControl>
            <Input type="text" placeholder="shadcn" {...field} />
           </FormControl>
           <FormDescription>Name for this Location</FormDescription>
           <FormMessage />
          </FormItem>
         )}
        />
        <FormField
         control={form.control}
         name="address"
         render={({ field }) => (
          <FormItem className="mx-1">
           <FormLabel>Address</FormLabel>
           <FormControl>
            <Textarea placeholder="shadcn" {...field} />
           </FormControl>
           <FormDescription>
            {" "}
            Give more information about the placess
           </FormDescription>
           <FormMessage />
          </FormItem>
         )}
        />

        <Button
         variant="outline"
         className="w-full my-3"
         onClick={handleLocation}
         type="button"
        >
         <LocateFixed className="h-4 w-4 me-2" /> Use my current Location
        </Button>
        <MapContainer
         center={[-8.56404685895292, 115.22582292341778]}
         zoom={5}
         style={{ height: "300px", width: "100%" }}
        >
         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
         <MapClickHandler />
         <MapHandler newPosition={position} />
         {position && <Marker position={position} />}
        </MapContainer>
       </ScrollArea>

       <LoadingButton loading={isPending} className="mt-4" type="submit">
        Submit
       </LoadingButton>
      </div>
     </div>
    </form>
   </Form>
  </div>
 );
}
