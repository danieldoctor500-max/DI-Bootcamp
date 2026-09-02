let formSphere = document.getElementById("MyForm");

formSphere.addEventListener("submit", (event) => {
  event.preventDefault();

  let radius = document.getElementById("radius").value;
  radius = parseFloat(radius);

  if (!isNaN(radius)) {
    let volume = (4/3) * Math.PI * Math.pow(radius, 3);
    document.getElementById("volume").value = volume.toFixed(2);
  }
});
