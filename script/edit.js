"use strict";

const petArrEdit = JSON.parse(localStorage.getItem(`petArr`) ?? `[]`);
const containerForm = document.getElementById(`container-form`);

///////////////////////////////
//Hien thi danh sach thu cung
const hienThiDanhSachPetEdit = function (petArr) {
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
      <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].petColor}"></i>
      </td>
      <td><i class="bi ${
        petArr[i].petVaccinated ? ` bi-check-circle-fill` : ` bi-x-circle-fill`
      }"></i></td>
      <td><i class="bi ${
        petArr[i].petDewormed ? ` bi-check-circle-fill` : ` bi-x-circle-fill`
      }"></i></td>
      <td><i class="bi ${
        petArr[i].petSterilized ? ` bi-check-circle-fill` : ` bi-x-circle-fill`
      }"></i></td>
      <td>
      ${petArr[i].petDateAdd}
      </td>
      <td>
      <button type="button" class="btn btn-warning" 
      onclick="editPet('${petArr[i].petId}')"
      >Edit</button>
      </td>`;
    document.getElementById(`tbody`).appendChild(row);
  }
};
hienThiDanhSachPetEdit(petArrEdit);
//--------------------------------------------------------------------
//-OUT SIDE
//--------------------------------------------------------------------

let selectPet = 0;
//////////////////////////////// - EDIT BUTTON
const editPet = function (petId) {
  selectPet = petArrEdit.filter((value) => {
    return value.petId === petId;
  });
  //HIỂN THỊ FORM EDIT
  containerForm.classList.remove(`hide`);
  showFormEdit(selectPet);
};

//////////////////////////////// - SUBMIT BUTTON
buttonSubmit.addEventListener(`click`, function (e) {
  console.log(selectPet);
  e.preventDefault();
  editFormEdit(selectPet);
  hienThiDanhSachPetEdit(petArrEdit);
  saveToStorage(`petArr`, JSON.stringify(petArrEdit));
  // ẨN FORM EDIT
  initialFormPet();
  containerForm.classList.add(`hide`);
});

//////////////////////////////// - TẠO HÀM HIỂN THỊ FORM
const editFormEdit = function (petArrEdit) {
  petArrEdit[0].petId = formInputId.value;
  petArrEdit[0].petName = formInputName.value;
  petArrEdit[0].petAge = formInputAge.value;
  petArrEdit[0].petType = formInputType.value;
  petArrEdit[0].petWeight = formInputWeight.value;
  petArrEdit[0].petLength = formInputLength.value;
  petArrEdit[0].petColor = formInputColor.value;
  petArrEdit[0].petBreed = formInputBreed.value;
  petArrEdit[0].petVaccinated = formInputVaccinated.checked;
  petArrEdit[0].petDewormed = formInputDewormed.checked;
  petArrEdit[0].petSterilized = formInputSterilized.checked;
};

// tao ham hien thi form theo petId
const showFormEdit = function (petInfoArrEdit) {
  formInputId.value = petInfoArrEdit[0].petId;
  formInputName.value = petInfoArrEdit[0].petName;
  formInputAge.value = petInfoArrEdit[0].petAge;
  formInputType.value = petInfoArrEdit[0].petType;
  formInputWeight.value = petInfoArrEdit[0].petWeight;
  formInputLength.value = petInfoArrEdit[0].petLength;
  formInputColor.value = petInfoArrEdit[0].petColor;
  formInputVaccinated.checked = petInfoArrEdit[0].petVaccinated;
  formInputDewormed.checked = petInfoArrEdit[0].petDewormed;
  formInputSterilized.checked = petInfoArrEdit[0].petSterilized;

  /////////////////////////////// - THAY ĐỔI TYPE -> BREED
  if (formInputType.value !== `Select Type`) {
    //DOG
    if (formInputType.value === `Dog`) {
      formInputBreed.innerHTML = ``;
      danhSachBreed(`Select Breed`);
      `${petBreedDog.forEach((element) => {
        danhSachBreed(element.breedVal);
      })}`;
      //CAT
    } else if (formInputType.value === `Cat`) {
      formInputBreed.innerHTML = ``;
      danhSachBreed(`Select Breed`);
      `${petBreedCat.forEach((element) => {
        danhSachBreed(element.breedVal);
      })}`;
    }
  } else {
    formInputBreed.innerHTML = ``;
    danhSachBreed(`Select Breed`);
  }
  formInputBreed.value = petInfoArrEdit[0].petBreed;
  selectType();
};
/*
 Nếu sử dụng btn submit bên trong edit btn thì sử dụng 1 biến kiểm tra 
 true/false để không xảy ra các lỗi không mong muốn (bubbling)
 */
