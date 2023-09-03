import { serviceCalls } from "./serviceCalls"

export const signInService = (payload, cb) => {
  try {
    serviceCalls.post("/auth/signin", payload, (err, response) => {
      if (err) {
        cb(err);
      }
      else {
        cb(null, response);
      }
    });
  }
  catch(err) {
    console.log("🚀 ~ file: userServiceCalls.js:15 ~ signInService ~ err:", err)
  }
}

export const signUpService = (payload, cb) => {
  serviceCalls.post("/auth/signup", payload, (err, response) => {
    if (err) {
      cb(err);
    }
    else {
      cb(null, response);
    }
  });
}
