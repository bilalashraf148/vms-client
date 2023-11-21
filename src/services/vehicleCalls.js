import { serviceCalls } from "./serviceCalls"

export const createVehicles = (payload, cb) => {
  serviceCalls.postWithFormData("/vehicles", payload, (err, response) => {
    if (err) {
      cb(err);
    }
    else {
      cb(null, response);
    }
  });
};

export const getVehicles = (cb) => {
  serviceCalls.get("/vehicles", (err, response) => {
    if (err) {
      cb(err);
    }
    else {
      cb(null, response);
    }
  });
};

export const deleteVehicles = (payload, cb) => {
  serviceCalls.delete("/vehicles", payload, (err, response) => {
    if (err) {
      cb(err);
    }
    else {
      cb(null, response);
    }
  });
};
