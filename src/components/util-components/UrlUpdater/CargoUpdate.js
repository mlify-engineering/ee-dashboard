import { updateUrlByReplacingCurrentParams } from "./UpdateURL";

export function getCargoSearchParams(searchParams) {
  let length = searchParams.getAll("length");
  let width = searchParams.getAll("width");
  let height = searchParams.getAll("height");
  let dimension_unit = searchParams.getAll("dimension_unit");
  let weight = searchParams.getAll("weight");
  let weight_unit = searchParams.getAll("weight_unit");
  let fragile = searchParams.getAll("fragile");
  let hazardous = searchParams.getAll("hazardous");
  let flammable = searchParams.getAll("flammable");
  let used = searchParams.getAll("used");
  let cargo_quantity = searchParams.getAll("cargo_quantity");
  let type = searchParams.getAll("type");
  let cargo_type = searchParams.getAll("cargo_type");
  let size = searchParams.getAll("size");
  let category = searchParams.getAll("category");
  let item = searchParams.getAll("item");
  let item_id = searchParams.getAll("item_id");
  let size_id = searchParams.getAll("size_id");

  // convert into array
  length = length.length ? length[0].split(",") : [];
  width = width.length ? width[0].split(",") : [];
  height = height.length ? height[0].split(",") : [];
  dimension_unit = dimension_unit.length ? dimension_unit[0].split(",") : [];
  weight = weight.length ? weight[0].split(",") : [];
  weight_unit = weight_unit.length ? weight_unit[0].split(",") : [];
  fragile = fragile.length ? fragile[0].split(",") : [];
  hazardous = hazardous.length ? hazardous[0].split(",") : [];
  flammable = flammable.length ? flammable[0].split(",") : [];
  used = used.length ? used[0].split(",") : [];
  cargo_quantity = cargo_quantity.length ? cargo_quantity[0].split(",") : [];
  type = type.length ? type[0].split(",") : [];
  cargo_type = cargo_type.length ? cargo_type[0].split(",") : [];
  size = size.length ? size[0].split(",") : [];
  category = category.length ? category[0].split(",") : [];
  item = item.length ? item[0].split(",") : [];
  item_id = item_id.length ? item_id[0].split(",") : [];
  size_id = size_id.length ? size_id[0].split(",") : [];
  return {
    length,
    width,
    height,
    dimension_unit,
    weight,
    weight_unit,
    fragile,
    hazardous,
    flammable,
    used,
    cargo_quantity,
    type,
    cargo_type,
    size,
    category,
    item,
    item_id,
    size_id,
  };
}

export const AddCargoToUrl = ({ cargos }) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  const {
    length,
    width,
    height,
    dimension_unit,
    weight,
    weight_unit,
    fragile,
    hazardous,
    flammable,
    used,
    cargo_quantity,
    type,
    cargo_type,
    size,
    category,
    item,
    item_id,
    size_id,
  } = getCargoSearchParams(newSearchParams);
  cargos.forEach((cargo) => {
    length.push(cargo.length);
    width.push(cargo.width);
    height.push(cargo.height);
    dimension_unit.push(cargo.dimension_unit);
    weight.push(cargo.weight);
    weight_unit.push(cargo.weight_unit);
    fragile.push(cargo.fragile);
    hazardous.push(cargo.hazardous);
    flammable.push(cargo.flammable);
    used.push(cargo.used);
    cargo_quantity.push(cargo.quantity);
    type.push(cargo.type);
    cargo_type.push(cargo.cargo_type);
    size.push(cargo.size);
    category.push(cargo.category);
    item.push(cargo.item);
    item_id.push(cargo.item_id);
    size_id.push(cargo.size_id);
  });

  // create a new search params
  newSearchParams.set("length", length);
  newSearchParams.set("width", width);
  newSearchParams.set("height", height);
  newSearchParams.set("dimension_unit", dimension_unit);
  newSearchParams.set("weight", weight);
  newSearchParams.set("weight_unit", weight_unit);
  newSearchParams.set("fragile", fragile);
  newSearchParams.set("hazardous", hazardous);
  newSearchParams.set("flammable", flammable);
  newSearchParams.set("used", used);
  newSearchParams.set("cargo_quantity", cargo_quantity);
  newSearchParams.set("type", type);
  newSearchParams.set("cargo_type", cargo_type);
  newSearchParams.set("size", size);
  newSearchParams.set("category", category);
  newSearchParams.set("item", item);
  newSearchParams.set("item_id", item_id);
  newSearchParams.set("size_id", size_id);

  // update the url
  updateUrlByReplacingCurrentParams({ newSearchParams });
};

// TODO: This can be improved instead of extracting the search params and then removing the cargo from the search params, we can just remove the cargo from the cart items and then update the url
export const DeleteCargoFromUrl = ({ cargos }) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  const {
    length,
    width,
    height,
    dimension_unit,
    weight,
    weight_unit,
    fragile,
    hazardous,
    flammable,
    used,
    cargo_quantity,
    type,
    cargo_type,
    size,
    category,
    item,
    item_id,
    size_id,
  } = getCargoSearchParams(newSearchParams);

  let existingCargos = cargo_type.map((c_type, index) => {
    return {
      length: length[index],
      width: width[index],
      height: height[index],
      dimension_unit: dimension_unit[index],
      weight: weight[index],
      weight_unit: weight_unit[index],
      fragile: fragile[index],
      hazardous: hazardous[index],
      flammable: flammable[index],
      used: used[index],
      quantity: cargo_quantity[index],
      type: type[index],
      cargo_type: c_type,
      size: size[index],
      category: category[index],
      item: item[index],
      item_id: item_id[index],
      size_id: size_id[index],
    };
  });
  cargos.forEach((cargo) => {
    // Remove the cargo from the existing cargos if it exists based on make, model, model_id, year, title, mechanical, mobility, quantity as unique identifiers
    // find the index of the cargo
    const index = existingCargos.findIndex(
      (existingCargo) =>
        String(existingCargo.length) === String(cargo.length) &&
        String(existingCargo.width) === String(cargo.width) &&
        String(existingCargo.height) === String(cargo.height) &&
        String(existingCargo.dimension_unit) === String(cargo.dimension_unit) &&
        String(existingCargo.weight) === String(cargo.weight) &&
        String(existingCargo.weight_unit) === String(cargo.weight_unit) &&
        String(existingCargo.fragile) === String(cargo.fragile) &&
        String(existingCargo.hazardous) === String(cargo.hazardous) &&
        String(existingCargo.flammable) === String(cargo.flammable) &&
        String(existingCargo.used) === String(cargo.used) &&
        String(existingCargo.quantity) === String(cargo.quantity) &&
        String(existingCargo.type) === String(cargo.type) &&
        String(existingCargo.cargo_type) === String(cargo.cargo_type) &&
        String(existingCargo.size) === String(cargo.size) &&
        String(existingCargo.category) === String(cargo.category) &&
        String(existingCargo.item) === String(cargo.item) &&
        String(existingCargo.item_id) === String(cargo.item_id) &&
        String(existingCargo.size_id) === String(cargo.size_id)
    );
    if (index !== -1) {
      existingCargos.splice(index, 1);
    }
  });
  if (existingCargos.length === 0) {
    // remove the cart from the url
    newSearchParams.delete("length");
    newSearchParams.delete("width");
    newSearchParams.delete("height");
    newSearchParams.delete("dimension_unit");
    newSearchParams.delete("weight");
    newSearchParams.delete("weight_unit");
    newSearchParams.delete("fragile");
    newSearchParams.delete("hazardous");
    newSearchParams.delete("flammable");
    newSearchParams.delete("used");
    newSearchParams.delete("cargo_quantity");
    newSearchParams.delete("type");
    newSearchParams.delete("cargo_type");
    newSearchParams.delete("size");
    newSearchParams.delete("category");
    newSearchParams.delete("item");
    newSearchParams.delete("item_id");
    newSearchParams.delete("size_id");
    // update the url
    updateUrlByReplacingCurrentParams({ newSearchParams });
    return;
  } else {
    newSearchParams.set(
      "length",
      existingCargos.map((cargo) => cargo.length)
    );
    newSearchParams.set(
      "width",
      existingCargos.map((cargo) => cargo.width)
    );
    newSearchParams.set(
      "height",
      existingCargos.map((cargo) => cargo.height)
    );
    newSearchParams.set(
      "dimension_unit",
      existingCargos.map((cargo) => cargo.dimension_unit)
    );
    newSearchParams.set(
      "weight",
      existingCargos.map((cargo) => cargo.weight)
    );
    newSearchParams.set(
      "weight_unit",
      existingCargos.map((cargo) => cargo.weight_unit)
    );
    newSearchParams.set(
      "fragile",
      existingCargos.map((cargo) => cargo.fragile)
    );
    newSearchParams.set(
      "hazardous",
      existingCargos.map((cargo) => cargo.hazardous)
    );
    newSearchParams.set(
      "flammable",
      existingCargos.map((cargo) => cargo.flammable)
    );
    newSearchParams.set(
      "used",
      existingCargos.map((cargo) => cargo.used)
    );
    newSearchParams.set(
      "cargo_quantity",
      existingCargos.map((cargo) => cargo.quantity)
    );
    newSearchParams.set(
      "type",
      existingCargos.map((cargo) => cargo.type)
    );
    newSearchParams.set(
      "cargo_type",
      existingCargos.map((cargo) => cargo.cargo_type)
    );
    newSearchParams.set(
      "size",
      existingCargos.map((cargo) => cargo.size)
    );
    newSearchParams.set(
      "category",
      existingCargos.map((cargo) => cargo.category)
    );
    newSearchParams.set(
      "item",
      existingCargos.map((cargo) => cargo.item)
    );
    newSearchParams.set(
      "item_id",
      existingCargos.map((cargo) => cargo.item_id)
    );
    newSearchParams.set(
      "size_id",
      existingCargos.map((cargo) => cargo.size_id)
    );

    // update the url
    updateUrlByReplacingCurrentParams({ newSearchParams });
    return;
  }
};

export const ReplaceCargoInUrl = ({ oldCargo, newCargo }) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  const {
    length,
    width,
    height,
    dimension_unit,
    weight,
    weight_unit,
    fragile,
    hazardous,
    flammable,
    used,
    cargo_quantity,
    type,
    cargo_type,
    size,
    category,
    item,
    item_id,
    size_id,
  } = getCargoSearchParams(newSearchParams);

  let existingCargos = cargo_type.map((c_type, index) => {
    return {
      length: length[index],
      width: width[index],
      height: height[index],
      dimension_unit: dimension_unit[index],
      weight: weight[index],
      weight_unit: weight_unit[index],
      fragile: fragile[index],
      hazardous: hazardous[index],
      flammable: flammable[index],
      used: used[index],
      quantity: cargo_quantity[index],
      type: type[index],
      cargo_type: c_type,
      size: size[index],
      category: category[index],
      item: item[index],
      item_id: item_id[index],
      size_id: size_id[index],
    };
  });

  // find the index of the old cargo
  const index = existingCargos.findIndex(
    (existingCargo) =>
      String(existingCargo.length) === String(oldCargo.length) &&
      String(existingCargo.width) === String(oldCargo.width) &&
      String(existingCargo.height) === String(oldCargo.height) &&
      String(existingCargo.dimension_unit) ===
        String(oldCargo.dimension_unit) &&
      String(existingCargo.weight) === String(oldCargo.weight) &&
      String(existingCargo.weight_unit) === String(oldCargo.weight_unit) &&
      String(existingCargo.fragile) === String(oldCargo.fragile) &&
      String(existingCargo.hazardous) === String(oldCargo.hazardous) &&
      String(existingCargo.flammable) === String(oldCargo.flammable) &&
      String(existingCargo.used) === String(oldCargo.used) &&
      String(existingCargo.quantity) === String(oldCargo.quantity) &&
      String(existingCargo.type) === String(oldCargo.type) &&
      String(existingCargo.cargo_type) === String(oldCargo.cargo_type) &&
      String(existingCargo.size) === String(oldCargo.size) &&
      String(existingCargo.category) === String(oldCargo.category) &&
      String(existingCargo.item) === String(oldCargo.item) &&
      String(existingCargo.item_id) === String(oldCargo.item_id) &&
      String(existingCargo.size_id) === String(oldCargo.size_id)
  );
  if (index !== -1) {
    existingCargos[index] = {
      length: newCargo.length,
      width: newCargo.width,
      height: newCargo.height,
      dimension_unit: newCargo.dimension_unit,
      weight: newCargo.weight,
      weight_unit: newCargo.weight_unit,
      fragile: newCargo.fragile,
      hazardous: newCargo.hazardous,
      flammable: newCargo.flammable,
      used: newCargo.used,
      quantity: newCargo.quantity,
      type: newCargo.type,
      cargo_type: newCargo.cargo_type,
      size: newCargo.size,
      category: newCargo.category,
      item: newCargo.item,
      item_id: newCargo.item_id,
      size_id: newCargo.size_id,
    };
  }

  if (existingCargos.length === 0) {
    // remove the cart from the url
    newSearchParams.delete("length");
    newSearchParams.delete("width");
    newSearchParams.delete("height");
    newSearchParams.delete("dimension_unit");
    newSearchParams.delete("weight");
    newSearchParams.delete("weight_unit");
    newSearchParams.delete("fragile");
    newSearchParams.delete("hazardous");
    newSearchParams.delete("flammable");
    newSearchParams.delete("used");
    newSearchParams.delete("cargo_quantity");
    newSearchParams.delete("type");
    newSearchParams.delete("cargo_type");
    newSearchParams.delete("size");
    newSearchParams.delete("category");
    newSearchParams.delete("item");
    newSearchParams.delete("item_id");
    newSearchParams.delete("size_id");
    // update the url
    updateUrlByReplacingCurrentParams({ newSearchParams });
    return;
  } else {
    newSearchParams.set(
      "length",
      existingCargos.map((cargo) => cargo.length)
    );
    newSearchParams.set(
      "width",
      existingCargos.map((cargo) => cargo.width)
    );
    newSearchParams.set(
      "height",
      existingCargos.map((cargo) => cargo.height)
    );
    newSearchParams.set(
      "dimension_unit",
      existingCargos.map((cargo) => cargo.dimension_unit)
    );
    newSearchParams.set(
      "weight",
      existingCargos.map((cargo) => cargo.weight)
    );
    newSearchParams.set(
      "weight_unit",
      existingCargos.map((cargo) => cargo.weight_unit)
    );
    newSearchParams.set(
      "fragile",
      existingCargos.map((cargo) => cargo.fragile)
    );
    newSearchParams.set(
      "hazardous",
      existingCargos.map((cargo) => cargo.hazardous)
    );
    newSearchParams.set(
      "flammable",
      existingCargos.map((cargo) => cargo.flammable)
    );
    newSearchParams.set(
      "used",
      existingCargos.map((cargo) => cargo.used)
    );
    newSearchParams.set(
      "cargo_quantity",
      existingCargos.map((cargo) => cargo.quantity)
    );
    newSearchParams.set(
      "type",
      existingCargos.map((cargo) => cargo.type)
    );
    newSearchParams.set(
      "cargo_type",
      existingCargos.map((cargo) => cargo.cargo_type)
    );
    newSearchParams.set(
      "size",
      existingCargos.map((cargo) => cargo.size)
    );
    newSearchParams.set(
      "category",
      existingCargos.map((cargo) => cargo.category)
    );
    newSearchParams.set(
      "item",
      existingCargos.map((cargo) => cargo.item)
    );
    newSearchParams.set(
      "item_id",
      existingCargos.map((cargo) => cargo.item_id)
    );
    newSearchParams.set(
      "size_id",
      existingCargos.map((cargo) => cargo.size_id)
    );

    // update the url
    updateUrlByReplacingCurrentParams({ newSearchParams });
    return;
  }
};
