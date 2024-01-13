import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Define a type for the renderer functions
type RendererFunction = (props: any) => JSX.Element;

// Define the renderers with basic types
const renderers: { [nodeType: string]: RendererFunction } = {
  a: ({ href, children }) => {
    return href.startsWith("https://") ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <a href={href}>{children}</a>
    );
  },
};

type MarkdownContentProps = {
  content: string;
};

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => (
  <ReactMarkdown components={renderers as any} remarkPlugins={[remarkGfm]}>
    {content}
  </ReactMarkdown>
);

export default MarkdownContent;
