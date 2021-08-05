import './sass/main.scss';

import debounce from 'lodash.debounce'
import photoCard from './templates/photo-card.hbs';
import apiService from './js/apiService'

let page = 1
const perPage = 12
const params = new URLSearchParams(location.search)
const query = params.get('query')
const loadMoreButton = document.getElementById('load-more')
const gallery = document.getElementById('gallery')
const searchForm = document.getElementById('search-form')
const searchFormInput = document.getElementById('search-form-input')

const appendImage = (image) => {
  const ul = document.createElement('li')
  ul.innerHTML = photoCard({
    src: image.previewURL,
    alt: image.tags,
    width: image.previewWidth,
    height: image.previewHeight,
    thumb_up: image.likes,
    visibility: image.views,
    comment: image.comments,
    cloud_download: image.downloads,
  })
  gallery.appendChild(ul)
}

const loadImages = ({ page }) => {
  apiService.pixabay({page, perPage, query})
    .then((data) => {
      data.hits.forEach(appendImage)
      if (page !== 1) gallery.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
    })
}

const loadMore = () => {
  page += 1
  loadImages({page})
}

if (query && query.length > 0) {
  loadMoreButton.addEventListener('click', loadMore)
  loadImages({ page: 1 })
  searchFormInput.value = query
} else {
  loadMoreButton.parentNode.removeChild(loadMoreButton)
}

searchFormInput.addEventListener(
  'input',
  debounce(() => searchForm.submit(), 800)
)
searchFormInput.focus()