import { test, expect } from './fixtures/index.js'

test('allows creating a new post', async ({ page, auth }) => {
  const testUser = await auth.signUpAndLogIn()
  await page.getByRole('textbox', { name: 'Title:' }).click()
  await page.getByRole('textbox', { name: 'Title:' }).fill('Test Post')
  await page.getByRole('textbox', { name: 'Title:' }).press('Tab')
  await page.locator('textarea').fill('Hello World\n')
  await page.getByRole('button', { name: 'Create' }).click()

  await expect(page.getByText(`Test PostWritten by ${testUser}`)).toBeVisible()
})
