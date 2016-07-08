juke.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('', '/albums')
	$urlRouterProvider.when('/artists/:artistId', '/artists/:artistId/albums')

	$stateProvider.state('albumList' , {
		url: '/albums',
		templateUrl: '/templates/allAlbums.html',
		controller: 'AlbumsCtrl',
		resolve: {
			albums: function(AlbumFactory){
				return AlbumFactory.fetchAll();
			}
		}
	})
	.state('artistList', {
		url: '/artists',
		templateUrl: '/templates/allArtists.html',
		controller: 'ArtistsCtrl', 
		resolve: {
			artists: function(ArtistFactory){
				return ArtistFactory.fetchAll();
			}
		}
	})
	.state('oneAlbum', {
		url: '/albums/:albumId',
		templateUrl: 'templates/oneAlbum.html',
		controller: 'AlbumCtrl', 
		resolve: {
			album: function(AlbumFactory, $stateParams){
				return AlbumFactory.fetchById($stateParams.albumId);
			}
		}
	})
	.state('oneArtist', {
		url: '/artists/:artistId',
		templateUrl: 'templates/oneArtist.html',
		controller: 'ArtistCtrl',
		resolve: {
			artist: function(ArtistFactory, $stateParams){
				return ArtistFactory.fetchById($stateParams.artistId);
			}
		}

	})
	.state('oneArtist.albums', {
		url: '/albums',
		templateUrl: 'templates/oneArtistAlbums.html'
	})
	.state('oneArtist.songs', {
		url: '/songs',
		templateUrl: 'templates/oneArtistSongs.html'
	})
});

juke.run(function ($rootScope) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.error('Error transitioning from "' + fromState.name + '" to "' + toState.name + '":', error);
  });
});