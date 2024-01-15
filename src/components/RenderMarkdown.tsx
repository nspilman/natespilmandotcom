import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Define a type for the renderer functions
type RendererFunction = (props: any) => JSX.Element;

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

// Define the renderers with basic types
const renderers: { [nodeType: string]: RendererFunction } = {
  a: ({ href, children }): React.ReactElement => renderLink({ href, children }),
  code: ({ children }): React.ReactElement => {
    return <code className="font-thin bg-black text-gray-300">{children}</code>;
  },
  img: ({ src, alt }): React.ReactElement => {
    return <img src={src} alt={alt} className="max-h-[100vh] py-2" />;
  },
};

type MarkdownContentProps = {
  content: string;
};

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
