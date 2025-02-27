"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import go from "react-syntax-highlighter/dist/cjs/languages/prism/go";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import CopyToClipboard from "react-copy-to-clipboard";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import HLSAudioPlayer from "./HLSAudioPlayer";
import { MP3AudioPlayer } from "./Mp3AudioPlayer";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("bash", bash);

const renderLink = ({ href, children }: { href: string; children: string }) => {
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

type RendererFunction = (props: {
  href?: string;
  children: string;
  src?: string;
  alt?: string;
  className?: string;
}) => JSX.Element;
// Define the renderers with basic types
const renderers: { [nodeType: string]: RendererFunction } = {
  h1: ({ children }) => {
    return <h1 className="text-3xl font-semibold mt-10 mb-6">{children}</h1>;
  },
  h2: ({ children }) => {
    return <h2 className="text-2xl font-medium mt-8 mb-4">{children}</h2>;
  },
  h3: ({ children }) => {
    return <h3 className="text-xl font-medium mt-6 mb-3">{children}</h3>;
  },
  a: ({ href = "", children }): React.ReactElement => {
    if (href.endsWith(".m3u8")) {
      return <HLSAudioPlayer src={href} />;
    }

    if(href.endsWith(".mp3")){
      return <MP3AudioPlayer src={href}/>
    }
    return renderLink({ href, children });
  },
  img: ({ src, alt }): React.ReactElement => {
    if (src?.endsWith('.mp4')) {
      return (
        <div className="flex items-center justify-center max-w-full py-4">
        <video 
          controls
          className="max-h-[80vh] shadow-[2px_2px_16px_rgba(255,254,83,0.3)]"
          src={src}
          title={alt || "Video"}
        >
          Your browser does not support the video tag.
        </video>
        </div>
      );
    }
    return <img src={src} alt={alt} className="max-h-[100vh] py-4" />;
  },
  p: ({ children }) => {
    return <p className="py-2 leading-relaxed">{children}</p>;
  },
  ol: ({ children }) => {
    return <ol className="list-decimal list-inside pl-6 my-3 space-y-1.5">{children}</ol>;
  },
  ul: ({ children }) => {
    return <ul className="list-disc list-inside pl-6 my-3 space-y-1.5">{children}</ul>;
  },
  li: ({ children }) => {
    return <li className="mb-1.5">{children}</li>;
  },
  code: ({ children, className }): React.ReactElement => {
    const classNames =
      "mockup-code scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded text-themeYellow font-light";

    const codeContentWithoutEndingWhitespace = children
      .split("\n")
      .filter((val, i) => i !== children.split("\n").length - 1 || val !== "")
      .join("\n");

    const hasLang = /language-(\w+)/.exec(className || "");
    return codeContentWithoutEndingWhitespace.includes("\n") ? (
      <div className="relative h-full">
        <SyntaxHighlighter
          style={oneDark}
          PreTag="div"
          className={classNames + ` border-themeYellow border `}
          showLineNumbers
          language={hasLang?.[1]}
          useInlineStyles
          data-testid="multi-line-code-block"
        >
          {codeContentWithoutEndingWhitespace}
        </SyntaxHighlighter>
        <button
          style={{
            right: 0,
            top: 0,
          }}
          className="resetStyles absolute tooltip tooltip-left z-40 mr-2 mt-5 p-6 bg-gray-50 top-0 right-0"
          data-tip={"Copy"}
        >
          <div className="bg-gray-400 m-2 rounded">
            <CopyToClipboard text={children}>
              <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer hover:text-blue-600" />
            </CopyToClipboard>
          </div>
        </button>
        <span
          style={{
            bottom: 0,
            right: 0,
          }}
          data-testid="language"
          className="absolute z-40 mb-5 mr-1 rounded-lg bg-base-content/40 p-1 text-xs uppercase text-base-300 backdrop-blur-sm"
        >
          {hasLang?.[1]}
        </span>
      </div>
    ) : (
      <code data-testid="single-line-code-block" className={classNames}>
        {codeContentWithoutEndingWhitespace}
      </code>
    );
  },
};

type MarkdownContentProps = {
  content: string;
};

export const MarkdownContent: React.FC<MarkdownContentProps> = ({
  content,
}) => (
  <ReactMarkdown
    components={renderers}
    remarkPlugins={[remarkGfm]}
    className="py-8"
  >
    {content}
  </ReactMarkdown>
);
