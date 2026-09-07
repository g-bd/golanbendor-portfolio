// Section eyebrow with the site's "//" prefix. Used on every page.
export function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <p className={`eyebrow chapter-label ${className}`.trim()}>
            <span aria-hidden="true">{'//'}</span> {children}
        </p>
    );
}

export default Label;
