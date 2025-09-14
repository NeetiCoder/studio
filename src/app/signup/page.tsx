"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { signUpWithEmail } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await signUpWithEmail(values);
    if (result.error) {
      toast({
        variant: "destructive",
        title: "Sign-up failed",
        description: result.error,
      });
    } else {
      toast({
        title: "Success!",
        description: "Your account has been created.",
      });
      router.push("/dashboard");
    }
  };

  const inputStyles = "bg-background/50 border-border/50 focus-visible:ring-accent focus-visible:ring-offset-0 focus:neon-border-glow transition-all";

  return (
    <div className="min-h-screen py-12 bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <header className="text-center mb-8">
          <h1 className="font-headline text-5xl font-bold tracking-tighter animated-gradient-text">
            Create Your Account
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Join AstraPlan and start building your future.
          </p>
        </header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 glassmorphism p-8 rounded-lg"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      {...field}
                      className={cn(inputStyles)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-300">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} className={cn(inputStyles)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-300">Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} className={cn(inputStyles)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-lg font-bold bg-accent hover:bg-primary transition-all duration-300 transform hover:scale-105 neon-border-glow"
            >
              {isLoading && (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              )}
              Create Account
            </Button>
          </form>
        </Form>
        <p className="mt-6 text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/signin" className="text-accent hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
