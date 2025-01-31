import React from "react";
import {MarkdownPage} from "../components/MarkdownPage"; // Importação sem chaves
import mdContent from "../pages/Pomodoro.md";

export function About() {
  return (
    <MarkdownPage filePath={mdContent} />
  );
}