/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, DefaultValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useImperativeHandle, useCallback } from "react";
import { CommonFormRef, Props } from "@/types/CommonForm";
import { Editor, EditorTextChangeEvent } from "primereact/editor";

function CommonFormComponent<T extends Record<string, unknown>>(
  { fields, schema, onSubmit }: Props<T>,
  ref: React.Ref<CommonFormRef>
) {
  const defaultValues = fields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue ?? undefined;
    return acc;
  }, {} as Record<string, string | number | undefined>) as DefaultValues<T>;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
      </span>
    );
  };

  const header = renderHeader();

  const handleFormSubmit = useCallback(
    (data: T) => {
      onSubmit(data);
    },
    [onSubmit]
  );

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(handleFormSubmit),
  }));

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium mb-2 text-light-gray">
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              {...register(field.name as import("react-hook-form").Path<T>)}
              defaultValue={field.defaultValue}
              className="border border-border px-3 py-2 rounded w-full "
            >
              <option value="">{field.placeholder}</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
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
                    defaultValue={field.defaultValue}
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
          ) :
          field.type === "richText" ? (
              <Controller
              name={field.name as import("react-hook-form").Path<T>}
              control={control}
              defaultValue={(field.defaultValue) as any}
              render={({ field: controllerField }) => (
                <Editor
                  value={controllerField.value as string}
                  onTextChange={(e: EditorTextChangeEvent) =>
                    controllerField.onChange(e.htmlValue)
                  }
                  headerTemplate={header}
                  style={{ height: "320px" }}
                />
              )}
            />
        ) :  (
            <input
              type={field.type}
              {...register(field.name as import("react-hook-form").Path<T>)}
              defaultValue={field.defaultValue}
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
    </form>
  );
}

const CommonForm = forwardRef(CommonFormComponent) as <
  T extends Record<string, unknown>
>(
  props: Props<T> & { ref?: React.Ref<CommonFormRef> }
) => React.ReactElement;

export default CommonForm;
