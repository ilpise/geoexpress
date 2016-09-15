'use strict';

// Customized directory from meanUpload directive
// changed directive name - camel layerUpload --> <layer-upload></layer-upload>
// changed templateUrl: 'geoexpress/views/directives/meanUpload.html'
// changed $scope.upload url : 'api/layerUpload/upload'

angular.module('mean.geoExpress').directive('layerUpload', function($upload) {
    return {
        templateUrl: 'geoexpress/views/directives/meanUpload.html',
        scope: {
            fileDest: '=',
            uploadCallback: '&',
            uploadFileCallback: '&'
        },
        restrict: 'E',
        replace: false,
        link: function($scope, element, attrs) {
            $scope.onFileSelect = function($files) {
                var files = [];
                $scope.files = $files;
                //$files: an array of files selected, each file has name, size, and type.
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];
                    $scope.upload = $upload.upload({
                        url: 'api/layerUpload/upload',
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        data: {
                            dest: $scope.fileDest
                        },
                        method:'POST',
                        file: file
                    }).progress(function(evt) {
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function(data, status, headers, config) {
                        if (data.success) {
                            if (angular.isDefined(attrs.uploadFileCallback)) {
                                $scope.uploadFileCallback({
                                    file: data.file
                                });
                            }
                            files.push(data.file);
                        }
                        if (files.length === $files.length) {
                            if (angular.isDefined(attrs.uploadCallback)) {
                                $scope.uploadCallback({
                                    files: files
                                });
                            }
                        }
                    });
                }
            };
        }
    };
});
