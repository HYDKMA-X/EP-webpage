/*
  by 皓月当空EOBM-X
*/

var geolocation = new BMap.Geolocation();

// 高危城市
var data = ["安阳市","天津市","许昌市","西安市","上海市","珠海市","深圳市","中山市","金华市","郑州市","洛阳市"];

// 二维码
var qrcode;

// 渲染地图
window.onload = function() {
    if(navigator.geolocation) {
        var map = new BMap.Map("container");
        var point = new BMap.Point();
        map.centerAndZoom(point,12);

        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
            }
            else {
                alert('failed' + this.getStatus());
            }        
        },{enableHighAccuracy: true});
    }
};

// 渲染二维码
geolocation.getCurrentPosition(function(r){
	if(this.getStatus() == BMAP_STATUS_SUCCESS){
        var lng = r.point.lng;
        var lat = r.point.lat;

        var point = new BMap.Point(lng, lat);
        var geo = new BMap.Geocoder();

        geo.getLocation(point, (res)=>{
            var addComp = res.addressComponents;
            var addr = "省：" + addComp.province + "，\n" + "市：" + addComp.city + "，\n" + "区：" + addComp.district + "，\n" + "道：" + addComp.street;
            $('#result_l').text(addr);
            if (data.includes(addComp.city)) {
                $('#warning').text("\n警告：您所在的城区属于高危城市！");
                qrcode = new QRCode(document.getElementById("qrcode"), {
                    text: "您的位置：\n" + addr + "\n警告：您所在的城区属于高危城市！",
                    width: 512,
                    height: 512,
                    colorDark : "red",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
            } else {
                qrcode = new QRCode(document.getElementById("qrcode"), {
                    text: "您的位置：\n" + addr,
                    width: 512,
                    height: 512,
                    colorDark : "green",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
            }
        });  
	}
	else {
		alert('failed' + this.getStatus());
	}        
},{enableHighAccuracy: true});
