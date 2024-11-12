export function sortReasons(reasonList) {
    return reasonList.sort((a, b) => {
        if (a.title.toLowerCase() === 'other') return 1;
        if (b.title.toLowerCase() === 'other') return -1;
        return 0;
    });
}