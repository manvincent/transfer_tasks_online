
function cbProperties (coinColours, cb_assignment) {
  var colourAssign = [];
  if (cb_assignment == 1) {
    colourAssign[0] = coinColours[0];
    colourAssign[1] = coinColours[1];
    colourAssign[2] = coinColours[2];
  } else if (cb_assignment == 2) {
    colourAssign[0] = coinColours[0];
    colourAssign[1] = coinColours[2];
    colourAssign[2] = coinColours[1];
  } else if (cb_assignment == 3) {
    colourAssign[0] = coinColours[2];
    colourAssign[1] = coinColours[0];
    colourAssign[2] = coinColours[1];
  } else if (cb_assignment == 4) {
    colourAssign[0] = coinColours[2];
    colourAssign[1] = coinColours[1];
    colourAssign[2] = coinColours[0];
  } else if (cb_assignment == 5) {
    colourAssign[0] = coinColours[1];
    colourAssign[1] = coinColours[0];
    colourAssign[2] = coinColours[2];
  } else if (cb_assignment == 6) {
    colourAssign[0] = coinColours[1];
    colourAssign[1] = coinColours[2];
    colourAssign[2] = coinColours[0];
  }
  return colourAssign;
}
