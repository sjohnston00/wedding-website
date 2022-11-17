import type { LinksFunction, ActionFunction } from "@remix-run/node"
import { Form, useActionData, useTransition } from "@remix-run/react"
import { useRef } from "react"
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
  // await new Promise((res) => setTimeout(res, 400)) //artificial delay
  const formData = await request.formData()
  const data = Object.fromEntries(formData) as RSVP

  const NOTION_API_KEY = process.env.NOTION_API_KEY
  const NOTION_API_ENDPOINT = "https://api.notion.com/v1"
  const NOTION_GUESTS_DB_ID = "c31ea07c-97da-4e84-b22c-3eea9eb61e60"
  const NOTION_API_VERSION = "2022-06-28"
  const myHeaders = {
    Authorization: `Bearer ${NOTION_API_KEY}`,
    "Notion-Version": NOTION_API_VERSION,
    "Content-Type": "application/json",
  }

  const getGuests = await fetch(
    `${NOTION_API_ENDPOINT}/databases/${NOTION_GUESTS_DB_ID}/query`,
    {
      method: "POST",
      headers: myHeaders,
    }
  )

  const guests = await getGuests.json()
  const guest = guests.results.filter(
    (page: any) => page.properties.Name.title[0].plain_text === data.name
  )
  if (guest.length === 0) {
    return {
      error: `Did not find a guest under the name: ${data.name}`,
    }
  }

  const guestPageId = guest[0].id

  const updateGuestRSVP = await fetch(
    `${NOTION_API_ENDPOINT}/pages/${guestPageId}`,
    {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify({
        properties: {
          rsvp: { checkbox: true },
          rsvp_response: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: data.rsvp,
                },
              },
            ],
          },
          Starter: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: data.starter || "",
                },
              },
            ],
          },
          Main: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: data.mainCourse || "",
                },
              },
            ],
          },
          Dessert: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: data.dessert || "",
                },
              },
            ],
          },
        },
      }),
    }
  )

  if (updateGuestRSVP.status === 200) {
    return {
      message: "RSVP saved",
    }
  }

  return {
    error: "Error updating your RSVP",
  }
}

export default function Index() {
  const formRef = useRef<HTMLFormElement>(null)
  const foodOptionsRef = useRef<HTMLDivElement>(null)
  const actionData = useActionData()
  const transition = useTransition()

  if (actionData) {
    formRef.current?.reset()
    if (!foodOptionsRef.current) return
    foodOptionsRef.current.hidden = true
  }

  return (
    <>
      <TimeToWedding />
      <Form method="post" ref={formRef} className="rsvp-form">
        <h1 id="rsvp">RSVP</h1>
        <span>{actionData?.error}</span>
        <span>{actionData?.message}</span>
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
          <div className="form-group" hidden>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              autoComplete="email"
              maxLength={255}
              // required
            />
          </div>
        </div>

        <fieldset>
          <label className="block">Will you be attending?</label>
          <label htmlFor="rsvp-yes">
            <input
              type="radio"
              name="rsvp"
              id="rsvp-yes"
              value="yes"
              onChange={() => {
                if (!foodOptionsRef.current) return
                foodOptionsRef.current.hidden = false
              }}
              required
            />
            Yes
          </label>
          <label htmlFor="rsvp-no">
            <input
              type="radio"
              name="rsvp"
              id="rsvp-no"
              value="no"
              onChange={() => {
                if (!foodOptionsRef.current) return
                foodOptionsRef.current.hidden = true
              }}
              required
            />
            No
          </label>
        </fieldset>

        <div id="food-options" ref={foodOptionsRef} hidden>
          <h2>Food Options</h2>

          <fieldset>
            <h3>Starter</h3>
            <label className="block">
              <input
                type="radio"
                name="starter"
                id="starter"
                value="starter-1"
              />
              Starter 1
            </label>
            <label className="block">
              <input
                type="radio"
                name="starter"
                id="starter"
                value="starter-2"
              />
              Starter 2
            </label>
          </fieldset>

          <fieldset>
            <h3>Main Course</h3>
            <label className="block">
              <input
                type="radio"
                name="mainCourse"
                id="mainCourse"
                value="mainCourse-1"
              />
              mainCourse 1
            </label>
            <label className="block">
              <input
                type="radio"
                name="mainCourse"
                id="mainCourse"
                value="mainCourse-2"
              />
              mainCourse 2
            </label>
          </fieldset>

          <fieldset>
            <h3>Dessert</h3>
            <label className="block">
              <input
                type="radio"
                name="dessert"
                id="dessert"
                value="dessert-1"
              />
              dessert 1
            </label>
            <label className="block">
              <input
                type="radio"
                name="dessert"
                id="dessert"
                value="dessert-2"
              />
              dessert 2
            </label>
          </fieldset>
        </div>

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
