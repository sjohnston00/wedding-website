import type { LinksFunction, ActionFunction } from "@remix-run/node"
import FAQs from "~/components/FAQs"
import Itenerary from "~/components/Itenerary"
import RSVP from "~/components/RSVP"
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
  return (
    <>
      <TimeToWedding />
      <RSVP.Form />
      <FAQs />
      <Itenerary />
    </>
  )
}
