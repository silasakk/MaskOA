angular.module('starter.controllers', ['ngIOS9UIWebViewPatch'])

    .controller('DashCtrl', function ($scope, $ionicPlatform,$ionicSideMenuDelegate,$cordovaBarcodeScanner) {




        $scope.showRightMenu = function () {
            $ionicSideMenuDelegate.toggleRight();
        };

        $ionicPlatform.ready(function () {

            $scope.scanBarcode = function () {
                $cordovaBarcodeScanner.scan().then(function (imageData) {

                    window.open(imageData.text,'_blank', 'location=yes');

                }, function (error) {
                    console.log("An error happened -> " + error);
                });
            };

            cordova.plugins.backgroundMode.enable();

            cordova.plugins.backgroundMode.onactivate = function () {

                $scope.scheduleDelayedNotification = function (value) {

                    var now             = new Date().getTime(),
                        sec = new Date(now + 5*1000);

                    cordova.plugins.notification.local.schedule({
                        id: value.additionalData.id,
                        title: "Re. "+value.additionalData.Datatitle,
                        text: value.additionalData.DataDetail,
                        at: sec,
                        every: "minute",
                        data: value.additionalData.DataUrl
                    });


                }
            }
            cordova.plugins.notification.local.getAll(function (notifications) {
                console.log(notifications);
                cordova.plugins.notification.local.clear(notifications.id);
                cordova.plugins.notification.local.cancel(notifications.id);
            });

            cordova.plugins.notification.local.cancelAll(function() {
                //alert("done");
            }, this);
            cordova.plugins.notification.local.clearAll(function() {
                //alert("done");
            }, this);


            var push = PushNotification.init({
                "android": {"senderID": "12345679"},
                "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {}
            });

            push.on('registration', function (data) {

                console.log(data);
            });

            push.on('notification', function (data) {

                $scope.scheduleDelayedNotification(data);

            });

            push.on('error', function (e) {
                // e.message
            });

            cordova.plugins.notification.local.on("click", function (notification) {

                    cordova.plugins.notification.local.clear(notification.id);
                    cordova.plugins.notification.local.cancel(notification.id);

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

    .controller('AccountCtrl',function ($scope,$sce) {


            $scope.myHTML = $sce.trustAsHtml('<iframe data-tap-disabled="true" src="http://memordertest.ooasys.com/" style="width:100%;height:100%"></iframe>');



    });
