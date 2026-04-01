"use client";

import React from "react";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  LeafletBlock as LeafletBlockType,
  LeafletListItem,
  blobUrl,
} from "@/lib/standard-site";
import { RichText } from "./RichText";

function renderListItem(item: LeafletListItem, index: number): React.ReactNode {
  return (
    <li key={index}>
      <LeafletBlockRenderer block={item.content} />
      {item.children && item.children.length > 0 && (
        <ul className="ml-4 list-disc space-y-1">
          {item.children.map((child, i) => renderListItem(child, i))}
        </ul>
      )}
    </li>
  );
}

export function LeafletBlockRenderer({ block }: { block: LeafletBlockType }) {
  switch (block.$type) {
    case "pub.leaflet.blocks.text": {
      if (!block.plaintext) {
        return <div className="h-4" />;
      }
      return (
        <RichText
          plaintext={block.plaintext}
          facets={block.facets}
          as="p"
          className="text-gray-200 leading-relaxed"
        />
      );
    }

    case "pub.leaflet.blocks.header": {
      const Tag = block.level <= 2 ? "h2" : "h3";
      const sizeClass =
        block.level <= 2
          ? "text-2xl font-bold text-white mt-8 mb-3"
          : "text-xl font-semibold text-white mt-6 mb-2";
      return (
        <RichText
          plaintext={block.plaintext}
          facets={block.facets}
          as={Tag}
          className={sizeClass}
        />
      );
    }

    case "pub.leaflet.blocks.code": {
      return (
        <div className="my-4 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            language={block.language || "text"}
            style={oneDark}
            showLineNumbers
            customStyle={{ margin: 0, borderRadius: "0.5rem" }}
          >
            {block.plaintext}
          </SyntaxHighlighter>
        </div>
      );
    }

    case "pub.leaflet.blocks.image": {
      const src = blobUrl(block.image.ref.$link);
      const width = block.aspectRatio?.width || 768;
      const height = block.aspectRatio?.height || 512;
      return (
        <figure className="my-6 mx-auto max-w-3xl">
          <Image
            src={src}
            alt=""
            width={width}
            height={height}
            className="rounded-lg w-full h-auto"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </figure>
      );
    }

    case "pub.leaflet.blocks.unorderedList": {
      return (
        <ul className="ml-4 list-disc space-y-1 text-gray-200">
          {block.children.map((item, i) => renderListItem(item, i))}
        </ul>
      );
    }

    case "pub.leaflet.blocks.horizontalRule": {
      return <hr className="my-8 border-gray-700" />;
    }

    default:
      return null;
  }
}
