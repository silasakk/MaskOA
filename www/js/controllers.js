angular.module('starter.controllers', ['ngIOS9UIWebViewPatch'])

    .controller('DashCtrl', function ($scope, $ionicPlatform) {

        $ionicPlatform.ready(function () {

            var push = PushNotification.init({
                "android": {"senderID": "12345679"},
                "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {}
            });

            push.on('registration', function (data) {
                // data.registrationId
                console.log(data);
            });

            push.on('notification', function (data) {
                // data.message,
                // data.title,
                // data.count,
                // data.sound,
                // data.image,
                // data.additionalData
                //console.log('xxx');

            });

            push.on('error', function (e) {
                // e.message
            });



        })

    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
