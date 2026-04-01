import React from "react";
import Image from "next/image";
import {
  PcktBlock as PcktBlockType,
  PcktListItem,
  blobUrl,
} from "@/lib/standard-site";
import { RichText } from "./RichText";

function renderPcktListItem(item: PcktListItem, index: number): React.ReactNode {
  return (
    <li key={index}>
      {item.content.map((block, i) => (
        <PcktBlockRenderer key={i} block={block} />
      ))}
    </li>
  );
}

export function PcktBlockRenderer({ block }: { block: PcktBlockType }) {
  switch (block.$type) {
    case "blog.pckt.block.text": {
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

    case "blog.pckt.block.heading": {
      const Tag = block.level <= 2 ? "h2" : "h3";
      const sizeClass =
        block.level <= 2
          ? "text-2xl font-bold text-white mt-8 mb-3"
          : "text-xl font-semibold text-white mt-6 mb-2";
      return <Tag className={sizeClass}>{block.plaintext}</Tag>;
    }

    case "blog.pckt.block.image": {
      const src = blobUrl(block.attrs.blob.ref.$link);
      const width = block.attrs.width || 768;
      return (
        <figure className="my-6 mx-auto max-w-3xl">
          <Image
            src={src}
            alt={block.attrs.alt || ""}
            width={width}
            height={Math.round(width * 0.625)}
            className="rounded-lg w-full h-auto"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </figure>
      );
    }

    case "blog.pckt.block.bulletList": {
      return (
        <ul className="ml-4 list-disc space-y-1 text-gray-200">
          {block.content.map((item, i) => renderPcktListItem(item, i))}
        </ul>
      );
    }

    default:
      return null;
  }
}
