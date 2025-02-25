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
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleSignup } from "@/lib/features/users/userSlice";
import Spinner from "@/utils/Spinner";
// import FormError from "@/components/form-error";
// import FormSuccess from "@/components/form-success";
export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loadingSignup } = useAppSelector((state) => state.user);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    dispatch(
      handleSignup({
        email: values.email,
        password: values.password,
        navigate: navigate,
      })
    );
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
            disabled={loadingSignup}
            className={`w-full ${loadingSignup ? "bg-gray-500 hover:bg-gray-600" : " bg-yellow-500 hover:bg-yellow-600 text-black"}`}
          >
            {loadingSignup ? <Spinner /> : "Sign Up"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
