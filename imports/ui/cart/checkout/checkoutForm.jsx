// Framework
import React from "react";
import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import helpers from "../../../helpers";

// define component
const CheckoutForm = ({ ...props }) =>
  <Form onSubmit={props.submitHandler} onReset={props.resetHandler}>
    <Row>
      <Col xs="12" md="6">
        <section className="form-section" id="customer">
          <h4>Customer Profile</h4>
          <FormGroup row>
            <Label htmlFor="firstName" sm={4}>
              First Name
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                minLength="2"
                name="firstName"
                id="firstName"
                required
                placeholder="Required"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="lastName" sm={4}>
              Last Name
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                minLength="2"
                name="lastName"
                id="lastName"
                required
                placeholder="Required"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="email" sm={4}>
              Email
            </Label>
            <Col sm={8}>
              <Input
                type="email"
                minLength="5"
                name="email"
                id="email"
                required
                placeholder="Required"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="username" sm={4}>
              Username
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                minLength="2"
                name="username"
                id="username"
                placeholder="Optional"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="password" sm={4}>
              Password
            </Label>
            <Col sm={8}>
              <Input
                type="password"
                minLength="8"
                name="password"
                id="password"
                placeholder="Optional"
              />
            </Col>
          </FormGroup>
          <p>If username and password are submitted, an account for the store will be created for future access to past orders and more!</p>
        </section>
      </Col>
      <Col xs="12" md="6">
        <section className="form-section" id="address">
          <h4>Destination Address</h4>
          <FormGroup row>
            <Label htmlFor="address-unit" sm={4}>
              Unit
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="address-unit"
                id="address-unit"
                placeholder="Optional"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="address-civic" sm={4}>
              Street Address
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                minLength="2"
                name="address-civic"
                id="address-civic"
                required
                placeholder="Required"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="address-city" sm={4}>
              City
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                minLength="2"
                name="address-city"
                id="address-city"
                required
                placeholder="Required"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="address-prov" sm={4}>
              Province
            </Label>
            <Col sm={8}>
              <Input
                type="select"
                name="address-prov"
                id="address-prov"
                defaultValue={"ON"}
                required
                placeholder="Required"
              >
                <option value="AB">AB</option>
                <option value="BC">BC</option>
                <option value="MB">MB</option>
                <option value="NB">NB</option>
                <option value="NL">NL</option>
                <option value="NT">NT</option>
                <option value="NS">NS</option>
                <option value="NU">NU</option>
                <option value="ON">ON</option>
                <option value="PE">PE</option>
                <option value="QC">QC</option>
                <option value="SK">SK</option>
                <option value="YT">YT</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="address-postal" sm={4}>
              Postal Code
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                minLength="6"
                maxLength="6"
                name="address-postal"
                id="address-postal"
                required
                placeholder="Required"
              />
            </Col>
          </FormGroup>
        </section>
      </Col>
    </Row>
    <Row>
      <Col xs="12">
        <section className="form-section" id="credit-card">
          <h4>Credit Card</h4>
          <FormGroup row>
            <Label htmlFor="card-type" sm={4}>
              Type
            </Label>
            <Col sm={8}>
              <Input
                type="select"
                name="card-type"
                id="card-type"
                defaultValue="visa"
                required
                placeholder="Required"
              >
                <option value="visa">Visa</option>
                <option value="mastercard">MasterCard</option>
                <option value="american-express">American Express</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="cardholder" sm={4}>
              Cardholder
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                minLength="2"
                name="cardholder"
                id="cardholder"
                required
                placeholder="Required"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="card-number" sm={4}>
              Card Number
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                minLength="16"
                maxLength="16"
                name="card-number"
                id="card-number"
                required
                placeholder="Required"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="expiry" sm={4}>
              Expiry
            </Label>
            <Col sm={8}>
              <Input
                type="month"
                name="expiry"
                id="expiry"
                required
                defaultValue={helpers.formatDate("yyyy-mm", new Date())}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="code" sm={4}>
              Code
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                minLength="3"
                maxLength="3"
                name="code"
                id="code"
                required
                placeholder="Required"
              />
            </Col>
          </FormGroup>
        </section>
      </Col>
      <Col xs="12">
        <section id="order-buttons">
          <Button type="submit" color="primary">
            Place Order!
          </Button>
          <Button type="reset" color="danger">
            Clear
          </Button>
        </section>
      </Col>
    </Row>
  </Form>;

// export component
export default CheckoutForm;
