export function pixabayApi(findText) {
    const BASE_URL = 'https://pixabay.com/api/';

    const params = new URLSearchParams({
        key: '44082899-a223f277c19d17b254d670762',
        q: findText,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
    });

    const url = `${BASE_URL}?${params}`;
    return fetch(url).then(response => response.json());
}