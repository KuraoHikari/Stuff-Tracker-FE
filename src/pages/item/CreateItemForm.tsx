// Importing required libraries and components for form handling and UI
import { useForm } from "react-hook-form"; // React Hook Form for managing form state and validation
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver to integrate Zod schema validation with React Hook Form
import * as z from "zod"; // Zod library for schema validation
import { cn } from "@/lib/utils"; // Utility function for class name concatenation
import { Button } from "@/components/ui/button"; // Button component
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Form components for better structure and styling
import { Input } from "@/components/ui/input"; // Input component
import { Textarea } from "@/components/ui/textarea"; // Textarea component
import { format } from "date-fns"; // Library for date formatting
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Popover components for date picker UI
import { Calendar } from "@/components/ui/calendar"; // Calendar component for selecting dates
import { Calendar as CalendarIcon } from "lucide-react"; // Calendar icon
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Select dropdown components
import useGetCategories from "@/hooks/useGetCategories"; // Hook to fetch categories
import useGetStatus from "@/hooks/useGetStatus"; // Hook to fetch statuses
import useGetCondition from "@/hooks/useGetCondition"; // Hook to fetch conditions
import useGetLocation from "@/hooks/useGetLocation"; // Hook to fetch locations
import useCreateItemMutation from "@/hooks/useCreateItemMutation"; // Hook for creating new items via mutation
import LoadingButton from "@/components/LoadingButton"; // LoadingButton component for submit actions
import useGetItem from "@/hooks/useGetItem"; // Hook to fetch items

// Regular expression to validate CUID (unique IDs)
const cuidRegex = /^c[^\s-]{8,}$/;

// Zod schema for validating the Create Item form data
export const createItemFormSchema = z.object({
 name: z.string().min(1).max(100), // Name field: required, max 100 characters
 description: z.string().max(255).optional(), // Description field: optional, max 255 characters
 purchasePrice: z.union([z.string().transform((val) => parseFloat(val)), z.number()]).optional(), // Purchase Price: can be a string or number, optional
 sellPrice: z.union([z.string().transform((val) => parseFloat(val)), z.number()]).optional(), // Sell Price: can be a string or number, optional
 estimatedValue: z.union([z.string().transform((val) => parseFloat(val)), z.number()]).optional(), // Estimated Value: can be a string or number, optional
 purchaseDate: z.union([z.string().transform((val) => new Date(val)), z.date()]).optional(), // Purchase Date: can be a string or date, optional
 expiredDate: z.union([z.string().transform((val) => new Date(val)), z.date()]).optional(), // Expired Date: can be a string or date, optional
 categoryId: z
  .string()
  .refine((val) => cuidRegex.test(val), { message: "Invalid CUID" })
  .optional(), // Category ID: must match CUID format, optional
 image: z.string().url().optional(), // Image field: must be a valid URL, optional
 conditionId: z.string().optional(), // Condition ID: optional
 statusId: z.string().optional(), // Status ID: optional
 locationId: z.string().optional(), // Location ID: optional
});

// Main CreateItemForm component
export default function CreateItemForm() {
 // Fetching all items (currently not used but available)
 const {} = useGetItem();

 // Fetching categories, conditions, statuses, and locations
 const { data: categoryData } = useGetCategories(); // Fetch categories
 const { data: statusData } = useGetStatus(); // Fetch statuses
 const { data: conditionData } = useGetCondition(); // Fetch conditions
 const { data: locationData } = useGetLocation(); // Fetch locations

 // Hook for creating a new item
 const { isPending, mutate } = useCreateItemMutation();

 // Initializing form state and validation with React Hook Form and Zod
 const form = useForm<z.infer<typeof createItemFormSchema>>({
  resolver: zodResolver(createItemFormSchema), // Using Zod for validation
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

 // Function to handle form submission
 function onSubmit(values: z.infer<typeof createItemFormSchema>) {
  mutate(values); // Calls the mutation to create the item
 }

 return (
  <Form {...form}>
   {/* Form element with controlled input fields */}
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
        <Textarea placeholder="Placeholder" className="resize-none" {...field} />
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
            <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
             {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
           </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
           <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
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
            <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
             {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
           </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
           <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
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
