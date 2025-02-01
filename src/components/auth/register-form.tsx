import * as z from "zod";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
// import { Button } from "@/components/ui/button";
// import FormError from "@/components/form-error";
// import FormSuccess from "@/components/form-success";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/utils/firebase";
export default function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    console.log(values);
    // createUserWithEmailAndPassword(auth, values.email, values.password)
    //   .then((userCredential) => {
    //     console.log(userCredential);
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(error);
    //     // ..
    //   });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="space-y-6">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      {...field}
                      placeholder="John Doe"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      {...field}
                      placeholder="john@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      {...field}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <FormError message="" />
          <FormSuccess message="" /> */}
          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
}
