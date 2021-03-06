export class ElementVisibilityUtils {

    public static createElementObserver(cb:IntersectionObserverCallback, options:IntersectionObserverInit = {}):IntersectionObserver {
        return new IntersectionObserver(cb.bind(this), Object.assign({
            root: null,
            rootMargin: '0px',
            threshold: 0
        }, options));
    }

    public static observe(observer:IntersectionObserver, el:Element):IntersectionObserver {
        observer.observe(el);
        return observer;
    }

    public static disconnect(observer:IntersectionObserver):IntersectionObserver {
        observer.disconnect();
        return observer;
    }

    public static unobserve(observer:IntersectionObserver, el:Element):IntersectionObserver {
        observer.unobserve(el);
        return observer;
    }

    public static onElementVisibilityToggled(el:Element):IntersectionObserver {
        let observer = ElementVisibilityUtils.createElementObserver(entries => {
            entries.forEach(e => {
                return e['isIntersecting'];
            });
        });
        observer.observe(el);

        return observer;
    }

}