import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'
import type { schemaValidator as schemaValidatorType } from '../schemaValidators'

const schemaValidator = mockDeep<typeof schemaValidatorType>()

beforeEach(() => {
  mockReset(schemaValidator)
})

export { schemaValidator }
