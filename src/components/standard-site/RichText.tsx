import React from "react";
import { Facet, FacetFeature } from "@/lib/standard-site";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function byteSlice(text: string, start: number, end: number): string {
  return decoder.decode(encoder.encode(text).slice(start, end));
}

function isLink(f: FacetFeature): f is FacetFeature & { uri: string } {
  return f.$type.endsWith("#link") && "uri" in f;
}

function wrapWithFeatures(
  text: string,
  features: FacetFeature[],
  key: string
): React.ReactNode {
  let node: React.ReactNode = text;

  for (const feature of features) {
    if (isLink(feature)) {
      node = (
        <a
          href={feature.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 hover:text-yellow-300 underline"
        >
          {node}
        </a>
      );
    } else if (feature.$type.endsWith("#bold")) {
      node = <strong>{node}</strong>;
    } else if (feature.$type.endsWith("#italic")) {
      node = <em>{node}</em>;
    } else if (feature.$type.endsWith("#code")) {
      node = (
        <code className="rounded bg-gray-800 px-1.5 py-0.5 text-sm font-mono text-yellow-300">
          {node}
        </code>
      );
    }
  }

  return <React.Fragment key={key}>{node}</React.Fragment>;
}

interface RichTextProps {
  plaintext: string;
  facets?: Facet[];
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function RichText({
  plaintext,
  facets,
  className,
  as: Tag = "span",
}: RichTextProps) {
  if (!facets || facets.length === 0) {
    return <Tag className={className}>{plaintext}</Tag>;
  }

  const sorted = [...facets].sort(
    (a, b) => a.index.byteStart - b.index.byteStart
  );

  const segments: React.ReactNode[] = [];
  let lastEnd = 0;

  for (let i = 0; i < sorted.length; i++) {
    const facet = sorted[i];
    const { byteStart, byteEnd } = facet.index;

    // Plain text before this facet
    if (byteStart > lastEnd) {
      segments.push(
        <React.Fragment key={`plain-${i}`}>
          {byteSlice(plaintext, lastEnd, byteStart)}
        </React.Fragment>
      );
    }

    // Faceted text
    const facetText = byteSlice(plaintext, byteStart, byteEnd);
    segments.push(wrapWithFeatures(facetText, facet.features, `facet-${i}`));

    lastEnd = byteEnd;
  }

  // Remaining plain text
  const totalBytes = encoder.encode(plaintext).length;
  if (lastEnd < totalBytes) {
    segments.push(
      <React.Fragment key="plain-end">
        {byteSlice(plaintext, lastEnd, totalBytes)}
      </React.Fragment>
    );
  }

  return <Tag className={className}>{segments}</Tag>;
}
