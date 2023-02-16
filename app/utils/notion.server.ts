export const API_KEY = process.env.NOTION_API_KEY
export const ENDPOINT = 'https://api.notion.com/v1'
export const GUESTS_DB_ID = 'c31ea07c-97da-4e84-b22c-3eea9eb61e60'
export const VERSION = '2022-06-28'
export const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  'Notion-Version': VERSION,
  'Content-Type': 'application/json'
}
