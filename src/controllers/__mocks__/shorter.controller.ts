import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'
import type {
  shortUrl as shortUrlType,
  getAllUrl as getAllUrlType,
  getUrlById as getUrlByIdType,
  getUrlByShortId as getUrlByShortIdType,
  deleteUrlById as deleteUrlByIdType
} from '../shorter.controller'

const shortUrl = mockDeep<typeof shortUrlType>()
const getAllUrl = mockDeep<typeof getAllUrlType>()
const getUrlById = mockDeep<typeof getUrlByIdType>()
const getUrlByShortId = mockDeep<typeof getUrlByShortIdType>()
const deleteUrlById = mockDeep<typeof deleteUrlByIdType>()

beforeEach(() => {
  mockReset(shortUrl)
  mockReset(getAllUrl)
  mockReset(getUrlById)
  mockReset(getUrlByShortId)
  mockReset(deleteUrlById)
})

export { shortUrl, getAllUrl, getUrlById, getUrlByShortId, deleteUrlById }
