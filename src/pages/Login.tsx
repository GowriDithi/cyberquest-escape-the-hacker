
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield, LockKeyhole, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

// Form validation schema
const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // If we're already logged in, redirect to the home page
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    // In a real app, this would be an API call to validate credentials
    // For this demo, we'll just simulate a successful login with any valid form data
    
    // Show loading toast
    toast.loading("Logging in...");
    
    // Simulate API delay
    setTimeout(() => {
      // Success case - in a real app this would check credentials
      if (data.username && data.password) {
        toast.dismiss();
        toast.success("Login successful!");
        
        // Store login state (in a real app, this would be a token)
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.dismiss();
        toast.error("Invalid credentials");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen matrix-bg flex flex-col items-center justify-center p-4">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-cyber-glow pointer-events-none"></div>
      
      <div className="cyber-card w-full max-w-md p-8 relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-cyber-blue/20 flex items-center justify-center">
            <Shield className="text-cyber-blue" size={28} />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-cyber-light mb-8">
          CyberQuest <span className="text-cyber-blue">Login</span>
        </h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cyber-light">Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-cyber-blue">
                        <User size={18} />
                      </span>
                      <Input
                        placeholder="Enter your username"
                        className="pl-10 bg-black/30 border-cyber-blue/30 text-cyber-light"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-cyber-danger" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cyber-light">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-cyber-blue">
                        <LockKeyhole size={18} />
                      </span>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10 bg-black/30 border-cyber-blue/30 text-cyber-light"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-cyber-danger" />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="w-full cyber-button"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-cyber-light/60">
            Don't have an account?{" "}
            <button
              onClick={() => toast.info("Registration not implemented in this demo")}
              className="text-cyber-blue hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
      
      <div className="fixed bottom-4 left-4 text-xs text-cyber-blue/60 font-mono z-10">
        sys.access: secure.login
      </div>
    </div>
  );
};

export default Login;
