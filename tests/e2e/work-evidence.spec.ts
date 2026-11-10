import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function choose(page: Page, name: string) {
  await page.goto("/#/auth/sign-in");
  await page.getByRole("button", { name: `Wejdź jako ${name}`, exact: true }).click();
}
const applicationPath = "/#/app/kandydaci/application-ai-builder";

for (const width of [1280, 390]) {
  test(`work evidence integrates with materials, notes and recruitment stages at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await choose(page, "Tomasz Zieliński");
    await page.goto("/#/app/kandydaci");
    await page.getByRole("link", { name: "Kuba Wójcik", exact: true }).click();
    await expect(page.locator(".record-meta")).toContainText("Staff AI Engineer");
    const note = page.getByLabel("Notatka rekrutacyjna (widoczna pracodawcy)");
    const rationale =
      "Zapraszam: próbka pokazuje integrację modeli. Dopytam o utrzymanie po wdrożeniu.";
    await note.fill(rationale);
    await page.getByRole("button", { name: "Zobacz materiał", exact: true }).click();
    await expect(page.getByRole("dialog")).toContainText("Wiadomość od Kuby");
    await page.getByText("src/answers.py", { exact: true }).click();
    await expect(page.getByLabel("Zawartość pliku src/answers.py")).toContainText("def answer");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Zobacz materiał", exact: true })).toBeFocused();
    await page.getByRole("tab", { name: "CV", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Próbka pracy", exact: true })).toHaveCount(0);
    await expect(page.getByRole("tabpanel")).toContainText("Kuba Wójcik — AI Builder");
    await expect(note).toHaveValue(rationale);
    await page.getByRole("tab", { name: "Odpowiedź", exact: true }).click();
    await page.getByRole("button", { name: "Zobacz uzasadnienie", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Ocena jakości odpowiedzi", exact: true }),
    ).toHaveCount(1);
    await page.getByText("Zobacz podstawę: zakres testów", { exact: true }).click();
    await expect(page.getByRole("dialog")).toContainText("test_no_documents_does_not_call_model");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const modalAudit = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
    expect(
      modalAudit.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? "")),
    ).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(note).toHaveValue(rationale);
    await page.getByRole("button", { name: "Zaproszenie na rozmowę", exact: true }).click();
    await expect(page.locator(".record-stage")).toHaveText("Zaproszenie na rozmowę");
    await expect(note).toHaveValue("");
    await expect(page.locator(".process-timeline")).toContainText(rationale);
    await page.reload();
    await expect(page.locator(".record-stage")).toHaveText("Zaproszenie na rozmowę");
    await expect(page.locator(".process-timeline")).toContainText(rationale);
    await expect(page.getByRole("heading", { name: "Próbka pracy", exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const recordAudit = await new AxeBuilder({ page }).include(".recruiting-record").analyze();
    expect(
      recordAudit.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? "")),
    ).toEqual([]);
    await note.fill("Dodatkowa informacja po rozmowie.");
    await page.getByRole("button", { name: "Proces zakończony", exact: true }).click();
    await expect(note).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Zobacz materiał", exact: true })).toBeVisible();
    await page.reload();
    await expect(page.locator(".record-stage")).toHaveText("Proces zakończony");
  });
}

test("work evidence respects company access and keeps employer notes private", async ({ page }) => {
  await choose(page, "Tomasz Zieliński");
  await page.goto(applicationPath);
  const privateNote = "Poufna notatka pracodawcy do sprawdzenia uprawnień.";
  await page.getByLabel("Notatka rekrutacyjna (widoczna pracodawcy)").fill(privateNote);
  await page.getByRole("button", { name: "Zaproszenie na rozmowę", exact: true }).click();
  await choose(page, "Karolina Wiśniewska");
  await page.goto("/#/app/kandydaci");
  await expect(page.getByRole("link", { name: "Kuba Wójcik", exact: true })).toHaveCount(0);
  await page.goto(applicationPath);
  await expect(
    page.getByRole("heading", { name: "Nie znaleziono strony", exact: true }),
  ).toBeVisible();
  await choose(page, "Kuba Wójcik");
  await page.goto("/#/app/aplikacje/application-ai-builder");
  await expect(page.locator(".record-stage")).toHaveText("Zaproszenie na rozmowę");
  await expect(page.locator("main")).not.toContainText(privateNote);
  await expect(page.getByRole("button", { name: "Zobacz uzasadnienie", exact: true })).toHaveCount(
    0,
  );
});
