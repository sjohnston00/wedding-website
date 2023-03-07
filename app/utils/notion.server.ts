import type { Guest } from '~/types/guest'
export const API_KEY = process.env.NOTION_API_KEY
export const ENDPOINT = 'https://api.notion.com/v1'
export const GUESTS_DB_ID = 'c31ea07c-97da-4e84-b22c-3eea9eb61e60'
export const VERSION = '2022-06-28'
export const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  'Notion-Version': VERSION,
  'Content-Type': 'application/json'
}

export const getGuests = async (): Promise<Guest[]> => {
  const getGuests = await fetch(`${ENDPOINT}/databases/${GUESTS_DB_ID}/query`, {
    method: 'POST',
    headers: HEADERS
  })
  let guests = await getGuests.json()
  let guestResults = guests.results as any[]
  return guestResults
    .map((guest) => ({
      name: guest.properties.Name.title[0].plain_text,
      email: guest.properties.Email.email
    }))
    .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
}
