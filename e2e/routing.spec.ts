import { expect, test } from "@playwright/test";

test("redirects unknown route to dashboard", async ({ page }) => {
  await page.goto("/rota-que-nao-existe");

  await expect(page).toHaveURL(/\/en-US\/dashboard$/);
});

test("invalid country filter redirects to dashboard", async ({ page }) => {
  await page.goto("/en-US/dashboard/global?country=Brazil%2Fadasd");

  await expect(page).toHaveURL(/\/en-US\/dashboard$/);
});
