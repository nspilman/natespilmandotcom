---
favorite: true
title: A Markdown to Html transformation layer with `react-markdown`
description: I'm super pleased with how much control this gives me over my markdown render, which also being easy to use and unit test
date: 2024-01-14
published: true
tags:
  - "#softwareEngineering"
  - "#blog"
---

In my blog improvement travels, I identified that I wanted external links to open in new tab. "But how can I do that?" I asked myself, since there's no special syntax for that in markdown.

The answer was to use [MarkdownContent](https://github.com/remarkjs/react-markdown) and the [remarkGfm](https://github.com/remarkjs/remark-gfm) plugin.

From there, I was able to intercept the output of the render and conditionally add `target="_blank"` when the `href` starts with `https://`.

### The code in 3 parts -

1. Function that takes in the `<a/>` element and returns a `ReactElement`.

```tsx
const renderLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactElement;
}) => {
  const linkProps: {
    href: string;
    ["aria-label"]: string;
    target?: "_blank";
    rel?: "noopener noreferrer";
  } = { href, ["aria-label"]: `link to ${href}` };
  if (href.startsWith("https://")) {
    linkProps.target = "_blank";
    linkProps.rel = "noopener noreferrer";
  }
  return <a {...linkProps}>{children}</a>;
};
```

2. the `renderers` object, where we wire up the tag, the keys in the object, with its corresponding transformation.

```tsx
const renderers: { [nodeType: string]: RendererFunction } = {
  a: ({ href, children }): React.ReactElement => renderLink({ href, children }),
};
```

3. Wire it all up in the component

```tsx
export const MarkdownContent: React.FC<MarkdownContentProps> = ({
  content,
}) => (
  <ReactMarkdown
    components={renderers as any}
    remarkPlugins={[remarkGfm]}
    className="py-8"
  >
    {content}
  </ReactMarkdown>
);
```

### And it's incredibly testable!

Just look how straight forward this is.

```tsx
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
	expect(link.attributes.getNamedItem(target")?.value).toBeUndefined();
	expect(link.attributes.getNamedItem("rel")?.value).toBeUndefined()
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
```

### Relevant Commits

- [Installing `react-markdown` and use renderers and `remarkGfm` to rewrite external links to open in new tabs](https://github.com/nspilman/natespilmandotcom/commit/94f678ccb9280e002edc0cad6c4af8717120cb47)
- [Adding unit tests links that render in Markdown](https://github.com/nspilman/natespilmandotcom/commit/39969feef07a84d085aef6142c9941d377f1dbe1)
