// @flow

// Framework
import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Container } from 'reactstrap';
import { PageHeader } from './PageHeader';
import { TalkToSomeoneButton } from './TalkToSomeoneButton';
import { Sellers } from './Sellers';
import { TermsAndConditions } from './TermsAndConditions';


const Page = ({ sellersWithItems, error }) =>
  <Container fluid className='page'>
    <PageHeader/>
    <TalkToSomeoneButton/>
    { sellersWithItems && <Sellers sellersWithItems={sellersWithItems}/> }
    <TermsAndConditions/>
  </Container>;
Page.propTypes = {
  sellersWithItems: PropTypes.array
};

export default Page;
