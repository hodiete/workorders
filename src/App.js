import React from "react";
import "./App.css";
import { getWorkOrders, getWorkers } from "./config/WorkerAPI";
import Workers from "./components/Workers";
class WorkerOrdersApp extends React.Component {
 state = {
  orders: [],
  workers: [],
  query: "",
  checked: false,
  loading: true,
 };

 handleOrders = (orders) => {
  this.setState({
   orders,
  });
  return orders;
 };
 handleWorkers = (worker) => {
  this.setState((prevState) => ({
   workers: [...prevState.workers, worker],
   loading: false,
  }));
  return worker;
 };

 getAllWorkersOrder = (order, workers) =>
  workers.filter((worker) => worker.id === order.workerId);

 handleInputChange = (e) => {
  this.setState({
   query: e.target.value,
  });
 };

 handleCheckboxChange = (e) => {
  this.setState({
   checked: e.target.checked,
  });
 };
 sortOrders = (orders) =>
  this.state.checked
   ? orders.sort((a, b) => b.deadline - a.deadline)
   : orders.sort((a, b) => a.deadline - b.deadline);

 filterWorkersByName = (workers, query) =>
  query === ""
   ? workers
   : workers.filter((worker) => worker.name.toLowerCase().includes(query));

 componentDidMount() {
  try {
   getWorkOrders()
    .then(({ data }) => this.handleOrders(data.orders))
    .then((orders) => getWorkers(orders))
    .then((workers) =>
     workers.map(({ data }) => this.handleWorkers(data.worker))
    );
  } catch (e) {
   console.log(e);
  }
 }

 render() {
  const { orders, workers, query, loading } = this.state;
  const filteredWorkers = this.filterWorkersByName(workers, query);
  return (
   <React.Fragment>
    {!loading && (
     <div className="container">
      <input
       className="input__search"
       type="search"
       onChange={this.handleInputChange}
       value={query}
       placeholder="Filter by worker name..."
      />

      <div className="input__checkbox toggle-switch">
       <span>Latest Order</span>
       <input
        type="checkbox"
        id="chkTest"
        name="chkTest"
        onClick={this.handleCheckboxChange}
       />
       <label htmlFor="chkTest">
        <span className="toggle-track"></span>
       </label>
       <span>Earliest Order</span>
      </div>
      <div className="workorder__container">
       {filteredWorkers.length > 0 ? (
        this.sortOrders(orders).map((order, i) => {
         const workOrders = this.getAllWorkersOrder(order, filteredWorkers);
         return <Workers key={i} workOrders={workOrders} order={order} />;
        })
       ) : (
        <div className="no-results">No Work Orders Found</div>
       )}
      </div>
     </div>
    )}
   </React.Fragment>
  );
 }
}

export default WorkerOrdersApp;
