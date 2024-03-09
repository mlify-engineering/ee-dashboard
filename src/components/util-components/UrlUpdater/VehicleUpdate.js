import { updateUrlByReplacingCurrentParams } from "./UpdateURL";

export function getVehicleSearchParams(searchParams) {
  let makes = searchParams.getAll("makes");
  let models = searchParams.getAll("models");
  let model_ids = searchParams.getAll("model_ids");
  let years = searchParams.getAll("years");
  let mechanicalCondition = searchParams.getAll("mechanicalCondition");
  let mobilityCondition = searchParams.getAll("mobilityCondition");
  let quantity = searchParams.getAll("quantity");

  // convert into array
  makes = makes.length ? makes[0].split(",") : [];
  models = models.length ? models[0].split(",") : [];
  model_ids = model_ids.length ? model_ids[0].split(",") : [];
  years = years.length ? years[0].split(",") : [];
  mechanicalCondition = mechanicalCondition.length
    ? mechanicalCondition[0].split(",")
    : [];
  mobilityCondition = mobilityCondition.length
    ? mobilityCondition[0].split(",")
    : [];
  quantity = quantity.length ? quantity[0].split(",") : [];
  return {
    makes,
    models,
    model_ids,
    years,
    mechanicalCondition,
    mobilityCondition,
    quantity,
  };
}

export const AddVehicleToUrl = ({ vehicles }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const {
    makes,
    models,
    model_ids,
    years,
    mechanicalCondition,
    mobilityCondition,
    quantity,
  } = getVehicleSearchParams(searchParams);
  console.log("Before Adding Vehicles: ", makes.length);
  vehicles.forEach((vehicle) => {
    makes.push(vehicle.make_and_model[0]);
    models.push(vehicle.make_and_model[1]);
    model_ids.push(vehicle.model_id);
    years.push(vehicle.year);
    mechanicalCondition.push(vehicle.mechanicalCondition);
    mobilityCondition.push(vehicle.mobilityCondition);
    quantity.push(vehicle.quantity);
  });
  console.log("After Adding Vehicles: ", makes.length);
  // create a new search params
  let newSearchParams = new URLSearchParams(window.location.search);
  newSearchParams.set("makes", makes);
  newSearchParams.set("models", models);
  newSearchParams.set("model_ids", model_ids);
  newSearchParams.set("years", years);
  newSearchParams.set("mechanicalCondition", mechanicalCondition);
  newSearchParams.set("mobilityCondition", mobilityCondition);
  newSearchParams.set("quantity", quantity);
  // newSearchParams.set('from_city', fromCity);
  // newSearchParams.set('to_city', toCity);

  // update the url
  updateUrlByReplacingCurrentParams({ newSearchParams });
};

// TODO: This can be improved instead of extracting the search params and then removing the vehicle from the search params, we can just remove the vehicle from the cart items and then update the url
export const DeleteVehicleFromUrl = ({ vehicles }) => {
  console.log("DeleteVehicleFromUrl with vehicles: ", vehicles);
  let newSearchParams = new URLSearchParams(window.location.search);
  const {
    makes,
    models,
    model_ids,
    years,
    mechanicalCondition,
    mobilityCondition,
    quantity,
  } = getVehicleSearchParams(newSearchParams);

  let existingVehicles = makes.map((make, index) => ({
    make: make,
    model: models[index],
    model_id: model_ids[index],
    year: years[index],
    title: mechanicalCondition[index],
    mechanicalCondition: mechanicalCondition[index],
    mobilityCondition: mobilityCondition[index],
    quantity: quantity[index],
  }));
  console.log("Before Removing Existing Vehicles: ", existingVehicles.length);
  vehicles.forEach((vehicle) => {
    // find the index of the vehicle in the existing vehicles
    const index = existingVehicles.findIndex(
      (existingVehicle) =>
        existingVehicle.make === vehicle.make_and_model[0] &&
        existingVehicle.model === vehicle.make_and_model[1] &&
        String(existingVehicle.year) === String(vehicle.year) &&
        existingVehicle.mechanicalCondition === vehicle.mechanicalCondition &&
        existingVehicle.mobilityCondition === vehicle.mobilityCondition &&
        String(existingVehicle.quantity) === String(vehicle.quantity),
    );
    if (index !== -1) {
      // remove the vehicle from the existing vehicles
      existingVehicles.splice(index, 1);
    }
  });
  console.log("After Removing Existing Vehicles: ", existingVehicles.length);
  // create a new search params
  if (existingVehicles.length === 0) {
    // remove the cart from the url
    newSearchParams.delete("makes");
    newSearchParams.delete("models");
    newSearchParams.delete("model_ids");
    newSearchParams.delete("years");
    newSearchParams.delete("mechanicalCondition");
    newSearchParams.delete("mobilityCondition");
    newSearchParams.delete("quantity");
    // update the url
    updateUrlByReplacingCurrentParams({ newSearchParams });
    return;
  } else {
    newSearchParams.set(
      "makes",
      existingVehicles.map((vehicle) => vehicle.make),
    );
    newSearchParams.set(
      "models",
      existingVehicles.map((vehicle) => vehicle.model),
    );
    newSearchParams.set(
      "model_ids",
      existingVehicles.map((vehicle) => vehicle.model_id),
    );
    newSearchParams.set(
      "years",
      existingVehicles.map((vehicle) => vehicle.year),
    );
    newSearchParams.set(
      "mechanicalCondition",
      existingVehicles.map((vehicle) => vehicle.mechanicalCondition),
    );
    newSearchParams.set(
      "mobilityCondition",
      existingVehicles.map((vehicle) => vehicle.mobilityCondition),
    );
    newSearchParams.set(
      "quantity",
      existingVehicles.map((vehicle) => vehicle.quantity),
    );

    // update the url
    updateUrlByReplacingCurrentParams({ newSearchParams });
    return;
  }
};

export const ReplaceVehicleInUrl = ({ oldVehicle, newVehicle }) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  const {
    makes,
    models,
    model_ids,
    years,
    mechanicalCondition,
    mobilityCondition,
    quantity,
  } = getVehicleSearchParams(newSearchParams);

  let existingVehicles = makes.map((make, index) => ({
    make: make,
    model: models[index],
    model_id: model_ids[index],
    year: years[index],
    title: mechanicalCondition[index],
    mechanicalCondition: mechanicalCondition[index],
    mobilityCondition: mobilityCondition[index],
    quantity: quantity[index],
  }));
  console.log("Before Replacing Existing Vehicles: ", existingVehicles.length);
  // find the index of the vehicle in the existing vehicles
  const index = existingVehicles.findIndex(
    (existingVehicle) =>
      existingVehicle.make === oldVehicle.make_and_model[0] &&
      existingVehicle.model === oldVehicle.make_and_model[1] &&
      String(existingVehicle.year) === String(oldVehicle.year) &&
      existingVehicle.mechanicalCondition === oldVehicle.mechanicalCondition &&
      existingVehicle.mobilityCondition === oldVehicle.mobilityCondition &&
      String(existingVehicle.quantity) === String(oldVehicle.quantity),
  );

  if (index !== -1) {
    existingVehicles[index] = {
      make: newVehicle.make_and_model[0],
      model: newVehicle.make_and_model[1],
      model_id: newVehicle.model_id,
      year: newVehicle.year,
      title: newVehicle.mechanicalCondition,
      mechanicalCondition: newVehicle.mechanicalCondition,
      mobilityCondition: newVehicle.mobilityCondition,
      quantity: newVehicle.quantity,
    };
  }

  console.log("After Replacing Existing Vehicles: ", existingVehicles.length);
  // create a new search params
  if (existingVehicles.length === 0) {
    // remove the cart from the url
    newSearchParams.delete("makes");
    newSearchParams.delete("models");
    newSearchParams.delete("model_ids");
    newSearchParams.delete("years");
    newSearchParams.delete("mechanicalCondition");
    newSearchParams.delete("mobilityCondition");
    newSearchParams.delete("quantity");
    // update the url
    updateUrlByReplacingCurrentParams({ newSearchParams });
    return;
  } else {
    newSearchParams.set(
      "makes",
      existingVehicles.map((vehicle) => vehicle.make),
    );
    newSearchParams.set(
      "models",
      existingVehicles.map((vehicle) => vehicle.model),
    );
    newSearchParams.set(
      "model_ids",
      existingVehicles.map((vehicle) => vehicle.model_id),
    );
    newSearchParams.set(
      "years",
      existingVehicles.map((vehicle) => vehicle.year),
    );
    newSearchParams.set(
      "mechanicalCondition",
      existingVehicles.map((vehicle) => vehicle.mechanicalCondition),
    );
    newSearchParams.set(
      "mobilityCondition",
      existingVehicles.map((vehicle) => vehicle.mobilityCondition),
    );
    newSearchParams.set(
      "quantity",
      existingVehicles.map((vehicle) => vehicle.quantity),
    );

    // update the url
    updateUrlByReplacingCurrentParams({ newSearchParams });
    return;
  }
};
