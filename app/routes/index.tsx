import type { ActionFunction } from "@remix-run/node";
import FAQs from "~/components/FAQs";
import Itenerary from "~/components/Itenerary";
import RSVP from "~/components/RSVP";
import TimeToWedding from "~/components/TimeToWedding";

type TRSVP = {
  name: string;
  email: string;
  rsvp: "yes" | "no";
  starter?: "starter-1" | "starter-2";
  mainCourse?: "mainCourse-1" | "mainCourse-2";
  dessert?: "dessert-1" | "dessert-2";
  questionOrComments: string;
};

export const action: ActionFunction = async ({ request }) => {
  // await new Promise((res) => setTimeout(res, 400)) //artificial delay
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as TRSVP;

  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_API_ENDPOINT = "https://api.notion.com/v1";
  const NOTION_GUESTS_DB_ID = "c31ea07c-97da-4e84-b22c-3eea9eb61e60";
  const NOTION_API_VERSION = "2022-06-28";
  const myHeaders = {
    Authorization: `Bearer ${NOTION_API_KEY}`,
    "Notion-Version": NOTION_API_VERSION,
    "Content-Type": "application/json"
  };

  const getGuests = await fetch(
    `${NOTION_API_ENDPOINT}/databases/${NOTION_GUESTS_DB_ID}/query`,
    {
      method: "POST",
      headers: myHeaders
    }
  );

  const guests = await getGuests.json();
  const guest = guests.results.filter(
    (page: any) => page.properties.Name.title[0].plain_text === data.name
  );
  if (guest.length === 0) {
    return {
      error: `Did not find a guest under the name: ${data.name}`
    };
  }

  const guestPageId = guest[0].id;

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
                  content: data.rsvp
                }
              }
            ]
          },
          Starter: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: data.starter || ""
                }
              }
            ]
          },
          Main: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: data.mainCourse || ""
                }
              }
            ]
          },
          Dessert: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: data.dessert || ""
                }
              }
            ]
          }
        }
      })
    }
  );

  if (updateGuestRSVP.status === 200) {
    return {
      message: "RSVP saved"
    };
  }

  return {
    error: "Error updating your RSVP"
  };
};

export default function Index() {
  return (
    <>
      <div className='min-h-screen bg-sage text-white flex flex-col justify-center items-center p-4'>
        <h1 className='text-7xl md:text-8xl lg:text-9xl font-great-vibes text-center mb'>
          Save Our Date
        </h1>
        <h2 className='font-times-new-roman text-2xl tracking-wider'>
          Melissa & Sam
        </h2>
        <h2 className='font-times-new-roman text-2xl tracking-wider'>
          16.05.2024 | Hockwold Hall
        </h2>
      </div>

      <script src='/scripts/index.js' defer></script>
      <section
        id='time-to-wedding'
        className='flex flex-col md:flex-row justify-around text-white bg-sage gap-5 pb-10'>
        <div className='flex flex-col items-center justify-center gap-5'>
          <span className='font-bold text-6xl font-times-new-roman'>Days</span>
          <span
            id='days'
            className='font-times-new-roman text-4xl tracking-wider transition animate-show'>
            00
          </span>
        </div>
        <div className='flex flex-col items-center justify-center gap-5'>
          <span className='font-bold text-6xl font-times-new-roman'>Hours</span>
          <span
            className='font-times-new-roman text-4xl tracking-wider transition animate-show'
            id='hours'>
            00
          </span>
        </div>
        <div className='flex flex-col items-center justify-center gap-5'>
          <span className='font-bold text-6xl font-times-new-roman'>
            Minutes
          </span>
          <span
            className='font-times-new-roman text-4xl tracking-wider transition animate-show'
            id='minutes'>
            00
          </span>
        </div>
        <div className='flex flex-col items-center justify-center gap-5'>
          <span className='font-bold text-6xl font-times-new-roman'>
            Seconds
          </span>
          <span
            className='font-times-new-roman text-4xl tracking-wider transition animate-show'
            id='seconds'>
            00
          </span>
        </div>
      </section>

      {/*
      <RSVP.Form />
      <FAQs />
      <Itenerary /> */}
    </>
  );
}
