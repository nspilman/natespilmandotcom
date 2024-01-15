/// <reference lib="dom" />

import { expect, test } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import { MarkdownContent } from "./RenderMarkdown";

test("link with internal href opens locally ", async () => {
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
