import { useEffect, useState } from "react";
import BookDetail from "./BookDetail";
import { ApiClient, AuthorResponse, BookResponse, Detail } from "./types";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { Title } from "./theme";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

interface BookDetailPageProps {
    service: ApiClient
}

const BookDetailPage: React.FC<BookDetailPageProps> = (props) => {
    const params = useParams();
    const bookId = params.id;

    const { service } = props;

    const [book, setBook] = useState<Detail | undefined>(undefined)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      service.get<BookResponse>(`/${bookId}`) 
        .then((response) => {
          const bookResponse = response
          const detail: Detail = {
            id: bookResponse.id,
            title: bookResponse.title,
            authors: bookResponse.authors.map((author: AuthorResponse) => {
                return {
                  name: author.name,
                }
            }),
            imageUrl: bookResponse.formats["image/jpeg"] ? bookResponse.formats["image/jpeg"] : '',
            tags: bookResponse.subjects.map((subject: string) => { 
                return {
                  name: subject
                }
            }),
            bookshelves: bookResponse.bookshelves.map((bookshelf: string) => { 
                return {
                  name: bookshelf
                }
            }),
          }

          setBook(detail)
          setLoading(false)
          setError(false)
        })
        .catch(error => {
          console.error(error)
          setLoading(false)
          setError(true)
        });
    }, [bookId]);
  
    if (loading) return (
      <Page>
        <Title>Loading chosen book...</Title>
      </Page>
    )

    if (error) return (
      <Page>
        <Title>Error loading chosen book!</Title>
      </Page>
    )

    return (
      <Page>
        { book &&
          <BookDetail 
            id={book.id}
            title={book.title}
            authors={book.authors}
            imageUrl={book.imageUrl}
            tags={book.tags}
            bookshelves={book.bookshelves}
          />
        }
      </Page>
    );
  }

  export default BookDetailPage