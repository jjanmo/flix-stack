import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const HelmetTitle = ({ text, isLoading }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{text ? `${text} | Nomflix` : 'Nomflix'}</title>
      </Helmet>
    </HelmetProvider>
  );
};

export default HelmetTitle;
