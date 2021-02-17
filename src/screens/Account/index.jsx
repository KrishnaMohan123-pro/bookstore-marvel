import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import InputDialog from "../../components/Dialog/inputDialog";
import AddAddressForm from "../../utility/forms/addAddressForm";
import AddPhoneForm from "../../utility/forms/addPhoneForm";
import "./styles.css";
import { Container, Grid } from "@material-ui/core";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import AddNewBookForm from "../../utility/forms/addNewBookForm";
import ChangeProfileImageForm from "../../utility/forms/changeProfileImageForm";
import EditNameForm from "../../utility/forms/editNameForm";
import { useHistory } from "react-router-dom";
import SaveItemsButton from "../../components/Buttons/saveItemsButton";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    maxHeight: 224,
    overflowY: "scroll",
    position: "relative",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    display: "flex",
  },
}));

export default function Account() {
  const history = useHistory();
  const loggedIn = useSelector((state) => state.loggedIn);
  const user = useSelector((state) => state.auth.user);
  const auth = useSelector((state) => state.auth);
  const dialog = useSelector((state) => state.dialog);
  const role = useSelector((state) => state.auth.user.role);
  const savedItems = useSelector((state) => state.savedItems);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!loggedIn) {
    return (
      <p style={{ fontFamily: "Goldman", fontSize: "2rem" }}>
        Please LOGIN or SIGNUP first...
      </p>
    );
  }
  if (auth.uid.length === 0) {
    return <p>Loading...</p>;
  }
  return (
    <div className="profile-body">
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Grid
              className="profile-image-name-box"
              container
              direction="column"
            >
              <Grid className="profile-image-box" item>
                <img
                  className="profile-image"
                  alt={user.fname}
                  src={
                    user.photoURL.length === 0
                      ? "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
                      : user.photoURL
                  }
                />
                <Grid item>
                  <InputDialog
                    childComponent={<ChangeProfileImageForm />}
                    dialogName={"New_profile_image"}
                    dialogLabel={<CameraAltIcon />}
                    dialogVisible={dialog.changeProfileImageDialogVisible}
                  />
                </Grid>
              </Grid>
              <Grid className="profile-name-box">
                <h6>Name:</h6>
                <p>{`${user.fname} ${user.lname}`}</p>
                <br />
                <InputDialog
                  childComponent={<EditNameForm />}
                  dialogName={"Edit_Name"}
                  dialogLabel={"Edit Name"}
                  dialogVisible={dialog.editNameDialogVisible}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className="profile-details-box"
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
          >
            <Grid container direction="column">
              <Grid className="profile-email-box" item>
                <h6>Email:</h6>
                <p>{user.email}</p>
              </Grid>
              <Grid className="profile-phone-box" item>
                <h6>Phone Number:</h6>
                {user.phone.length === 0 ? (
                  <InputDialog
                    childComponent={<AddPhoneForm />}
                    dialogName={"Phone"}
                    dialogLabel={"Add Phone Number"}
                    dialogVisible={dialog.addPhoneDialogVisible}
                  />
                ) : (
                  <p>{user.phone}</p>
                )}
              </Grid>
              <Grid className="profile-address-box" item>
                <h6>Address:</h6>
                {user.address.addressLine1.length === 0 ? (
                  <InputDialog
                    childComponent={<AddAddressForm />}
                    dialogName={"Address"}
                    dialogLabel={"Add Address"}
                    dialogVisible={dialog.addAddressDialogVisibile}
                  />
                ) : (
                  <Fragment>
                    <p>{user.address.addressLine1}</p>
                    <p>{user.address.addressLine2}</p>
                    <p>{user.address.pin}</p>
                    <p>{user.address.city}</p>
                    <p>{user.address.state}</p>
                    <p>{user.address.country}</p>
                  </Fragment>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={2} md={2} sm={12} xs={12}>
            <Grid container spacing={4} direction="column">
              <Grid item>
                {user.phone.length === 0 ? null : (
                  <InputDialog
                    childComponent={<AddPhoneForm />}
                    dialogName={"Phone"}
                    dialogLabel={"Edit Phone"}
                    dialogVisible={dialog.addPhoneDialogVisible}
                  />
                )}
              </Grid>
              <Grid item>
                {user.address.addressLine1.length === 0 ? null : (
                  <InputDialog
                    childComponent={<AddAddressForm />}
                    dialogName={"Address"}
                    dialogLabel={"Edit Address"}
                    dialogVisible={dialog.addAddressDialogVisibile}
                  />
                )}
              </Grid>
              <Grid item>
                {role === "admin" ? (
                  <InputDialog
                    childComponent={<AddNewBookForm />}
                    dialogName="New_Book"
                    dialogLabel="Add New Item"
                    dialogVisible={dialog.addBookDialogVisible}
                  />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Container className="saved-items-box">
          <div className={classes.root}>
            <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
              variant="scrollable"
            >
              <Tab label="Saved Characters" {...a11yProps(0)} />
              <Tab label="Saved Series" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Grid container direction="column">
                {savedItems.character.length === 0
                  ? "No Saved Character"
                  : savedItems.character.map((item) => {
                      return (
                        <Grid
                          className="saved-characters-box"
                          item
                          key={item.id}
                        >
                          <Grid container style={{ padding: "1.5rem" }}>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                              <img
                                className="saved-character-image"
                                src={item.img}
                                alt={item.title}
                                onClick={() => {
                                  history.push({
                                    pathname: `/${item.type}/${item.id}`,
                                    search: `?source=${item.source}`,
                                  });
                                }}
                              />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <p
                                className="saved-character-name"
                                onClick={() => {
                                  history.push({
                                    pathname: `/${item.type}/${item.id}`,
                                    search: `?source=${item.source}`,
                                  });
                                }}
                              >
                                {item.title}
                              </p>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                              <SaveItemsButton
                                id={item.id}
                                img={item.img}
                                title={item.title}
                                type={item.type}
                                source={item.source}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    })}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container direction="column">
                {savedItems.series.length === 0
                  ? "No Saved Series"
                  : savedItems.series.map((item) => {
                      return (
                        <Grid className="saved-series-box" item key={item.id}>
                          <Grid container style={{ padding: "1.5rem" }}>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                              <img
                                className="saved-series-image"
                                src={item.img}
                                alt={item.title}
                                onClick={() => {
                                  history.push({
                                    pathname: `/${item.type}/${item.id}`,
                                    search: `?source=${item.source}`,
                                  });
                                }}
                              />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <p
                                className="saved-series-title"
                                onClick={() => {
                                  history.push({
                                    pathname: `/${item.type}/${item.id}`,
                                    search: `?source=${item.source}`,
                                  });
                                }}
                              >
                                {item.title}
                              </p>
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                              <SaveItemsButton
                                id={item.id}
                                img={item.img}
                                title={item.title}
                                type={item.type}
                                source={item.source}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    })}
              </Grid>
            </TabPanel>
          </div>
        </Container>
      </Container>
    </div>
  );
}
