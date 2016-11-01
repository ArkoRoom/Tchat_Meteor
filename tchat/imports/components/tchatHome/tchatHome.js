import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Tchats } from '../../api/tchats.js';

import template from './tchatHome.html';

class TchatCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.subscribe('tchats');

    this.helpers({
      tchats() {
        return Tchats.find({}, {
          sort: {
            createdAt: +1
          }
        });
      },
      currentUser() {
        return Meteor.user();
      }
    })
  }

  addMessage(newMessage) {
    // Insert un message dans la bd
    Meteor.call('tchats.insert', newMessage);

    // Vider la zone de saisie
    this.newMessage = '';
  }

  setPrivate(tchat) {
    Meteor.call('tchats.setPrivate', tchat._id, !tchat.private);
  }
}

export default angular.module('tchatHome', [
  angularMeteor
])
  .component('tchatHome', {
    templateUrl: 'imports/components/tchatHome/tchatHome.html',
    controller: ['$scope', TchatCtrl]
  });
