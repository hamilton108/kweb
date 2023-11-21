


document.addEventListener("DOMContentLoaded", function() {
    const node = document.getElementById("elm");
    const app = Elm.Tidreg.Deviations.init({
      node: node,
      flags: { userid: "kdo", wid: "10", lang: "no" }
    });
});