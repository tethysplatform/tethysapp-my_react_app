import errorImage from '../../assets/error404.png';
import Error from './Error';

const NotFound = () => {
  return (
    <Error title="Page Not Found" image={errorImage}>
      The page you were looking for could not be found.
    </Error>
  );
};

export default NotFound;