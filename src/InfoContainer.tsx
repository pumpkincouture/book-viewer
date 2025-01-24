import styled from 'styled-components'
import { ListItem, Pill, Subtitle } from './theme';
import { Author, BookShelf, Tag } from './types';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;

  @media (max-width: 768px) {
    margin: 2px;
  }
`
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const Title = styled(Subtitle)`
  text-align: center;
`
interface ContainerProps {
    title: string
    infoItems: Author[] | BookShelf[] | Tag[]
}

const InfoContainer: React.FC<ContainerProps> = (props) => {
    const { title, infoItems } = props;

    return (
        <Section>
          <Title>{title}</Title>
          <Container>
            {infoItems?.map((item, index) => (
              <Pill data-testid={`info-item-${index}`} key={index}>
                <ListItem>{item.name}</ListItem>
              </Pill>
            ))}
          </Container>
        </Section>
    )
}

export default InfoContainer;
