import angular from 'angular';
import angularMeteor from 'angular-meteor';
import tchatHome from '../imports/components/tchatHome/tchatHome';

angular.module('tchat', [
  angularMeteor,
  tchatHome.name
]);
