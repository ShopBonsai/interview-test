// import modules
import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Badge
} from "reactstrap";
import SingleTab from "./single.jsx";
import CustomersTab from "./customers.jsx";
import MerchantsTab from "./merchants.jsx";
import OrdersTab from "./orders.jsx";

// define component
const DetailsComp = ({ ...props }) => {
  const {
    brands,
    categories,
    customers,
    merchants,
    orders,
    orderStatus,
    products,
    profileTypes,
    users,
    toggleTab,
    activeTab
  } = props;
  const data = {
    brands: ["Brands", brands],
    categories: ["Categories", categories],
    customers: ["Customers", customers],
    merchants: ["Merchants", merchants],
    orders: ["Orders", orders],
    orderStatus: ["Order Status", orderStatus],
    products: ["Products", products],
    profileTypes: ["Profile Types", profileTypes],
    users: ["Users", users]
  };
  const setNavItems = data =>
    Object.values(data).map(item =>
      <NavItem key={item[1].length * Math.random() + Math.random()}>
        <NavLink
          className={activeTab === item[0] ? "tab-label active" : "tab-label"}
          onClick={() => toggleTab(item[0])}
        >
          {item[0]}
          <Badge color="primary">
            {item[1].length}
          </Badge>
        </NavLink>
      </NavItem>
    );
  return (
    <div>
      <Nav tabs>
        {setNavItems(data)}
      </Nav>
      <TabContent activeTab={activeTab}>
        <SingleTab data={data.brands} />
        <SingleTab data={data.categories} />
        <CustomersTab
          data={data.customers}
          profileTypes={data.profileTypes}
          orders={data.orders}
          products={data.products}
        />
        <MerchantsTab
          data={data.merchants}
          brands={data.brands}
          profileTypes={data.profileTypes}
          products={data.products}
          users={data.users}
        />
        <OrdersTab
          data={data.orders}
          products={data.products}
          orderStatus={data.orderStatus}
        />
        <SingleTab data={data.orderStatus} />
        <SingleTab data={data.profileTypes} />
      </TabContent>
    </div>
  );
};

// export component
export default DetailsComp;
