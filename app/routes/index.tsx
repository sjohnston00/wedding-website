import type { LinksFunction, ActionFunction } from "@remix-run/node"
import { Form, useActionData, useTransition } from "@remix-run/react"
import { useRef, useState } from "react"
import TimeToWedding from "~/components/TimeToWedding"
import indexStyles from "~/styles/index.css"

type RSVP = {
  name: string
  email: string
  rsvp: "yes" | "no"
  starter?: "starter-1" | "starter-2"
  mainCourse?: "mainCourse-1" | "mainCourse-2"
  dessert?: "dessert-1" | "dessert-2"
  questionOrComments: string
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: indexStyles },
]

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 400)) //artificial delay
  const formData = await request.formData()
  const data = Object.fromEntries(formData) as RSVP
  return data
}

export default function Index() {
  const [attending, setAttending] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const actionData = useActionData()
  const transition = useTransition()

  if (actionData) {
    formRef.current?.reset()
  }

  return (
    <>
      <TimeToWedding />
      <Form method="post" ref={formRef} className="rsvp-form">
        <div className="flex justify-around gap-2">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              maxLength={255}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              autoComplete="email"
              maxLength={255}
              required
            />
          </div>
        </div>

        <fieldset>
          <label className="block" htmlFor="rsvp">
            Will you be attending?
          </label>
          <label>
            <input
              type="radio"
              name="rsvp"
              id="rsvp"
              value="yes"
              onChange={() => {
                setAttending(true)
              }}
              required
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="rsvp"
              id="rsvp"
              value="no"
              onChange={() => {
                setAttending(false)
              }}
              required
            />
            No
          </label>
        </fieldset>

        {attending && (
          <>
            <label className="block">Food Options</label>

            <fieldset>
              <label className="block" htmlFor="starter">
                Starter
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="starter"
                  id="starter"
                  value="starter-1"
                  required
                />
                Starter 1
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="starter"
                  id="starter"
                  value="starter-2"
                  required
                />
                Starter 2
              </label>
            </fieldset>

            <fieldset>
              <label className="block" htmlFor="mainCourse">
                Main Course
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="mainCourse"
                  id="mainCourse"
                  value="mainCourse-1"
                  required
                />
                mainCourse 1
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="mainCourse"
                  id="mainCourse"
                  value="mainCourse-2"
                  required
                />
                mainCourse 2
              </label>
            </fieldset>

            <fieldset>
              <label className="block" htmlFor="dessert">
                Dessert
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="dessert"
                  id="dessert"
                  value="dessert-1"
                  required
                />
                dessert 1
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="dessert"
                  id="dessert"
                  value="dessert-2"
                  required
                />
                dessert 2
              </label>
            </fieldset>
          </>
        )}

        <label className="block" htmlFor="questionOrComments">
          Questions or Comments
        </label>
        <input
          type="text"
          name="questionOrComments"
          id="questionOrComments"
          autoComplete="off"
        />
        <button
          className="inline-block"
          type="submit"
          disabled={transition.state === "submitting"}>
          Submit
        </button>
      </Form>
    </>
  )
}
