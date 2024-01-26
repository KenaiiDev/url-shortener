import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'
import type { httpResponse as response } from '../httpStatus'

const httpResponse = mockDeep<typeof response>()

beforeEach(() => {
  mockReset(httpResponse)
})

export { httpResponse }
