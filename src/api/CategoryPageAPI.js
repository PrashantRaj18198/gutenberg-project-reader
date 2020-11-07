import axios from 'axios';
// import { }

const loadMore = (books, categoryUrl, setBooks, setCategoryUrl, setHasMore ) => {
    console.log('loadMore triggered', books, 'url', categoryUrl)
    axios.get(categoryUrl)
    .then(res => {
        console.log(res.data)
        let newBooks = [].concat(books, res.data.results);
        setBooks(newBooks);
        setCategoryUrl(res.data.next);
        if (!res.data.next) {
            setHasMore(false)
        }
    })
    .catch(err => {
        return err
    })
}

// searches for input when searchText is atleast 4 characters
const handleSearch = (event, searchText, searchUrl, setSearchBooks) => {
    if (searchText.length < 4 || event.keyCode != 13) {
        return
    }
    let searchableQueryText = searchText.replace(' ', '%20')
    axios.get(searchUrl+searchableQueryText)
    .then(res => {
        setSearchBooks(res.data.results);
        console.log('search', searchUrl+searchableQueryText, res.data.results)
    })
    .catch(err => {
        return err
    })
}

export {
    loadMore,
    handleSearch
};