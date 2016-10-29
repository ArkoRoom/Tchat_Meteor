import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tchats } from '../../api/tchats.js';

import template from './tchatHome.html';

class TchatCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      tchats() {
        return Tchats.find({});
      }
    })
  }
}

export default angular.module('tchatHome', [
  angularMeteor
])
  .component('tchatHome', {
    templateUrl: 'imports/components/tchatHome/tchatHome.html',
    controller: ['$scope', TchatCtrl]
  });
