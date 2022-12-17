import { describe, expect, test } from '@jest/globals'
import uuid from '../../src/utils/uuid'

describe('uuid', () => {
  test('generate uuid', () => {
    expect(uuid()).toBeTruthy()
  })
})
