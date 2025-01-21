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
import useCreateConditionMutation from "@/hooks/useCreateConditionMutation";

interface CreateConditionFormProps
 extends React.HTMLAttributes<HTMLDivElement> {
 onClose: () => void;
}

export const createConditionFormSchema = z.object({
 name: z.string(),
 description: z.string().optional(),
});

export function CreateConditionForm({ onClose }: CreateConditionFormProps) {
 const formSchema = createConditionFormSchema;

 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   name: "",
   description: "",
  },
 });

 const { isPending, mutate } = useCreateConditionMutation();

 //  const { isPending, mutate } = useUpdateContactDetailMutation(
 //   contact?.number,
 //   page
 //  );
 // 2. Define a submit handler.
 function onSubmit(values: z.infer<typeof formSchema>) {
  //   mutate(values, { onSuccess: onClose });
  mutate(values, { onSuccess: onClose });
 }

 return (
  <div className={cn("grid gap-6")}>
   <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
     <div className="grid gap-2">
      <div className="grid gap-1 text-start">
       <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Condition Name</FormLabel>

          <FormControl>
           <Input type="text" placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>Name for this Condition</FormDescription>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
           <Textarea placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>
           {" "}
           Give description for this Condition, it can help you some where
          </FormDescription>
          <FormMessage />
         </FormItem>
        )}
       />

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
