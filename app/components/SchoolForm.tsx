"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type SchoolFormData = {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: FileList;
};

export default function SchoolForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SchoolFormData>();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: SchoolFormData) => {
    try {
      setErrorMsg(null);

      // file validation
      const file = data.image?.[0];
      if (!file) {
        setErrorMsg("Please upload a school image.");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setErrorMsg("Only image files are allowed.");
        return;
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);
      formData.append("image", file);

      const res = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Failed to add school");
      }

      reset();
      router.push("/view-schools");
    } catch (error: any) {
      setErrorMsg(error?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block mb-1 font-medium">
          School Name *
        </label>
        <input
          {...register("name", {
            required: "School name is required",
            minLength: { value: 2, message: "Name must be at least 2 characters" },
          })}
          className="w-full border border-gray-300 focus:outline-cyan-600 rounded px-3 py-2"
          placeholder="e.g. DPS Lucknow"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Address *
        </label>
        <input
          {...register("address", {
            required: "Address is required",
            minLength: { value: 4, message: "Address is too short" },
          })}
          className="w-full border border-gray-300 focus:outline-cyan-600 rounded px-3 py-2"
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">
            City *
          </label>
          <input
            {...register("city", {
              required: "City is required",
            })}
            className="w-full border border-gray-300 focus:outline-cyan-600 rounded px-3 py-2"
          />
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">
            State *
          </label>
          <input
            {...register("state", {
              required: "State is required",
            })}
            className="w-full border border-gray-300 focus:outline-cyan-600 rounded px-3 py-2"
          />
          {errors.state && (
            <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">
            Contact *
          </label>
          <input
            type="text"
            {...register("contact", {
              required: "Contact number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit number",
              },
            })}
            className="w-full border border-gray-300 focus:outline-cyan-600 rounded px-3 py-2"
          />
          {errors.contact && (
            <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Email *
          </label>
          <input
            type="email"
            {...register("email_id", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            })}
            className="w-full border border-gray-300 focus:outline-cyan-600 rounded px-3 py-2"
            placeholder="example@mail.com"
          />
          {errors.email_id && (
            <p className="text-red-500 text-xs mt-1">{errors.email_id.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">
          School Image *
        </label>
        <input
          type="file"
          accept="image/*"
          {...register("image", {
            required: "School image is required",
          })}
          className="w-full border border-gray-300 focus:outline-cyan-600 rounded px-3 py-2"
        />
        {errors.image && (
          <p className="text-red-500 text-xs mt-1">{errors.image.message as string}</p>
        )}
      </div>

      {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-cyan-700 text-white py-2 rounded hover:bg-cyan-600 disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Add School"}
      </button>
    </form>
  );
}
