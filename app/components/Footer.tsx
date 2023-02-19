import React from 'react'
import useFetcher from '~/hooks/useFetcher'
import PaperAirplane from './svg/PaperAirplane'
import Spinner from './svg/Spinner'

export default function Footer() {
  const { fetcher, isSubmitting, data } = useFetcher<{
    error?: string
    message?: string
  }>()
  return (
    <footer className='bg-white max-w-5xl m-auto py-6 px-1'>
      <h2 className='text-sage mb-2 font-bold text-2xl'>Email Sign Up</h2>
      <fetcher.Form
        className='flex gap-2 flex-col items-start md:flex-row md:items-center '
        method='put'
        action='/api/guests'>
        <input
          type='hidden'
          name='_action'
          id='_action'
          value='email-sign-up'
        />
        <input
          type='text'
          name='search'
          id='search'
          min={3}
          max={255}
          className='rounded border-sage border-2'
          placeholder='Sam Johnston'
          required
        />
        <div className='flex'>
          <input
            type='email'
            name='email'
            id='email'
            className='rounded rounded-tr-none rounded-br-none border-sage border-2'
            placeholder='example@example.com'
            required
          />
          <button
            type='submit'
            className='bg-sage text-white p-2 px-4 rounded-tr rounded-br transition active:opacity-70 disabled:opacity-70'
            disabled={isSubmitting}>
            <PaperAirplane />
          </button>
        </div>
        {isSubmitting ? <Spinner /> : null}
        {data?.error ? (
          <span className='text-red-500'>{data?.error}</span>
        ) : data?.message ? (
          <span className='text-sage'>{data?.message}</span>
        ) : null}
      </fetcher.Form>
    </footer>
  )
}
