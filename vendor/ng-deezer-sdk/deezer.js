angular.module("gianarb.deezer", [])
    .provider("$deezer", function(){
        var appID;
        var channelUrl;

        this.setAppId = function(str){
            appID = str;
        };
        this.setChannelUrl = function(url){
            channelUrl = url;
        };

        this.$get = [function(){
            DZ.init({
                appId       : appID,
                channelUrl  : channelUrl
            });
        }];
    })
    .factory("deezer", ['$deezer', '$http', "$location", '$rootScope', '$q', 
        function($deezer, $http, $location, $rootScope, $q){
        
        var getLoginStatus = function(){
                DZ.getLoginStatus(function(response){
                    if (response.authResponse != null) {
                        logged(response);
                    }
                    else {
                        unlogged(response);
                    }
                });
        }; 

        var initPlayer = function(obj){
            DZ.init(obj);
        };

        var login = function(callback){
                DZ.login(function(response){
                    DZ.getLoginStatus(function(response) {
                        if (response.authResponse != null) {
                            callback(response);
                        }
                    });
                }, {perms: 'basic_access,email'});
        
        };

        var logout = function(callback){
            DZ.logout(callback);
        };

        var def = $q.defer();
        var api = function(url){
            DZ.api(url, function(response){
                def.resolve(response)
            });
            return def.promise;
        };

        return {
            login: login,
            logout: logout,
            initPlayer: initPlayer,
            getLoginStatus: getLoginStatus,
            api: api
        };
    }]);
