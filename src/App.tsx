import { Routes, Route, Link } from 'react-router-dom';
import BookDetailPage from './BookDetailPage'
import styled from 'styled-components';
import Home from './Home';
import { BooksApiService } from './service/booksApiService';
import { API_URL } from './service/config';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Navigation = styled.nav`
  color: white;
  padding: 1rem;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`

function App() {
  const service = new BooksApiService(API_URL)

  return (
    <Page>
      <Navigation>
        <Link to="/">Home</Link>
      </Navigation>
      <Routes>
        <Route path="/" element={<Home service={service}/>} />
        <Route path="/book/:id" element={< BookDetailPage service={service} />} />
      </Routes>
    </Page>
  );
}

export default App;