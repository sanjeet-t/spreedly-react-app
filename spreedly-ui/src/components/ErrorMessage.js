import React from 'react';
import { Message } from 'semantic-ui-react';

const ErrorMessage = props => {
  const { show, header, content } = props;
  return (
    <React.Fragment>
      {show && (
        <Message error header={header} content={content.toString()}></Message>
      )}
    </React.Fragment>
  );
};

export default ErrorMessage;
