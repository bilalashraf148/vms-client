import { serviceCalls } from "./serviceCalls"

export const createProduct = (payload, cb) => {
  serviceCalls.postWithFormData("/product/create", payload, (err, response) => {
    if (err) {
      cb(err);
    }
    else {
      cb(null, response);
    }
  });
};

export const getAllProducts = (cb) => {
  serviceCalls.get("/product/getAll", (err, response) => {
    if (err) {
      cb(err);
    }
    else {
      cb(null, response);
    }
  });
};
