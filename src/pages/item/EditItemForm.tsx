import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { format } from "date-fns";
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import useGetCategories from "@/hooks/useGetCategories";
import useGetStatus from "@/hooks/useGetStatus";
import useGetCondition from "@/hooks/useGetCondition";
import useGetLocation from "@/hooks/useGetLocation";
// import useEditItemMutation from "@/hooks/useEditItemMutation";
import LoadingButton from "@/components/LoadingButton";
import useGetItem from "@/hooks/useGetItem";
import useGetItemDetail from "@/hooks/useGetItemDetail";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import useEditItemMutation from "@/hooks/useEditItemMutation";

const cuidRegex = /^c[^\s-]{8,}$/;

export const editItemFormSchema = z.object({
 name: z.string().min(1).max(100),
 description: z.string().max(255).optional(),
 purchasePrice: z
  .union([z.string().transform((val) => parseFloat(val)), z.number()])
  .optional(),
 sellPrice: z
  .union([z.string().transform((val) => parseFloat(val)), z.number()])
  .optional(),
 estimatedValue: z
  .union([z.string().transform((val) => parseFloat(val)), z.number()])
  .optional(),
 purchaseDate: z
  .union([z.string().transform((val) => new Date(val)), z.date()])
  .optional(),
 expiredDate: z
  .union([z.string().transform((val) => new Date(val)), z.date()])
  .optional(),
 categoryId: z
  .string()
  .refine((val) => cuidRegex.test(val), { message: "Invalid CUID" })
  .optional(),
 image: z.string().url().optional(),
 conditionId: z.string().optional(),
 statusId: z.string().optional(),
 locationId: z.string().optional(),
});

export default function EditItemForm() {
 const { id } = useParams();
 const navigate = useNavigate();

 if (!id) {
  navigate("/item");
 }

 // Fetch necessary data
 const {} = useGetItem();
 const { data: categoryData } = useGetCategories();
 const { data: statusData } = useGetStatus();
 const { data: conditionData } = useGetCondition();
 const { data: locationData } = useGetLocation();
 const { data: itemDetail, isLoading } = useGetItemDetail(id as string);

 const { isPending, mutate } = useEditItemMutation(id as string);

 const form = useForm<z.infer<typeof editItemFormSchema>>({
  resolver: zodResolver(editItemFormSchema),
  defaultValues: {
   name: "",
   description: "",
   purchasePrice: undefined,
   sellPrice: undefined,
   estimatedValue: undefined,
   purchaseDate: undefined,
   expiredDate: undefined,
   categoryId: "",
   conditionId: "",
   statusId: "",
   locationId: "",
  },
 });

 const { setValue } = form;

 // Update default values when data is loaded
 useEffect(() => {
  if (itemDetail && !isLoading) {
   setValue("name", itemDetail.name || "");
   setValue("description", itemDetail.description || "");
   setValue("purchasePrice", itemDetail.purchasePrice || undefined);
   setValue("sellPrice", itemDetail.sellPrice || undefined);
   setValue("estimatedValue", itemDetail.estimatedValue || undefined);
   setValue("purchaseDate", itemDetail.purchaseDate || undefined);
   setValue("expiredDate", itemDetail.expiredDate || undefined);
   setValue("categoryId", itemDetail.categoryId || "");
   setValue("conditionId", itemDetail.conditionId || "");
   setValue("statusId", itemDetail.statusId || "");
   setValue("locationId", itemDetail.locationId || "");
  }
 }, [itemDetail, isLoading, setValue]);

 function onSubmit(values: z.infer<typeof editItemFormSchema>) {
  mutate(values);
  navigate("/item");
 }

 if (isLoading) {
  return <div>Loading...</div>;
 }

 return (
  <Form {...form}>
   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <FormField
     control={form.control}
     name="name"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Item Name</FormLabel>
       <FormControl>
        <Input placeholder="book" type="text" {...field} />
       </FormControl>
       <FormDescription>Item's Name</FormDescription>
       <FormMessage />
      </FormItem>
     )}
    />

    <FormField
     control={form.control}
     name="description"
     render={({ field }) => (
      <FormItem>
       <FormLabel>description</FormLabel>
       <FormControl>
        <Textarea
         placeholder="Placeholder"
         className="resize-none"
         {...field}
        />
       </FormControl>
       <FormDescription>Item's Description</FormDescription>
       <FormMessage />
      </FormItem>
     )}
    />

    <div className="grid grid-cols-12 gap-4">
     <div className="col-span-4">
      <FormField
       control={form.control}
       name="purchasePrice"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Purchase Price</FormLabel>
         <FormControl>
          <Input placeholder="10000" type="number" {...field} />
         </FormControl>
         <FormDescription>Purchase Price's Item</FormDescription>
         <FormMessage />
        </FormItem>
       )}
      />
     </div>

     <div className="col-span-4">
      <FormField
       control={form.control}
       name="sellPrice"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Sell Price</FormLabel>
         <FormControl>
          <Input placeholder="shadcn" type="number" {...field} />
         </FormControl>
         <FormDescription>Item's Selling Price</FormDescription>
         <FormMessage />
        </FormItem>
       )}
      />
     </div>

     <div className="col-span-4">
      <FormField
       control={form.control}
       name="estimatedValue"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Estimated Value</FormLabel>
         <FormControl>
          <Input placeholder="100000" type="number" {...field} />
         </FormControl>
         <FormDescription>Item's Estimated Value</FormDescription>
         <FormMessage />
        </FormItem>
       )}
      />
     </div>
    </div>

    <div className="grid grid-cols-12 gap-4">
     <div className="col-span-6">
      <FormField
       control={form.control}
       name="purchaseDate"
       render={({ field }) => (
        <FormItem className="flex flex-col">
         <FormLabel>Purchase Date</FormLabel>
         <Popover>
          <PopoverTrigger asChild>
           <FormControl>
            <Button
             variant={"outline"}
             className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
             )}
            >
             {field.value ? (
              format(field.value, "PPP")
             ) : (
              <span>Pick a date</span>
             )}
             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
           </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
           <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            initialFocus
           />
          </PopoverContent>
         </Popover>
         <FormDescription>Items's Purcase Date</FormDescription>
         <FormMessage />
        </FormItem>
       )}
      />
     </div>

     <div className="col-span-6">
      <FormField
       control={form.control}
       name="expiredDate"
       render={({ field }) => (
        <FormItem className="flex flex-col">
         <FormLabel>Expired Date</FormLabel>
         <Popover>
          <PopoverTrigger asChild>
           <FormControl>
            <Button
             variant={"outline"}
             className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
             )}
            >
             {field.value ? (
              format(field.value, "PPP")
             ) : (
              <span>Pick a date</span>
             )}
             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
           </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
           <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            initialFocus
           />
          </PopoverContent>
         </Popover>
         <FormDescription>Item's Expired Date</FormDescription>
         <FormMessage />
        </FormItem>
       )}
      />
     </div>
    </div>

    <div className="grid grid-cols-12 gap-4">
     <div className="col-span-6">
      {/* Category Field */}
      <FormField
       control={form.control}
       name="categoryId"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Category</FormLabel>
         <Select
          onValueChange={field.onChange}
          value={field.value || ""}
          defaultValue={itemDetail?.categoryId || ""}
         >
          <FormControl>
           <SelectTrigger>
            <SelectValue placeholder="Select a category" />
           </SelectTrigger>
          </FormControl>
          <SelectContent>
           {categoryData?.map((category) => (
            <SelectItem key={category.id} value={category.id}>
             {category.name}
            </SelectItem>
           ))}
          </SelectContent>
         </Select>
         <FormMessage />
        </FormItem>
       )}
      />
     </div>

     <div className="col-span-6">
      {/* Condition Field */}
      <FormField
       control={form.control}
       name="conditionId"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Condition</FormLabel>
         <Select
          onValueChange={field.onChange}
          value={field.value || ""}
          defaultValue={itemDetail?.conditionId || ""}
         >
          <FormControl>
           <SelectTrigger>
            <SelectValue placeholder="Select a condition" />
           </SelectTrigger>
          </FormControl>
          <SelectContent>
           {conditionData?.map((condition) => (
            <SelectItem key={condition.id} value={condition.id}>
             {condition.name}
            </SelectItem>
           ))}
          </SelectContent>
         </Select>
         <FormMessage />
        </FormItem>
       )}
      />
     </div>
    </div>

    <div className="grid grid-cols-12 gap-4">
     <div className="col-span-6">
      {/* Status Field */}
      <FormField
       control={form.control}
       name="statusId"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Status</FormLabel>
         <Select
          onValueChange={field.onChange}
          value={field.value || ""}
          defaultValue={itemDetail?.statusId || ""}
         >
          <FormControl>
           <SelectTrigger>
            <SelectValue placeholder="Select a status" />
           </SelectTrigger>
          </FormControl>
          <SelectContent>
           {statusData?.map((status) => (
            <SelectItem key={status.id} value={status.id}>
             {status.name}
            </SelectItem>
           ))}
          </SelectContent>
         </Select>
         <FormMessage />
        </FormItem>
       )}
      />
     </div>

     <div className="col-span-6">
      {/* Location Field */}
      <FormField
       control={form.control}
       name="locationId"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Location</FormLabel>
         <Select
          onValueChange={field.onChange}
          value={field.value || ""}
          defaultValue={itemDetail?.locationId || ""}
         >
          <FormControl>
           <SelectTrigger>
            <SelectValue placeholder="Select a location" />
           </SelectTrigger>
          </FormControl>
          <SelectContent>
           {locationData?.map((location) => (
            <SelectItem key={location.id} value={location.id}>
             {location.name}
            </SelectItem>
           ))}
          </SelectContent>
         </Select>
         <FormMessage />
        </FormItem>
       )}
      />
     </div>
    </div>
    <LoadingButton loading={isPending} className="mt-4" type="submit">
     Submit
    </LoadingButton>
   </form>
  </Form>
 );
}
