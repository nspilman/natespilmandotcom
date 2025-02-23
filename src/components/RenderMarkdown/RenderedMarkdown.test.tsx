/// <reference lib="dom" />

import { expect, test } from 'vitest'
import { render, cleanup } from "@testing-library/react";
import { MarkdownContent } from "./RenderMarkdown";

test("link opens locally when link has internal href", async () => {
  const testHref = "anyLocalLink";
  const testLinkMarkdown = `[any string](${testHref})`;

  const { getByRole } = render(<MarkdownContent content={testLinkMarkdown} />);
  const link = await getByRole("link");
  expect(link.attributes.getNamedItem("href")?.value).toBe(testHref);
  expect(link.attributes.getNamedItem("target")?.value).toBeUndefined();
  expect(link.attributes.getNamedItem("rel")?.value).toBeUndefined();
});

test("link with enteral href opens to new tab ", async () => {
  cleanup();
  const testHref = "https://example.com";
  const testLinkMarkdown = `[any string](${testHref})`;

  const { getByRole } = render(<MarkdownContent content={testLinkMarkdown} />);
  const link = await getByRole("link");
  expect(link.attributes.getNamedItem("href")?.value).toBe(testHref);
  expect(link.attributes.getNamedItem("target")?.value).toBe("_blank");
  expect(link.attributes.getNamedItem("rel")?.value).toBe(
    "noopener noreferrer"
  );
});

test("code without returns renders inline", async () => {
  cleanup();
  const expected = "`code test`";
  const testCodeMarkdown = `anyText ${expected}`;

  const { getByTestId } = render(
    <MarkdownContent content={testCodeMarkdown} />
  );
  const codeBlock = await getByTestId("single-line-code-block");
  expect(codeBlock).not.toBeUndefined();
});

test("multi-line code renders code block", async () => {
  const myMarkdown = `
  \`\`\`
  const exampleVariable = 'some value';
  const secondLine = "whateverDiscount"
  \`\`\`
  `;

  const { getByTestId } = render(<MarkdownContent content={myMarkdown} />);
  const codeBlock = await getByTestId("multi-line-code-block");
  expect(codeBlock).not.toBeUndefined();
});

test("multi-line code with tsx declared renders language tag", async () => {
  cleanup();
  const myMarkdown = `
  \`\`\`tsx
  const exampleVariable = 'some value';
  const secondLine = "whateverDiscount"
  \`\`\`
  `;

  const { getByTestId } = render(<MarkdownContent content={myMarkdown} />);
  const languageTag = await getByTestId("language");
  expect(languageTag.textContent).toBe("tsx");
});

test("images render with max height of the view height", async () => {
  cleanup();
  const testImageMarkdown = `![anyAltText](http://example.com/anyImage.jpeg)`;

  const { getByRole } = render(<MarkdownContent content={testImageMarkdown} />);
  const codeBlock = await getByRole("img");
  expect(Array.from(codeBlock.classList).includes("max-h-[100vh]")).toBe(true);
});
