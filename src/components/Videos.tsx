import { Video } from '@/types';
import Iframe from 'react-iframe';
import styled from 'styled-components';

const Container = styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin: 1rem 0;
`;
const Title = styled.h2`
  text-transform: uppercase;
  font-weight: 550;
  font-size: 1.2rem;
  color: #eee;
  margin-bottom: 0.5rem;
`;
const List = styled.ul`
  display: flex;
  overflow: auto;
`;
const Item = styled.li`
  margin: 0.5rem;
`;
const Name = styled.div`
  margin-bottom: 0.5rem;
  width: 420px;
`;

interface Props {
  videos: Video[];
}

function Videos({ videos }: Props) {
  return (
    videos &&
    videos.length > 0 && (
      <Container>
        <Title>videos</Title>
        <List>
          {videos.map((video, index) => (
            <Item key={index}>
              <Name>{video.name && `${video.name.length > 35 ? video.name.substring(0, 35) : video.name}...`}</Name>
              <Iframe url={`https://youtube.com/embed/${video.key}`} width="400" height="250" />
            </Item>
          ))}
        </List>
      </Container>
    )
  );
}

export default Videos;
