import React, { useEffect, useState } from 'react'
import * as ReactDialog from '@radix-ui/react-dialog'
import { Form } from '@remix-run/react'

const emailSignUpKey = 'email-signed-up'

export default function Dialog() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setOpen(!document.cookie.includes(emailSignUpKey))
    }, 5000)
  }, [])

  const closeDialog = () => {
    setOpen(false)
    document.cookie = `${emailSignUpKey}=1`
  }

  return (
    <ReactDialog.Root open={open}>
      <ReactDialog.Portal>
        <ReactDialog.Overlay
          className='bg-black/25 fixed inset-0'
          onClick={closeDialog}
        />
        <ReactDialog.Content
          className='bg-white rounded-md shadow-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 p-6 focus:outline-none'
          onEscapeKeyDown={closeDialog}>
          <ReactDialog.Title className='m-0 font-medium text-sage text-xl'>
            Email Sign Up
          </ReactDialog.Title>
          <ReactDialog.Description className='mt-3 mb-5 text-black text-base '>
            Give us your email to keep up to date with all our wedding updates
          </ReactDialog.Description>
          <Form method='post'>
            <input
              type='hidden'
              name='_action'
              id='_action'
              value='email-sign-up'
            />
            <div className='flex'>
              <input
                type='email'
                name='email'
                className='rounded rounded-tr-none rounded-br-none flex-1 border-sage border-2 focus:border-sage'
                id='email'
                placeholder='example@example.com'
                required
              />

              <button
                type='submit'
                className='rounded rounded-tl-none rounded-bl-none px-4 font-medium bg-sage text-white'
                aria-label='Close'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                  />
                </svg>
              </button>
            </div>
          </Form>

          <ReactDialog.Close asChild>
            <button
              className='inline-flex items-center justify-center rounded px-4 h-9 font-medium absolute top-3 right-3'
              aria-label='Close'
              onClick={closeDialog}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4   h-4'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </ReactDialog.Close>
        </ReactDialog.Content>
      </ReactDialog.Portal>
    </ReactDialog.Root>
  )
}
