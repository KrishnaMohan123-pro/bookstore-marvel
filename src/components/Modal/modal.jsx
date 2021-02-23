import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Loader from "../Loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../actions/modalActions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundImage: "linear-gradient( #f6f6f6,#f6f5f5, #f8f1f1)",
    border: "2px solid #845ec2",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  title: {
    color: "#000",
    width: "100%",
    fontFamily: "Goldman",
  },
}));

export default function TransitionsModal(props) {
  const loader = useSelector((state) => state.loader.profile);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOpen = () => {
    dispatch(openModal(props.modalName));
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <span>
      <Button variant="text" color="inherit" type="button" onClick={handleOpen}>
        {props.linkName}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.modalVisible}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.modalVisible}>
          <div className={classes.paper}>
            <div className={classes.title}>
              <h2 id="transition-modal-title">{props.modalTitle}</h2>
            </div>
            <div id="transition-modal-description">{props.childComponent}</div>
            {loader ? <Loader /> : null}
          </div>
        </Fade>
      </Modal>
    </span>
  );
}
