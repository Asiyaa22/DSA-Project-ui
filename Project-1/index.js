const btn = document.getElementById("calc").onclick = function () {
  let distance = Number(document.getElementById("distance").value);
  let weight = Number(document.getElementById("weight").value);
  let type = document.getElementById("type").value;
  let member = document.getElementById("member").value;

  let price = 20; // base

  // distance slab
  if (distance > 10) price += 20;
  else if (distance > 5) price += 10;

  // weight
  if (weight > 2) price += 15;

  // type
  if (type === "fast") price += 10;

  // membership
  if (member === "yes") price -= 10;

  // floor
  if (price < 15) price = 15;
  console.log("Done")
  console.log("Price", price);

  document.getElementById("result").innerText = "Delivery Charge: ₹" + price;
  document.getElementById("result").classList.add("show");
};

    // console.log("here is the btn ", btn)