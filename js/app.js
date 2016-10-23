angular.module('app',['ngRoute'])
.config(function($routeProvider){
	$routeProvider
	.when('/login',{
		templateUrl :'view/login.html',
		controller:'loginCtrl'
	})
	.when('/',{
		templateUrl : 'view/main.html',
		controller:'mainCtrl'
	})
	//创建用户
	.when('/createuser',{
		templateUrl:'view/createuser.html',
		controller:'createuserCtrl'
	})
	//用户列表 pageNum表示用户列表页码
	.when('/userlist/:pageNum',{
		templateUrl:'view/userlist.html',
		controller:'userlistCtrl'
	})
	// 用户详情 userId表示用户的id
	.when('/userdetail/:userId',{
		templateUrl:'view/userdetail.html',
		controller:'userdetailCtrl'
	})
	// 创建新闻
	.when('/createnews', {
		templateUrl: 'view/createnews.html',
		controller: 'createnewsCtrl'
	})
	// 新闻列表 pageNum表示列表的页码
	.when('/newslist/:pageNum', {
		templateUrl: 'view/newslist.html',
		controller: 'newslistCtrl'
	})
	//新闻详情
	.when('/newsdetail/:newsId',{
		templateUrl:'view/newsdetail.html',
		controller:'newsdetailCtrl'
	})

	.otherwise({
		redirectTo:'/'
	})
})
//定义创建用户控制器
.controller('createuserCtrl',function ($scope, $http, $location) {
	$scope.user = {};
	$scope.submit = function(){
		$http({
			method:'POST',
			url:"action/createuser.php",
			data:$scope.user
		})
		.success(function (res){
			if(res && res.errno === 0){
				$location.path('/userlist/1')
			}
		})
	}

})
//定义用户列表控制器
.controller('userlistCtrl',function ($scope, $routeParams, $http) {
	$scope.num = $routeParams.pageNum;
	$http({
		method:"GET",
		url:"action/userlist.php",
		pageNum: "$scope.numsphp",
		params:{
		}
	})
	.success(function(res){
		if(res && res.errno === 0){
			$scope.list = res.data
		}
	})
})
//定义用户详情控制器
.controller('userdetailCtrl',function($scope, $routeParams, $http) {
	$http({
		url:'action/userdetail.php',
		method:'GET',
		params:{
			id:$routeParams.userId
		}
	})
	.success(function(res){
		if(res && res.errno === 0){
			$scope.user = res.data
		}
	})
})
//定义新闻控制器
.controller('createnewsCtrl',function($scope, $location, $http) {
	$scope.submit = function(){
		$scope.news.date = new Date().getTime();
		$http({
			method:"POST",
			url:"action/createnews.php",
			data:$scope.news
		})
		.success(function(res){
			if(res && res.errno === 0){
				$location.path('/newslist/1')
			}
		})
	}
})
//定义新闻列表控制器
.controller('newslistCtrl',function ($scope, $http, $routeParams) {
		$scope.num = $routeParams.pageNum;
		$http({
			url:'action/newslist.php',
			method:"GET",
			params:{
				pageNum:$scope.num
			}
		})
		.success(function(res){
			if(res && res.errno === 0){
				$scope.list = res.data
			}
		})
})	

.controller('newsdetailCtrl', function ($scope, $http, $routeParams) {
	$http({
		url : 'action/newsdetail.php',
		method:'GET',
		params : {
			id : $routeParams.newsId
		}
	})
	.success(function(res){
		if(res && res.errno === 0){
			$scope.news = res.data
		}
	})
})
.controller('mainCtrl', function ($scope, $interval){
	$scope.date = new Date();
	$interval(function(){
		$scope.date = new Date()
	},1000)
})
.controller('navCtrl' ,function($scope){
	$scope.list = [
		{
			title: '用户模板',
			childlist:[
				{
					title : '用户列表',
					url:'#/userlist/1'
				},
				{
					title:'创建用户',
					url:'#/createuser'
				}
			]
		},
		{
			title:'新闻模板',
			childlist:[
				{
					title:'新闻列表',
					url:'#/newslist/1'
				},
				{
					title:'创建新闻',
					url:'#/createnews'
				}
			]
		}
	]
})
//定义登录视图控制器
.controller('loginCtrl',function ($scope, $http, $location, $rootScope){
	$scope.submit = function(){
		$http({
			method:'POST',
			url:'action/login.php',
			data:$scope.user
		})
		.success(function(res){
			if(res && res.data){
				$rootScope.username = res.data.username
				$location.path('/')
			}
		})
	}
})
.run(function ($rootScope, $http, $location){
	//判断用户是否登录
	$http({
		url:'action/checkLogin.php',
		method:'GET'
	})
	.success(function(res){
		if(res && res.data){
			$rootScope.username = res.data.username
			$location.path('/')

		}else {
			$location.path('/login')
		}
	})
})