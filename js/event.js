
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}
function setStorage(key, value) {
    window.localStorage.setItem(key, value);
}

$(document).ready(function () {

    $(".refresh").bind("click", function () {
        location.reload();
    });

    $(".btn-primary").bind("click", function () {

        let tk = $("#InputEmail1")[0].value;
        let mk = $("#InputPassword1")[0].value;
        console.log(tk);
        console.log(mk);

        if (/^[kK][0-9]{12}$/.test(tk)) {
            if (mk != null || mk != "") {
                $.get(`api/tkb/?masv=${tk}&token=0908162539`, function (data) {
                    console.log(typeof data)
                    setStorage("tkdkmh", tk);
                    setStorage("mkdkmh", mk);
                    infoThoiKhoaBieu = JSON.stringify(data)
                    setStorage("infoThoiKhoaBieu", infoThoiKhoaBieu);
                    thongbao("Ứng dụng sẽ không lưu lại tài khoản của bản trên máy chủ. Cảm ơn");
                    $('#thongbao').on('hidden.bs.modal', function () {
                        location.reload()
                    })


                });

            }
            else {
                $.get(`api/tkb/?masv=${tk}&token=0908162539`, function (data) {
                    console.log(typeof data)
                    setStorage("tkdkmh", tk);
                    setStorage("mkdkmh", mk);
                    infoThoiKhoaBieu = JSON.stringify(data)
                    setStorage("infoThoiKhoaBieu", infoThoiKhoaBieu);
                    thongbao("Ứng dụng sẽ không lưu lại tài khoản của bản trên máy chủ. Cảm ơn");
                    $('#thongbao').on('hidden.bs.modal', function () {
                        location.reload()
                    })
                    return;
                });
            }
        }
        else {
            thongbao("Mã sinh viên không hợp lệ");
            $("#InputEmail1")[0].value = "";
            $("#InputPassword1")[0].value = "";
        }
    });

    $(".logout").bind("click", function () {

        Swal.fire({
            title: 'Bạn chắc chứ?',
            text: "Ứng dụng sẽ tiến hành đăng xuất ra khỏi tải khoản này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đăng xuất!'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    "Đã đăng xuất thành công",
                );
                setInterval(() => {
                    window.localStorage.clear();
                    location.reload();
                }, 2000);

            }
        })


    });

    // $("#calendar-body td").unbind("click").on("click", function () {


    // });



})

