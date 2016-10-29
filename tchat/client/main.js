import angular from 'angular';
import angularMeteor from 'angular-meteor';
import tchatHome from '../imports/components/tchatHome/tchatHome';
import '../imports/startup/accounts-config.js';

angular.module('tchat', [
  angularMeteor,
  tchatHome.name,
  'accounts.ui'
]);
