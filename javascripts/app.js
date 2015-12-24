(function(angular, data, _){
  // Your code should be here

  var myAPP = angular.module('myAPP', []);
  myAPP.controller('mainController', function($scope) {
    $scope.books = data.books;

    var publisher = _.map($scope.books,function(book){
    	return book.publisher;
    });

    var publisher_all = ["请选择"];
    for (var i = 0; i < publisher.length; i++) {
    	var temp = publisher[i];
    	if (temp != ' ') {
    		var state =false;
    		for(k in publisher_all){
    			if(temp == publisher_all[k]){
    				state = true;
    			}
    		}
    		if (!state) {
    			publisher_all.push(temp);
    		};
    	};
    };

    var tag = _.pluck($scope.books,"tags");
    var tag_all = ["请选择"];
    for(var i = 0 ; i < tag.length; i++){
    	for (var j = 0; j < tag[i].length; j++) {
    		var temp = tag[i][j].name
    		if(temp !=' '){
    			var state = false;
    			for(k in tag_all){
    				if (temp == tag_all[k]) {
    					b = true
    				};
    			}
    			if (!state) {
    				tag_all.push(temp);
    			};
    		}
    		
    	};
    }
    $scope.publishers = publisher_all;
    $scope.tags = tag_all;

    //根据下拉菜单进行数据过滤
    $scope.choosePublisher = $scope.chooseTag = function(){

        $scope.books = data.books;

        if ($scope.publisher == "请选择" && $scope.tag == "请选择") {
            return;
        }else if ($scope.publisher == "请选择" && $scope.tag != "请选择") {
            var temp = [];
            for (var i = 0; i < $scope.books.length; i++) {
                for (var j = 0; j < $scope.books[i].tags.length; i++) {
                    if ($scope.tag == $scope.books[i].tags[j].name) {
                        temp.push($scope.books[i]);
                    };
                };
            };
        }else if ($scope.publisher != "请选择" && $scope.tag == "请选择") {
            var temp = [];
            for (var i = 0; i < $scope.books.length; i++) {
                if ($scope.books[i].publisher == $scope.publisher) {
                    temp.push($scope.books[i]);
                };
            };
        }else{
            var temp = [];
            for (var i = 0; i < $scope.books.length; i++) {
                if ($scope.books[i].publisher == $scope.publisher) {
                    for (var j = 0; j < $scope.books[i].tags.length; i++) {
                        if ($scope.tag == $scope.books[i].tags[j].name) {
                          temp.push($scope.books[i]);
                         };
                     };
                };
            };
        }
        $scope.books = temp;
    }
    $scope.tag = "请选择";
    $scope.publisher = "请选择";
  });
})(angular, data, _);
