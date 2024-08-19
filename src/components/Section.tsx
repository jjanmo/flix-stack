import styled from 'styled-components';

const Container = styled.div``;
const Title = styled.h2`
  font-size: 3rem;
  margin: 1rem 0 2rem;
  text-align: center;
`;
const List = styled.div`
  display: grid;
  margin-bottom: 1rem;
  grid-template-columns: repeat(10, 1fr);
`;

interface Props {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <List>{children}</List>
    </Container>
  );
}

export default Section;
