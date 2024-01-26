import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'
import type { shorterService as service } from '../shorter.services'

const shorterService = mockDeep<typeof service>()

beforeEach(() => {
  mockReset(shorterService)
})

export { shorterService }
