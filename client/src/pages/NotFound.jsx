import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import styled from 'styled-components';
import NotFoundImg from './../assets/Scarecrow.png';

const Container = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
`;

const Img = styled.img`
  width: 500px;
  height: 500px;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const H1 = styled.h1`
  font-size: 100px;
`;

const P = styled.p`
  font-size: 30px;
`;

const NotFound = () => {
  return (
    <Container>
      <Main>
        <Img src={NotFoundImg} alt="" />
        <Texts>
          <H1>!Oops</H1>
          <P>404 - Page not found</P>
          <Link
            to="/"
            style={{
              padding: '15px',
              backgroundColor: 'black',
              color: 'white',
              fontWeight: 600,
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            <FaHome style={{ marginRight: '5px' }} /> Back To Home
          </Link>
        </Texts>
      </Main>
    </Container>
  );
};
export default NotFound;
