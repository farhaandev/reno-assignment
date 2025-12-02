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
  image: string; // FileList Not now, we'll keep it simple string
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

      const res = await fetch("/api/schools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to add school.");
      }

      reset();
      router.push("/view-schools");
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || "Something went wrong.")
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block mb-1 font-medium">
          School Name *
          {errors.name && <span className="text-red-500 text-sm ml-2">(Required)</span>}
        </label>
        <input
          {...register("name", { required: true })}
          className="w-full border border-gray-300 focus:outline-cyan-600 rounded px-3 py-2"
          placeholder="e.g. DPS Lucknow"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Address *</label>
        <input
          {...register("address", { required: true })}
          className="w-full border border-gray-300 focus:outline-cyan-600 rounded px-3 py-2"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">City *</label>
          <input
            {...register("city", { required: true })}
            className="w-full border border-gray-300 focus:outline-cyan-600 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">State *</label>
          <input
            {...register("state", { required: true })}
            className="w-full border border-gray-300 focus:outline-cyan-600 rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Contact *</label>
          <input
            type="text"
            {...register("contact", { required: true })}
            className="w-full border border-gray-300 focus:outline-cyan-600 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Email *
            {errors.email_id && (
              <span className="text-red-500 text-sm ml-2">(Invalid email)</span>
            )}
          </label>
          <input
            type="email"
            {...register("email_id", {
              required: true,
              pattern: /^\S+@\S+\.\S+$/,
            })}
            className="w-full border border-gray-300 focus:outline-cyan-600 rounded px-3 py-2"
            placeholder="example@mail.com"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">School Image</label>
        <input
          type="text"
          accept="image/*"
          {...register("image", { required: true })}
          className="w-full border border-gray-300 focus:outline-cyan-600 rounded px-3 py-2"
        />
      </div>

      {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

      <button
        type="submit"
        className="w-full bg-cyan-700 text-white py-2 rounded hover:bg-cyan-600"
      >
        {isSubmitting ? "Submitting..." : "Add School"}
      </button>
    </form>
  );
}
