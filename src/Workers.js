import React from "react";
import Profile from "./Profile";

function Worker({ order, workOrders }) {
 return (
  <React.Fragment>
   {workOrders.map((workOrder, i) => (
    <Profile key={i} workOrder={workOrder} order={order} />
   ))}
  </React.Fragment>
 );
}

export default Worker;
