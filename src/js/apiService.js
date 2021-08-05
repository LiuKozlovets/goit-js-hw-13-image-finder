const PIXABAY_KEY = '22786785-6fbce732860f2ed2fb6f1c17e'

const apiService = {
  pixabay: ({ query, page, perPage }) => {
    let url = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal'
    url += `&q=${query}`
    url += `&page=${page}`
    url += `&per_page=${perPage}`
    url += `&key=${PIXABAY_KEY}`

    return fetch(url).then((response) => response.json())
  }
}

export default apiService