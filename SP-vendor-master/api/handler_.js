const fetch = require("node-fetch");

export async function main(route, requestOptions) {
  let response = {};
  return new Promise(function (resolve, reject) {
    var route_full = process.env.api_end_point + route;
    fetch(route_full, requestOptions)
      .then((response) => response.json())

      .then((result) => {
        response = result;
        resolve(result);
      })
      .catch((error) => console.log("error", error));
    return response;
  });
}
async function object_size(object) {
  //this returns the size of a given object
  Object.size = async function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  return await Object.size(object);
}
export async function api_post(data, route) {
  var myHeaders = await new fetch.Headers();
  let response = {};
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  var urlencoded = await new URLSearchParams();
  const object_sizea = await object_size(data);
  for (let index = 0; index < object_sizea; index++) {
    const key = Object.keys(data)[index];
    const value = Object.values(data)[index];
    if (key !== "token" || (key == "token" && value)) {
      await urlencoded.append(key.toString(), value.toString());
    }
  }
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
  };
  await main(route, requestOptions)
    .then((_response) => {
      response = { ..._response };
    })
    .catch((_error) => {
      response = { ..._error };
    });

  return response;
}
