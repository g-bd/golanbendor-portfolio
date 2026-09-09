// Cross-document view transitions (CSS `@view-transition { navigation: auto }`).
// Only one element per page may carry a given `view-transition-name`, so the
// card that was clicked is named just before the browser navigates, and the
// case-study hero carries the same name on arrival: the image travels there.
export function markViewTransition(event: React.MouseEvent<HTMLElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const media = event.currentTarget.querySelector<HTMLElement>('img, video, .stage-images');
    if (!media) return;
    // A case page already names its hero. Clear that name before naming its next card.
    document.querySelectorAll<HTMLElement>('.case-hero-media, [data-transition-source]').forEach(element => {
        element.style.viewTransitionName = 'none';
        delete element.dataset.transitionSource;
    });
    media.dataset.transitionSource = 'true';
    media.style.viewTransitionName = 'case-visual';
}
