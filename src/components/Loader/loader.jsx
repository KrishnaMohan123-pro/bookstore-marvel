import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function Loader() {
  return (
    <LinearProgress
      color="secondary"
      style={{ margin: "15% auto 15%", width: "25%" }}
    />
  );
}
