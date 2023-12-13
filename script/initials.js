`use strict`;

//////////////////// - Khai báo biến- Global scope
const formInputFile = document.getElementById(`input-file`);
const formInputId = document.getElementById(`input-id`);
const formInputName = document.getElementById(`input-name`);
const formInputAge = document.getElementById(`input-age`);
const formInputType = document.getElementById(`input-type`);
const formInputWeight = document.getElementById(`input-weight`);
const formInputLength = document.getElementById(`input-length`);
const formInputColor = document.getElementById(`input-color-1`);
const formInputBreed = document.getElementById(`input-breed`);
const formInputVaccinated = document.getElementById(`input-vaccinated`);
const formInputDewormed = document.getElementById(`input-dewormed`);
const formInputSterilized = document.getElementById(`input-sterilized`);
const calBmiInput = document.querySelector(`.btn-cal-bmi`);

const buttonSubmit = document.getElementById(`submit-btn`);
const buttonExport = document.getElementById(`export-btn`);
const buttonImport = document.getElementById(`import-btn`);

const buttonHealthy = document.getElementById(`healthy-btn`);
const buttonShowAll = document.getElementById(`show-all-btn`);
const buttonDanger = document.getElementById(`btn-danger`);
const buttonCalBmi = document.getElementById(`cal-bmi-btn`);
const buttonFind = document.getElementById(`find-btn`);

const elComponents = document.querySelector(`.components`);
const elListComp = elComponents.querySelectorAll(`li`);
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");

const petBreed = JSON.parse(localStorage.getItem(`petBreed`) ?? `[]`);

/////////////////////////// - Bắt sự kiện di chuột vào
elComponents.addEventListener(`mouseover`, function (e) {
  e.preventDefault();
  if (e.target.closest(`li`)) {
    elListComp.forEach((el) => el.classList.remove(`hoverSidebar`));
    e.target.closest(`li`).classList.add(`hoverSidebar`);
  }
});

///////////////////////////// - Bắt sự kiện di chuột ra
elComponents.addEventListener(`mouseout`, function (e) {
  e.preventDefault();
  elListComp.forEach((el) => el.classList.remove(`hoverSidebar`));
});

///////////////////////////// - Bắt sự kiện click chuột thanh tiêu đề để tạo hiệu ứng animation
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

////////////////////////////////// - Initial pet form - Các giá trị hiẻn thị ban đầu
const initialFormPet = function () {
  formInputId.value = ``;
  formInputName.value = ``;
  formInputAge.value = ``;
  formInputType.value = `Select Type`;
  formInputWeight.value = ``;
  formInputLength.value = ``;
  formInputColor.value = `#000000`;
  formInputBreed.value = `Select Breed`;
  formInputVaccinated.checked = false;
  formInputDewormed.checked = false;
  formInputSterilized.checked = false;
};

//////////////////// - Select type breed - Tạo hàm hiển thị danh sách chọn giống
const danhSachBreed = function (breed) {
  const option = document.createElement(`option`);
  option.innerHTML = `${breed}`;
  formInputBreed.appendChild(option);
};
const petBreedDog = petBreed.filter((value, index) => {
  return value.typeVal === `Dog`;
});
const petBreedCat = petBreed.filter((value, index) => {
  return value.typeVal === `Cat`;
});

//////////////////// - Select type change - Tạo hàm khi thay đổi Type pet
const selectType = function () {
  // Bat su kien khi thay doi loai pet - Select type
  formInputType.addEventListener(`change`, function (e) {
    if (e.target.value !== `Select Type`) {
      // DOG
      if (e.target.value === `Dog`) {
        formInputBreed.innerHTML = ``;
        danhSachBreed(`Select Breed`);
        `${petBreedDog.forEach((element) => {
          danhSachBreed(element.breedVal);
        })}`;
        // CAT
      } else if (e.target.value === `Cat`) {
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
  });
};
