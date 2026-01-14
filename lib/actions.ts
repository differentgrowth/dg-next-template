"use server";

/**
 * Server Actions utilities for React 19 forms.
 *
 * These utilities work with useActionState for optimistic updates,
 * pending states, and progressive enhancement.
 *
 * @example
 * // Define a server action
 * async function submitForm(prevState: FormState, formData: FormData) {
 *   const result = await saveData(formData);
 *   return createFormState(result.success, result.message);
 * }
 *
 * // Use in a component
 * const [state, action, isPending] = useActionState(submitForm, initialFormState);
 */

/**
 * Standard form state structure for useActionState.
 */
export interface FormState<T = unknown> {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: T;
}

/**
 * Initial form state for useActionState.
 */
export const initialFormState: FormState = {
  success: false,
  message: "",
};

/**
 * Creates a success form state.
 */
export function formSuccess<T>(message: string, data?: T): FormState<T> {
  return {
    success: true,
    message,
    data,
  };
}

/**
 * Creates an error form state.
 */
export function formError(
  message: string,
  errors?: Record<string, string[]>
): FormState {
  return {
    success: false,
    message,
    errors,
  };
}

/**
 * Type-safe form data extractor.
 *
 * @example
 * const { name, email } = getFormFields(formData, ["name", "email"]);
 */
export function getFormFields<K extends string>(
  formData: FormData,
  fields: K[]
): Record<K, string> {
  return fields.reduce(
    (acc, field) => {
      acc[field] = formData.get(field)?.toString() ?? "";
      return acc;
    },
    {} as Record<K, string>
  );
}

/**
 * Validates required fields and returns errors if any are empty.
 *
 * @example
 * const errors = validateRequired(formData, ["name", "email"]);
 * if (errors) return formError("Please fill all fields", errors);
 */
export function validateRequired(
  formData: FormData,
  fields: string[]
): Record<string, string[]> | null {
  const errors: Record<string, string[]> = {};

  for (const field of fields) {
    const value = formData.get(field)?.toString()?.trim();
    if (!value) {
      errors[field] = [`${field} is required`];
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

/**
 * Wraps an async action with error handling.
 * Returns a form error state if the action throws.
 *
 * @example
 * export async function createUser(prevState: FormState, formData: FormData) {
 *   return withErrorHandling(async () => {
 *     const user = await db.user.create({ ... });
 *     return formSuccess("User created", user);
 *   });
 * }
 */
export async function withErrorHandling<T>(
  action: () => Promise<FormState<T>>
): Promise<FormState<T>> {
  try {
    return await action();
  } catch (error) {
    console.error("Action error:", error);
    return formError(
      error instanceof Error ? error.message : "An unexpected error occurred"
    ) as FormState<T>;
  }
}
