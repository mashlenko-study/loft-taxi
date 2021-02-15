import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addressSelector } from "../../reducers/rootReducer";
import { getAddresses } from "../../actions";
import { getRoute } from "../../actions";
import { Form } from "../Form";
import { Input } from "../Input";
import { PrimaryButton } from "../PrimaryButton";

const OrderForm = (props) => {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  useEffect(() => {
    async function getAllAddresses() {
      await props.getAddresses();
    }
    getAllAddresses();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.getRoute({ address1, address2 });
  };

  return (
    <Form
      data-testid="orderForm"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
        margin: "20px",
      }}
    >
      <Grid container item wrap="nowrap" xs={12}>
        <Grid item container direction="column" xs={12} s={5}>
          <Autocomplete
            options={props.addresses}
            filterOptions={(addresses) =>
              addresses.filter((el) => el !== address2)
            }
            onChange={(e, value) => {
              setAddress1(value);
            }}
            fullWidth={true}
            renderInput={(params) => (
              <Input {...params} name="address1" placeholder="Откуда" />
            )}
          />
          <Autocomplete
            options={props.addresses}
            onChange={(e, value) => {
              setAddress2(value);
            }}
            filterOptions={(addresses) =>
              addresses.filter((el) => el !== address1)
            }
            fullWidth={true}
            renderInput={(params) => (
              <Input {...params} name="address2" placeholder="Куда" />
            )}
          />
        </Grid>
      </Grid>
      <Grid item container direction="column" alignItems="stretch">
        <PrimaryButton>Заказать</PrimaryButton>
      </Grid>
    </Form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAddresses, getRoute }, dispatch);
};

export default connect(addressSelector, mapDispatchToProps)(OrderForm);
