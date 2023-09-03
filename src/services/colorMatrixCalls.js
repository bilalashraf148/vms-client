import { serviceCalls } from "./serviceCalls"

export const createColor = (payload, cb) => {
  serviceCalls.postWithFormData("/colors/create", payload, (err, response) => {
    if (err) {
      cb(err);
    }
    else {
      cb(null, response);
    }
  });
};

export const getColors = (cb) => {
  serviceCalls.get("/colors", (err, response) => {
    if (err) {
      cb(err);
    }
    else {
      cb(null, response);
    }
  });
};