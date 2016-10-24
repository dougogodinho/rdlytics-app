'use strict';

// module definition...
var app = angular.module('rdlytics', []);

app.controller('MainController', MainController);

// controller definition...
function MainController($scope, $http, $q) {

    var API_HOST = 'https://rdlytics.herokuapp.com/';

    $scope.moment = moment;

    $scope.users = [];
    $scope.interactions = [];

    $scope.loadingUsers = false;
    $scope.loadingInterations = false;

    $scope.selectedUser = null;

    // method binding
    $scope.selectUser = selectUser

    loadUsers();

    //
    // functions definitions below!
    //

    function selectUser(user) {
        $scope.selectedUser = user;
        $scope.loadingInterations = true;

        $q.all([
            $http.get(API_HOST + 'users/' + user.id + '/interactions'),
            $http.get(API_HOST + 'users/' + user.id + '/contacts')
        ]).then(function (response) {
            $scope.loadingInterations = false;
            $scope.interactions = response[0].data.concat(response[1].data);
        });
    }

    function loadUsers() {
        $scope.loadingUsers = true;
        $scope.interactions = [];
        $scope.selectedUser = null;
        $http.get(API_HOST + 'users').then(function (response) {
            $scope.loadingUsers = false;
            $scope.users = response.data;
        });
    }
}
