import type { LoaderArgs } from '@remix-run/node'
import { ENDPOINT, GUESTS_DB_ID, HEADERS } from '~/utils/notion.server'

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url)
  const search = url.searchParams.get('search')
  const getGuests = await fetch(`${ENDPOINT}/databases/${GUESTS_DB_ID}/query`, {
    method: 'POST',
    headers: HEADERS
  })
  let guests = await getGuests.json()
  let guestResults = guests.results

  if (search) {
    guestResults = guestResults.filter((page: any) =>
      page.properties.Name.title[0].plain_text
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }

  return guestResults.map((page) => ({
    name: page.properties.Name.title[0].plain_text,
    email: page.properties.Email.email
  }))
}
