var serv = angular.module('app.services', []);

serv.service("NewsService", function ($http, $q, $ionicPopup) {
    var self = {
        'Domain': 'http://ded.sdg.ae/_MobFiles/AjmanDED_MobService.asmx',
        'PhotoDomain': 'http://ded.sdg.ae',
        'ImageUrl': '',
        'NewsArticles': [],
        'Article': [],
        'Notifications': [],
        'No_Notification': 0,
        'ReadNotification': [],
        'EnableNotification':false,
        'Vote_SendAnswer':[],
        'Vote_GetAnswer':[],
        'replace': function (str, find, replace) {
            return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        }
        ,
        'loadRecentArticles': function (items) {
            var d = $q.defer();
            $http.get("http://ded.sdg.ae/_MobFiles/AjmanDED_MobService.asmx/News_Get?NumberOfItems=" + items)
                .success(function success(data) {
                    var x2 = data.replace("<?xml version=\"1.0\" encoding=\"utf-8\"?>", "");
                    x2 = x2.replace("<string xmlns=\"http://AjmanDED-MobData.org/\">", "");
                    x2 = x2.replace("</string>", "");

                    //x2 = x2.replace("~",self.PhotoDomain);
                    //     data.replace('<string xmlns=\"http://AjmanDED-MobData.org">', '');
                    //   data.replace('</string>', '');

                    var NewArray = JSON.parse(x2);
                    self.NewsArticles = NewArray;
                    console.log(self.NewsArticles);
                    d.resolve();
                })
                .error(function error(msg) {
                    console.log(msg);
                    d.reject();
                });
            return d.promise;
        },
        'loadArticle': function (id) {
            var d = $q.defer();
            $http.get('http://ded.sdg.ae/_MobFiles/AjmanDED_MobService.asmx/News_GetById?NewsID=' + id)
                .success(function success(data) {

                    var x2 = data.replace("<?xml version=\"1.0\" encoding=\"utf-8\"?>", "");
                    x2 = x2.replace("<string xmlns=\"http://AjmanDED-MobData.org/\">", "");
                    x2 = x2.replace("</string>", "");

                    var NewArray = JSON.parse(x2);
                    self.Article = NewArray;
                    console.log(self.Article);
                    d.resolve();
                })
                .error(function error(msg) {
                    console.log(msg);
                    d.reject();
                });
            return d.promise;
        }, 'LoadNotification': function (id) {
            var d = $q.defer();
            $http.get('http://ded.sdg.ae/_MobFiles/AjmanDED_MobService.asmx/Notification_GetUnRead?AccountID=' + id)
                .success(function success(data) {

                    var x2 = data.replace("<?xml version=\"1.0\" encoding=\"utf-8\"?>", "");
                    x2 = x2.replace("<string xmlns=\"http://AjmanDED-MobData.org/\">", "");
                    x2 = x2.replace("</string>", "");


                    self.No_Notification = 0;
                    var NewArray = JSON.parse(x2);
                    self.Notifications = NewArray;
                    console.log(self.Notifications);
                    console.log("Length : " + self.Notifications.length);

                    if (self.Notifications[0] === null) {
                        console.log(" null");
                        self.No_Notification = 0;
                        self.EnableNotification=false
                    }else{
                        self.EnableNotification=true
                        self.No_Notification = self.Notifications.length
                    }


                    d.resolve();
                })
                .error(function error(msg) {
                    console.log(msg);
                    d.reject();
                });
            return d.promise;
        }, 'LoadReadNotification': function (Account_ID, id) {
            var d = $q.defer();
            $http.get('http://ded.sdg.ae/_MobFiles/AjmanDED_MobService.asmx/Notification_UpdateStatus?AccountID=' + Account_ID + '&NotificationId=' + id)
                .success(function success(data) {

                    var x2 = data.replace("<?xml version=\"1.0\" encoding=\"utf-8\"?>", "");
                    x2 = x2.replace("<string xmlns=\"http://AjmanDED-MobData.org/\">", "");
                    x2 = x2.replace("</string>", "");

                    var NewArray = JSON.parse(x2);
                    self.ReadNotification = NewArray;
                    console.log(self.ReadNotification);
                    //  console.log(self.Notifications.length);
                    // self.No_Notification=self.Notifications.length;
                    d.resolve();
                })
                .error(function error(msg) {
                    console.log(msg);
                    d.reject();
                });
            return d.promise;
        }, 'LoadVote_SendAnswer': function (Account_ID , QuestionId , AnswerId ) {
            var d = $q.defer();
            $http.get('http://ded.sdg.ae/_MobFiles/AjmanDED_MobService.asmx/Vote_SendAnswer?AccountID='+Account_ID+'&QuestionId='+QuestionId+'&AnswerId='+AnswerId)
                .success(function success(data) {

                    console.log('http://ded.sdg.ae/_MobFiles/AjmanDED_MobService.asmx/Vote_SendAnswer?AccountID='+Account_ID+'&QuestionId='+QuestionId+'&AnswerId='+AnswerId);
                    var x2 = data.replace("<?xml version=\"1.0\" encoding=\"utf-8\"?>", "");
                    x2 = x2.replace("<string xmlns=\"http://AjmanDED-MobData.org/\">", "");
                    x2 = x2.replace("</string>", "");

                    var NewArray = JSON.parse(x2);
                    self.Vote_SendAnswer = NewArray;
                    console.log(self.Vote_SendAnswer);
                    d.resolve();
                })
                .error(function error(msg) {
                    console.log(msg);
                    d.reject();
                });
            return d.promise;
        }, 'LoadVote_GetAnswers': function (QuestionId) {
            var d = $q.defer();
            $http.get('http://ded.sdg.ae/_MobFiles/AjmanDED_MobService.asmx/Vote_GetAnswers?QuestionId='+QuestionId)
                .success(function success(data) {

                    console.log('http://ded.sdg.ae/_MobFiles/AjmanDED_MobService.asmx/Vote_GetAnswers?QuestionId='+QuestionId);
                    var x2 = data.replace("<?xml version=\"1.0\" encoding=\"utf-8\"?>", "");
                    x2 = x2.replace("<string xmlns=\"http://AjmanDED-MobData.org/\">", "");
                    x2 = x2.replace("</string>", "");

                    var NewArray = JSON.parse(x2);
                    self.Vote_GetAnswer = NewArray;
                    console.log(self.Vote_GetAnswer);
                    d.resolve();
                })
                .error(function error(msg) {
                    console.log(msg);
                    d.reject();
                });
            return d.promise;
        },

    };
    return self;

});