//game ops
var count = 0;
var script = [
				{su_score:"37", duke_score:"33", ticker:"ticker4"},
				{su_score:"38", duke_score:"33", ticker:"ticker3"},
				{su_score:"38", duke_score:"35", ticker:"ticker2"},
				{su_score:"38", duke_score:"35", ticker:"ticker1"}
				];
				
$(document).ready(function(){

		Reactor.onMessage(function(message){
			var b = message.body;
			
			b = b.replace('#{clientmessage}', "Syracuse-38, Duke-35");
			$('#content').html(b);
			$('#content').show();
		});
		
		window.setInterval(function() {
			if (count == 3){
				$('#su-score').html(script[0].su_score);
				$('#duke-score').html(script[0].duke_score);
				$('#' + script[0].ticker).show("fast");
			}
			if (count == 8){
				$('#su-score').html(script[1].su_score);
				$('#duke-score').html(script[1].duke_score);
				$('#' + script[1].ticker).show("fast");
			}
			if (count == 13){
				$('#su-score').html(script[2].su_score);
				$('#duke-score').html(script[2].duke_score);
				$('#' + script[2].ticker).show("fast");
			}			
			if (count == 20){
				$('#su-score').html(script[3].su_score);
				$('#duke-score').html(script[3].duke_score);
				$('#' + script[3].ticker).show("fast");
				
				//Now send a notification to reactor
				Reactor.reset();
								
				Reactor.Client.setAttribute("game", "ncaa");
				Reactor.Client.setAttribute("half", "first");
						
				var newPage = new Reactor.Event("PAGE_VIEW", function(message){
					
				});
				Reactor.EventManager.fireEvent(newPage);			
				
			}			
			if (count==30){
				$('#content').hide("fast");
				$('#su-score').html("36");
				$('#duke-score').html("33");
				$('#ticker1').hide();
				$('#ticker2').hide();
				$('#ticker3').hide();
				$('#ticker4').hide();
				
			}
			count++;
		}, 1000);
		
		$('#content').click(function(){
			$(this).hide();
			$('#su-score').html("36");
			$('#duke-score').html("33");
			$('#ticker1').hide();
			$('#ticker2').hide();
			$('#ticker3').hide();
			$('#ticker4').hide();
			
		});
});