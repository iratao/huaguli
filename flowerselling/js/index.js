$(function() {
	var activeItem = undefined;
    $(".flower_item").click(function(event){
    	if (activeItem) {
    		activeItem.removeClass("active");
    	}
    	$(this).addClass("active");
    	activeItem = $(this);
    })
});