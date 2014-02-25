//game ops
var count = 0;
var t_idx = 0;
var timing = [1,2,3,8,13,20,100];
var script = [
				{su_score:"37", duke_score:"33", ticker:"ticker4", event:"SU: Jerami Grant Defensive Rebound.", data:"rebound"},
				{su_score:"37", duke_score:"33", ticker:"ticker4", event:"Duke: Foul on Andre Dawkins.", data:"foul"},
				{su_score:"37", duke_score:"33", ticker:"ticker4", event:"SU: Jerami Grant made Free Throw.", data:"score"},
				{su_score:"38", duke_score:"33", ticker:"ticker3", event:"SU: Jerami Grant made Free Throw.", data:"score"},
				{su_score:"38", duke_score:"35", ticker:"ticker2", event:"Duke: Amile Jefferson made Dunk. Assisted by Rasheed Sulaimon.",data:"score"},
				{su_score:"38", duke_score:"35", ticker:"ticker1", event:"<p style='text-align:center'><b>End of first half</b></p>",data:"halftime"},
				{su_score:"38", duke_score:"35", ticker:"ticker1", event:"",data:"clear"}
				];
				
$(document).ready(function(){

		$(".ui-loader").hide();
		
		Reactor.ready(function(){
			Reactor.start();
			
			Reactor.onMessage(function(message){
				var b = message.body;
				
				b = b.replace('#{clientmessage}', "Syracuse-38, Duke-35");
				$('#content').html(b);
				$('#content').show();
			});
		});
		
		window.setInterval(function() {
			$(".ui-loader").hide();
			
			if (timing[t_idx] == count){
				
				if (script[t_idx].data == "clear"){
					$('#content').hide("fast");
					$('#su-score').html("");
					$('#duke-score').html("");
					$('.ticker').hide();				
				}else{
					$("#tickerblock div:first-child").before("<div id='ticker" + t_idx + "' class='ticker'>" + script[t_idx].event + "</div");
					$('#su-score').html(script[t_idx].su_score);
					$('#duke-score').html(script[t_idx].duke_score);
				
					if (script[t_idx].data == "halftime"){

						//Now send a notification to reactor
						Reactor.reset();
										
						Reactor.Client.setAttribute("game", "ncaa");
						Reactor.Client.setAttribute("half", "first");
								
						var newPage = new Reactor.Event("PAGE_VIEW", function(message){
							
						});
						Reactor.EventManager.fireEvent(newPage);			
					
					}
				}
				t_idx++;
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