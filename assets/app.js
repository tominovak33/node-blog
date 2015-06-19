angular.module("app",["ngRoute"]),angular.module("app").controller("ApplicationCtrl",["$scope","$rootScope","UserSvc",function(o,n,t){window.localStorage.token&&t.getUser().then(function(n){o.$emit("userLoggedIn",n.data)}),o.$on("userLoggedIn",function(n,t){o.currentUser=t}),o.$on("$viewContentLoaded",function(){CKEDITOR.replace("editor1")})}]),angular.module("app").controller("LoginCtrl",["$scope","UserSvc",function(o,n){o.login=function(t,e){n.login(t,e).then(function(n){o.$emit("userLoggedIn",n.data)},function(n){o.loginValidation="Incorrect username & password combination"})}}]),angular.module("app").controller("PostsCtrl",["$scope","$http","PostsService",function(o,n,t){o.addPost=function(){o.postBody&&t.send({username:"tomi",body:CKEDITOR.instances.editor1.getData()}).success(function(n){o.postBody=null})},o.$on("ws:new_post",function(n,t){o.$apply(function(){o.posts.unshift(t)})}),t.get().success(function(n){o.posts=n})}]),angular.module("app").service("PostsService",["$http",function(o){this.get=function(){return o.get("/api/posts")},this.send=function(n){return o.post("/api/posts",n)}}]),angular.module("app").controller("RegisterCtrl",["$scope","UserSvc",function(o,n){o.register=function(t,e,r){return e!=r?void(o.validationMessage="Your passwords did not match."):void n.register(t,e)}}]),angular.module("app").config(["$routeProvider",function(o){o.when("/",{controller:"PostsCtrl",templateUrl:"posts.html"}).when("/register",{controller:"RegisterCtrl",templateUrl:"register.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"login.html"})}]),angular.module("app").service("UserSvc",["$http",function(o){var n=this;n.getUser=function(){return o.defaults.headers.common["X-Auth"]=window.localStorage.token,o.get("/api/users").then(function(o){return console.log(o),o.data})},n.login=function(t,e){return o.post("/api/sessions",{username:t,password:e}).then(function(t){return window.localStorage.token=t.data,o.defaults.headers.common["X-Auth"]=t.data,n.getUser()})},n.register=function(t,e,r){return o.post("/api/users",{username:t,password:e}).then(function(o){return n.login(t,e).then(function(){window.location.href="/"})})},n.logout=function(){window.localStorage.removeItem("token")}}]),angular.module("app").run(["$rootScope","$timeout","$window",function(o,n,t){!function e(){var r="ws://"+t.location.host,s=new WebSocket(r);s.onopen=function(){console.log("Websocket connected")},s.onclose=function(o){console.log("Websocket closed. Trying to reconnect..."),n(e,1e4)},s.onmessage=function(n){console.log(n);var t=JSON.parse(n.data),e="ws:"+t.topic,r=t.data;console.log("broadcasting: "),o.$broadcast(e,r)}}()}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uQ3RybC5qcyIsImxvZ2luQ3J0bC5qcyIsInBvc3RzQ3RybC5qcyIsInBvc3RzU2VydmljZS5qcyIsInJlZ2lzdHJhdGlvbkN0cmwuanMiLCJyb3V0ZXMuanMiLCJ1c2VyU2VydmljZS5qcyIsIndlYnNvY2tldHMuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCIkcm9vdFNjb3BlIiwiVXNlclN2YyIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsInRva2VuIiwiZ2V0VXNlciIsInRoZW4iLCJyZXNwb25zZSIsIiRlbWl0IiwiZGF0YSIsIiRvbiIsImV2ZW50IiwidXNlciIsImN1cnJlbnRVc2VyIiwiQ0tFRElUT1IiLCJyZXBsYWNlIiwibG9naW4iLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiZXJyb3IiLCJsb2dpblZhbGlkYXRpb24iLCIkaHR0cCIsIlBvc3RzU2VydmljZSIsImFkZFBvc3QiLCJwb3N0Qm9keSIsInNlbmQiLCJib2R5IiwiaW5zdGFuY2VzIiwiZWRpdG9yMSIsImdldERhdGEiLCJzdWNjZXNzIiwicG9zdCIsIl8iLCIkYXBwbHkiLCJwb3N0cyIsInVuc2hpZnQiLCJnZXQiLCJzZXJ2aWNlIiwidGhpcyIsInJlZ2lzdGVyIiwicGFzc3dvcmRfY29uZmlybSIsInZhbGlkYXRpb25NZXNzYWdlIiwiY29uZmlnIiwiJHJvdXRlUHJvdmlkZXIiLCJ3aGVuIiwidGVtcGxhdGVVcmwiLCJzdmMiLCJkZWZhdWx0cyIsImhlYWRlcnMiLCJjb21tb24iLCJjb25zb2xlIiwibG9nIiwidmFsIiwibG9jYXRpb24iLCJocmVmIiwibG9nb3V0IiwicmVtb3ZlSXRlbSIsInJ1biIsIiR0aW1lb3V0IiwiJHdpbmRvdyIsImNvbm5lY3QiLCJob3N0IiwiY29ubmVjdGlvbiIsIldlYlNvY2tldCIsIm9ub3BlbiIsIm9uY2xvc2UiLCJlIiwib25tZXNzYWdlIiwibWVzc2Fn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R0FBQTlCLE1BQUFDLEVBQUFDLEdBQ0FaLEtBQUEsV0FDQUosT0FBQW1ELFNBQUFDLEtBQUEsU0FJQVIsRUFBQVMsT0FBQSxXQUNBckQsT0FBQUMsYUFBQXFELFdBQUEsYUNqQ0E1RCxRQUFBQyxPQUFBLE9BQ0E0RCxLQUFBLGFBQUEsV0FBQSxVQUFBLFNBQUF6RCxFQUFBMEQsRUFBQUMsSUFFQSxRQUFBQyxLQUVBLEdBQUFDLEdBQUEsUUFBQUYsRUFBQU4sU0FBQVEsS0FFQUMsRUFBQSxHQUFBQyxXQUFBRixFQUVBQyxHQUFBRSxPQUFBLFdBQ0FkLFFBQUFDLElBQUEsd0JBSUFXLEVBQUFHLFFBQUEsU0FBQUMsR0FDQWhCLFFBQUFDLElBQUEsNENBQ0FPLEVBQUFFLEVBQUEsTUFHQUUsRUFBQUssVUFBQSxTQUFBRCxHQUNBaEIsUUFBQUMsSUFBQWUsRUFDQSxJQUFBRSxHQUFBQyxLQUFBQyxNQUFBSixFQUFBekQsTUFFQThELEVBQUEsTUFBQUgsRUFBQUksTUFDQS9ELEVBQUEyRCxFQUFBM0QsSUFDQXlDLFNBQUFDLElBQUEsa0JBRUFuRCxFQUFBeUUsV0FBQUYsRUFBQTlEIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vVGhpcyBmaWxlIG11c3QgYmUgdGhlIGZpcnN0IGluIHRoZSBsaXN0IHRvIGJlIGNvbmNhdGVuYXRlZFxuYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnbmdSb3V0ZSddKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuY29udHJvbGxlcignQXBwbGljYXRpb25DdHJsJyAsIFtcIiRzY29wZVwiLCBcIiRyb290U2NvcGVcIiwgXCJVc2VyU3ZjXCIsIGZ1bmN0aW9uICgkc2NvcGUsICRyb290U2NvcGUsIFVzZXJTdmMpIHtcblx0XHQvKlxuXHRcdElmIHdlIGhhdmUgYSBzdG9yZWQgdG9rZW4sIGdldCB0aGUgdXNlciBpbmZvcm1hdGlvbiBmcm9tIGl0XG5cdFx0YW5kIGVtaXQgdGhlIHVzZXIgbG9nZ2VkaW4gbWVzc2FnZXMgaW4gb3JkZXIgdG8gYWxsb3cgdGhlIFVJIHRvIFxuXHRcdGluZGljYXRlIHRvIHRoZSB1c2VyIHRoYXQgdGhleSB3ZXJlIGxvZ2dlZCBpblxuXHRcdCovXG5cdFx0XG5cdFx0aWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UudG9rZW4pIHtcblx0XHRcdFVzZXJTdmMuZ2V0VXNlcigpXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSl7XG5cdFx0XHRcdFx0JHNjb3BlLiRlbWl0KCd1c2VyTG9nZ2VkSW4nLCByZXNwb25zZS5kYXRhKTtcblx0XHRcdFx0fSlcblx0XHR9XG5cblx0XHQkc2NvcGUuJG9uKCd1c2VyTG9nZ2VkSW4nLCBmdW5jdGlvbihldmVudCwgdXNlcikge1xuXHRcdFx0JHNjb3BlLmN1cnJlbnRVc2VyID0gdXNlcjtcblx0XHR9KVxuXG5cdFx0JHNjb3BlLiRvbignJHZpZXdDb250ZW50TG9hZGVkJywgZnVuY3Rpb24oKXtcblx0XHRcdC8vdGhlIHBhZ2UgaXMgcmVhZHlcbiAgICAgICAgICAgIENLRURJVE9SLnJlcGxhY2UoJ2VkaXRvcjEnKTtcblx0XHR9KTtcblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5jb250cm9sbGVyKCdMb2dpbkN0cmwnICwgW1wiJHNjb3BlXCIgLCBcIlVzZXJTdmNcIiAsIGZ1bmN0aW9uICgkc2NvcGUsIFVzZXJTdmMpIHtcblx0XHQkc2NvcGUubG9naW4gPSBmdW5jdGlvbiAodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG5cdFx0XHRVc2VyU3ZjLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZClcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKXtcblx0XHRcdFx0XHQkc2NvcGUuJGVtaXQoJ3VzZXJMb2dnZWRJbicsIHJlc3BvbnNlLmRhdGEpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmdW5jdGlvbihlcnJvcil7XG5cdFx0XHRcdCAgJHNjb3BlLmxvZ2luVmFsaWRhdGlvbiA9ICdJbmNvcnJlY3QgdXNlcm5hbWUgJiBwYXNzd29yZCBjb21iaW5hdGlvbic7XG5cdFx0XHRcdH0pXG5cdFx0fVxuXHR9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LmNvbnRyb2xsZXIoJ1Bvc3RzQ3RybCcsIFtcIiRzY29wZVwiICwgXCIkaHR0cFwiLCBcIlBvc3RzU2VydmljZVwiLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCwgUG9zdHNTZXJ2aWNlKSB7XG5cdFx0JHNjb3BlLmFkZFBvc3QgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoJHNjb3BlLnBvc3RCb2R5KSB7XG5cdFx0XHRcdFBvc3RzU2VydmljZS5zZW5kKHtcblx0XHRcdFx0XHR1c2VybmFtZTogJ3RvbWknLFxuXHRcdFx0XHRcdGJvZHk6IENLRURJVE9SLmluc3RhbmNlcy5lZGl0b3IxLmdldERhdGEoKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuc3VjY2VzcyhmdW5jdGlvbiAocG9zdCkge1xuXHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0Ly9SZW1vdmVkIGFzIHdlYnNvY2tldCBicm9hZGNhc3Qgd291bGQgY2F1c2UgdGhlIHBvc3QgdG8gYXBwZWFyIGR1cGxpY2F0ZWQgb24gdGhlIGJyb3dzZXIgdGhhdCBpdCB3YXMgcG9zdGVkIGZyb20gXG5cdFx0XHRcdFx0Ly9hcyBib3RoIG9mIHRoZSBmdW5jdGlvbnMgd291bGQgZ2V0IGV4ZWN1dGVkIGJlY2F1c2UgdGhlIGNsaWVudCB3aG8gc2VuZHMgdGhlIHBvc3Qgd291bGQgc3RpbGwgcmVjaWV2ZSB0aGUgd2Vic29ja2V0cyBicm9hZGNhc3QgYmFjayBmcm9tIHRoZSBzZXJ2ZXIgIFxuXHRcdFx0XHRcdCovXG5cdFx0XHRcdFx0Ly8kc2NvcGUucG9zdHMudW5zaGlmdChwb3N0KTsgXG5cdFx0XHRcdFx0JHNjb3BlLnBvc3RCb2R5ID0gbnVsbDtcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9XG5cblx0XHQkc2NvcGUuJG9uKCd3czpuZXdfcG9zdCcsIGZ1bmN0aW9uKF8sIHBvc3QpIHtcblx0XHRcdCRzY29wZS4kYXBwbHkoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkc2NvcGUucG9zdHMudW5zaGlmdChwb3N0KTtcblx0XHRcdH0pXG5cdFx0fSlcblxuXHRQb3N0c1NlcnZpY2UuZ2V0KClcblx0XHQuc3VjY2VzcyhmdW5jdGlvbiAocG9zdHMpIHtcblx0XHRcdCRzY29wZS5wb3N0cyA9IHBvc3RzO1xuXHRcdH0pXG5cblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5zZXJ2aWNlKCdQb3N0c1NlcnZpY2UnLCBbXCIkaHR0cFwiICwgZnVuY3Rpb24gKCRodHRwKSB7XG5cdFx0dGhpcy5nZXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3Bvc3RzJyk7XG5cdFx0fVxuXHRcdHRoaXMuc2VuZCA9IGZ1bmN0aW9uIChwb3N0KSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9wb3N0cycsIHBvc3QpO1xuXHRcdH1cblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnICwgW1wiJHNjb3BlXCIgLCBcIlVzZXJTdmNcIiAsIGZ1bmN0aW9uICgkc2NvcGUsIFVzZXJTdmMpIHtcblx0XHQkc2NvcGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAodXNlcm5hbWUsIHBhc3N3b3JkLCBwYXNzd29yZF9jb25maXJtKSB7XG5cdFx0XHRpZiAocGFzc3dvcmQgIT0gcGFzc3dvcmRfY29uZmlybSkge1xuXHRcdFx0XHQkc2NvcGUudmFsaWRhdGlvbk1lc3NhZ2UgPSAnWW91ciBwYXNzd29yZHMgZGlkIG5vdCBtYXRjaC4nO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRVc2VyU3ZjLnJlZ2lzdGVyKHVzZXJuYW1lLCBwYXNzd29yZClcblx0XHR9XG5cdH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuY29uZmlnKFtcIiRyb3V0ZVByb3ZpZGVyXCIgLGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xuXHRcdCRyb3V0ZVByb3ZpZGVyXG5cdFx0XHQud2hlbignLycgLCB7Y29udHJvbGxlcjogJ1Bvc3RzQ3RybCcsIHRlbXBsYXRlVXJsOiAncG9zdHMuaHRtbCd9KVxuXHRcdFx0LndoZW4oJy9yZWdpc3RlcicgLCB7Y29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCcsIHRlbXBsYXRlVXJsOiAncmVnaXN0ZXIuaHRtbCd9KVxuXHRcdFx0LndoZW4oJy9sb2dpbicgLCB7Y29udHJvbGxlcjogJ0xvZ2luQ3RybCcsIHRlbXBsYXRlVXJsOiAnbG9naW4uaHRtbCd9KVxuXHR9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LnNlcnZpY2UoJ1VzZXJTdmMnLCBbXCIkaHR0cFwiLCBmdW5jdGlvbigkaHR0cCkge1xuXHRcdHZhciBzdmMgPSB0aGlzO1xuXHRcdHN2Yy5nZXRVc2VyID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0JGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ1gtQXV0aCddID0gd2luZG93LmxvY2FsU3RvcmFnZS50b2tlblxuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnL2FwaS91c2VycycpXG5cdFx0XHQudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcdFx0Y29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgXHRcdFx0cmV0dXJuIHJlc3BvbnNlLmRhdGFcbiAgICBcdFx0fSlcblx0XHR9XG5cdFx0c3ZjLmxvZ2luID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuXHRcdFx0cmV0dXJuICRodHRwLnBvc3QoJy9hcGkvc2Vzc2lvbnMnLCB7XG5cdFx0XHRcdHVzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkXG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oZnVuY3Rpb24gKHZhbCkge1xuXHRcdFx0XHR3aW5kb3cubG9jYWxTdG9yYWdlLnRva2VuID0gdmFsLmRhdGE7XG5cdFx0XHRcdCRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLUF1dGgnXSA9IHZhbC5kYXRhXG5cdFx0XHRcdHJldHVybiBzdmMuZ2V0VXNlcigpO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0c3ZjLnJlZ2lzdGVyID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBwYXNzd29yZCwgcGFzc3dvcmRfY29uZmlybSkge1xuXHRcdFx0cmV0dXJuICRodHRwLnBvc3QoJy9hcGkvdXNlcnMnLCB7XG5cdFx0XHRcdHVzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkXG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oZnVuY3Rpb24gKHZhbCkge1xuXHRcdFx0XHRyZXR1cm4gc3ZjLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZClcblx0XHRcdFx0XHQudGhlbihmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWY9ICcvJztcdFxuXHRcdFx0XHRcdH0pXG5cdFx0XHR9KVxuXHRcdH1cblx0XHRzdmMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0d2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0b2tlbicpO1xuXHRcdH1cblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4ucnVuKFtcIiRyb290U2NvcGVcIiwgXCIkdGltZW91dFwiICwgXCIkd2luZG93XCIgLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHRpbWVvdXQsICR3aW5kb3cpIHtcblx0XG5cdChmdW5jdGlvbiBjb25uZWN0KCl7XG5cdFx0Ly9DcmVhdGUgYSB3ZWJzb2NrZXQgY29ubmVjdGlvbiB3aXRoIHRoZSBzZXJ2ZXJcblx0XHR2YXIgaG9zdCA9IFwid3M6Ly9cIiArICR3aW5kb3cubG9jYXRpb24uaG9zdFxuXHRcdCAgXG5cdFx0dmFyIGNvbm5lY3Rpb24gPSBuZXcgV2ViU29ja2V0KGhvc3QpXG5cblx0XHRjb25uZWN0aW9uLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdXZWJzb2NrZXQgY29ubmVjdGVkJylcblx0XHR9XG5cblxuXHRcdGNvbm5lY3Rpb24ub25jbG9zZSA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnV2Vic29ja2V0IGNsb3NlZC4gVHJ5aW5nIHRvIHJlY29ubmVjdC4uLicpXG5cdFx0XHQkdGltZW91dChjb25uZWN0LCAxMCoxMDAwKTtcblx0XHR9IFxuXG5cdFx0Y29ubmVjdGlvbi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0Y29uc29sZS5sb2coZSk7XG5cdFx0XHR2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcblx0XHRcdFxuXHRcdFx0dmFyIG5hbWUgPSAnd3M6JyArIG1lc3NhZ2UudG9waWM7XG5cdFx0XHR2YXIgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcblx0XHRcdGNvbnNvbGUubG9nKFwiYnJvYWRjYXN0aW5nOiBcIik7XG5cblx0XHRcdCRyb290U2NvcGUuJGJyb2FkY2FzdChuYW1lLCBkYXRhKTtcblx0XHR9XG5cdH0pKClcbn1dKSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==