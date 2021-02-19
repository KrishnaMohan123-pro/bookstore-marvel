import React from "react";
import { useSelector } from "react-redux";
import InputDialog from "../../components/Dialog/inputDialog";
import "./styles.css";
import { Container, Grid } from "@material-ui/core";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import AddNewBookForm from "../../utility/forms/addNewBookForm";
import ChangeProfileImageForm from "../../utility/forms/changeProfileImageForm";
import { useHistory } from "react-router-dom";
import SaveItemsButton from "../../components/Buttons/saveItemsButton";
import ProfileName from "../../components/AccoutComponents/ProfileName";
import ProfileEmail from "../../components/AccoutComponents/ProfileEmail";
import ProfilePhone from "../../components/AccoutComponents/ProfilePhone";
import ProfileAddress from "../../components/AccoutComponents/ProfileAddress";
import SavedItemsDrawer from "../../components/SavedItemsDrawer/SavedItemsDrawer";

export default function Account() {
  const history = useHistory();
  const loggedIn = useSelector((state) => state.loggedIn);
  const user = useSelector((state) => state.auth.user);
  const auth = useSelector((state) => state.auth);
  const dialog = useSelector((state) => state.dialog);
  const role = useSelector((state) => state.auth.user.role);
  const savedItems = useSelector((state) => state.savedItems);
  console.log(savedItems);

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
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Grid
              className="profile-image-name-box"
              container
              direction="column"
              style={{ position: "relative" }}
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
                <div>
                  <InputDialog
                    childComponent={<ChangeProfileImageForm />}
                    dialogName={"New_profile_image"}
                    dialogLabel={<CameraAltIcon fontSize="small" />}
                    dialogVisible={dialog.changeProfileImageDialogVisible}
                  />
                </div>
              </Grid>
              <Grid
                item
                className="profile-name-box"
                style={{ margin: "1rem 0" }}
              >
                <ProfileName name={user.fname + " " + user.lname} />
              </Grid>
              <Grid
                item
                className="profile-name-box"
                style={{ margin: "1rem 0" }}
              >
                <ProfileEmail email={user.email} />
              </Grid>
              <Grid
                item
                className="profile-name-box"
                style={{ margin: "1rem 0" }}
              >
                <ProfilePhone phone={user.phone} />
              </Grid>
              <Grid
                item
                className="profile-name-box"
                style={{ margin: "1rem 0" }}
              >
                <ProfileAddress address={user.address} />
              </Grid>
              {role === "admin" ? (
                <Grid
                  item
                  className="profile-name-box"
                  style={{ margin: "1rem 0" }}
                >
                  <InputDialog
                    childComponent={<AddNewBookForm />}
                    dialogName="New_Book"
                    dialogLabel="Add New Item"
                    dialogVisible={dialog.addBookDialogVisible}
                  />
                </Grid>
              ) : null}
            </Grid>
          </Grid>
          <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
            <Grid container>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <div className="saved-items">
                  <SavedItemsDrawer
                    items={savedItems.series}
                    buttonName="Saved Series"
                  />
                </div>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <div className="saved-items">
                  <SavedItemsDrawer
                    items={savedItems.character}
                    buttonName="Saved Characters"
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
