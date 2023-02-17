import React, { useEffect, useRef, useState } from "react"
import * as ReactDialog from "@radix-ui/react-dialog"
import { useFetcher } from "@remix-run/react"
import type { Guest } from "~/types/guest"

const emailSignUpKey = "email-signed-up"

export default function Dialog() {
  const fetcher = useFetcher()
  const [open, setOpen] = useState(true)
  const [name, setName] = useState("")
  const [guest, setGuest] = useState<Guest | undefined>(undefined)
  const emailRef = useRef<HTMLInputElement>(null)
  const isLoading = fetcher.state === "loading"

  useEffect(() => {
    fetcher.load("/api/guests")
  }, [])

  const closeDialog = () => {
    setOpen(false)
    document.cookie = `${emailSignUpKey}=1`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    const url = new URL(window.location.origin + "/api/guests")
    url.pathname = "/api/guests"
    url.searchParams.set("search", newName)
    fetcher.load(url as unknown as string)
  }

  return (
    <ReactDialog.Root open={open}>
      <ReactDialog.Portal>
        <ReactDialog.Overlay
          className="bg-black/25 fixed inset-0"
          onClick={closeDialog}
        />
        <ReactDialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="bg-white rounded-md shadow-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 p-6 focus:outline-none overflow-y-auto"
          onEscapeKeyDown={closeDialog}>
          <ReactDialog.Title className="m-0 font-medium text-sage text-xl">
            Email Sign Up
          </ReactDialog.Title>
          <ReactDialog.Description className="mt-3 mb-5 text-black text-base ">
            Give us your email to keep up to date with all our wedding updates
          </ReactDialog.Description>
          <fetcher.Form method="get" action="/api/guests">
            <input
              type="hidden"
              name="_action"
              id="_action"
              value="email-sign-up"
            />
            <div className="relative autocomplete">
              <input
                type="text"
                name="search"
                onChange={handleChange}
                value={name}
                className="rounded rounded-tr-none rounded-br-none flex-1 border-sage border-2 focus:border-sage mb-4"
                id="search"
                placeholder="Sam Johnston"
                autoFocus={false}
                required
              />{" "}
              {isLoading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline h-5 w-5 animate-spin text-sage"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    className="fill-gray-200"></path>
                </svg>
              ) : null}
              <div
                id="automcomple-box"
                className="absolute inset-0 -translate-y-full w-full z-10 h-32 bg-white hidden transition shadow-lg rounded-tl rounded-tr flex-col gap-2 overflow-y-auto p-4">
                {fetcher.data?.slice(0, 10).map((guest: Guest, i: number) => (
                  <button
                    type="button"
                    onClick={() => {
                      setName(guest.name)
                      setGuest(guest)
                      emailRef.current?.focus()
                    }}
                    className="text-start hover:bg-gray-200 rounded p-3 transition"
                    key={i}>
                    {guest.name}
                  </button>
                ))}
                <small className="block text-center text-gray-400">
                  -- Search your name --
                </small>
              </div>
            </div>

            <div className="flex">
              <input
                type="email"
                name="email"
                ref={emailRef}
                // defaultValue={guest.email}
                className="rounded rounded-tr-none rounded-br-none flex-1 border-sage border-2 focus:border-sage"
                id="email"
                placeholder="example@example.com"
                required
              />

              <button
                type="submit"
                className="rounded rounded-tl-none rounded-bl-none px-4 font-medium bg-sage text-white"
                aria-label="Close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </fetcher.Form>

          <ReactDialog.Close asChild>
            <button
              className="inline-flex items-center justify-center rounded px-4 h-9 font-medium absolute top-3 right-3"
              aria-label="Close"
              onClick={closeDialog}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4   h-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </ReactDialog.Close>
        </ReactDialog.Content>
      </ReactDialog.Portal>
    </ReactDialog.Root>
  )
}
