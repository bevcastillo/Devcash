'use strict';
myFirebase.controller('EditCategory', function EditCategory($scope, $location, $firebaseArray, $firebaseObject) {
	var ref = firebase.database().ref().child("datadevcash/owner");

	var user = JSON.parse(window.localStorage.getItem('user'));
	var username = user.owner_username;

	var urlParams = new URLSearchParams(window.location.search);
	var id = urlParams.get('id');

	ref.orderByChild("business/owner_username")
		.equalTo(username)
		.on('value', function(snapshot) {

			snapshot.forEach(function(childSnap) {

				ref.child(childSnap.key)
					.child("business")
					.child("category/"+id)
					.on('value', function(childSnapshot) {
						var categoryData = childSnapshot.val();

						window.localStorage.setItem("categoryData", JSON.stringify(categoryData));
						console.log(childSnapshot.val().category_name);
					});
			});
		});
		
		var categoryData = JSON.parse(window.localStorage.getItem("categoryData"));

		$scope.cat_name = categoryData.category_name;


		$scope.editCategory = function() {
			var category_name = $scope.edit_catname;

			var id = urlParams.get('id');

			if (category_name === undefined) {
				category_name = $scope.edit_catname;
			}

			var editCategoryItem = {
				category_name: category_name
			}

			ref.orderByChild("business/owner_username")
				.equalTo(username)
				.on('value', function(snapshot) {

					snapshot.forEach(function(childSnap) {
						// .orderByChild("account/acct_uname")
							// .equalTo(data.account.acct_uname)

						ref.child(childSnap.key)
							.child("business")
							.child("category/"+id)
							.on('value', function(innerSnapshot) {
								innerSnapshot.ref.update(editCategoryItem);
								window.localStorage.removeItem("categoryData");
								window.location = "/2/view/owner/landing_category.php";
							});
					})
				});
			alert("Update Success");
		}

		$scope.back = function() {
			window.localStorage.removeItem("categoryData");
			window.location = "/2/view/owner/landing_category.php";
		}


		// ref.orderByChild("business/owner_username")
		// 	.equalTo(username)
		// 	.on('value', function(snapshot) {

		// 		snapshot.forEach(function(childSnap) {
		// 			// .orderByChild("account/acct_uname")
		// 				// .equalTo(data.account.acct_uname)

		// 			ref.child(childSnap.key)
		// 				.child("business")
		// 				.child("employee/"+id)
		// 				.on('value', function(innerSnapshot) {
		// 					innerSnapshot.ref.update(editEmployeeItem);
		// 					alert("Update Success");
		// 					window.location = "/2/view/owner/landing_employee.php";
		// 				});
		// 		})
		// 	})
	

	// ref.orderByChild("business/owner_username")
	// 	.equalTo(username)
	// 	.on('value', function(snap) {
	// 		// console.log(snap.val());

	// 		snap.forEach(function(childSnap) {
	// 			childSnap.forEach(function(innerChild) {

	// 				angular.forEach(innerChild.val().employee, function(child, key) {
	// 					// console.log(child["id"] =);
	// 					// console.log(key);
	// 					child["id"] = key
	// 					$scope.employees.push(child);
	// 					$scope.emp_fname = child.emp_fname;
	// 					$scope.emp_lname = child.emp_lname;
	// 					$scope.emp_email = child.emp_email;
	// 					$scope.emp_mobileno = child.emp_mobileno;
	// 					$scope.emp_address = child.emp_addr;
	// 					$scope.emp_bdate = child.emp_bdate;
	// 					$scope.emp_task = child.emp_task;
	// 					$scope.emp_status = child.emp_status;
	// 				});
	// 			});
	// 		});
	// });
});
