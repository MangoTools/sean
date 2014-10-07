'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location','User', 'Authentication','Message', 'Articles',
	function($scope, $stateParams, $location,User, Authentication,Message, Articles) {
		$scope.user = User.get();

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
                Message.success('Article','Article successfully created');
				$location.path('articles/' + response.id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
                Message.error('Article',errorResponse.data.message);
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
                Message.success('Article','Articlesuccessfully updated');
				$location.path('articles/' + article.id);
			}, function(errorResponse) {
                Message.error('Article',errorResponse.data.message);
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
