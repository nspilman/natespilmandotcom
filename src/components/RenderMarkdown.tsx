import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Define a type for the renderer functions
type RendererFunction = (props: any) => JSX.Element;

// Define the renderers with basic types
const renderers: { [nodeType: string]: RendererFunction } = {
  a: ({ href, children }) => {
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
  },
};

type MarkdownContentProps = {
  content: string;
};

export const MarkdownContent: React.FC<MarkdownContentProps> = ({
  content,
}) => (
  <ReactMarkdown components={renderers as any} remarkPlugins={[remarkGfm]}>
    {content}
  </ReactMarkdown>
);
