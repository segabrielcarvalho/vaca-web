"use client";
import clsx from "clsx";
import Image from "next/image";
import React, { HTMLAttributes, ImgHTMLAttributes } from "react";
import ReactMarkdown, { Components as MdComponents } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

type HProps = HTMLAttributes<HTMLHeadingElement>;
type PProps = HTMLAttributes<HTMLParagraphElement>;
type BlockquoteProps = HTMLAttributes<HTMLQuoteElement>;
type UlProps = HTMLAttributes<HTMLUListElement>;
type OlProps = HTMLAttributes<HTMLOListElement>;
type ImgProps = ImgHTMLAttributes<HTMLImageElement>;
type HastElementWithChecked = Element & { data?: { checked?: boolean } };
type CodeProps = HTMLAttributes<HTMLElement> & {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export const MarkdownComponent = ({ children }: { children: string }) => {
  const prismStyle = oneLight;

  const markdownComponents: MdComponents = {
    h1: ({ children, ...props }: HProps) => (
      <h1
        {...props}
        className="text-2xl sm:text-3xl font-bold leading-tight break-words mt-6 full my-5"
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: HProps) => (
      <h2
        {...props}
        className="text-xl sm:text-2xl font-semibold leading-tight break-words flex flex-col w-full my-5"
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: HProps) => (
      <h3
        {...props}
        className="text-lg sm:text-xl font-semibold leading-tight break-words flex flex-col w-full my-5"
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }: HProps) => (
      <h4
        {...props}
        className="text-base sm:text-lg font-semibold leading-tight break-words flex flex-col w-full my-5"
      >
        {children}
      </h4>
    ),
    h5: ({ children, ...props }: HProps) => (
      <h5
        {...props}
        className="text-base font-medium leading-tight break-words"
      >
        {children}
      </h5>
    ),
    h6: ({ children, ...props }: HProps) => (
      <h6 {...props} className="text-sm font-medium leading-tight break-words">
        {children}
      </h6>
    ),
    blockquote: ({ children, ...props }: BlockquoteProps) => (
      <blockquote
        {...props}
        className="border-l-4 border-zinc-300 dark:border-neutral-700/50 pl-4 italic text-sm sm:text-base leading-relaxed"
      >
        {children}
      </blockquote>
    ),
    ul: ({ children, ...props }: UlProps) => (
      <ul
        {...props}
        className="list-disc list-inside pl-6 marker:text-yellow-600 marker:text-base dark:marker:text-yellow-400 w-full"
      >
        {children}
      </ul>
    ),

    ol: ({ children, ...props }: OlProps) => (
      <ol
        {...props}
        className="list-decimal list-inside pl-6 marker:font-semibold marker:text-zinc-800 dark:marker:text-zinc-200 w-full"
      >
        {children}
      </ol>
    ),

    li: ({ node, children, ...props }) => {
      const el = node as unknown as HastElementWithChecked;
      const isTask = el?.data?.checked !== undefined;

      const cleanChildren = React.Children.toArray(children).filter(
        (c) => !(typeof c === "string" && c.trim() === "")
      );
      const [first, ...rest] = cleanChildren;

      return (
        <li
          {...props}
          className={clsx(isTask && "list-none flex items-start gap-2")}
        >
          {isTask && (
            <input
              type="checkbox"
              checked={!!el.data?.checked}
              readOnly
              className="h-4 w-4 cursor-default rounded border-zinc-300 bg-white accent-yellow-600 dark:border-neutral-600 dark:bg-neutral-800"
            />
          )}

          <span className={isTask ? "flex-1" : "inline"}>{first}</span>
          {rest}
        </li>
      );
    },

    p: ({ children, ...props }: PProps) => (
      <span
        {...props}
        className="leading-6 sm:leading-8 text-sm sm:text-base break-words mb-2 my-2 "
      >
        {children}
      </span>
    ),
    a: ({
      children,
      href,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a
        {...props}
        href={href}
        className="underline break-all text-yellow-700 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    img: ({ alt, src, ...props }: ImgProps) => (
      <Image
        {...props}
        src={typeof src === "string" ? src : ""}
        alt={alt ?? ""}
        width={500}
        height={300}
        className="max-w-full h-auto rounded-md mx-auto my-6"
      />
    ),
    pre: ({ children, ...props }: HTMLAttributes<HTMLPreElement>) => (
      <pre
        {...props}
        className="overflow-x-auto rounded-lg text-sm leading-6 w-full"
      >
        {children}
      </pre>
    ),
    code: ({ inline, className, children, ...props }: CodeProps) => {
      const match = /language-(\w+)/.exec(className || "");

      if (inline)
        return (
          <code {...props} className={clsx("rounded-sm px-1 ", className)}>
            {children}
          </code>
        );

      return (
        <SyntaxHighlighter
          {...props}
          language={match?.[1] ?? "python"}
          style={prismStyle}
          PreTag="div"
          wrapLongLines={true}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    },
    table: ({ children }) => (
      <div className="overflow-x-auto my-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded dark:scrollbar-thumb-neutral-600">
        <table className="min-w-full table-auto whitespace-nowrap border border-zinc-200 dark:border-neutral-700 bg-white dark:bg-zinc-900/50 rounded-lg shadow-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-zinc-100 dark:bg-neutral-700">{children}</thead>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-sm font-semibold uppercase text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-neutral-600">
        {children}
      </th>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-zinc-200 dark:divide-neutral-600">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
        {children}
      </tr>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300">
        {children}
      </td>
    ),
    hr: () => (
      <hr className="my-6 border-zinc-300 dark:border-neutral-700/50" />
    ),
    strong: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
      <strong {...props} className="font-semibold">
        {children}
      </strong>
    ),
    em: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
      <em {...props} className="italic">
        {children}
      </em>
    ),
    del: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
      <del {...props} className="line-through">
        {children}
      </del>
    ),
  };

  return (
    <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
      {children}
    </ReactMarkdown>
  );
};
