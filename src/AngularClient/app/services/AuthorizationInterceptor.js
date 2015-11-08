﻿(function () {
    'use strict';

    var module = angular.module('mainApp');

    function AuthorizationInterceptor($rootScope, $q) {

        console.log("AuthorizationInterceptor created");


        var request = function (requestSuccess) {
            requestSuccess.headers = requestSuccess.headers || {};

            if ($rootScope.authorizationData) {
                //console.log("AuthorizationInterceptor Request with authorizationData");
                //console.log('Bearer ' + $rootScope.authorizationData);
                requestSuccess.headers.Authorization = 'Bearer ' + $rootScope.authorizationData;
            }

            return requestSuccess || $q.when(requestSuccess);
        };

        //var response = function(response) {
        //    //if (response.status === 401) {
        //    //    //  Redirect user to login page / signup Page. 
        //    //}
        //    //return response || $q.when(response);
        //};

        //var responseError = function(responseFailure) {

        //    console.log("console.log(responseFailure);");
        //    console.log(responseFailure);
        //    if (responseFailure.status === 403) {
        //        window.location.href = '/#/unauthorized';

        //    } else if (responseFailure.status === 401) {

        //        localStorageService.remove('authorizationData');

        //        //if (window.location.href && window.location.hash !== '#/logon') {

        //        //    this.lastPath = window.location.href;

        //        //    $rootScope.returnToState = this.rootScope.toState;
        //        //    $rootScope.returnToStateParams = this.rootScope.toStateParams;
        //        //}

        //        var authorizationUrl = 'https://localhost:44300/connect/authorize';
        //        var client_id = 'angularclient';
        //        var redirect_uri = 'https://localhost:44302/authorized.html';
        //        var response_type = "token";
        //        var scope = "dataEventRecords";
        //        var state = Date.now() + "" + Math.random();

        //        localStorageService.set('state', state);

        //        var url =
        //            authorizationUrl + "?" +
        //            "client_id=" + encodeURI(client_id) + "&" +
        //            "redirect_uri=" + encodeURI(redirect_uri) + "&" +
        //            "response_type=" + encodeURI(response_type) + "&" +
        //            "scope=" + encodeURI(scope) + "&" +
        //            "state=" + encodeURI(state);
        //        window.location = url;
        //    }

        //    return this.q.reject(responseFailure);
        //};

        return {
            request: request
            //response: response,
            //responseError: responseError
        }
    }

    module.service("authorizationInterceptor", [
            '$rootScope',
            '$q',
            AuthorizationInterceptor
    ]);

    module.config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push("authorizationInterceptor");
    }]);

})();
