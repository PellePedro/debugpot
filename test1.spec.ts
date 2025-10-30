import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://easyocr-pre-release.digital-ai-app.com/easyocrui/login');
  await page.locator('#mui-7').click();
  await page.locator('#mui-7').fill('80');
  await page.locator('#mui-7').press('Tab');
  await page.locator('#mui-5').fill('kolja@skyramp.dev');
  await page.locator('#mui-5').press('Tab');
  await page.locator('#mui-6').fill('SkyrampTester2025!');
  await page.getByRole('button', { name: 'ログイン' }).click();
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: 'ファイルを選択' }).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles('Sample-Financial-Statements-1.pdf');
  await page.getByRole('button', { name: '件 のファイル（155.1 KB）を開く' }).click();
  await page.locator('button').filter({ hasText: '次へ' }).click();
  await page.locator('button').filter({ hasText: '次へ' }).click();
  await page.locator('button').filter({ hasText: '次へ' }).click();
  await page.locator('button').filter({ hasText: '説明を終了する' }).click();
  await page.getByText('範囲を選択').click();
  // Canvas region selection: drag from (386, 221) to (660, 387)
  await page.mouse.move(386, 221);
  await page.mouse.down();
  await page.mouse.move(660, 387);
  await page.mouse.up();
  await page.locator('canvas').click({
    position: {
      x: 487,
      y: 286
    }
  });
  await page.getByText('1,390').click({
    button: 'right'
  });
  await page.getByRole('menuitem', { name: '全角に変換' }).click();
  // Assert cell at row 9, column 2
  await expect(page.locator('tbody tr:nth-child(10) td:nth-child(3)')).toHaveText('405');
});