import { useEffect, useState } from "react";
import { ListItem, PageGrid, Title } from "./theme";
import { ApiClient, Book, ListResponse } from "./types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TitleSection = styled.div`
  flex: 1;
`

const ListSection = styled.div`
  flex: 2;
`

const PageTitle = styled(Title)`
  margin-left: 15px;

  @media (max-width: 768px) {
    text-align: center;
    margin-left: 0;
    font-size: 30px;
  }
`

const Item = styled(ListItem)`
  padding: 5px;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 20px;
    margin-bottom: 6px;
  }
`

const List = styled.ul`
  padding: 0;
  list-style-type: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
`

interface HomeProps {
    service: ApiClient
}

const Home: React.FC<HomeProps> = (props) => {
    const { service } = props;

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      service.getAll<ListResponse>()
        .then(response => {
          setBooks(response.results)
          setLoading(false)
          setError(false)
        })
        .catch(error => {
          console.error(error)
          setLoading(false)
          setError(true)
        });
    }, []);
  
    if (loading) return (
      <PageGrid>
        <TitleSection>
          <PageTitle>Loading books...</PageTitle>
        </TitleSection>
      </PageGrid>
    )
  
    if (error) return (
      <PageGrid>
        <TitleSection>
          <PageTitle>Error loading books!</PageTitle>
        </TitleSection>
      </PageGrid>
    )
  
    return (
      <PageGrid>
        <TitleSection>
          <PageTitle>Top Books</PageTitle>
        </TitleSection>
        <ListSection>
          <List>
            {books.map((book) => (
              <Item key={book.id}>
                <Link to={`/book/${book.id}`}>{book.title}</Link>
              </Item>
            ))}
          </List>
        </ListSection>
      </PageGrid>
    );
  }

  export default Home;