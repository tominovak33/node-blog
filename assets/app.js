angular.module("app",["ngRoute","ngAnimate"]),angular.module("app").controller("ApplicationCtrl",["$scope","$rootScope","UserSvc",function(t,e,n){window.localStorage.token&&n.getUser().then(function(e){t.$emit("userLoggedIn",e.data)}),t.$on("userLoggedIn",function(e,n){t.currentUser=n})}]),angular.module("app").controller("LoginCtrl",["$scope","UserSvc",function(t,e){t.login=function(n,o){e.login(n,o).then(function(e){t.$emit("userLoggedIn",e.data),window.location.href="#/"},function(e){t.loginValidation="Incorrect username & password combination"})},t.logout=function(){e.logout()}}]),angular.module("app").controller("PostsCtrl",["$scope","$http","PostsService","filterFilter",function(t,e,n,o){t.posts=[],t.addPost=function(){var e=CKEDITOR.instances.editor1.getData();e&&n.send({body:e,title:t.postTitle}).success(function(e){t.postBody=null,CKEDITOR.instances.editor1.setData(""),t.postTitle=null})},t.init_ckedit=function(){CKEDITOR.replace("editor1")},t.$on("ws:new_post",function(e,n){n=n[0],t.$apply(function(){t.posts.unshift(n),t.paginate()})}),t.$on("$viewContentLoaded",function(){}),t.currentPage=1,t.postsPerPage=5,t.prevPage=function(){t.currentPage>1&&t.currentPage--},t.nextPage=function(){t.currentPage<t.posts.length/t.postsPerPage&&t.currentPage++},t.setPage=function(e){t.currentPage=e},t.range=function(t){return new Array(t)},t.currentPage=1,t.postsPerPage=5,t.$watch("search",function(e){t.filteredPosts=o(t.posts,e),t.paginate(t.filteredPosts.length)},!0),t.paginate=function(e){t.numberOfPages=Math.ceil(e>0?e/t.postsPerPage:t.posts.length/t.postsPerPage)},n.get().success(function(e){t.posts=e,t.paginate(t.posts.length)})}]).filter("output_html",["$sce",function(t){return function(e){return t.trustAsHtml(e)}}]).filter("startFrom",function(){return function(t,e){return t?(e=+e,t.slice(e)):[]}}),angular.module("app").service("PostsService",["$http",function(t){this.get=function(){return t.get("/api/posts")},this.send=function(e){return t.post("/api/posts",e)}}]),angular.module("app").controller("RegisterCtrl",["$scope","UserSvc",function(t,e){t.register=function(n,o,r){return o!=r?void(t.validationMessage="Your passwords did not match."):void e.register(n,o)}}]),angular.module("app").config(["$routeProvider",function(t){t.when("/",{controller:"PostsCtrl",templateUrl:"posts.html"}).when("/register",{controller:"RegisterCtrl",templateUrl:"register.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"login.html"}).when("/logout",{controller:"LoginCtrl",templateUrl:"logout.html"})}]),angular.module("app").service("UserSvc",["$http",function(t){var e=this;e.getUser=function(){return t.defaults.headers.common["X-Auth"]=window.localStorage.token,t.get("/api/users").then(function(t){return t})},e.login=function(n,o){return t.post("/api/sessions",{username:n,password:o}).then(function(n){return window.localStorage.token=n.data,t.defaults.headers.common["X-Auth"]=n.data,e.getUser()})},e.register=function(n,o,r){return t.post("/api/users",{username:n,password:o}).then(function(t){return e.login(n,o).then(function(){window.location.href="/"})})},e.logout=function(){window.localStorage.removeItem("token"),window.location.href="/"}}]),angular.module("app").run(["$rootScope","$timeout","$window",function(t,e,n){!function o(){var r="ws://"+n.location.host,s=new WebSocket(r);s.onopen=function(){},s.onclose=function(t){e(o,1e4)},s.onmessage=function(e){var n=JSON.parse(e.data),o="ws:"+n.topic,r=n.data;t.$broadcast(o,r)}}()}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uQ3RybC5qcyIsImxvZ2luQ3J0bC5qcyIsInBvc3RzQ3RybC5qcyIsInBvc3RzU2VydmljZS5qcyIsInJlZ2lzdHJhdGlvbkN0cmwuanMiLCJyb3V0ZXMuanMiLCJ1c2VyU2VydmljZS5qcyIsIndlYnNvY2tldHMuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCIkcm9vdFNjb3BlIiwiVXNlclN2YyIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsInRva2VuIiwiZ2V0VXNlciIsInRoZW4iLCJyZXNwb25zZSIsIiRlbWl0IiwiZGF0YSIsIiRvbiIsImV2ZW50IiwidXNlciIsImN1cnJlbnRVc2VyIiwibG9naW4iLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwibG9jYXRpb24iLCJocmVmIiwiZXJyb3IiLCJsb2dpblZhbGlkYXRpb24iLCJsb2dvdXQiLCIkaHR0cCIsIlBvc3RzU2VydmljZSIsImZpbHRlckZpbHRlciIsInBvc3RzIiwiYWRkUG9zdCIsImNrZWRpdG9yX2NvbnRlbnQiLCJDS0VESVRPUiIsImluc3RhbmNlcyIsImVkaXRvcjEiLCJnZXREYXRhIiwic2VuZCIsImJvZHkiLCJ0aXRsZSIsInBvc3RUaXRsZSIsInN1Y2Nlc3MiLCJwb3N0IiwicG9zdEJvZHkiLCJzZXREYXRhIiwiaW5pdF9ja2VkaXQiLCJyZXBsYWNlIiwiXyIsIiRhcHBseSIsInVuc2hpZnQiLCJwYWdpbmF0ZSIsImN1cnJlbnRQYWdlIiwicG9zdHNQZXJQYWdlIiwicHJldlBhZ2UiLCJuZXh0UGFnZSIsImxlbmd0aCIsInNldFBhZ2UiLCJwYWdlX251bWJlciIsInJhbmdlIiwibiIsIkFycmF5IiwiJHdhdGNoIiwidGVybSIsImZpbHRlcmVkUG9zdHMiLCJudW1iZXJfb2ZfaXRlbXMiLCJudW1iZXJPZlBhZ2VzIiwiTWF0aCIsImNlaWwiLCJnZXQiLCJmaWx0ZXIiLCIkc2NlIiwidmFsIiwidHJ1c3RBc0h0bWwiLCJpbnB1dCIsInN0YXJ0Iiwic2xpY2UiLCJzZXJ2aWNlIiwidGhpcyIsInJlZ2lzdGVyIiwicGFzc3dvcmRfY29uZmlybSIsInZhbGlkYXRpb25NZXNzYWdlIiwiY29uZmlnIiwiJHJvdXRlUHJvdmlkZXIiLCJ3aGVuIiwidGVtcGxhdGVVcmwiLCJzdmMiLCJkZWZhdWx0cyIsImhlYWRlcnMiLCJjb21tb24iLCJyZW1vdmVJdGVtIiwicnVuIiwiJHRpbWVvdXQiLCIkd2luZG93IiwiY29ubmVjdCIsImhvc3QiLCJjb25uZWN0aW9uIiwiV2ViU29ja2V0Iiwib25vcGVuIiwib25jbG9zZSIsImUiLCJvbm1lc3NhZ2UiLCJtZXNzYWdlIiwiSlNPTiIsInBhcnNlIiwibmFtZSIsInRvcGljIiwiJGJyb2FkY2FzdCJdLCJtYXBwaW5ncyI6IkFBQ0FBLFFBQUFDLE9BQUEsT0FBQSxVQUFBLGNDREFELFFBQUFDLE9BQUEsT0FDQUMsV0FBQSxtQkFBQSxTQUFBLGFBQUEsVUFBQSxTQUFBQyxFQUFBQyxFQUFBQyxHQU9BQyxPQUFBQyxhQUFBQyxPQUNBSCxFQUFBSSxVQUNBQyxLQUFBLFNBQUFDLEdBQ0FSLEVBQUFTLE1BQUEsZUFBQUQsRUFBQUUsUUFJQVYsRUFBQVcsSUFBQSxlQUFBLFNBQUFDLEVBQUFDLEdBQ0FiLEVBQUFjLFlBQUFELE9DaEJBaEIsUUFBQUMsT0FBQSxPQUNBQyxXQUFBLGFBQUEsU0FBQSxVQUFBLFNBQUFDLEVBQUFFLEdBQ0FGLEVBQUFlLE1BQUEsU0FBQUMsRUFBQUMsR0FDQWYsRUFBQWEsTUFBQUMsRUFBQUMsR0FDQVYsS0FBQSxTQUFBQyxHQUNBUixFQUFBUyxNQUFBLGVBQUFELEVBQUFFLE1BQ0FQLE9BQUFlLFNBQUFDLEtBQUEsTUFFQSxTQUFBQyxHQUNBcEIsRUFBQXFCLGdCQUFBLCtDQUtBckIsRUFBQXNCLE9BQUEsV0FDQXBCLEVBQUFvQixhQ2ZBekIsUUFBQUMsT0FBQSxPQUNBQyxXQUFBLGFBQUEsU0FBQSxRQUFBLGVBQUEsZUFBQSxTQUFBQyxFQUFB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QUEsY0FDQXpELEtBQUEsU0FBQUMsR0FDQSxNQUFBQSxNQUdBeUUsRUFBQWxFLE1BQUEsU0FBQUMsRUFBQUMsR0FDQSxNQUFBTSxHQUFBZSxLQUFBLGlCQUNBdEIsU0FBQUEsRUFBQUMsU0FBQUEsSUFFQVYsS0FBQSxTQUFBNEQsR0FHQSxNQUZBaEUsUUFBQUMsYUFBQUMsTUFBQThELEVBQUF6RCxLQUNBYSxFQUFBMkQsU0FBQUMsUUFBQUMsT0FBQSxVQUFBakIsRUFBQXpELEtBQ0F1RSxFQUFBM0UsYUFHQTJFLEVBQUFQLFNBQUEsU0FBQTFELEVBQUFDLEVBQUEwRCxHQUNBLE1BQUFwRCxHQUFBZSxLQUFBLGNBQ0F0QixTQUFBQSxFQUFBQyxTQUFBQSxJQUVBVixLQUFBLFNBQUE0RCxHQUNBLE1BQUFjLEdBQUFsRSxNQUFBQyxFQUFBQyxHQUNBVixLQUFBLFdBQ0FKLE9BQUFlLFNBQUFDLEtBQUEsU0FJQThELEVBQUEzRCxPQUFBLFdBQ0FuQixPQUFBQyxhQUFBaUYsV0FBQSxTQUNBbEYsT0FBQWUsU0FBQUMsS0FBQSxRQ2pDQXRCLFFBQUFDLE9BQUEsT0FDQXdGLEtBQUEsYUFBQSxXQUFBLFVBQUEsU0FBQXJGLEVBQUFzRixFQUFBQyxJQUVBLFFBQUFDLEtBRUEsR0FBQUMsR0FBQSxRQUFBRixFQUFBdEUsU0FBQXdFLEtBRUFDLEVBQUEsR0FBQUMsV0FBQUYsRUFFQUMsR0FBQUUsT0FBQSxhQUtBRixFQUFBRyxRQUFBLFNBQUFDLEdBRUFSLEVBQUFFLEVBQUEsTUFHQUUsRUFBQUssVUFBQSxTQUFBRCxHQUVBLEdBQUFFLEdBQUFDLEtBQUFDLE1BQUFKLEVBQUFyRixNQUVBMEYsRUFBQSxNQUFBSCxFQUFBSSxNQUNBM0YsRUFBQXVGLEVBQUF2RixJQUdBVCxHQUFBcUcsV0FBQUYsRUFBQTFGIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vVGhpcyBmaWxlIG11c3QgYmUgdGhlIGZpcnN0IGluIHRoZSBsaXN0IHRvIGJlIGNvbmNhdGVuYXRlZFxuYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnbmdSb3V0ZScsICduZ0FuaW1hdGUnXSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LmNvbnRyb2xsZXIoJ0FwcGxpY2F0aW9uQ3RybCcgLCBbXCIkc2NvcGVcIiwgXCIkcm9vdFNjb3BlXCIsIFwiVXNlclN2Y1wiLCBmdW5jdGlvbiAoJHNjb3BlLCAkcm9vdFNjb3BlLCBVc2VyU3ZjKSB7XG5cdFx0Lypcblx0XHRJZiB3ZSBoYXZlIGEgc3RvcmVkIHRva2VuLCBnZXQgdGhlIHVzZXIgaW5mb3JtYXRpb24gZnJvbSBpdFxuXHRcdGFuZCBlbWl0IHRoZSB1c2VyIGxvZ2dlZGluIG1lc3NhZ2VzIGluIG9yZGVyIHRvIGFsbG93IHRoZSBVSSB0byBcblx0XHRpbmRpY2F0ZSB0byB0aGUgdXNlciB0aGF0IHRoZXkgd2VyZSBsb2dnZWQgaW5cblx0XHQqL1xuXHRcdFxuXHRcdGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLnRva2VuKSB7XG5cdFx0XHRVc2VyU3ZjLmdldFVzZXIoKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAocmVzcG9uc2Upe1xuXHRcdFx0XHRcdCRzY29wZS4kZW1pdCgndXNlckxvZ2dlZEluJywgcmVzcG9uc2UuZGF0YSk7XG5cdFx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0JHNjb3BlLiRvbigndXNlckxvZ2dlZEluJywgZnVuY3Rpb24oZXZlbnQsIHVzZXIpIHtcblx0XHRcdCRzY29wZS5jdXJyZW50VXNlciA9IHVzZXI7XG5cdFx0fSlcblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5jb250cm9sbGVyKCdMb2dpbkN0cmwnICwgW1wiJHNjb3BlXCIgLCBcIlVzZXJTdmNcIiAsIGZ1bmN0aW9uICgkc2NvcGUsIFVzZXJTdmMpIHtcblx0XHQkc2NvcGUubG9naW4gPSBmdW5jdGlvbiAodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG5cdFx0XHRVc2VyU3ZjLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZClcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKXtcblx0XHRcdFx0XHQkc2NvcGUuJGVtaXQoJ3VzZXJMb2dnZWRJbicsIHJlc3BvbnNlLmRhdGEpO1xuXHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJyMvJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmdW5jdGlvbihlcnJvcil7XG5cdFx0XHRcdCAgJHNjb3BlLmxvZ2luVmFsaWRhdGlvbiA9ICdJbmNvcnJlY3QgdXNlcm5hbWUgJiBwYXNzd29yZCBjb21iaW5hdGlvbic7XG5cdFx0XHRcdH0pXG5cblx0XHR9XG5cblx0XHQkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0VXNlclN2Yy5sb2dvdXQoKVxuXHRcdH1cblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5jb250cm9sbGVyKCdQb3N0c0N0cmwnLCBbXCIkc2NvcGVcIiAsIFwiJGh0dHBcIiwgXCJQb3N0c1NlcnZpY2VcIiwgXCJmaWx0ZXJGaWx0ZXJcIiwgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHAsIFBvc3RzU2VydmljZSwgZmlsdGVyRmlsdGVyKSB7XG5cdFx0JHNjb3BlLnBvc3RzID0gW107XG5cdFx0JHNjb3BlLmFkZFBvc3QgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgY2tlZGl0b3JfY29udGVudCA9IENLRURJVE9SLmluc3RhbmNlcy5lZGl0b3IxLmdldERhdGEoKTtcblx0XHRcdGlmIChja2VkaXRvcl9jb250ZW50KSB7XG5cdFx0XHRcdFBvc3RzU2VydmljZS5zZW5kKHtcblx0XHRcdFx0XHRib2R5OiBja2VkaXRvcl9jb250ZW50LFxuXHRcdFx0XHRcdHRpdGxlOiAkc2NvcGUucG9zdFRpdGxlXG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5zdWNjZXNzKGZ1bmN0aW9uIChwb3N0KSB7XG5cdFx0XHRcdFx0Lypcblx0XHRcdFx0XHQvL1JlbW92ZWQgYXMgd2Vic29ja2V0IGJyb2FkY2FzdCB3b3VsZCBjYXVzZSB0aGUgcG9zdCB0byBhcHBlYXIgZHVwbGljYXRlZCBvbiB0aGUgYnJvd3NlciB0aGF0IGl0IHdhcyBwb3N0ZWQgZnJvbSBcblx0XHRcdFx0XHQvL2FzIGJvdGggb2YgdGhlIGZ1bmN0aW9ucyB3b3VsZCBnZXQgZXhlY3V0ZWQgYmVjYXVzZSB0aGUgY2xpZW50IHdobyBzZW5kcyB0aGUgcG9zdCB3b3VsZCBzdGlsbCByZWNpZXZlIHRoZSB3ZWJzb2NrZXRzIGJyb2FkY2FzdCBiYWNrIGZyb20gdGhlIHNlcnZlciAgXG5cdFx0XHRcdFx0Ki9cblx0XHRcdFx0XHQvLyRzY29wZS5wb3N0cy51bnNoaWZ0KHBvc3QpOyBcblx0XHRcdFx0XHQkc2NvcGUucG9zdEJvZHkgPSBudWxsO1xuXHRcdFx0XHRcdENLRURJVE9SLmluc3RhbmNlcy5lZGl0b3IxLnNldERhdGEoJycpO1xuXHRcdFx0XHRcdCRzY29wZS5wb3N0VGl0bGUgPSBudWxsO1xuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdCRzY29wZS5pbml0X2NrZWRpdCA9IGZ1bmN0aW9uICgpIHtcblx0XHQgICAgQ0tFRElUT1IucmVwbGFjZSgnZWRpdG9yMScpO1xuXHRcdH1cblxuXHRcdCRzY29wZS4kb24oJ3dzOm5ld19wb3N0JywgZnVuY3Rpb24oXywgcG9zdCkge1xuXHRcdFx0cG9zdCA9IHBvc3RbMF07XG5cdFx0XHQkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JHNjb3BlLnBvc3RzLnVuc2hpZnQocG9zdCk7XG5cdFx0XHRcdCRzY29wZS5wYWdpbmF0ZSgpO1xuXHRcdFx0fSlcblx0XHR9KVxuXG5cdFx0JHNjb3BlLiRvbignJHZpZXdDb250ZW50TG9hZGVkJywgZnVuY3Rpb24oKXtcblx0XHRcdC8vdGhlIHBhZ2UgaXMgcmVhZHlcblx0XHRcdC8vYWxlcnQoXCJmb29cIik7XG5cdFx0fSk7XG5cblx0XHQkc2NvcGUuY3VycmVudFBhZ2UgPSAxO1xuXHRcdCRzY29wZS5wb3N0c1BlclBhZ2UgPSA1O1xuXG5cdFx0JHNjb3BlLnByZXZQYWdlID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICgkc2NvcGUuY3VycmVudFBhZ2UgPiAxKSB7XG5cdCAgICAgICAgICAgICRzY29wZS5jdXJyZW50UGFnZS0tO1xuXHQgICAgICAgICAgICAvLyRzY29wZS5wYWdpbmF0ZSgpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG4gICAgXG5cdCAgICAkc2NvcGUubmV4dFBhZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgaWYgKCRzY29wZS5jdXJyZW50UGFnZSA8ICRzY29wZS5wb3N0cy5sZW5ndGgvJHNjb3BlLnBvc3RzUGVyUGFnZSkge1xuXHQgICAgICAgICAgICAkc2NvcGUuY3VycmVudFBhZ2UrKztcblx0ICAgICAgICAgICAgLy8kc2NvcGUucGFnaW5hdGUoKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgXG5cdCAgICAkc2NvcGUuc2V0UGFnZSA9IGZ1bmN0aW9uIChwYWdlX251bWJlcikge1xuXHQgICAgICAgICRzY29wZS5jdXJyZW50UGFnZSA9IHBhZ2VfbnVtYmVyO1xuXHQgICAgICAgIC8vJHNjb3BlLnBhZ2luYXRlKCk7XG5cdCAgICB9O1xuXG5cdCAgICAvL1RoaXMgd2F5IEkgY2FuIGRvOiAgXCI8bGkgbmctcmVwZWF0PVwibiBpbiByYW5nZShwYWdlcykgdHJhY2sgYnkgJGluZGV4XCI+XCIgYW5kIHNvIEkgY2FuIGRpc3BsYXkgYXMgbWFueSBpdGVtcyBhcyB0aGUgdmFsdWUgb2YgYSBudW1iZXIgYXMgdGhpcyByZXR1cm5zIGFuIGFycmF5IG9mIHRoYXQgbGVuZ2h0XG5cdCAgICAkc2NvcGUucmFuZ2UgPSBmdW5jdGlvbihuKSB7XG4gICAgICAgIFx0cmV0dXJuIG5ldyBBcnJheShuKTtcbiAgICBcdH07XG5cblx0ICAgICRzY29wZS5jdXJyZW50UGFnZSA9IDE7IC8vY3VycmVudCBwYWdlXG5cdCAgICAkc2NvcGUucG9zdHNQZXJQYWdlID0gNTsgLy9tYXggcm93cyBmb3IgZGF0YSB0YWJsZVxuXHQgICAgXG5cdCAgICAvL3dhdGNoIHRvIHNlZSBpZiBzZWFyY2hpbmcgYW5kIHJlcGFnaW5hdGUgaWYgd2UgYXJlXG5cdCAgICAvL3RydWUgYXQgdGhlIGVuZCAgbWFnaWNhbGx5IG1ha2VzIGl0IHNvIHRoYXQgYXMgZWFjaCBleHRyYSBsZXR0ZXIgaXMgYWRkZWQgdG8gdGhlIHNlYXJjaCB3ZSBjYW4gcmVwYWdpbmF0ZVxuXHQgICAgLy93aXRob3V0IHRoZSAndHJ1ZScgaXQgb25seSBkaWQgIHRoYXRcblx0ICAgICRzY29wZS4kd2F0Y2goJ3NlYXJjaCcsIGZ1bmN0aW9uKHRlcm0pIHtcblx0ICAgICAgICAkc2NvcGUuZmlsdGVyZWRQb3N0cyA9IGZpbHRlckZpbHRlcigkc2NvcGUucG9zdHMsIHRlcm0pO1xuXHQgICAgICAgICRzY29wZS5wYWdpbmF0ZSgkc2NvcGUuZmlsdGVyZWRQb3N0cy5sZW5ndGgpO1xuXHQgICAgfSwgdHJ1ZSk7XG5cblxuXHQgICAgJHNjb3BlLnBhZ2luYXRlID0gZnVuY3Rpb24obnVtYmVyX29mX2l0ZW1zKXtcblx0ICAgIFx0aWYgKG51bWJlcl9vZl9pdGVtcyA+IDApIHtcblx0ICAgICAgICBcdCRzY29wZS5udW1iZXJPZlBhZ2VzID0gTWF0aC5jZWlsKG51bWJlcl9vZl9pdGVtcy8kc2NvcGUucG9zdHNQZXJQYWdlKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWxzZSB7XG5cdCAgICAgICAgXHQkc2NvcGUubnVtYmVyT2ZQYWdlcyA9IE1hdGguY2VpbCgkc2NvcGUucG9zdHMubGVuZ3RoLyRzY29wZS5wb3N0c1BlclBhZ2UpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblxuXHRQb3N0c1NlcnZpY2UuZ2V0KClcblx0XHQuc3VjY2VzcyhmdW5jdGlvbiAocG9zdHMpIHtcblx0XHRcdCRzY29wZS5wb3N0cyA9IHBvc3RzO1xuXHRcdFx0JHNjb3BlLnBhZ2luYXRlKCRzY29wZS5wb3N0cy5sZW5ndGgpO1xuXHRcdH0pXG5cblx0fV0pXG5cblx0LmZpbHRlcignb3V0cHV0X2h0bWwnLCBbXCIkc2NlXCIsIGZ1bmN0aW9uICgkc2NlKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHZhbCkge1xuXHQgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKHZhbCk7XG5cdCAgICB9O1xuXHR9XSlcblxuXHQuZmlsdGVyKCdzdGFydEZyb20nLCBmdW5jdGlvbigpIHtcblx0ICAgIHJldHVybiBmdW5jdGlvbihpbnB1dCwgc3RhcnQpIHtcblx0ICAgICAgICBpZihpbnB1dCkge1xuXHQgICAgICAgICAgICBzdGFydCA9ICtzdGFydDsgLy9wYXJzZSB0byBpbnRcblx0ICAgICAgICAgICAgcmV0dXJuIGlucHV0LnNsaWNlKHN0YXJ0KTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIFtdO1xuXHQgICAgfVxuXHR9KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LnNlcnZpY2UoJ1Bvc3RzU2VydmljZScsIFtcIiRodHRwXCIgLCBmdW5jdGlvbiAoJGh0dHApIHtcblx0XHR0aGlzLmdldCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJy9hcGkvcG9zdHMnKTtcblx0XHR9XG5cdFx0dGhpcy5zZW5kID0gZnVuY3Rpb24gKHBvc3QpIHtcblx0XHRcdHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3Bvc3RzJywgcG9zdCk7XG5cdFx0fVxuXHR9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ3RybCcgLCBbXCIkc2NvcGVcIiAsIFwiVXNlclN2Y1wiICwgZnVuY3Rpb24gKCRzY29wZSwgVXNlclN2Yykge1xuXHRcdCRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uICh1c2VybmFtZSwgcGFzc3dvcmQsIHBhc3N3b3JkX2NvbmZpcm0pIHtcblx0XHRcdGlmIChwYXNzd29yZCAhPSBwYXNzd29yZF9jb25maXJtKSB7XG5cdFx0XHRcdCRzY29wZS52YWxpZGF0aW9uTWVzc2FnZSA9ICdZb3VyIHBhc3N3b3JkcyBkaWQgbm90IG1hdGNoLic7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdFVzZXJTdmMucmVnaXN0ZXIodXNlcm5hbWUsIHBhc3N3b3JkKVxuXHRcdH1cblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5jb25maWcoW1wiJHJvdXRlUHJvdmlkZXJcIiAsZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XG5cdFx0JHJvdXRlUHJvdmlkZXJcblx0XHRcdC53aGVuKCcvJyAsIHtjb250cm9sbGVyOiAnUG9zdHNDdHJsJywgdGVtcGxhdGVVcmw6ICdwb3N0cy5odG1sJ30pXG5cdFx0XHQud2hlbignL3JlZ2lzdGVyJyAsIHtjb250cm9sbGVyOiAnUmVnaXN0ZXJDdHJsJywgdGVtcGxhdGVVcmw6ICdyZWdpc3Rlci5odG1sJ30pXG5cdFx0XHQud2hlbignL2xvZ2luJyAsIHtjb250cm9sbGVyOiAnTG9naW5DdHJsJywgdGVtcGxhdGVVcmw6ICdsb2dpbi5odG1sJ30pXG5cdFx0XHQud2hlbignL2xvZ291dCcgLCB7Y29udHJvbGxlcjogJ0xvZ2luQ3RybCcsIHRlbXBsYXRlVXJsOiAnbG9nb3V0Lmh0bWwnfSlcblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5zZXJ2aWNlKCdVc2VyU3ZjJywgW1wiJGh0dHBcIiwgZnVuY3Rpb24oJGh0dHApIHtcblx0XHR2YXIgc3ZjID0gdGhpcztcblx0XHRzdmMuZ2V0VXNlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdCRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLUF1dGgnXSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UudG9rZW5cblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJy9hcGkvdXNlcnMnKVxuXHRcdFx0LnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICBcdFx0XHRyZXR1cm4gcmVzcG9uc2VcbiAgICBcdFx0fSlcblx0XHR9XG5cdFx0c3ZjLmxvZ2luID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuXHRcdFx0cmV0dXJuICRodHRwLnBvc3QoJy9hcGkvc2Vzc2lvbnMnLCB7XG5cdFx0XHRcdHVzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkXG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oZnVuY3Rpb24gKHZhbCkge1xuXHRcdFx0XHR3aW5kb3cubG9jYWxTdG9yYWdlLnRva2VuID0gdmFsLmRhdGE7XG5cdFx0XHRcdCRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLUF1dGgnXSA9IHZhbC5kYXRhXG5cdFx0XHRcdHJldHVybiBzdmMuZ2V0VXNlcigpO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0c3ZjLnJlZ2lzdGVyID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBwYXNzd29yZCwgcGFzc3dvcmRfY29uZmlybSkge1xuXHRcdFx0cmV0dXJuICRodHRwLnBvc3QoJy9hcGkvdXNlcnMnLCB7XG5cdFx0XHRcdHVzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkXG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oZnVuY3Rpb24gKHZhbCkge1xuXHRcdFx0XHRyZXR1cm4gc3ZjLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZClcblx0XHRcdFx0XHQudGhlbihmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWY9ICcvJztcdFxuXHRcdFx0XHRcdH0pXG5cdFx0XHR9KVxuXHRcdH1cblx0XHRzdmMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0d2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0b2tlbicpO1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWY9ICcvJztcblx0XHR9XG5cdH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLnJ1bihbXCIkcm9vdFNjb3BlXCIsIFwiJHRpbWVvdXRcIiAsIFwiJHdpbmRvd1wiICwgZnVuY3Rpb24gKCRyb290U2NvcGUsICR0aW1lb3V0LCAkd2luZG93KSB7XG5cdFxuXHQoZnVuY3Rpb24gY29ubmVjdCgpe1xuXHRcdC8vQ3JlYXRlIGEgd2Vic29ja2V0IGNvbm5lY3Rpb24gd2l0aCB0aGUgc2VydmVyXG5cdFx0dmFyIGhvc3QgPSBcIndzOi8vXCIgKyAkd2luZG93LmxvY2F0aW9uLmhvc3Rcblx0XHQgIFxuXHRcdHZhciBjb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldChob3N0KVxuXG5cdFx0Y29ubmVjdGlvbi5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdXZWJzb2NrZXQgY29ubmVjdGVkJylcblx0XHR9XG5cblxuXHRcdGNvbm5lY3Rpb24ub25jbG9zZSA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdXZWJzb2NrZXQgY2xvc2VkLiBUcnlpbmcgdG8gcmVjb25uZWN0Li4uJylcblx0XHRcdCR0aW1lb3V0KGNvbm5lY3QsIDEwKjEwMDApO1xuXHRcdH0gXG5cblx0XHRjb25uZWN0aW9uLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKGUpO1xuXHRcdFx0dmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKGUuZGF0YSk7XG5cdFx0XHRcblx0XHRcdHZhciBuYW1lID0gJ3dzOicgKyBtZXNzYWdlLnRvcGljO1xuXHRcdFx0dmFyIGRhdGEgPSBtZXNzYWdlLmRhdGE7XG5cdFx0XHQvL2NvbnNvbGUubG9nKFwiYnJvYWRjYXN0aW5nOiBcIik7XG5cblx0XHRcdCRyb290U2NvcGUuJGJyb2FkY2FzdChuYW1lLCBkYXRhKTtcblx0XHR9XG5cdH0pKClcbn1dKSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==