import { useState } from 'react'

export type FormErrors<T> = Partial<Record<keyof T, string>>
export type FormValidator<T> = (values: T) => FormErrors<T>

type FormSubmission = 'idle' | 'submitting' | 'success' | 'error'

export function useForm<T extends Record<keyof T, string>>(
  initialValues: T,
  validate: FormValidator<T>,
  onSubmit: (values: T) => Promise<void>,
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors<T>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [submission, setSubmission] = useState<FormSubmission>('idle')
  const [submissionMessage, setSubmissionMessage] = useState('')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const field = event.currentTarget.name as keyof T
    const nextValues = { ...values, [field]: event.currentTarget.value }
    setValues(nextValues)
    if (touched[field]) setErrors(validate(nextValues))
    if (submission !== 'idle') setSubmission('idle')
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const field = event.currentTarget.name as keyof T
    setTouched((currentTouched) => ({ ...currentTouched, [field]: true }))
    setErrors(validate(values))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setTouched(Object.fromEntries(Object.keys(values).map((field) => [field, true])) as Partial<Record<keyof T, boolean>>)
    setSubmissionMessage('')

    if (Object.keys(nextErrors).length > 0) {
      setSubmission('idle')
      return
    }

    setSubmission('submitting')
    try {
      await onSubmit(values)
      setSubmission('success')
      setSubmissionMessage('Your account is ready. Registration completed successfully.')
    } catch (error) {
      setSubmission('error')
      setSubmissionMessage(error instanceof Error ? error.message : 'Registration could not be completed. Please try again.')
    }
  }

  return { values, errors, touched, submission, submissionMessage, handleChange, handleBlur, handleSubmit }
}