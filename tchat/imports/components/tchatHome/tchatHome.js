import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './tchatHome.html';

class TchatCtrl {
  constructor() {
    this.tasks = [{
      text: 'This is task 1'
    }, {
      text: 'This is task 2'
    }, {
      text: 'This is task 3'
    }];
  }
}

export default angular.module('tchatHome', [
  angularMeteor
])
  .component('tchatHome', {
    templateUrl: 'imports/components/tchatHome/tchatHome.html',
    controller: TchatCtrl
  });
