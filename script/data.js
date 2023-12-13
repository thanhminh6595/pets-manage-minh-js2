"use strict";
let petArrData = JSON.parse(getFromStorage(`petArr`, `[]`));
/////////////////////////////////// - Export
function saveStaticDataToFile() {
  let blob = new Blob([JSON.stringify(petArrData)], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "data.txt");
  console.log(blob, petArrData);
  document.querySelector(`.state-input`).classList.remove(`hidden`);
  document.querySelector(`.state-input`).innerHTML = `Export file success`;
}
buttonExport.addEventListener(`click`, saveStaticDataToFile);
formInputFile.addEventListener(`click`, function () {
  document.querySelector(`.state-input`).classList.add(`hidden`);
});

/////////////////////////////////// - Import
buttonImport.addEventListener(`click`, function (e) {
  let file = formInputFile.files[0];
  if (file) {
    var reader = new FileReader();
    console.log(reader);
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      petArrData = JSON.parse(evt.target.result);
      document.querySelector(`.state-input`).classList.remove(`hidden`);
      document.querySelector(`.state-input`).innerHTML = `Import file success`;
      localStorage.setItem(`petArr`, JSON.stringify(petArrData));
    };
    reader.onerror = function (evt) {
      document.querySelector(`.state-input`).classList.remove(`hidden`);
      document.querySelector(`.state-input`).innerHTML = `Not success`;
    };
  }
});
