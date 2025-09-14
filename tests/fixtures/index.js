import { AuthFixture } from './AuthFixture.js'
import { test as baseTest } from '@playwright/test'

export const test = baseTest.extend({
  auth: async ({ page }, use) => {
    const authFixture = new AuthFixture(page)
    await use(authFixture)
  },
})

export { expect } from '@playwright/test'
