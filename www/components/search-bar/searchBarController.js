angular.module('toDoApp')

.controller('searchBarController', function($scope, $parse, $mdMedia, $timeout, $element) {
    var self = this;
    var expanded = false;
    self.isCondensed = false;

    self.condensed = function() {
        return !$mdMedia('gt-sm')
    }

    self.$onInit = function() {
        self.expandClasses = self.expandClasses || "search-bar--expanded md-whiteframe-z2";
        self.markedClasses = self.markedClasses || "search-bar--marked";
        self.init();
    }

    self.init = function() {
        if (self.ngModel) {
            if (self.isCondensed === true) {
                self.mark();
            } else {
                self.unmark();
                self.expand();
            }
        } else {
            self.unmark();
        }
    }

    self.mark = function() {
        $element.addClass(self.markedClasses);
    }

    self.unmark = function() {
        $element.removeClass(self.markedClasses);
    }

    $scope.$watch(self.condensed, function(isCondensed) {
        self.isCondensed = isCondensed;

        if (self.isCondensed === true) {
            console.log('condense!');
            self.collapse();
            self.init();
        } else {
            self.init();
            console.log('un-condense');
        }
    })

    self.isFocused = {
        input: false,
        closeButton: false
    };

    self.focused = function(componentName) {
        self.isFocused[componentName] = true;
        console.log('focused', componentName);
    };

    self.blurred = function(componentName) {
        self.isFocused[componentName] = false;
        console.log('blurred', componentName);
        $timeout( function() {
            if (!self.searchBarHasFocus() && self.ngModel === "") {
                self.collapse();
            }
        }, 700)
    }

    self.searchBarHasFocus = function() {
        return self.isFocused.input || self.isFocused.closeButton;
    }

    self.isExpanded = function () {
        return expanded;
    }

    self.clearSearch = function () {
        self.ngModel = "";
        $element.find('input').focus();

        console.log('clear search');
    }

    self.expand = function() {
        if (self.isCondensed === true) {
            this.showDialog();
        } else {
            $element.addClass(self.expandClasses);
            expanded = true;
            $element.find('input').focus();
        }
        console.log('expanding...');
    }

    self.collapse = function() {
        $element.removeClass(self.expandClasses);
        expanded = false;
        console.log("collapsing...");
    }
})
