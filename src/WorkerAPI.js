import axios from "axios";
import API from "./config";

async function getWorkOrders() {
 return await axios.get(API.workOrders);
}

function getWorkers(orders) {
 const workerIDs = orders.map((order) => order.workerId);
 const uniqueWorkerIDs = new Set(workerIDs);
 const workerInfos = [...uniqueWorkerIDs].map(
  async (workerId) => await axios.get(`${API.workId}/${workerId}`)
 );
 return Promise.all(workerInfos);
}

export { getWorkOrders, getWorkers };
