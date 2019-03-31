import React from 'react';
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Card,
  CardBody
} from 'mdbreact';
import {Link} from 'react-router-dom';

import classes from './AuthenticationForm.css'

const AuthenticationForm = (props) => {

  const inputs = Object.keys(props.fields).map((key, index) => {
    return (
      <Input
      key={index}
      label={props.fields[key].placeholder}
      name={props.fields[key].name}
      type={props.fields[key].type}
      onChange={props.changed}
      value={props.values[key]} />
    );
  });

  return (
      <Container>
        <Row>
          <Col sm="8" md="6" lg="4" style={{margin: 'auto'}}>
            <Card className={`mx-auto ${classes.Card}`}>
              <div className={classes.CardHeader}>
                <p className={classes.CardTitle}>{props.title}</p>
              </div>
              <CardBody className={classes.CardBody}>
                <form>
                  <div className="grey-text">
                    {inputs}
                  </div>
                  <div className="text-center py-4 mt-3">
                    <Button
                    className={classes.CardButton}
                    type="submit"
                    onClick={props.submit}>
                      {props.buttonText}
                    </Button>
                  </div>
                </form>
                <div className="d-flex justify-content-end">
                  <p className="font-small grey-text mt-3">
                    {props.footerText1}
                    <Link to={props.footerLink}>
                      <span className="dark-grey-text ml-1 font-weight-bold">
                        {props.footerText2}
                      </span>
                    </Link>
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default AuthenticationForm;
