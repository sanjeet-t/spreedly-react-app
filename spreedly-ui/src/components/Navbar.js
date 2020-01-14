import React from 'react';
import { Menu, Label } from 'semantic-ui-react';

const Navbar = props => {
  const { activeItem, handleItemClick, signOut, numOfTransactions } = props;
  return (
    <React.Fragment>
      <Menu color="olive" inverted>
        <Menu.Item
          name="creditCard"
          active={activeItem === 'creditCard'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="googlePay"
          active={activeItem === 'googlePay'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="applePay"
          active={activeItem === 'applePay'}
          onClick={handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="transactions"
            active={activeItem === 'transactions'}
            onClick={handleItemClick}
          >
            Transactions
            <Label circular color="violet">
              {numOfTransactions}
            </Label>
          </Menu.Item>
          <Menu.Item name="logout" onClick={signOut} />
        </Menu.Menu>
      </Menu>
    </React.Fragment>
  );
};

export default Navbar;
