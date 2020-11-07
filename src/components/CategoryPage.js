import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { baseUrl } from '../config';
import InfiniteScroll from 'react-infinite-scroll-component';
import './CategoryPage.css'
import { loadMore, handleSearch } from '../api/CategoryPageAPI';

const CategoryPage = (props) => { 

    // get the name of category from url
    const {categoryName} = useParams();

    // save searchbar text
    const [searchText, setSearchText] = useState('');
    // save searched books data
    const [searchBooks, setSearchBooks] = useState([]);
    // more data to load
    const [hasMore, setHasMore] = useState(true);
    // all the books in current category
    const [books, setBooks] = useState([]);
    // url to get all books with image and certain category
    const [categoryUrl, setCategoryUrl] = useState(`${baseUrl}/books?mime_type=image&topic=${categoryName}`)

    let searchUrl = `${baseUrl}/books?mime_type=image&search=`
    const category = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)

    // wrappers for api
    const loadMoreWrapper = () => {
        loadMore(books, categoryUrl, setBooks, setCategoryUrl, setHasMore)
    }
    const handleSearchWrapper = (event) => {
        handleSearch(event, searchText, searchUrl, setSearchBooks);
    }

    const handleSearchText = (event) => {
        // if value if empty -> user removed text from search field
        // so empty the current data of searchBooks so that this old data does
        // show up when you are typing a new text
        if (event.target.value == '') {
            setSearchBooks([])
        } 
        setSearchText(event.target.value);
    }

    // get the link according to the priorityWiseMime array
    const getLinkByPriority = formats => {
        const priorityWiseMime = ['text/html', 'application/epub', 'application/x-mobipocket-ebook', 'text/plain']
        for (const req_mime of priorityWiseMime) {
            for (const curr_mime of Object.keys(formats)) {
                // if the "key" in formats contains the same key
                // select it. I used contains here because
                // some links had .zip irrespective of data
                // endsWith makes sure no link is a .zip
                if (curr_mime.includes(req_mime) && !formats[curr_mime].endsWith('.zip')) {
                    return formats[curr_mime];
                }
            }
        }
        // no link found for given priorityWiseMime array
        return '#'
    }
    

    // do an initial load for all the books with given category
    useEffect(() => {
        loadMoreWrapper()
    }, [])

    // create a book card
    const bookCard = ({id, title, authors, formats}) => {
        
        const link = getLinkByPriority(formats)
        // const link = '#'

        const card = (
            <div className='bookcard-contianer' id={id} onClick={link == '#' ? () => {alert('No downloadable format');} : null}>
                <img 
                className='bookcard-image'
                src={formats['image/jpeg']}
                alt={title}
                ></img>
                <div className='bookcard-title' >{title}</div>
                <div className='bookcard-author' >{ authors && authors[0] ? authors[0].name : null}</div>
            </div>
        )

        return (
            <a href={link} target={link == '#' ? null : "_blank"}>
                {card}
            </a>
        )        
    };

    // keeps category books
    let bookCards = [];
    let i = 0;
    for (let book of books) {
        bookCards.push(<div key={i++}>{bookCard(book)}</div>)
    }

    // keeps searched books
    let searchBookCards = [];
    i = 0;
    for (let searchBook of searchBooks) {
        searchBookCards.push(<div key={i++}>{bookCard(searchBook)}</div>)
    }

    return (
    <div>
        <h2 className="">
            <Link to="/" className='back-image'>
                <img
                className='back-image'
                src={`${process.env.PUBLIC_URL}/assets/Back.svg`}
                alt={category}
                ></img>
            </Link>
            {category.toUpperCase()}
        </h2>
                <div className="input-group">
                    <input
                        className="form-control"
                        placeholder="Search - press 'enter' to search - clear all text to restore"
                        aria-label="Search"
                        type="search"
                        onChange={handleSearchText}
                        onKeyDown={handleSearchWrapper}
                    >
                    </input>
                </div>
        
        {/* show all the searched books results if the searchBooks array is
            populated - searchBooks is cleared when the input is cleared
         */}
        {(searchBooks.length > 0) ? (
            <div className='bookcards-container'>
                {searchBookCards}
            </div>
        ) : (
            // Using infinite scroll to load data every time user reachers the end
            <InfiniteScroll
            dataLength={books.length}
            next={loadMoreWrapper}
            hasMore={hasMore}
            loader={<div className="">Loading...</div>}
            >
            <div className='bookcards-container'>
                {bookCards}
            </div>
        </InfiniteScroll>
        )}
        
        
    </div>
    );
}

export default CategoryPage;
