import { reactive } from 'vue'
import { z } from 'zod'

export function useForm<T extends z.ZodSchema>(schema: T) {
  const errors = reactive<Record<string, string>>({})

  function validateField(field: keyof z.infer<T>, value: any) {
    try {
      schema.shape[field].parse(value)
      errors[field as string] = ''
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors[field as string] = error.errors[0].message
      }
    }
  }

  function validateAll(data: z.infer<T>) {
    try {
      schema.parse(data)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          errors[err.path[0] as string] = err.message
        })
      }
      return false
    }
  }

  return {
    errors,
    validateField,
    validateAll
  }
}