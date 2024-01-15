/// <reference lib="dom" />

import { expect, test } from "bun:test";
import { render } from "@testing-library/react";
import { MarkdownContent } from "./RenderMarkdown";

test("link with internal href opens locally ", async () => {
  const testHref = "anyLocalLink";
  const testLabel = `link to ${testHref}`;
  const testLinkMarkdown = `[any string](${testHref})`;

  const { getByLabelText } = render(
    <MarkdownContent content={testLinkMarkdown} />
  );
  const link = await getByLabelText(testLabel);
  expect(link.attributes.getNamedItem("href")?.value).toBe(testHref);
  expect(link.attributes.getNamedItem("target")?.value).toBeUndefined();
  expect(link.attributes.getNamedItem("rel")?.value).toBeUndefined();
});

test("link with enteral href opens to new tab ", async () => {
  const testHref = "https://example.com";
  const testLabel = `link to ${testHref}`;
  const testLinkMarkdown = `[any string](${testHref})`;

  const { getByLabelText } = render(
    <MarkdownContent content={testLinkMarkdown} />
  );
  const link = await getByLabelText(testLabel);
  expect(link.attributes.getNamedItem("href")?.value).toBe(testHref);
  expect(link.attributes.getNamedItem("target")?.value).toBe("_blank");
  expect(link.attributes.getNamedItem("rel")?.value).toBe(
    "noopener noreferrer"
  );
});

test("code blocks render", async () => {
  const expected = "`code test`";
  const testCodeMarkdown = `anyText ${expected}`;

  const { getByText } = render(<MarkdownContent content={testCodeMarkdown} />);
  const codeBlock = await getByText("code test");
  expect(Array.from(codeBlock.classList).includes("bg-black")).toBe(true);
  expect(Array.from(codeBlock.classList).includes("text-gray-300")).toBe(true);
});

test("images render with max height of the view height", async () => {
  const testImageMarkdown = `![anyAltText](http://example.com/anyImage.jpeg)`;

  const { getByRole } = render(<MarkdownContent content={testImageMarkdown} />);
  const codeBlock = await getByRole("img");
  expect(Array.from(codeBlock.classList).includes("max-h-[100vh]")).toBe(true);
});
