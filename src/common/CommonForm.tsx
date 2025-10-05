// src/components/CommonForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

interface FieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
}

interface Props<T> {
  fields: FieldConfig[];
  schema: ZodSchema<T>;
  onSubmitRedux: (data: T) => void;
}

const CommonForm = <T extends Record<string, unknown>>({
  fields,
  schema,
  onSubmitRedux,
}: Props<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: T) => {
    onSubmitRedux(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium mb-2 text-light-gray">
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              {...register(field.name as import("react-hook-form").Path<T>)}
              className="border border-border px-3 py-2 rounded w-full "
            >
              <option value="" className="">
                {field.placeholder}
              </option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt} className="">
                  {opt}
                </option>
              ))}
            </select>
          ) : field.type === "badge" ? (
            <div className="flex flex-wrap items-center gap-4 h-14">
              {field.options?.map((opt) => (
                <label key={opt} className="cursor-pointer">
                  <input
                    type="radio"
                    value={opt}
                    {...register(
                      field.name as import("react-hook-form").Path<T>
                    )}
                    className="hidden peer"
                  />
                  <span
                    className="px-6 py-4 bg-primary-background rounded-full text-sm font-medium text-light-gray peer-checked:bg-black peer-checked:text-light-background  
          hover:bg-black hover:text-light-background transition"
                  >
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          ) : field.type === "description" ? (
            <textarea
              {...register(field.name as import("react-hook-form").Path<T>)}
              placeholder={field.placeholder}
              className="border border-border px-3 py-2 rounded w-full h-28 "
            />
          ) : (
            <input
              type={field.type}
              {...register(field.name as import("react-hook-form").Path<T>)}
              placeholder={field.placeholder}
              className="border border-border px-3 py-2 rounded w-full"
            />
          )}
          {errors[field.name] && (
            <p className="text-red-500 text-sm">
              {typeof errors[field.name]?.message === "string"
                ? (errors[field.name]?.message as string)
                : ""}
            </p>
          )}
        </div>
      ))}
      {/* <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button> */}
    </form>
  );
};

export default CommonForm;
