
import React, { useMemo } from 'react';

// Declare `marked` to inform TypeScript that it's available globally from the CDN script.
declare const marked: {
    parse(markdown: string): string;
};

interface MarkdownDisplayProps {
    markdownContent: string;
}

const MarkdownDisplay: React.FC<MarkdownDisplayProps> = ({ markdownContent }) => {
    
    const htmlContent = useMemo(() => {
        if (typeof marked === 'undefined' || !markdownContent) {
            return '';
        }
        try {
            // Converts the markdown string from the API into an HTML string.
            return marked.parse(markdownContent);
        } catch (e) {
            console.error("Error parsing markdown:", e);
            return '<p class="text-red-500">Error rendering the strategy table.</p>';
        }
    }, [markdownContent]);

    if (!htmlContent) {
        return null;
    }
    
    // This div uses Tailwind's arbitrary variants (`[&_selector]:class`) to style the
    // HTML table generated from markdown. This is a clean, modern way to apply styles
    // to dynamically generated content without needing separate CSS files.
    return (
        <div
            className="text-right rtl 
                       [&_table]:w-full [&_table]:border-collapse [&_table]:mt-4
                       [&_th]:bg-gray-700/50 [&_th]:p-3 [&_th]:border [&_th]:border-gray-600 [&_th]:font-bold
                       [&_td]:p-3 [&_td]:border [&_td]:border-gray-600 [&_td]:align-middle"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};

export default MarkdownDisplay;
