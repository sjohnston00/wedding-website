import React from 'react'
import type { ActionFunction, LoaderArgs } from '@remix-run/node'
import Dialog from '~/components/Dialog'
import FAQs from '~/components/FAQs'
import Itenerary from '~/components/Itenerary'
import RSVP from '~/components/RSVP'
import TimeToWedding from '~/components/TimeToWedding'
import {
  ENDPOINT,
  getGuests,
  GUESTS_DB_ID,
  HEADERS
} from '~/utils/notion.server'
import useCountdown from '~/hooks/useCountdown'
import AnimatedNumber from '~/components/AnimatedNumber.client'
import { useLoaderData } from '@remix-run/react'

type TRSVP = {
  name: string
  email: string
  rsvp: 'yes' | 'no'
  starter?: 'starter-1' | 'starter-2'
  mainCourse?: 'mainCourse-1' | 'mainCourse-2'
  dessert?: 'dessert-1' | 'dessert-2'
  questionOrComments: string
  _action?: string
}

export const loader = async ({ request }: LoaderArgs) => {
  const guests = await getGuests()
  return {
    guests
  }
}

export const action: ActionFunction = async ({ request }) => {
  // await new Promise((res) => setTimeout(res, 400)) //artificial delay
  const formData = await request.formData()
  const data = Object.fromEntries(formData) as TRSVP

  const getGuests = await fetch(`${ENDPOINT}/databases/${GUESTS_DB_ID}/query`, {
    method: 'POST',
    headers: HEADERS
  })

  const guests = await getGuests.json()
  const guest = guests.results.filter(
    (page: any) => page.properties.Name.title[0].plain_text === data.name
  )
  if (guest.length === 0) {
    return {
      error: `Did not find a guest under the name: ${data.name}`
    }
  }

  const guestPageId = guest[0].id
  const updateGuestRSVP = await fetch(`${ENDPOINT}/pages/${guestPageId}`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify({
      properties: {
        rsvp: { checkbox: true },
        rsvp_response: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: data.rsvp
              }
            }
          ]
        },
        Starter: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: data.starter || ''
              }
            }
          ]
        },
        Main: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: data.mainCourse || ''
              }
            }
          ]
        },
        Dessert: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: data.dessert || ''
              }
            }
          ]
        }
      }
    })
  })

  if (updateGuestRSVP.status === 200) {
    return {
      message: 'RSVP saved'
    }
  }

  return {
    error: 'Error updating your RSVP'
  }
}

export default function Index() {
  const { guests } = useLoaderData<typeof loader>()
  const weddingDate = new Date(2024, 4, 16, 14, 0)
  const { daysUntil, hours, minutes, seconds } = useCountdown(weddingDate)

  return (
    <>
      <Dialog guests={guests} />
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

      {/* <script src="/scripts/index.js" defer></script> */}
      <section
        id='time-to-wedding'
        className='flex flex-col md:flex-row justify-around text-white bg-sage gap-5 pb-10'>
        <div className='flex flex-col items-center justify-center gap-5'>
          <span className='font-bold text-6xl font-times-new-roman'>Days</span>
          <span className='font-times-new-roman text-4xl tracking-wider transition animate-show min-h-[50px]'>
            {typeof window !== 'undefined' ? (
              <AnimatedNumber
                animateToNumber={daysUntil || 0}
                configs={[
                  {
                    mass: 0.5,
                    tension: 500,
                    friction: 40,
                    precision: 0,
                    velocity: 0.02
                  }
                ]}
              />
            ) : null}
          </span>
        </div>
        <div className='flex flex-col items-center justify-center gap-5'>
          <span className='font-bold text-6xl font-times-new-roman'>Hours</span>
          <span className='font-times-new-roman text-4xl tracking-wider transition animate-show min-h-[50px]'>
            {typeof window !== 'undefined' ? (
              <AnimatedNumber
                animateToNumber={hours || 0}
                configs={[
                  {
                    mass: 0.5,
                    tension: 500,
                    friction: 40,
                    precision: 0,
                    velocity: 0.02
                  }
                ]}
              />
            ) : null}
          </span>
        </div>
        <div className='flex flex-col items-center justify-center gap-5'>
          <span className='font-bold text-6xl font-times-new-roman'>
            Minutes
          </span>
          <span className='font-times-new-roman text-4xl tracking-wider transition animate-show min-h-[50px]'>
            {typeof window !== 'undefined' ? (
              <AnimatedNumber
                animateToNumber={minutes || 0}
                configs={[
                  {
                    mass: 0.5,
                    tension: 500,
                    friction: 40,
                    precision: 0,
                    velocity: 0.02
                  }
                ]}
              />
            ) : null}
          </span>
        </div>
        <div className='flex flex-col items-center justify-center gap-5'>
          <span className='font-bold text-6xl font-times-new-roman'>
            Seconds
          </span>
          <span className='font-times-new-roman text-4xl tracking-wider transition animate-show min-h-[50px]'>
            {typeof window !== 'undefined' ? (
              <AnimatedNumber
                animateToNumber={seconds || 0}
                configs={[
                  {
                    mass: 0.5,
                    tension: 500,
                    friction: 40,
                    precision: 0,
                    velocity: 0.02
                  }
                ]}
              />
            ) : null}
          </span>
        </div>
      </section>

      {/*
      <RSVP.Form />
      <FAQs />
      <Itenerary /> */}
    </>
  )
}
