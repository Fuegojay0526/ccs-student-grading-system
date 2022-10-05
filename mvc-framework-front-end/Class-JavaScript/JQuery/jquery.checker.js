(function($){

    $.check = {
                inputs: function(fields) { 
					       for (var cnt = 0; cnt < fields.length; cnt++) {
								 if ($.trim($("#" + fields[cnt]).val())=== "") {
									 return fields[cnt];
									}
							 }return "";
                        } 
             };
	 
})(jQuery);