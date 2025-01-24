import { Title } from "./theme";
import { Detail } from "./types";
import InfoContainer from "./InfoContainer";
import styled from "styled-components";

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 12px;
  }
`

const ImageContainer = styled.div`
  margin: 20px;
  width: 40%;
  border-radius: 5px;
  height: 50%;

  display: flex;
  justify-content: center;
`

const PageTitle = styled(Title)`
  text-align: center;
`
const BookDetail: React.FC<Detail> = (props) => {
    const { title, authors, imageUrl, tags, bookshelves } = props

    return (
      <DetailContainer>
        <PageTitle>{title}</PageTitle>
        {imageUrl && (
          <ImageContainer>
            <img 
              src={imageUrl}
              alt='book-cover'
              height='300px'
              width='200px'
            />
          </ImageContainer>
        )}
        <InfoContainer title='Authors' infoItems={authors} />
        { bookshelves && (<InfoContainer title='Bookshelves' infoItems={bookshelves} />) }
        { tags && (<InfoContainer title='Tags' infoItems={tags} />) }
      </DetailContainer>
    );
}

export default BookDetail;
