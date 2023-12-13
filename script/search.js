"use strict";
////////////////////////////////// Khai bao bien
const petArrSearch = JSON.parse(localStorage.getItem(`petArr`) ?? `[]`);
const petBreedSearch = JSON.parse(localStorage.getItem(`petBreed`));

/////////////////////////////////Hien thi danh sach thu cung - Tạo 1 element ở trong table - Lưu ý việc sử dụng onclick ở đây là 1 global scope - Trỏ đến vị trí id="tbody"
const hienThiDanhSachPetSearch = function (petArr) {
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
      </td>`;
    document.getElementById(`tbody`).appendChild(row);
  }
};
hienThiDanhSachPetSearch(petArrSearch);

//////////////////////////////// - Ham khong bi trung gia tri trong mang
function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

//////////////////////////////// - Bat su kien nut nhan FIND
const isBreedDog = petBreed.filter((value, index) => {
  return value.petType === `Dog`;
});
const isBreedCat = petBreed.filter((value, index) => {
  return value.petType === `Cat`;
});

//Dieu kien la Dog -> hien thi danh sach dog
if (formInputType.value === `Dog`) {
  formInputBreed.innerHTML = ``;
  danhSachBreed(`Select Breed`);
  `${isBreedDog.forEach((element) => {
    danhSachBreed(element.petBreed);
  })}`;
  //Dieu kien la "cat" -> hien thi danh sach cat
} else if (formInputType.value === `Cat`) {
  formInputBreed.innerHTML = ``;
  danhSachBreed(`Select Breed`);
  `${isBreedCat.forEach((element) => {
    danhSachBreed(element.petBreed);
  })}`;
  //Dieu kien la "Select Type" -> ko hien thi danh sach
} else if (formInputType.value === `Select Type`) {
  formInputBreed.innerHTML = ``;
  danhSachBreed(`Select Breed`);
}
selectType();

////////////////////////////////////// - Bắt sự kiện button Find
buttonFind.addEventListener(`click`, function (e) {
  e.preventDefault();
  const petSearchedId = petArrSearch.filter((value, index) => {
    return value.petId.search(formInputId.value) !== -1;
  });
  const petSearchedName = petSearchedId.filter((value, index) => {
    return value.petName.search(formInputName.value) !== -1;
  });
  const petSearchedType = petSearchedName.filter((value, index) => {
    if (formInputType.value === `Select Type`) {
      return value.petType.search(formInputType.value) === -1;
    } else if (formInputType.value !== `Select Type`) {
      return value.petType === formInputType.value;
    }
  });
  const petSearchedBreed = petSearchedType.filter((value, index) => {
    if (formInputBreed.value === `Select Breed`) {
      return value.petBreed.search(formInputBreed.value) === -1;
    } else if (
      formInputBreed.value !== `Select Breed` &&
      value.petBreed.search(formInputBreed.value) === 0
    ) {
      return value.petBreed === formInputBreed.value;
    } else if (
      formInputBreed.value !== `Select Breed` &&
      value.petBreed.search(formInputBreed.value) === -1
    ) {
      return;
    }
  });
  hienThiDanhSachPetSearch(petSearchedBreed);
  // Kiểm tra nút 3 nút check
  let petSearchedVaccined;
  let petSearchedDewormed;
  let petSearchedSterillized;
  //T-F-F
  if (formInputVaccinated.checked) {
    petSearchedVaccined = petSearchedBreed.filter((value, index) => {
      return value.petVaccinated === formInputVaccinated.checked;
    });
    console.log(`tff`, petSearchedVaccined);
    hienThiDanhSachPetSearch(petSearchedVaccined);
    // T-T-F
    if (formInputDewormed.checked) {
      petSearchedDewormed = petSearchedVaccined.filter((value, index) => {
        return value.petDewormed === formInputDewormed.checked;
      });
      console.log(`ttf`, petSearchedDewormed);
      hienThiDanhSachPetSearch(petSearchedDewormed);
      //T-T-T
      if (formInputSterilized.checked) {
        petSearchedSterillized = petSearchedDewormed.filter((value, index) => {
          return value.petSterilized === formInputSterilized.checked;
        });
        console.log(`ttt`, petSearchedSterillized);
        hienThiDanhSachPetSearch(petSearchedSterillized);
        //T-T-F
      } else {
        console.log(`ttf`, petSearchedDewormed);
        hienThiDanhSachPetSearch(petSearchedDewormed);
      }
    } else if (!formInputDewormed.checked) {
      //T-F-T
      if (formInputSterilized.checked) {
        petSearchedSterillized = petSearchedVaccined.filter((value, index) => {
          return value.petSterilized === formInputSterilized.checked;
        });
        console.log(`tft`, petSearchedSterillized);
        hienThiDanhSachPetSearch(petSearchedSterillized);
      } else {
        //T-F-F
        console.log(`tff`, petSearchedVaccined);
        hienThiDanhSachPetSearch(petSearchedVaccined);
      }
    }
  } else if (!formInputVaccinated.checked) {
    //F-T-F
    if (formInputDewormed.checked) {
      petSearchedDewormed = petSearchedBreed.filter((value, index) => {
        return value.petDewormed === formInputDewormed.checked;
      });
      console.log(`ftf`, petSearchedDewormed);
      hienThiDanhSachPetSearch(petSearchedDewormed);
      //F-T-T
      if (formInputSterilized.checked) {
        petSearchedSterillized = petSearchedDewormed.filter((value, index) => {
          return value.petSterilized === formInputSterilized.checked;
        });
        console.log(`ftt`, petSearchedSterillized);
        hienThiDanhSachPetSearch(petSearchedSterillized);
      }
    } else if (!formInputDewormed.checked) {
      //F-F-T
      if (formInputSterilized.checked) {
        petSearchedSterillized = petSearchedBreed.filter((value, index) => {
          return value.petSterilized === formInputSterilized.checked;
        });
        console.log(`fft`, petSearchedSterillized);
        hienThiDanhSachPetSearch(petSearchedSterillized);
      } else {
        console.log(`fft`, petSearchedBreed);
        hienThiDanhSachPetSearch(petSearchedBreed);
      }
    }
  }
});
