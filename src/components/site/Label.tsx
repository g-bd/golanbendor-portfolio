// Section eyebrow. Numbered chapter labels ("01 — …") keep the "//" prefix; secondary
// labels render plain so the chapter numbering stands out.
export function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const numbered = typeof children === 'string' && /^\d/.test(children.trim());
    return (
        <p className={`eyebrow chapter-label ${numbered ? '' : 'plain'} ${className}`.replace(/\s+/g, ' ').trim()}>
            <span aria-hidden="true">{'//'}</span> {children}
        </p>
    );
}

export default Label;
