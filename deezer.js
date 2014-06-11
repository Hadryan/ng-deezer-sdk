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
    .factory("DeezerFactory", ['$deezer', '$http', "$location", '$rootScope', 
        function($deezer, $http, $location, $rootScope){
        var getLoginStatus = function(logged, unlogged){
                DZ.getLoginStatus(function(response){
                    if (response.authResponse != null) {
                        logged();
                    }
                    else {
                        unlogged();
                    }
                });
        }; 
        
        var login = function(){
                DZ.login(function(response){
                    DZ.getLoginStatus(function(response) {
                        if (response.authResponse != null) {
                            $rootScope.user_data = {
                                "access_token"  : response.authResponse.accessToken,
                                "user_id"       : response.userID
                            }; 
                        }
                    });
                }, {perms: 'basic_access,email'});
        
        };

        var logout = function(callback){
            DZ.logout(callback);
        };

        var api = function(url, success){
            DZ.api(url, function(response){
                success(response);
            });
        };

        return {
            login: login,
            logout: logout,
            getLoginStatus: getLoginStatus,
            api: api
        };
    }]);
