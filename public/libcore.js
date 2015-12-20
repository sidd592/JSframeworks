
// public/core.js
var libApp = angular.module('libApp', []);

function mainController($scope, $http, $location) {
    $scope.formData = {};


    $scope.showBooks =function(){
    $http.get('/api/books')
        .success(function(data) {
            $scope.books = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        $location.absUrl() = '/home/sid/LibApp/public/booklist.html';
    };

    // when submitting the add form, send the text to the node API
    $scope.addBook = function() {
        $http.post('/api/books', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.books = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.removeBook = function(id) {
        $http.delete('/api/books/:book_id')
            .success(function(data) {
                $scope.books = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
