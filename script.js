"use strict";

let petArr = JSON.parse(getFromStorage("petArr", `[]`));
let kiemtraId = JSON.parse(localStorage.getItem(`kiemtraId`) ?? `[]`);
let healthyPetArr = JSON.parse(getFromStorage(`healthyPetArr`, `[]`));
let petId;
let paraBmi = `?`;

/////////////////////////////////////  -  SUBMIT BUTTON
buttonSubmit.addEventListener(`click`, function () {
  // LẤY DỮ LIỆU TỪ FORM
  let data = {
    petId: formInputId.value,
    petName: formInputName.value,
    petAge: parseInt(Number(formInputAge.value)),
    petType: formInputType.value,
    petWeight: formInputWeight.value,
    petLength: formInputLength.value,
    petColor: formInputColor.value,
    petBreed: formInputBreed.value,
    petVaccinated: formInputVaccinated.checked,
    petDewormed: formInputDewormed.checked,
    petSterilized: formInputSterilized.checked,
    petBmi: paraBmi,
    petDateAdd: `${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}`,
  };
  // KIỂM TRA ĐIỀU KIỆN FORM.
  if (
    data.petId === `` ||
    data.petName === `` ||
    data.petAge === `` ||
    data.petWeight === `` ||
    data.petLength === ``
  ) {
    alert(`Vui lòng điền đầy đủ thông tin`);
  } else if (data.petAge <= 0 || data.petAge > 15) {
    alert(`Age must be between 1 and 15!`);
  } else if (data.petWeight <= 0 || data.petWeight > 15) {
    alert(`Weight must be between 1 and 15!`);
  } else if (data.petLength <= 0 || data.petLength > 100) {
    alert(`Length must be between 1 and 100!`);
  } else if (data.petType === `Select Type`) {
    alert(`Please select Type!`);
  } else if (data.petBreed === `Select Breed`) {
    alert(`Please select Breed! `);
  }
  // KIỂM TRA GIÁ TRỊ TRÙNG
  else if (kiemtraId.includes(data.petId)) {
    alert(`ID must be unique!`);
  } else if (!kiemtraId.includes(data.petId)) {
    kiemtraId.push(data.petId);
    petArr.push(data);
    hienThiDanhSachPet(petArr);
    //LƯU TRỮ DỮ LIỆU - LOCALSTORAGE
    saveToStorage(`petArr`, JSON.stringify(petArr));
    saveToStorage(`kiemtraId`, JSON.stringify(kiemtraId));
    hienThiDanhSachPet(petArr);
  }
  // XÓA THÔNG TIN KHI NHẬP XONG
  initialFormPet();
  formInputBreed.innerHTML = ``;
  danhSachBreed(`Select Breed`);
});

///////////////////////////////// - CALCULATE BMI BUTTON
buttonCalBmi.addEventListener(`click`, function () {
  for (let i = 0; i < petArr.length; i++) {
    //BMI = (weight * 703) / length ** 2 - DOG
    if (petArr[i].petType === `Dog`) {
      let calBmiDog = (petArr[i].petWeight * 703) / petArr[i].petLength ** 2;
      petArr[i].petBmi = calBmiDog.toFixed(2);
      hienThiDanhSachPet(petArr);
    }
    // BMI = (weight * 886) / length ** 2 -CAT
    else if (petArr[i].petType === `Cat`) {
      let calBmiCat = (petArr[i].petWeight * 886) / petArr[i].petLength ** 2;
      petArr[i].petBmi = calBmiCat.toFixed(2);
      hienThiDanhSachPet(petArr);
    }
  }
  // LƯU DỮ LIỆU
  saveToStorage(`petArr`, JSON.stringify(petArr));
});

///////////////////////////// - TẠO HÀM CHUYỂN DỔI NÚT NHẤN HELTHY <-> SHOW ALL
const switchButton = function (e) {
  buttonHealthy.classList.toggle(`hidden`);
  buttonShowAll.classList.toggle(`hidden`);
};

////////////////////////////// - HELTHY BUTTON
buttonHealthy.addEventListener(`click`, function (e) {
  e.preventDefault();
  switchButton();
  healthyPetArr = petArr.filter(function (petArr) {
    return (
      petArr.petVaccinated == true &&
      petArr.petDewormed == true &&
      petArr.petSterilized == true
    );
  });
  hienThiDanhSachPet(healthyPetArr);
});

////////////////////////////// - SHOW ALL BUTTON
buttonShowAll.addEventListener(`click`, function () {
  switchButton();
  hienThiDanhSachPet(petArr);
});

////////////////////////////// - DELETE BUTTON
const deletePet = function (petId) {
  const isConfirm = confirm(`Are you Sure?`);
  if (isConfirm) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].petId === petId) {
        petArr.splice(i, 1);
        kiemtraId.splice(i, 1);
        localStorage.removeItem(`petArr`);
        localStorage.removeItem(`kiemtraId`);
        saveToStorage(`petArr`, JSON.stringify(petArr));
        saveToStorage(`kiemtraId`, JSON.stringify(kiemtraId));
        hienThiDanhSachPet(petArr);
      }
    }
  }
};

////////////////////////////// - TẠO HÀM HIỂN THỊ THÚ CƯNG
const hienThiDanhSachPet = function (petArr) {
  document.getElementById(`tbody`).innerHTML = ``;
  for (let i = 0; i < petArr.length; i++) {
    let row = document.createElement(`tr`);
    row.innerHTML = `<th scope="row">${petArr[i].petId}</th>
      <td>${petArr[i].petName}</td>
      <td>${petArr[i].petAge}</td>
      <td>${petArr[i].petType}</td>
      <td>${petArr[i].petWeight} kg</td>
      <td>${petArr[i].petLength} cm</td>
      <td>${petArr[i].petBreed}</td>
      <td><i class="bi bi-square-fill" style="color: ${
        petArr[i].petColor
      }"></i></td>
      <td><i class="bi ${
        petArr[i].petVaccinated ? ` bi-check-circle-fill` : ` bi-x-circle-fill`
      }"></i></td>
      <td><i class="bi ${
        petArr[i].petDewormed ? ` bi-check-circle-fill` : ` bi-x-circle-fill`
      }"></i></td>
      <td><i class="bi ${
        petArr[i].petSterilized ? ` bi-check-circle-fill` : ` bi-x-circle-fill`
      }"></i></td>
      <td>${petArr[i].petBmi}</td>
      <td>${petArr[i].petDateAdd}</td>
      <td><button type="button" class="btn btn-danger" onclick="deletePet('${
        petArr[i].petId
      }')">Delete</button></td>`;
    document.getElementById(`tbody`).appendChild(row);
  }
};
hienThiDanhSachPet(petArr);

/////////////////////////// - HIỂN THỊ BAN ĐẦU
formInputBreed.innerHTML = ``;
danhSachBreed(`Select Breed`);
selectType();
