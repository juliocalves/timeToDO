import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownPage({ filePath }) {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    // Carregar o arquivo Markdown
    fetch(filePath)
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text))
      .catch((error) => console.error("Erro ao carregar o arquivo Markdown:", error));
  }, [filePath]);

  return (
    <div className="markdown-container">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
    </div>
  );
}