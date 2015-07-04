angular.module("app",["ngRoute","ngAnimate"]),angular.module("app").controller("ApplicationCtrl",["$scope","$rootScope","UserSvc",function(t,e,n){window.localStorage.token&&n.getUser().then(function(e){t.$emit("userLoggedIn",e.data)}),t.$on("userLoggedIn",function(e,n){t.currentUser=n})}]),angular.module("app").controller("LoginCtrl",["$scope","UserSvc",function(t,e){t.login=function(n,o){e.login(n,o).then(function(e){t.$emit("userLoggedIn",e.data),window.location.href="#/"},function(e){t.loginValidation="Incorrect username & password combination"})},t.logout=function(){e.logout()}}]),angular.module("app").controller("PostsCtrl",["$scope","$http","PostsService","filterFilter",function(t,e,n,o){t.baseUrl=location.host,t.posts=[],t.addPost=function(){var e=CKEDITOR.instances.editor1.getData();e&&n.send({body:e,title:t.postTitle}).success(function(e){t.postBody=null,CKEDITOR.instances.editor1.setData(""),t.postTitle=null})},t.init_ckedit=function(){CKEDITOR.replace("editor1")},t.$on("ws:new_post",function(e,n){n=n[0],t.$apply(function(){t.posts.unshift(n),t.paginate()})}),t.$on("$viewContentLoaded",function(){}),t.currentPage=1,t.postsPerPage=5,t.prevPage=function(){t.currentPage>1&&t.currentPage--},t.nextPage=function(){t.currentPage<t.posts.length/t.postsPerPage&&t.currentPage++},t.setPage=function(e){t.currentPage=e},t.range=function(t){return new Array(t)},t.currentPage=1,t.postsPerPage=5,t.$watch("search",function(e){t.filteredPosts=o(t.posts,e),t.paginate(t.filteredPosts.length)},!0),t.paginate=function(e){t.numberOfPages=Math.ceil(e>0?e/t.postsPerPage:t.posts.length/t.postsPerPage)},n.get().success(function(e){t.posts=e,t.paginate(t.posts.length)})}]).filter("output_html",["$sce",function(t){return function(e){return t.trustAsHtml(e)}}]).filter("startFrom",function(){return function(t,e){return t?(e=+e,t.slice(e)):[]}}),angular.module("app").service("PostsService",["$http",function(t){this.get=function(){return t.get("/api/posts")},this.send=function(e){return t.post("/api/posts",e)},this.single=function(e){return t.get("/api/posts",{params:{post_id:e.id}})}}]),angular.module("app").controller("RegisterCtrl",["$scope","UserSvc",function(t,e){t.register=function(n,o,r){return o!=r?void(t.validationMessage="Your passwords did not match."):void e.register(n,o)}}]),angular.module("app").config(["$routeProvider",function(t){t.when("/",{controller:"PostsCtrl",templateUrl:"posts.html"}).when("/register",{controller:"RegisterCtrl",templateUrl:"register.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"login.html"}).when("/logout",{controller:"LoginCtrl",templateUrl:"logout.html"}).when("/post/:id",{controller:"SinglePostCtrl",templateUrl:"singlePost.html"})}]),angular.module("app").controller("SinglePostCtrl",["$scope","$http","PostsService","$routeParams","$route","$location",function(t,e,n,o,r,s){var i=o.id;t.$on("$viewContentLoaded",function(){}),n.single({id:i}).success(function(e){t.post=e})}]),angular.module("app").service("UserSvc",["$http",function(t){var e=this;e.getUser=function(){return t.defaults.headers.common["X-Auth"]=window.localStorage.token,t.get("/api/users").then(function(t){return t})},e.login=function(n,o){return t.post("/api/sessions",{username:n,password:o}).then(function(n){return window.localStorage.token=n.data,t.defaults.headers.common["X-Auth"]=n.data,e.getUser()})},e.register=function(n,o,r){return t.post("/api/users",{username:n,password:o}).then(function(t){return e.login(n,o).then(function(){window.location.href="/"})})},e.logout=function(){window.localStorage.removeItem("token"),window.location.href="/"}}]),angular.module("app").run(["$rootScope","$timeout","$window",function(t,e,n){!function o(){var r="ws://"+n.location.host,s=new WebSocket(r);s.onopen=function(){},s.onclose=function(t){e(o,1e4)},s.onmessage=function(e){var n=JSON.parse(e.data),o="ws:"+n.topic,r=n.data;t.$broadcast(o,r)}}()}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uQ3RybC5qcyIsImxvZ2luQ3J0bC5qcyIsInBvc3RzQ3RybC5qcyIsInBvc3RzU2VydmljZS5qcyIsInJlZ2lzdHJhdGlvbkN0cmwuanMiLCJyb3V0ZXMuanMiLCJzaW5nbGVQb3N0c0N0cmwuanMiLCJ1c2VyU2VydmljZS5qcyIsIndlYnNvY2tldHMuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCIkcm9vdFNjb3BlIiwiVXNlclN2YyIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsInRva2VuIiwiZ2V0VXNlciIsInRoZW4iLCJyZXNwb25zZSIsIiRlbWl0IiwiZGF0YSIsIiRvbiIsImV2ZW50IiwidXNlciIsImN1cnJlbnRVc2VyIiwibG9naW4iLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwibG9jYXRpb24iLCJocmVmIiwiZXJyb3IiLCJsb2dpblZhbGlkYXRpb24iLCJsb2dvdXQiLCIkaHR0cCIsIlBvc3RzU2VydmljZSIsImZpbHRlckZpbHRlciIsImJhc2VVcmwiLCJob3N0IiwicG9zdHMiLCJhZGRQb3N0IiwiY2tlZGl0b3JfY29udGVudCIsIkNLRURJVE9SIiwiaW5zdGFuY2VzIiwiZWRpdG9yMSIsImdldERhdGEiLCJzZW5kIiwiYm9keSIsInRpdGxlIiwicG9zdFRpdGxlIiwic3VjY2VzcyIsInBvc3QiLCJwb3N0Qm9keSIsInNldERhdGEiLCJpbml0X2NrZWRpdCIsInJlcGxhY2UiLCJfIiwiJGFwcGx5IiwidW5zaGlmdCIsInBhZ2luYXRlIiwiY3VycmVudFBhZ2UiLCJwb3N0c1BlclBhZ2UiLCJwcmV2UGFnZSIsIm5leHRQYWdlIiwibGVuZ3RoIiwic2V0UGFnZSIsInBhZ2VfbnVtYmVyIiwicmFuZ2UiLCJuIiwiQXJyYXkiLCIkd2F0Y2giLCJ0ZXJtIiwiZmlsdGVyZWRQb3N0cyIsIm51bWJlcl9vZl9pdGVtcyIsIm51bWJlck9mUGFnZXMiLCJNYXRoIiwiY2VpbCIsImdldCIsImZpbHRlciIsIiRzY2UiLCJ2YWwiLCJ0cnVzdEFzSHRtbCIsImlucHV0Iiwic3RhcnQiLCJzbGljZSIsInNlcnZpY2UiLCJ0aGlzIiwic2luZ2xlIiwicGFyYW1ldGVycyIsInBhcmFtcyIsInBvc3RfaWQiLCJpZCIsInJlZ2lzdGVyIiwicGFzc3dvcmRfY29uZmlybSIsInZhbGlkYXRpb25NZXNzYWdlIiwiY29uZmlnIiwiJHJvdXRlUHJvdmlkZXIiLCJ3aGVuIiwidGVtcGxhdGVVcmwiLCIkcm91dGVQYXJhbXMiLCIkcm91dGUiLCIkbG9jYXRpb24iLCJzdmMiLCJkZWZhdWx0cyIsImhlYWRlcnMiLCJjb21tb24iLCJyZW1vdmVJdGVtIiwicnVuIiwiJHRpbWVvdXQiLCIkd2luZG93IiwiY29ubmVjdCIsImNvbm5lY3Rpb24iLCJXZWJTb2NrZXQiLCJvbm9wZW4iLCJvbmNsb3NlIiwiZSIsIm9ubWVzc2FnZSIsIm1lc3NhZ2UiLCJKU09OIiwicGFyc2UiLCJuYW1lIiwidG9waWMiLCIkYnJvYWRjYXN0Il0sIm1hcHBpbmdzIjoiQUFDQUEsUUFBQUMsT0FBQSxPQUFBLFVBQUEsY0NEQUQsUUFBQUMsT0FBQSxPQUNBQyxXQUFBLG1CQUFBLFNBQUEsYUFBQSxVQUFBLFNBQUFDLEVBQUFDLEVBQUFDLEdBT0FDLE9BQUFDLGFBQUFDLE9BQ0FILEVBQUFJLFVBQ0FDLEtBQUEsU0FBQUMsR0FDQVIsRUFBQVMsTUFBQSxlQUFBRCxFQUFBRSxRQUlBVixFQUFBVyxJQUFBLGVBQUEsU0FBQUMsRUFBQUMsR0FDQWIsRUFBQWMsWUFBQUQsT0NoQkFoQixRQUFBQyxPQUFBLE9BQ0FDLFdBQUEsYUFBQSxTQUFBLFVBQUEsU0FBQUMsRUFBQUUsR0FDQUYsRUFBQWUsTUFBQSxTQUFBQyxFQUFBQyxHQUNBZixFQUFBYSxNQUFBQyxFQUFBQyxHQUNBVixLQUFBLFNBQUFDLEdBQ0FSLEVBQUFTLE1BQUEsZUFBQUQsRUFBQUUsTUFDQVAsT0FBQWUsU0FBQUMsS0FBQSxNQUVBLFNBQUFDLEdBQ0Fw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V0FBQSxTQUNBNUYsT0FBQWUsU0FBQUMsS0FBQSxRQ2pDQXRCLFFBQUFDLE9BQUEsT0FDQWtHLEtBQUEsYUFBQSxXQUFBLFVBQUEsU0FBQS9GLEVBQUFnRyxFQUFBQyxJQUVBLFFBQUFDLEtBRUEsR0FBQXhFLEdBQUEsUUFBQXVFLEVBQUFoRixTQUFBUyxLQUVBeUUsRUFBQSxHQUFBQyxXQUFBMUUsRUFFQXlFLEdBQUFFLE9BQUEsYUFLQUYsRUFBQUcsUUFBQSxTQUFBQyxHQUVBUCxFQUFBRSxFQUFBLE1BR0FDLEVBQUFLLFVBQUEsU0FBQUQsR0FFQSxHQUFBRSxHQUFBQyxLQUFBQyxNQUFBSixFQUFBOUYsTUFFQW1HLEVBQUEsTUFBQUgsRUFBQUksTUFDQXBHLEVBQUFnRyxFQUFBaEcsSUFHQVQsR0FBQThHLFdBQUFGLEVBQUFuRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1RoaXMgZmlsZSBtdXN0IGJlIHRoZSBmaXJzdCBpbiB0aGUgbGlzdCB0byBiZSBjb25jYXRlbmF0ZWRcbmFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ25nUm91dGUnLCAnbmdBbmltYXRlJ10pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5jb250cm9sbGVyKCdBcHBsaWNhdGlvbkN0cmwnICwgW1wiJHNjb3BlXCIsIFwiJHJvb3RTY29wZVwiLCBcIlVzZXJTdmNcIiwgZnVuY3Rpb24gKCRzY29wZSwgJHJvb3RTY29wZSwgVXNlclN2Yykge1xuXHRcdC8qXG5cdFx0SWYgd2UgaGF2ZSBhIHN0b3JlZCB0b2tlbiwgZ2V0IHRoZSB1c2VyIGluZm9ybWF0aW9uIGZyb20gaXRcblx0XHRhbmQgZW1pdCB0aGUgdXNlciBsb2dnZWRpbiBtZXNzYWdlcyBpbiBvcmRlciB0byBhbGxvdyB0aGUgVUkgdG8gXG5cdFx0aW5kaWNhdGUgdG8gdGhlIHVzZXIgdGhhdCB0aGV5IHdlcmUgbG9nZ2VkIGluXG5cdFx0Ki9cblx0XHRcblx0XHRpZiAod2luZG93LmxvY2FsU3RvcmFnZS50b2tlbikge1xuXHRcdFx0VXNlclN2Yy5nZXRVc2VyKClcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKXtcblx0XHRcdFx0XHQkc2NvcGUuJGVtaXQoJ3VzZXJMb2dnZWRJbicsIHJlc3BvbnNlLmRhdGEpO1xuXHRcdFx0XHR9KVxuXHRcdH1cblxuXHRcdCRzY29wZS4kb24oJ3VzZXJMb2dnZWRJbicsIGZ1bmN0aW9uKGV2ZW50LCB1c2VyKSB7XG5cdFx0XHQkc2NvcGUuY3VycmVudFVzZXIgPSB1c2VyO1xuXHRcdH0pXG5cdH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuY29udHJvbGxlcignTG9naW5DdHJsJyAsIFtcIiRzY29wZVwiICwgXCJVc2VyU3ZjXCIgLCBmdW5jdGlvbiAoJHNjb3BlLCBVc2VyU3ZjKSB7XG5cdFx0JHNjb3BlLmxvZ2luID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuXHRcdFx0VXNlclN2Yy5sb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSl7XG5cdFx0XHRcdFx0JHNjb3BlLiRlbWl0KCd1c2VyTG9nZ2VkSW4nLCByZXNwb25zZS5kYXRhKTtcblx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcjLydcblx0XHRcdFx0fSxcblx0XHRcdFx0ZnVuY3Rpb24oZXJyb3Ipe1xuXHRcdFx0XHQgICRzY29wZS5sb2dpblZhbGlkYXRpb24gPSAnSW5jb3JyZWN0IHVzZXJuYW1lICYgcGFzc3dvcmQgY29tYmluYXRpb24nO1xuXHRcdFx0XHR9KVxuXG5cdFx0fVxuXG5cdFx0JHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFVzZXJTdmMubG9nb3V0KClcblx0XHR9XG5cdH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuY29udHJvbGxlcignUG9zdHNDdHJsJywgW1wiJHNjb3BlXCIgLCBcIiRodHRwXCIsIFwiUG9zdHNTZXJ2aWNlXCIsIFwiZmlsdGVyRmlsdGVyXCIsIGZ1bmN0aW9uICgkc2NvcGUsICRodHRwLCBQb3N0c1NlcnZpY2UsIGZpbHRlckZpbHRlcikge1xuXHRcdCRzY29wZS5iYXNlVXJsID0gbG9jYXRpb24uaG9zdDtcblxuXHRcdCRzY29wZS5wb3N0cyA9IFtdO1xuXHRcdCRzY29wZS5hZGRQb3N0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGNrZWRpdG9yX2NvbnRlbnQgPSBDS0VESVRPUi5pbnN0YW5jZXMuZWRpdG9yMS5nZXREYXRhKCk7XG5cdFx0XHRpZiAoY2tlZGl0b3JfY29udGVudCkge1xuXHRcdFx0XHRQb3N0c1NlcnZpY2Uuc2VuZCh7XG5cdFx0XHRcdFx0Ym9keTogY2tlZGl0b3JfY29udGVudCxcblx0XHRcdFx0XHR0aXRsZTogJHNjb3BlLnBvc3RUaXRsZVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuc3VjY2VzcyhmdW5jdGlvbiAocG9zdCkge1xuXHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0Ly9SZW1vdmVkIGFzIHdlYnNvY2tldCBicm9hZGNhc3Qgd291bGQgY2F1c2UgdGhlIHBvc3QgdG8gYXBwZWFyIGR1cGxpY2F0ZWQgb24gdGhlIGJyb3dzZXIgdGhhdCBpdCB3YXMgcG9zdGVkIGZyb20gXG5cdFx0XHRcdFx0Ly9hcyBib3RoIG9mIHRoZSBmdW5jdGlvbnMgd291bGQgZ2V0IGV4ZWN1dGVkIGJlY2F1c2UgdGhlIGNsaWVudCB3aG8gc2VuZHMgdGhlIHBvc3Qgd291bGQgc3RpbGwgcmVjaWV2ZSB0aGUgd2Vic29ja2V0cyBicm9hZGNhc3QgYmFjayBmcm9tIHRoZSBzZXJ2ZXIgIFxuXHRcdFx0XHRcdCovXG5cdFx0XHRcdFx0JHNjb3BlLnBvc3RCb2R5ID0gbnVsbDtcblx0XHRcdFx0XHRDS0VESVRPUi5pbnN0YW5jZXMuZWRpdG9yMS5zZXREYXRhKCcnKTtcblx0XHRcdFx0XHQkc2NvcGUucG9zdFRpdGxlID0gbnVsbDtcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9XG5cblx0XHQkc2NvcGUuaW5pdF9ja2VkaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0ICAgIENLRURJVE9SLnJlcGxhY2UoJ2VkaXRvcjEnKTtcblx0XHR9XG5cblx0XHQkc2NvcGUuJG9uKCd3czpuZXdfcG9zdCcsIGZ1bmN0aW9uKF8sIHBvc3QpIHtcblx0XHRcdHBvc3QgPSBwb3N0WzBdO1xuXHRcdFx0JHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdCRzY29wZS5wb3N0cy51bnNoaWZ0KHBvc3QpO1xuXHRcdFx0XHQkc2NvcGUucGFnaW5hdGUoKTtcblx0XHRcdH0pXG5cdFx0fSlcblxuXHRcdCRzY29wZS4kb24oJyR2aWV3Q29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHQvL3RoZSBwYWdlIGlzIHJlYWR5XG5cdFx0fSk7XG5cblx0XHQkc2NvcGUuY3VycmVudFBhZ2UgPSAxO1xuXHRcdCRzY29wZS5wb3N0c1BlclBhZ2UgPSA1O1xuXG5cdFx0JHNjb3BlLnByZXZQYWdlID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICgkc2NvcGUuY3VycmVudFBhZ2UgPiAxKSB7XG5cdCAgICAgICAgICAgICRzY29wZS5jdXJyZW50UGFnZS0tO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG4gICAgXG5cdCAgICAkc2NvcGUubmV4dFBhZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgaWYgKCRzY29wZS5jdXJyZW50UGFnZSA8ICRzY29wZS5wb3N0cy5sZW5ndGgvJHNjb3BlLnBvc3RzUGVyUGFnZSkge1xuXHQgICAgICAgICAgICAkc2NvcGUuY3VycmVudFBhZ2UrKztcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgXG5cdCAgICAkc2NvcGUuc2V0UGFnZSA9IGZ1bmN0aW9uIChwYWdlX251bWJlcikge1xuXHQgICAgICAgICRzY29wZS5jdXJyZW50UGFnZSA9IHBhZ2VfbnVtYmVyO1xuXHQgICAgfTtcblxuXHQgICAgLy9UaGlzIHdheSBJIGNhbiBkbzogIFwiPGxpIG5nLXJlcGVhdD1cIm4gaW4gcmFuZ2UocGFnZXMpIHRyYWNrIGJ5ICRpbmRleFwiPlwiIGFuZCBzbyBJIGNhbiBkaXNwbGF5IGFzIG1hbnkgaXRlbXMgYXMgdGhlIHZhbHVlIG9mIGEgbnVtYmVyIGFzIHRoaXMgcmV0dXJucyBhbiBhcnJheSBvZiB0aGF0IGxlbmdodFxuXHQgICAgJHNjb3BlLnJhbmdlID0gZnVuY3Rpb24obikge1xuICAgICAgICBcdHJldHVybiBuZXcgQXJyYXkobik7XG4gICAgXHR9O1xuXG5cdCAgICAkc2NvcGUuY3VycmVudFBhZ2UgPSAxOyAvL2N1cnJlbnQgcGFnZVxuXHQgICAgJHNjb3BlLnBvc3RzUGVyUGFnZSA9IDU7IC8vbWF4IHJvd3MgZm9yIGRhdGEgdGFibGVcblx0ICAgIFxuXHQgICAgLy93YXRjaCB0byBzZWUgaWYgc2VhcmNoaW5nIGFuZCByZXBhZ2luYXRlIGlmIHdlIGFyZVxuXHQgICAgLy90cnVlIGF0IHRoZSBlbmQgIG1hZ2ljYWxseSBtYWtlcyBpdCBzbyB0aGF0IGFzIGVhY2ggZXh0cmEgbGV0dGVyIGlzIGFkZGVkIHRvIHRoZSBzZWFyY2ggd2UgY2FuIHJlcGFnaW5hdGVcblx0ICAgIC8vd2l0aG91dCB0aGUgJ3RydWUnIGl0IG9ubHkgZGlkICB0aGF0XG5cdCAgICAkc2NvcGUuJHdhdGNoKCdzZWFyY2gnLCBmdW5jdGlvbih0ZXJtKSB7XG5cdCAgICAgICAgJHNjb3BlLmZpbHRlcmVkUG9zdHMgPSBmaWx0ZXJGaWx0ZXIoJHNjb3BlLnBvc3RzLCB0ZXJtKTtcblx0ICAgICAgICAkc2NvcGUucGFnaW5hdGUoJHNjb3BlLmZpbHRlcmVkUG9zdHMubGVuZ3RoKTtcblx0ICAgIH0sIHRydWUpO1xuXG5cblx0ICAgICRzY29wZS5wYWdpbmF0ZSA9IGZ1bmN0aW9uKG51bWJlcl9vZl9pdGVtcyl7XG5cdCAgICBcdGlmIChudW1iZXJfb2ZfaXRlbXMgPiAwKSB7XG5cdCAgICAgICAgXHQkc2NvcGUubnVtYmVyT2ZQYWdlcyA9IE1hdGguY2VpbChudW1iZXJfb2ZfaXRlbXMvJHNjb3BlLnBvc3RzUGVyUGFnZSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsc2Uge1xuXHQgICAgICAgIFx0JHNjb3BlLm51bWJlck9mUGFnZXMgPSBNYXRoLmNlaWwoJHNjb3BlLnBvc3RzLmxlbmd0aC8kc2NvcGUucG9zdHNQZXJQYWdlKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cblx0UG9zdHNTZXJ2aWNlLmdldCgpXG5cdFx0LnN1Y2Nlc3MoZnVuY3Rpb24gKHBvc3RzKSB7XG5cdFx0XHQkc2NvcGUucG9zdHMgPSBwb3N0cztcblx0XHRcdC8vY29uc29sZS5sb2cocG9zdHMpO1xuXHRcdFx0JHNjb3BlLnBhZ2luYXRlKCRzY29wZS5wb3N0cy5sZW5ndGgpO1xuXHRcdH0pXG5cblx0fV0pXG5cblx0LmZpbHRlcignb3V0cHV0X2h0bWwnLCBbXCIkc2NlXCIsIGZ1bmN0aW9uICgkc2NlKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHZhbCkge1xuXHQgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKHZhbCk7XG5cdCAgICB9O1xuXHR9XSlcblxuXHQuZmlsdGVyKCdzdGFydEZyb20nLCBmdW5jdGlvbigpIHtcblx0ICAgIHJldHVybiBmdW5jdGlvbihpbnB1dCwgc3RhcnQpIHtcblx0ICAgICAgICBpZihpbnB1dCkge1xuXHQgICAgICAgICAgICBzdGFydCA9ICtzdGFydDsgLy9wYXJzZSB0byBpbnRcblx0ICAgICAgICAgICAgcmV0dXJuIGlucHV0LnNsaWNlKHN0YXJ0KTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIFtdO1xuXHQgICAgfVxuXHR9KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LnNlcnZpY2UoJ1Bvc3RzU2VydmljZScsIFtcIiRodHRwXCIgLCBmdW5jdGlvbiAoJGh0dHApIHtcblx0XHR0aGlzLmdldCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJy9hcGkvcG9zdHMnKTtcblx0XHR9XG5cdFx0dGhpcy5zZW5kID0gZnVuY3Rpb24gKHBvc3QpIHtcblx0XHRcdHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3Bvc3RzJywgcG9zdCk7XG5cdFx0fVxuXHRcdHRoaXMuc2luZ2xlID0gZnVuY3Rpb24gKHBhcmFtZXRlcnMpIHtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJy9hcGkvcG9zdHMnLCB7IHBhcmFtczoge3Bvc3RfaWQ6IHBhcmFtZXRlcnMuaWR9IH0gKTtcblx0XHR9XG5cdH1dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHQuY29udHJvbGxlcignUmVnaXN0ZXJDdHJsJyAsIFtcIiRzY29wZVwiICwgXCJVc2VyU3ZjXCIgLCBmdW5jdGlvbiAoJHNjb3BlLCBVc2VyU3ZjKSB7XG5cdFx0JHNjb3BlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBwYXNzd29yZCwgcGFzc3dvcmRfY29uZmlybSkge1xuXHRcdFx0aWYgKHBhc3N3b3JkICE9IHBhc3N3b3JkX2NvbmZpcm0pIHtcblx0XHRcdFx0JHNjb3BlLnZhbGlkYXRpb25NZXNzYWdlID0gJ1lvdXIgcGFzc3dvcmRzIGRpZCBub3QgbWF0Y2guJztcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0VXNlclN2Yy5yZWdpc3Rlcih1c2VybmFtZSwgcGFzc3dvcmQpXG5cdFx0fVxuXHR9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LmNvbmZpZyhbXCIkcm91dGVQcm92aWRlclwiICxmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcblx0XHQkcm91dGVQcm92aWRlclxuXHRcdFx0LndoZW4oJy8nICwge2NvbnRyb2xsZXI6ICdQb3N0c0N0cmwnLCB0ZW1wbGF0ZVVybDogJ3Bvc3RzLmh0bWwnfSlcblx0XHRcdC53aGVuKCcvcmVnaXN0ZXInICwge2NvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnLCB0ZW1wbGF0ZVVybDogJ3JlZ2lzdGVyLmh0bWwnfSlcblx0XHRcdC53aGVuKCcvbG9naW4nICwge2NvbnRyb2xsZXI6ICdMb2dpbkN0cmwnLCB0ZW1wbGF0ZVVybDogJ2xvZ2luLmh0bWwnfSlcblx0XHRcdC53aGVuKCcvbG9nb3V0JyAsIHtjb250cm9sbGVyOiAnTG9naW5DdHJsJywgdGVtcGxhdGVVcmw6ICdsb2dvdXQuaHRtbCd9KVxuXHRcdFx0LndoZW4oJy9wb3N0LzppZCcgLCB7Y29udHJvbGxlcjogJ1NpbmdsZVBvc3RDdHJsJywgdGVtcGxhdGVVcmw6ICdzaW5nbGVQb3N0Lmh0bWwnfSlcblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cdC5jb250cm9sbGVyKCdTaW5nbGVQb3N0Q3RybCcsIFtcIiRzY29wZVwiICwgXCIkaHR0cFwiLCBcIlBvc3RzU2VydmljZVwiLCBcIiRyb3V0ZVBhcmFtc1wiLCBcIiRyb3V0ZVwiLCBcIiRsb2NhdGlvblwiICwgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHAsIFBvc3RzU2VydmljZSwgJHJvdXRlUGFyYW1zLCAkcm91dGUsICRsb2NhdGlvbikge1xuXG5cdFx0dmFyIHBvc3RfaWQgPSAkcm91dGVQYXJhbXMuaWQ7XG5cblx0XHQkc2NvcGUuJG9uKCckdmlld0NvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpe1xuXHRcdFx0Ly90aGUgcGFnZSBpcyByZWFkeVxuXHRcdH0pO1xuXG5cdFx0XHRcdFx0XG5cdFx0UG9zdHNTZXJ2aWNlLnNpbmdsZSh7XG5cdFx0XHRpZDogcG9zdF9pZFxuXHRcdH0pXG5cdFx0LnN1Y2Nlc3MoZnVuY3Rpb24gKHBvc3QpIHtcblx0XHRcdCRzY29wZS5wb3N0ID0gcG9zdDtcblx0XHR9KVxuXHR9XSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LnNlcnZpY2UoJ1VzZXJTdmMnLCBbXCIkaHR0cFwiLCBmdW5jdGlvbigkaHR0cCkge1xuXHRcdHZhciBzdmMgPSB0aGlzO1xuXHRcdHN2Yy5nZXRVc2VyID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0JGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ1gtQXV0aCddID0gd2luZG93LmxvY2FsU3RvcmFnZS50b2tlblxuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnL2FwaS91c2VycycpXG5cdFx0XHQudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIFx0XHRcdHJldHVybiByZXNwb25zZVxuICAgIFx0XHR9KVxuXHRcdH1cblx0XHRzdmMubG9naW4gPSBmdW5jdGlvbiAodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9zZXNzaW9ucycsIHtcblx0XHRcdFx0dXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmRcblx0XHRcdH0pXG5cdFx0XHQudGhlbihmdW5jdGlvbiAodmFsKSB7XG5cdFx0XHRcdHdpbmRvdy5sb2NhbFN0b3JhZ2UudG9rZW4gPSB2YWwuZGF0YTtcblx0XHRcdFx0JGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ1gtQXV0aCddID0gdmFsLmRhdGFcblx0XHRcdFx0cmV0dXJuIHN2Yy5nZXRVc2VyKCk7XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRzdmMucmVnaXN0ZXIgPSBmdW5jdGlvbiAodXNlcm5hbWUsIHBhc3N3b3JkLCBwYXNzd29yZF9jb25maXJtKSB7XG5cdFx0XHRyZXR1cm4gJGh0dHAucG9zdCgnL2FwaS91c2VycycsIHtcblx0XHRcdFx0dXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmRcblx0XHRcdH0pXG5cdFx0XHQudGhlbihmdW5jdGlvbiAodmFsKSB7XG5cdFx0XHRcdHJldHVybiBzdmMubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKVxuXHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZj0gJy8nO1x0XG5cdFx0XHRcdFx0fSlcblx0XHRcdH0pXG5cdFx0fVxuXHRcdHN2Yy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Rva2VuJyk7XG5cdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZj0gJy8nO1xuXHRcdH1cblx0fV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4ucnVuKFtcIiRyb290U2NvcGVcIiwgXCIkdGltZW91dFwiICwgXCIkd2luZG93XCIgLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHRpbWVvdXQsICR3aW5kb3cpIHtcblx0XG5cdChmdW5jdGlvbiBjb25uZWN0KCl7XG5cdFx0Ly9DcmVhdGUgYSB3ZWJzb2NrZXQgY29ubmVjdGlvbiB3aXRoIHRoZSBzZXJ2ZXJcblx0XHR2YXIgaG9zdCA9IFwid3M6Ly9cIiArICR3aW5kb3cubG9jYXRpb24uaG9zdFxuXHRcdCAgXG5cdFx0dmFyIGNvbm5lY3Rpb24gPSBuZXcgV2ViU29ja2V0KGhvc3QpXG5cblx0XHRjb25uZWN0aW9uLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vY29uc29sZS5sb2coJ1dlYnNvY2tldCBjb25uZWN0ZWQnKVxuXHRcdH1cblxuXG5cdFx0Y29ubmVjdGlvbi5vbmNsb3NlID0gZnVuY3Rpb24gKGUpIHtcblx0XHRcdC8vY29uc29sZS5sb2coJ1dlYnNvY2tldCBjbG9zZWQuIFRyeWluZyB0byByZWNvbm5lY3QuLi4nKVxuXHRcdFx0JHRpbWVvdXQoY29ubmVjdCwgMTAqMTAwMCk7XG5cdFx0fSBcblxuXHRcdGNvbm5lY3Rpb24ub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcblx0XHRcdC8vY29uc29sZS5sb2coZSk7XG5cdFx0XHR2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcblx0XHRcdFxuXHRcdFx0dmFyIG5hbWUgPSAnd3M6JyArIG1lc3NhZ2UudG9waWM7XG5cdFx0XHR2YXIgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcblx0XHRcdC8vY29uc29sZS5sb2coXCJicm9hZGNhc3Rpbmc6IFwiKTtcblxuXHRcdFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KG5hbWUsIGRhdGEpO1xuXHRcdH1cblx0fSkoKVxufV0pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9