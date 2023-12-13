"use strict";
const arrBreedId = JSON.parse(localStorage.getItem(`arrBreedId`) ?? `[]`);
let count = 0;

///////////////////////////////// - TẠO HÀM HIẺN THỊ BAN ĐẦU
const xoaThongTinDauVao = function () {
  formInputBreed.value = ``;
  formInputType.value = `Select Type`;
};
//////////////////////////////// - SUBMIT BTN
buttonSubmit.addEventListener(`click`, function (e) {
  e.preventDefault();
  const data = {
    breedId: count,
    breedVal: formInputBreed.value,
    typeVal: formInputType.value,
  };
  //KIỂM TRA ĐIỀU KIỆN
  if (!data.breedVal) {
    alert(`Vui lòng nhập thông tin giống`);
  } else if (data.breedVal === `Select Type`) {
    alert(`Vui lòng chọn loại pet`);
  } else if (data.typeVal !== `Select Type`) {
    petBreed.push(data);
    arrBreedId.push(data.breedId);
    xoaThongTinDauVao();
    hienThiDanhSachBreed(petBreed);
    saveToStorage(`petBreed`, JSON.stringify(petBreed));
    saveToStorage(`arrBreedId`, JSON.stringify(arrBreedId));
    count++;
  }
  xoaThongTinDauVao();
});

const hienThiDanhSachBreed = function (petBreed) {
  document.querySelector(`#tbody`).innerHTML = ``;
  for (let i = 0; i < petBreed.length; i++) {
    const rowBreed = document.createElement(`tr`);
    rowBreed.innerHTML = `
    <th scope="row">${i + 1}</th>
    <td>${petBreed[i].breedVal}</td>
    <td>${petBreed[i].typeVal}</td>
    <td>
    <button
    type="button"
    class="btn btn-danger"
    onclick="deletePetBreed(${petBreed[i].breedId})"
    >
    Delete
    </button>
    </td>`;
    document.querySelector(`#tbody`).appendChild(rowBreed);
  }
};
hienThiDanhSachBreed(petBreed);

//////////////////////////////// - CLEAR PET
const deletePetBreed = (breedId) => {
  const isConfirm = confirm(`Are you Sure?`);
  if (isConfirm) {
    for (let i = 0; i < petBreed.length; i++) {
      if (petBreed[i].breedId === breedId) {
        petBreed.splice(i, 1);
        arrBreedId.splice(i, 1);
        hienThiDanhSachBreed(petBreed);
        saveToStorage(`petBreed`, JSON.stringify(petBreed));
        saveToStorage(`arrBreedId`, JSON.stringify(arrBreedId));
      }
    }
  }
};
