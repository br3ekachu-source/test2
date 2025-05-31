/**
 * Хелпер для плавного скролла к элементу
 * @param id атрибут id элемента, к которому нужно сделать плавный скролл
 */
export const smoothScrollToAnchor = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth'
    });
};
