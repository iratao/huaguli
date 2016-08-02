$(function() {
	var activeItem = undefined;
    $(".flower_item").click(function(event){
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
            alert('please select an item');
            return;
        }
        if (!seatNum) {
            alert('please give your seat number');
            return;
        }
        if (!phoneNum) {
            alert('please give your phone number');
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