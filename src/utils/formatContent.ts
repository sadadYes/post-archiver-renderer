export function formatContent(content: string, links: Array<{text: string, url: string}>) {
  if (!content || !links?.length) return content;
  
  let formattedContent = content;
  
  // Sort links by URL length (longest first) to prevent partial replacements
  const sortedLinks = [...links].sort((a, b) => b.url.length - a.url.length);
  
  sortedLinks.forEach(link => {
    const escapedUrl = link.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedUrl, 'g');
    formattedContent = formattedContent.replace(
      regex,
      `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300">${link.text}</a>`
    );
  });
  
  return formattedContent;
} 