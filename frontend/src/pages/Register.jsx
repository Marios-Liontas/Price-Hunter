import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.registerUser, {
    onSuccess: async (data) => {
      console.log("User registration successful", data);
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error) => {
      console.log("Registration failed", error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-10" onSubmit={onSubmit}>
      <label className="text-gray-700 text-md font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded-md border-gray-700 w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
      </label>

      <label className="text-gray-700 text-md font-bold flex-1">
        Username
        <input
          type="text"
          className="border rounded-md border-gray-700 w-full py-1 px-2 font-normal"
          {...register("username", { required: "This field is required" })}
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
      </label>

      <label className="text-gray-700 text-md font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded-md border-gray-700 w-full py-1 px-2 font-normal"
          {...register("password", { required: "This field is required" })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </label>

      <label className="text-gray-700 text-md font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded-md border-gray-700 w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </label>

      <span className="flex flex-row items-center">
        <button
          type="submit"
          className="rounded bg-gray-700 text-white p-2 mt-2 font-bold hover:bg-gray-900"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Registering..." : "Register"}
        </button>
        <p className="pl-3">
          Already have an account?{" "}
          <Link to="/signin" className="underline">
            Sign in here
          </Link>
        </p>
      </span>
    </form>
  );
};

export default Register;
