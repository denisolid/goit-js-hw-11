import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
export function imagesRender(arr) {
    return arr
        .map(
            arr =>
                `<li class="gallery-list"><div class="gallery"><a href="${arr.largeImageURL}"><img src="${arr.webformatURL}" alt="${arr.tags}" width="360px" height="100px"></a>
        <ul class="img-cont-list">
      <li class="img-cont-item">Likes<p class="img-cont-descr">${arr.likes}</p></li>
      <li class="img-cont-item">Views<p class="img-cont-descr">${arr.views}</p></li>
      <li class="img-cont-item">Comments<p class="img-cont-descr">${arr.comments}</p></li>
      <li class="img-cont-item">Downloads<p class="img-cont-descr">${arr.downloads}</p></li>
      </ul>
      </div>
      </li>`
        )
        .join('');
}
export function imgBoxLight() {
    let gallery = new SimpleLightbox('.gallery a', {
        navText: ['&#5176;', '&#5171;'],
        captionsData: 'alt',
        captionDelay: 250,
    });
    gallery.refresh();
}