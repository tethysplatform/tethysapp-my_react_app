import errorImage from '../../assets/error.png';
import Error from './Error';

const GenericError = () => {
  return (
    <Error title="Whoops!" image={errorImage}>
      Something went wrong. Please try again.
    </Error>
  );
};

export default GenericError;