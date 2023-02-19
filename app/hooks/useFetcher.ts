import { useFetcher as useRemixFetcher } from '@remix-run/react'

export default function useFetcher<T extends any>() {
  const fetcher = useRemixFetcher<T>()
  const isLoading = fetcher.state === 'loading'
  const isSubmitting = fetcher.state === 'submitting'
  const isIdle = fetcher.state === 'idle'

  return { fetcher, isLoading, isSubmitting, isIdle, data: fetcher.data }
}
