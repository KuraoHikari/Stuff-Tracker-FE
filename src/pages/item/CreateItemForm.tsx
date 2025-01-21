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
import useCreateItemMutation from "@/hooks/useCreateItemMutation";
import LoadingButton from "@/components/LoadingButton";
import useGetItem from "@/hooks/useGetItem";

const cuidRegex = /^c[^\s-]{8,}$/;

export const createItemFormSchema = z.object({
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

export default function CreateItemForm() {
 //get All item
 const {} = useGetItem();

 //get All category
 const { data: categoryData } = useGetCategories();
 //get All condition
 const { data: statusData } = useGetStatus();
 //get All status
 const { data: conditionData } = useGetCondition();
 //get All location
 const { data: locationData } = useGetLocation();

 const { isPending, mutate } = useCreateItemMutation();

 const form = useForm<z.infer<typeof createItemFormSchema>>({
  resolver: zodResolver(createItemFormSchema),
  defaultValues: {
   name: "",
   description: "",
   purchasePrice: undefined,
   sellPrice: undefined,
   estimatedValue: undefined,
   purchaseDate: undefined,
   expiredDate: undefined,
   categoryId: undefined,
   conditionId: undefined,
   statusId: undefined,
   locationId: undefined,
  },
 });

 function onSubmit(values: z.infer<typeof createItemFormSchema>) {
  //   mutate(values, { onSuccess: onClose });
  mutate(values);
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
      <FormField
       control={form.control}
       name="categoryId"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Category</FormLabel>
         <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
           <SelectTrigger>
            <SelectValue placeholder="Select a category for the item" />
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
         <FormDescription>Select item category</FormDescription>
         <FormMessage />
        </FormItem>
       )}
      />
     </div>

     <div className="col-span-6">
      <FormField
       control={form.control}
       name="conditionId"
       render={({ field }) => (
        <FormItem>
         <FormLabel>condition</FormLabel>
         <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
           <SelectTrigger>
            <SelectValue placeholder="Select a conditionfor the item" />
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
         <FormDescription>Select item condition</FormDescription>
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
       name="statusId"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Status</FormLabel>
         <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
           <SelectTrigger>
            <SelectValue placeholder="Select a status for the item" />
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
         <FormDescription>Select item status</FormDescription>
         <FormMessage />
        </FormItem>
       )}
      />
     </div>

     <div className="col-span-6">
      <FormField
       control={form.control}
       name="locationId"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Location</FormLabel>
         <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
           <SelectTrigger>
            <SelectValue placeholder="Select a location for the item" />
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
         <FormDescription>Select item location</FormDescription>
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
