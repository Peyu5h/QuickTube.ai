import { cn } from "@/lib/utils"

interface MarkdownProps {
  markdown: string
  className?: string
}

export default function Markdown({ markdown, className }: MarkdownProps) {
  const convertToHtml = (markdownText: string) => {
    // Convert headers with Tailwind classes
    markdownText = markdownText.replace(
      /^### (.*$)/gim,
      '<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">$1</h3>'
    )
    markdownText = markdownText.replace(
      /^## (.*$)/gim,
      '<h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">$1</h2>'
    )
    markdownText = markdownText.replace(
      /^# (.*$)/gim,
      '<h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">$1</h1>'
    )
    // Convert bold text with Tailwind
    markdownText = markdownText.replace(
      /\*\*(.*)\*\*/gim,
      '<strong class="font-bold text-gray-800 dark:text-gray-200">$1</strong>'
    )
    // Convert italic text with Tailwind
    markdownText = markdownText.replace(
      /\*(.*)\*/gim,
      '<i class="italic text-gray-700 dark:text-gray-300">$1</i>'
    )
    // Convert links with Tailwind
    markdownText = markdownText.replace(
      /\[([^[]+)\]\((.*)\)/gim,
      '<a href="$2" class="text-blue-600 hover:underline">$1</a>'
    )
    // Convert blockquotes with Tailwind
    markdownText = markdownText.replace(
      /^> (.*$)/gim,
      '<blockquote class="border-l-4 border-gray-500 pl-4 text-gray-600 dark:text-gray-400 italic mb-2">$1</blockquote>'
    )
    // Convert unordered lists
    markdownText = markdownText.replace(
      /^(?:-|\+|\*)\s+(.+)$/gim,
      '<li class="list-disc ml-5 text-[14px] text-gray-800 dark:text-gray-200">$1</li>'
    )
    markdownText = markdownText.replace(
      /((?:<li class="list-disc ml-5">.+<\/li>\s*)+)/gim,
      '<ul class="list-inside space-y-0.5 mt-1 mb-2">$1</ul>'
    )
    // Convert ordered lists
    markdownText = markdownText.replace(
      /^\d+\.\s+(.+)$/gim,
      '<li class="list-decimal ml-5 text-[14px] text-gray-800 dark:text-gray-200">$1</li>'
    )
    markdownText = markdownText.replace(
      /((?:<li class="list-decimal ml-5">.+<\/li>\s*)+)/gim,
      '<ol class="list-decimal pl-5 space-y-0.5 mt-1 mb-2">$1</ol>'
    )
    // Handle paragraphs by wrapping non-tagged text in <p>
    markdownText = markdownText.replace(
      /^(?!<(?:ul|ol|li|h1|h2|h3|h4|h5|h6|blockquote|a|strong|i|em|div|p)\b)[^<]+/gim,
      '<p class="text-[14px] text-gray-800 dark:text-gray-200 mb-2">$&</p>'
    )
    // Replace line breaks with <br>
    markdownText = markdownText.replace(/\n/g, "<br>")
    return markdownText
  }

  const htmlContent = convertToHtml(markdown)

  return (
    <div
      className={cn("prose dark:prose-dark max-w-none space-y-2", className)}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
