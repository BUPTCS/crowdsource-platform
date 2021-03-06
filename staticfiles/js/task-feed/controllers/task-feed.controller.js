/**
* TaskFeedController
* @namespace crowdsource.task-feed.controllers
 * @author dmorina
*/
(function () {
  'use strict';

  angular
    .module('crowdsource.task-feed.controllers')
    .controller('TaskFeedController', TaskFeedController);

  TaskFeedController.$inject = ['$window', '$location', '$scope', 'TaskFeed', '$filter', 'Authentication'];

  /**
  * @namespace TaskFeedController
  */
  function TaskFeedController($window, $location, $scope, TaskFeed, $filter, Authentication) {
      var vm = this;
      var userAccount = Authentication.getAuthenticatedAccount();
      if (!userAccount || !userAccount.profile) {
        $location.path('/login');
        return;
      }
      
      var self = this;
      self.modules = [];

      TaskFeed.getProjects().then(
        function success (successData) {
          var data = successData[0];
          data.forEach(function(item) {
            var project = {
              name: item.name,
              description: item.description,
              category: item.category,
              skills: item.keywords,
              tasks: 32,
              requester: 'Alan',
              pay: '$15/hr'
            }
            self.modules.push(project);
          });
        },
        function error(errData) {
          self.error = errData[0].detail;
        }
      ).finally(function () {});

      
      self.modules = [
          {
              name: "Build a website using AngularJs",
              description: "Build a website using Python Django Framework, AngularJs and Material Design",
              category: "Programming",
              skills: "html, angularjs, python, django, css",
              tasks: 32,
              requester: 'Alan',
              pay: '$15/hr'


          },
          {
              name: "Help me write a research paper",
              description: "Topic of the paper is crowd sourcing platforms...",
              tasks: 23,
              category: "Writing",
              skills: "English, research",
              requester: 'Matt',
              pay: '$7/hr'
          },
          {
              name: "Proof read my paper",
              description: "A 10 page paper about dragons",
              tasks: 13,
              category: "Reading",
              skills: "English",
              requester: 'Peter',
              pay: '$5/hr'
          },
          {
              name: "Label galaxies",
              description: "Label images of galaxies using the predefined options",
              tasks: 47,
              category: "Data Science",
              skills: "None required",
              requester: 'Neo',
              pay: '$12/hr'
          }
      ];
      
  }

})();