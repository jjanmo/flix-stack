import { HelmetProvider, Helmet } from 'react-helmet-async';

interface Props {
  text: string;
}

const HelmetTitle = ({ text }: Props) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{text ? `${text} | Nomflix` : 'Nomflix'}</title>
      </Helmet>
    </HelmetProvider>
  );
};

export default HelmetTitle;
