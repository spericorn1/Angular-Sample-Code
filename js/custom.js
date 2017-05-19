var App = angular.module('app', ['angularUtils.directives.dirPagination']);
App.controller('search', function ($scope,$rootScope,$http,$timeout,WebService,$filter) {
	   /*listing stores*/
	   $scope.liststore= function(){
		    post_data  ='';
		    link="/liststore";
		    var promise = WebService.send_data( link,post_data);
			promise.then(function(response){  
			    $scope.liststores = response;
				
				console.log( $scope.liststores);
			});	
		};
        /*listing store user*/
		$scope.listcreateduser= function(id){
			post_data  ={'id':id};
		    link="/liststoreusers";
		    var promise = WebService.send_data( link,post_data);
			promise.then(function(response){  
			    $scope.listusers = response;
				console.log( $scope.listusers);
			});
		};
		/*Select single store details */
		$scope.Selectestore= function(id){
			post_data  ={'id':id};
		    link="/selectstore";
		    var promise = WebService.send_data( link,post_data);
			promise.then(function(response){  
			    if(response.status=='success'){
					//$location.path('/storeedit');
                    window.location.replace(base_url+"/editstore");				
				}
			});
		};
		/*Listing banners */
		$scope.listbanner= function(id){
			post_data  ={"id":id};
		    link="/listbanner";
		    var promise = WebService.send_data( link,post_data);
			promise.then(function(response){  
			    $scope.listbanner=response;
			});
		};
		/*Add banners */
		$scope.AddBanner= function(){
			if ($('#addbanner').parsley().validate()) {
				$scope.isDisabled=true;
			   $(".disables").attr("disabled","disabled");
			   $('#addbanner').ajaxForm(function(options) {
				 $scope.isDisabled=false;
				  var items = JSON.parse(options);
				  $(".disables").prop("disabled", false);
				  $('html, body').animate({
					 scrollTop: $(".uploadsucess").offset().top - 100
				 }, 'fast');
				 $(".uploadsucess").show();
				 $(".uploadsucess").html('<p class="alert alert-success">' + items.msg + '</p>');
				 setTimeout(function() {
					 $(".uploadsucess").hide(); $('#addbanner')[0].reset();
				   }, 2000);
				   post_data  ={"id":items.id};
                   link="/listbanner";
			       var promise = WebService.send_data( link,post_data);
				  promise.then(function(response){  
					   $scope.listbanner=response;
				   });
			   });
			  
            }
		};
		/*Add department */
		$scope.Adddpt= function(){
			
			if ($('#adddpts').parsley().validate()) {
		        $('#adddpts').ajaxForm(function(options) {
				 var items = JSON.parse(options);
				 
				 $('html, body').animate({
					 scrollTop: $(".adddpts").offset().top - 100
				    }, 'fast');
				 $(".adddpts").show();
				 $(".adddpts").html('<p class="' +items.class + '">' + items.msg + '</p>');
				 
				 if(items.status=='success'){
						ids=items.storeid;
						setTimeout(function() {
							 $(".adddpts").hide(); $('#addbanner')[0].reset();
						 }, 2000);
						post_data  ={"store_id":ids};
						link="/listdepartments";
					    var promise = WebService.send_data( link,post_data);
						promise.then(function(response){  
							$scope.listdepartments=response;
						});
				    }
			    });
		  
            }
		};
		/*list department */
		$scope.listdepartments= function(id){
			post_data  ={"store_id":id};
		    link="/listdepartments";
		    var promise = WebService.send_data( link,post_data);
			promise.then(function(response){  
			    $scope.listdepartments=response;
			});
		};
		/*list users -admin */
		$scope.listUsers= function(){
			post_data  ={};
		    link="/listingusersadmin";
		    var promise = WebService.send_data( link,post_data);
			promise.then(function(response){  
			    $scope.listingusers=response;
			});
		};
		/*list Roles -admin */
		$scope.listRoles= function(){
			post_data  ={};
		    link="/listingroles";
		     var promise = WebService.send_data( link,post_data);
			promise.then(function(response){  
			    $scope.listingroles=response;
			});
		};
		/*list Roles -admin */
        $scope.bannerCreated= function(){
           if ($('#editbanner').parsley().validate()) {
   

			 $('#editbanner').ajaxForm(function(options) {
				  var items = JSON.parse(options);
				  var s = items.msg;
				  ids=items.id;
				  $('html, body').animate({
					 scrollTop: $(".uploadsucess").offset().top - 100
				    }, 'fast');
				  $(".uploadsucesss").show();
				  $(".uploadsucesss").html('<p class="alert alert-success">' + s + '</p>');

				  setTimeout(function() {
					 $(".uploadsucesss").hide(); 
				   }, 2000);
				   $scope.listbanner(ids);
				});
	        }
        } ;
	});
App.filter('startsWithLetter', function () {
  return function (items, letter) {
    var filtered = [];
    var letterMatch = new RegExp(letter, 'i');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (letterMatch.test(item.name.substring(0, 1))) {
        filtered.push(item);
      }
    }
    return filtered;
  };
});
/*search daterange base */
App.filter('dateRange', function() {
     return function(records, dateKey, from, to) {
       return records.filter(function(record) {
         return !moment(record[dateKey], 'd-MMM-yyyy').isBefore(moment(from))
                && !moment(record[dateKey], 'd-MMM-yyyy').isAfter(moment(to));
            });
        }
    });
/*search type base */
App.filter('selectedTags', function() {
    return function(listcategory, tags) {
        return listcategory.filter(function(task) {
            if(tags !=''){
				
            for (var i in task.type) {
                if (tags.indexOf(task.type[i]) != -1) {
                    return true;
                }
            }
            return false;
			}else{
				return listcategory;
			}

        });
		return true;
		
    };
});
 App.controller('store', function ($scope,$rootScope,$http,$timeout,WebService,$filter) {
	    /*List Category*/
	    $scope.listcategory= function(){
		    post_data  ='';
		    link="/listingcategory";
		    var promise = WebService.send_data( link,post_data);
			promise.then(function(response){  
			    $scope.listcategory = response;
			});	
		};
		/*Select Type*/
		$scope.selectetype= function(type){
		   $scope.tags = [];
			if(type !='all'){
			  var i = $.inArray(type,  $scope.tags);
		       if (i < -1) {
					$scope.tags.splice(i, 1);
				} else {
					$scope.tags.push(type);
				}
		    }
	    };
		/*Autocomplete restuarants*/
		$scope.complete=function(){

		  var tags = $("#tags").val();
		 
		   $( "#tags" ).autocomplete({

			   source: function(request, response) {
			       post_data  ={'search':tags,'_token':CSRF_TOKEN};
		           link="/restuarants";
		           var promise = WebService.send_data( link,post_data);
                   promise.then(function(responses){  
						response( $.map( responses, function( item ) {
							return {
							 label: item.name,
							 value: item.name,
							 id: item.id    
							}
						}));
				   });
			    },minLength: 2,
			    select: function(event, ui) {  
			       $("#tags").append(  
						"<li class='clickable' role='presentation' onClick='getidcustomer("+ui.id+")' data-value='"+ ui.value +"'><a>"+ ui.label + "</a></li>"  
					);     
				}
		    }).data("ui-autocomplete")._renderItem = function (ul, item) {
				return $("<li></li>")
				.data("item.autocomplete", item)
				.append("<li class='clickable' role='presentation' onClick='getidcustomer("+item.id+")' data-value='"+ item.value +"'><a>" + item.label + "</a></li>" )
				.appendTo(ul);
	        };
        };
   });
