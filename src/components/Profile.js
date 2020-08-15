import React from "react";

function WorkOrders({ order, workOrder }) {
 const { name, email, image, companyName } = workOrder;
 const { name: orderName, description, deadline } = order;
 return (
  <div className="card">
   <div className="workorder">
    <h2 className="workorder__name"> {orderName}</h2>

    <div className="workorder__description"> {description}</div>
   </div>
   <div className="workprofile">
    <img className="profile__image" src={image} alt="" />
    <div className="profile__information">
     <div className="profile__name"> {name}</div>
     <div className="profile__email"> {email}</div>

     <div className="profile__companyName">{companyName}</div>
    </div>
   </div>

   <div className="workorder__dates">{new Date(deadline).toString()}</div>
  </div>
 );
}

export default WorkOrders;
