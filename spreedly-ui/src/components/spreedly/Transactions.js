import React from 'react';

import {
  Container,
  Table,
  Header,
  List,
  Label,
  Button
} from 'semantic-ui-react';

const methodTypes = {
  'credit-card': 'Credit Card',
  'google-pay': 'Google Pay',
  'apple-pay': 'Apple Pay'
};

const Transactions = props => {
  const { payments, handleRefund } = props;
  return (
    <React.Fragment>
      <Container>
        <Header as="h1" color="olive">
          Payments
        </Header>
        <div style={{ height: '75vh', overflowY: 'auto' }}>
          <Table celled inverted singleLine maxheight="50vh">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">#</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Method</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Tokens</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {payments.map((pay, i) => (
                <Table.Row key={i}>
                  <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {methodTypes[pay.type]}
                  </Table.Cell>
                  <Table.Cell>
                    <List bulleted>
                      <List.Item>
                        <Label>
                          Card
                          <Label.Detail>{pay.cardTokenizationRes}</Label.Detail>
                        </Label>
                      </List.Item>
                      <List.Item>
                        <Label>
                          Preauth
                          <Label.Detail>
                            {pay.preauthRes.transaction.token}
                          </Label.Detail>
                        </Label>
                      </List.Item>
                      <List.Item>
                        <Label>
                          Capture
                          <Label.Detail>
                            {pay.captureRes.transaction.token}
                          </Label.Detail>
                        </Label>
                      </List.Item>
                    </List>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Header as="h5" color={pay.refundRes ? 'grey' : 'green'}>
                      {pay.refundRes ? 'Refunded' : 'Paid'}
                    </Header>
                    <Button
                      size="mini"
                      color="red"
                      disabled={pay.refundRes !== null}
                      onClick={() => handleRefund(pay)}
                    >
                      Refund
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Transactions;
