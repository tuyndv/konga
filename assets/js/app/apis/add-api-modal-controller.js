/**
 * This file contains all necessary Angular controller definitions for 'frontend.login-history' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  angular.module('frontend.apis')
    .controller('AddApiModalController', [
      '$scope', '$rootScope','$log', '$state','ApiService','SettingsService',
        '$uibModalInstance','MessageService',
      function controller($scope,$rootScope, $log, $state, ApiService, SettingsService,
                          $uibModalInstance, MessageService ) {


          $scope.api = ApiService.getProperties($rootScope.$node.kong_version)

          $log.debug("Kong version",$rootScope.$node.kong_version)
          $log.debug("$scope.api",$scope.api)

          $scope.close = function() {
              $uibModalInstance.dismiss()
          }



          $scope.submit = function() {

              clearApi()

              ApiService.add($scope.api)
                  .then(function(res){
                      $rootScope.$broadcast('api.created')
                      MessageService.success('Api created!')
                      $uibModalInstance.dismiss()
                  }).catch(function(err){
                  $log.error("Create new api error:", err)
                  $scope.errors = err.data.customMessage || {}


              })
          }


          function clearApi() {
              for(var key in $scope.api) {
                  if($scope.api[key] == '') {
                      delete($scope.api[key])
                  }
              }
          }


      }
    ])
  ;
}());
