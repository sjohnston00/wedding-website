import { ActionArgs, json, LoaderArgs } from '@remix-run/node'
import type { Guest } from '~/types/guest'
import {
  ENDPOINT,
  getGuests,
  GUESTS_DB_ID,
  HEADERS
} from '~/utils/notion.server'

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url)
  const search = url.searchParams.get('search')
  let guests = await getGuests()
  if (search) {
    guests = guests.filter((guest) =>
      guest.name.toLowerCase().includes(search.trim().toLowerCase())
    )
  }

  return guests
}

export const action = async ({ request }: ActionArgs) => {
  // await new Promise((res) => setTimeout(res, 400)) //artificial delay
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  console.log(data)

  const getGuests = await fetch(`${ENDPOINT}/databases/${GUESTS_DB_ID}/query`, {
    method: 'POST',
    headers: HEADERS
  })

  const guests = await getGuests.json()
  const guest = guests.results.filter(
    (page: any) =>
      page.properties.Name.title[0].plain_text === data.search.toString().trim()
  )

  if (guest.length === 0) {
    return {
      error: 'Did not find a guest under that name'
    }
  }

  const guestPageId = guest[0].id

  console.log(guest[0].properties)
  console.log(guest[0].properties.Email)

  if (data._action === 'email-sign-up') {
    const updateGuestEmail = await fetch(`${ENDPOINT}/pages/${guestPageId}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({
        properties: {
          Email: {
            email: data.email.toString().trim()
          }
        }
      })
    })

    if (updateGuestEmail.status === 200) {
      return {
        message: 'Email saved'
      }
    }

    return json(data, { headers: { 'set-cookie': 'email-signed-up=1' } })
  }
}
