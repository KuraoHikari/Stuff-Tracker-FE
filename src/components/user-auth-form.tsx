import * as React from "react";

import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

import { Loader2 } from "lucide-react";
import useLoginMutation from "@/hooks/useLoginMutations";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
 toggleVariant: () => void;
}

export const loginSchema = z.object({
 email: z.string().email(),
 password: z.string().min(6),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
 const formSchema = loginSchema;

 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   email: "",
   password: "",
  },
 });

 const { isPending, mutate } = useLoginMutation();

 // 2. Define a submit handler.
 function onSubmit(values: z.infer<typeof formSchema>) {
  mutate(values);
 }

 return (
  <div className={cn("grid gap-6", className)} {...props}>
   <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
     <div className="grid gap-2">
      <div className="grid gap-1 text-start">
       <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Email</FormLabel>

          <FormControl>
           <Input type="email" placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>Your email address</FormDescription>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
           <Input type="password" placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>
           {" "}
           Your password. It must be at least 8 characters long
          </FormDescription>
          <FormMessage />
         </FormItem>
        )}
       />

       <Button className="mt-4" type="submit" disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit
       </Button>
      </div>
     </div>
    </form>
   </Form>
  </div>
 );
}
