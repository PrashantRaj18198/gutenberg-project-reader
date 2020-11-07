import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import './Home.css';

const Home = () => {
  
  const categories = ['FICTION', 'PHILOSOPHY', 'DRAMA', 'HISTORY', 'HUMOUR', 'ADVENTURE', 'POLITICS']

  const createCards = () => {
    const cards = [];
    for (const category of categories) {
      cards.push(
      <Link
        to={`/category/${category.toLowerCase()}`}
        className='a-card' key={cards.length}
        // onClick={(event, category) => {selectCategory(event, category.toLowerCase())}}
      >
        <Card className="cards" key={cards.length} id={category} name={category}>
          <Card.Body className="cards-body">
            <img className='cards-image' src={process.env.PUBLIC_URL + '/assets/' + category.charAt(0) + category.slice(1).toLowerCase() + '.svg'} alt={category} ></img>
            {category}
          </Card.Body>
        </Card>
      </Link>
      )
    }
    return cards
  }

  return (
  <div>
    <Container fuild='sm'>
      <h1>Gutenberg Project</h1>
      <div className="small-padding">A social cataloging website that allows you to freely search its database of books, annotations, and reviews.</div>
      <div className="inner-container">
        {createCards()}
      </div>
    </Container>
  </div>
)}

export default withRouter(Home);
