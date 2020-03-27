
// (function createDOM() {
//   let DOM = ``
//   $(".wrapper").append(DOM);
// })();

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
// let selectYear = document.getElementById("year");
// let selectMonth = document.getElementById("month");

let months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
let monthsNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

let monthAndYear = document.getElementById("monthAndYear");



function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}
function findObjectByKey(array, key, value) {
  let arrays = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      arrays.push(array[i])
    }
  }
  return arrays;

}
function click() {
  $("#calendar-body td").unbind("click").on("click", function () {
    //$("#InfoDay").html("");
    let thangHienTai = months[currentMonth];
    let thangHienTaiN = monthsNumber[currentMonth];
    let NamHienTai = currentYear;
    let ngayHienTai = $(this).text();

    $("#InfoDay").prepend(`<div class="mt-1">Ngày ${ngayHienTai} Tháng ${thangHienTai} Năm ${NamHienTai}<\div>`);
    var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    $(this).css("background-color", color);


    // let arrayInfoTKB = window.localStorage.getItem("infoThoiKhoaBieu");
    // if (!arrayInfoTKB) {
    //   return;
    // }

    // arrayInfoTKB = JSON.parse(arrayInfoTKB)

    // let ngaycantim = `${ngayHienTai}/${thangHienTaiN}/${NamHienTai}`

    // let result = findObjectByKey(arrayInfoTKB, "ngay", ngaycantim)
    // if (result == null || result == "" || result == undefined) {
    //   $("#InfoDay").append(`<li>Hôm nay bạn không có môn học nào. Là việc gì khác thôi nhỉ<\li>`);
    //   return;
    // }
    // result.forEach(element => {
    //   $("#InfoDay").append(`<li><strong>Tên môn</strong>: <i>${element.tenmon}<\i>, <strong>học tại: </strong> <i>${element.phong}<\i> , <strong>thời gian học: </strong> <i>${element.thoigian}<\i><\li><br>`)
    // });





  })
}

function showCalendar(month, year) {


  let firstDay = (new Date(year, month)).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let tbl = document.getElementById("calendar-body"); // body of the calendar

  // clearing all previous cells
  tbl.innerHTML = "";

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = months[month] + " " + year;
  // selectYear.value = year;
  // selectMonth.value = month;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.createElement("tr");

    //creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      else if (date > daysInMonth) {
        break;
      }

      else {
        let cell = document.createElement("td");
        let cellText = document.createTextNode(date);
        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.classList.add("bg-info");
        } // color today's date
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }

    }

    tbl.appendChild(row); // appending each row into calendar body.

  }
  $("body").trigger("domChanged");

}
function checkStorage() {
  tk = window.localStorage.getItem("tkdkmh");
  mk = window.localStorage.getItem("mkdkmh");
  if (tk == null || tk == "null" || tk == "") {
    return 3
  } else {
    if (!/^[kK][0-9]{12}$/.test(tk)) {
      return 4;
    }
    if (mk == null || mk == "null" || mk == "") {
      thongbao("Bạn đã không nhập mật khẩu.Một vài chức năng sẽ bị hạn chế");
    }

    icon = `<a class="nav-link logout"> Xin chào ${tk} <i class="fa fa-sign-out" aria-hidden="true"></i></a> `
    $(".sidebar .nav li:first-child").html(icon);
  }
}
function spinLoaded() {
  $('.master-loader').css('display', 'none');
}
function thongbao(str) {

  $("#thongbao > div > div > div > div.form-text.text-center").text(str)
  $("#thongbao").modal();
}
function spinLoading() {
  $('.master-loader').css('display', 'inline-block');
}
function BumBoomNoVoMomDuaDangThayCaiNay() {
  setInterval(function () { thongbao("hệ thống phát hiện hack"); console.warn("Bạn đang làm cái gì với app của t vậy") }, 1000);
}
function ajaxLoading() {
  $(document)
    .ajaxStart(function () {
      spinLoading();
    })
    .ajaxStop(function () {
      spinLoaded();
    });
}
$("body").on("domChanged", function () {
  click();
});

$(document).ready(function () {
  ajaxLoading();

  if (checkStorage() === 4) {
    BumBoomNoVoMomDuaDangThayCaiNay();
    return;
  }
  if (checkStorage() === 3) {
    $("#login").modal();
  }

  showCalendar(currentMonth, currentYear);
  $(".master-loader").addClass("hidding");
  $("#calendar-body td.bg-info").click();


})