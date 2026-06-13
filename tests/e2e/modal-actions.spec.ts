import { expect, test } from "@playwright/test";

test("modal footer actions stay visible and balanced", async ({ page }) => {
  await page.goto("/?theme=light");
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent("maxcraft-gallery-open-modal"));
  });

  const dialog = page.getByRole("dialog", { name: "Component state" });
  await expect(dialog).toBeVisible();
  const primary = dialog.getByRole("button", { name: "确认" });
  const secondary = dialog.getByRole("button", { name: "取消" });

  await expect(primary).toBeVisible();
  await expect(secondary).toBeVisible();
  await expect(primary).toHaveCSS("background-color", "rgb(25, 128, 56)");

  const footerDisplay = await dialog.locator(".bx--modal-footer").evaluate((node) => getComputedStyle(node).display);
  expect(footerDisplay).toBe("grid");

  const primaryBox = await primary.boundingBox();
  const secondaryBox = await secondary.boundingBox();
  expect(Math.abs((primaryBox?.y ?? 0) - (secondaryBox?.y ?? 0))).toBeLessThanOrEqual(8);
  expect(primaryBox?.width ?? 0).toBeGreaterThan(120);
  expect(secondaryBox?.width ?? 0).toBeGreaterThan(120);
});

test("dropdown can open inside the gallery next to modal styles", async ({ page }) => {
  await page.goto("/?theme=light");
  const section = page.locator("section.surface", {
    has: page.getByRole("heading", { name: "Choices And Menus" }),
  });
  const dropdown = section.locator(".bx--dropdown").first();
  await dropdown.click();
  await expect(dropdown.getByRole("option", { name: "创造服" })).toBeVisible();
});
