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
        $('#loading').removeClass('invisible');
    	var selectedItem = $(".flower_item.active").attr("data-value");
    	var seatNum = $("#seat_number").val();
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

    function submitSuccess(data) {
        $('#loading').addClass('invisible');
        console.log("submit success");
    }

    function submitError(xhr, status, error) {
        $('#loading').addClass('invisible');
        console.log("submit error: " + error);
    }
});