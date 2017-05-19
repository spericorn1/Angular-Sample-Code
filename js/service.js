 App.service('WebService', function( $http, $q){
       this.send_data = function( link , post_data ){
			var self = this;
			
			var deferred = $q.defer();
			
			var url = base_url + link;
			var result = null;
			
			 var req = {
				 method: 'POST',
				 url: url,
				 data: post_data
			}
			
			 
			$http(req).then( 
				function (data){
					
					deferred.resolve(data.data);		
				},function (error){
					deferred.reject();
				}
			);	
		  
		  return deferred.promise;
		}
	})