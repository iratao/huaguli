$(function() {
	var activeItem = undefined;
    $(".flower_item").click(function(event){
        if ($(this).hasClass('is_sold_out')) {
            return;
        }
    	if (activeItem) {
    		activeItem.removeClass("active");
    	}
    	$(this).addClass("active");
    	activeItem = $(this);
    });

    $("#submit_btn").click(function(event) {
    	var selectedItem = $(".flower_item.active").attr("data-value");
    	var seatNum = $("#seat_number").val();
        var phoneNum = $("#phone_number").val();
        if (!selectedItem) {
            $('#selectItemModel').modal('toggle');
            // alert('请选择一束花');
            return;
        }
        if (!seatNum) {
            $('#inputSeatNumModel').modal('toggle');
            // alert('请输入座位号');
            return;
        }
        if (!phoneNum) {
            $('#inputPhoneNumModel').modal('toggle');
            // alert('请输入手机号');
            return;
        }
        $('#loading').removeClass('invisible');
    	$.ajax({
            type: 'POST',
            url: '/api/sendmail',
            contentType: 'application/json',
            data: JSON.stringify({
            	item_id: selectedItem,
            	seat_num: seatNum
            }),
            success: submitSuccess,
            error: submitError,
            dataType: 'json',
        });
    });

    $("#success_ok_btn").click(function(){
        $('#order_success').addClass('invisible');
    });

    $("#fail_ok_btn").click(function(){
        $('#order_fail').addClass('invisible');
    });

    $.ajax({
        type: 'GET',
        url: '/api/getlist',
        success: getListSuccess,
        error: getListError,
    }); 

    function getListSuccess(data) {
        if (!data || data.length == 0) {
            return;
        }
        var items = data.items;
        Object.keys(items).forEach(function(key) {
            if (items[key]) { // sold out
                $('#' + key + ' .sold_out').removeClass('invisible');
                $('#' + key).addClass('is_sold_out');
            }
        });
    }

    function getListError(xhr, status, error){
        console.log('get list error');
    }

    function submitSuccess(data) {
        $('#loading').addClass('invisible');
        console.log("submit success");
        $('#order_success').removeClass('invisible');
    }

    function submitError(xhr, status, error) {
        $('#loading').addClass('invisible');
        console.log("submit error: " + error);
        $('#order_fail').removeClass('invisible');
    }
});