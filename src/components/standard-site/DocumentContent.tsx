"use client";

import React from "react";
import {
  StandardDocument,
  LeafletContent,
  PcktContent,
} from "@/lib/standard-site";
import { LeafletBlockRenderer } from "./LeafletBlock";
import { PcktBlockRenderer } from "./PcktBlock";

function isLeafletContent(
  content: StandardDocument["content"]
): content is LeafletContent {
  return (content as LeafletContent)?.$type === "pub.leaflet.content";
}

function isPcktContent(
  content: StandardDocument["content"]
): content is PcktContent {
  return (content as PcktContent)?.$type === "blog.pckt.content";
}

function LeafletRenderer({ content }: { content: LeafletContent }) {
  return (
    <>
      {content.pages.map((page, pageIndex) => {
        if (page.$type === "pub.leaflet.pages.canvas") {
          return (
            <div
              key={pageIndex}
              className="my-6 rounded-lg border border-gray-700 bg-gray-800/50 p-6 text-center"
            >
              <p className="text-gray-400">
                This page uses a canvas layout that&apos;s best viewed on
                Leaflet.
              </p>
            </div>
          );
        }

        return (
          <div key={pageIndex} className="space-y-4">
            {page.blocks?.map((wrapper, blockIndex) => (
              <LeafletBlockRenderer
                key={blockIndex}
                block={wrapper.block}
              />
            ))}
          </div>
        );
      })}
    </>
  );
}

function PcktRenderer({ content }: { content: PcktContent }) {
  return (
    <div className="space-y-4">
      {content.items.map((block, i) => (
        <PcktBlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

export function DocumentContent({ document }: { document: StandardDocument }) {
  const { content, textContent } = document;

  if (content) {
    if (isLeafletContent(content)) {
      return <LeafletRenderer content={content} />;
    }
    if (isPcktContent(content)) {
      return <PcktRenderer content={content} />;
    }
  }

  // Fallback to plain text
  if (textContent) {
    return (
      <div className="space-y-4">
        {textContent.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-gray-200 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  return (
    <p className="text-gray-400 italic">No content available for this document.</p>
  );
}
