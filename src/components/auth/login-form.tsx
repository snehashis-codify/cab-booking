import * as z from "zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/schemas";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleSignin } from "@/lib/features/users/userSlice";
import Spinner from "@/utils/Spinner";
// import FormError from "@/components/form-error";
// import FormSuccess from "@/components/form-success";
export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { loadingSignin } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    dispatch(
      handleSignin({
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white"
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
            disabled={loadingSignin}
            className={`w-full ${loadingSignin ? "bg-gray-500 hover:bg-gray-600" : " bg-yellow-500 hover:bg-yellow-600 text-black"} `}
          >
            {loadingSignin ? <Spinner /> : "Sign In"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
