
	var myForm = document.getElementById('submitForm'),
		cloneIndexButton = document.getElementById('addIndex'),
		Results = {};

	var addAlt = function(){
		var altList = $(event.target).prev('.alts'),
			subarea = $(altList).children('li.alt').children().attr('data-subarea'),
			name = $(altList).children('li.alt').children().attr('data-name'),
			className = $(altList).children('li.alt').children().attr('class'),
			newAlt = '<li class="alt"><input class="'+className+'" type="text" data-type="alts" data-subarea="'+subarea+'" data-name="Alt: "> </li>';
		$(altList).append(newAlt);
	}
	var sendMail = function() {
	    var results = dppForm()
	    	jobinfo = results.jobinfo,
	    	link = "mailto:pkeller@omnipress.com"
	             + "&subject=" + escape('DPP qc for '+jobinfo[0]['answer']+' - '+jobinfo[1]['answer'])
	             + "&body=" + escape('Job Number: '+jobinfo[0]['answer']+'\n Acronym: '+jobinfo[1]['answer']+',\n Completed By: '+ jobinfo[2]['answer'] +'\n Submitted At: '+ new Date());
		window.location.href = link;
	}
	var dppForm = function(event){
		var myInput = document.getElementById('dpp_proofing').elements,
			jobinfo = [], functionality =[], layout = [], navigation = [], search = [], indices = [];
		for(i=0;i<myInput.length;i++){
			var dataName = myInput[i].getAttribute('data-name'),
				groupName = myInput[i].getAttribute('name'),
				subarea = myInput[i].getAttribute('data-subarea'),
				section = myInput[i].getAttribute('class'),
				type = myInput[i].type,
				dataType = myInput[i].getAttribute('data-type');

				if(type === 'checkbox'){
					if(myInput[i].checked){
						answer = myInput[i].value;
					}else{
						answer = 'No';
					}
				}else if(type === 'radio'){
					if(myInput[i].checked === true && myInput[i].getAttribute('name') === groupName){
						answer = myInput[i].value;
						if(section === 'jobinfo'){
							jobinfo.push({'field':dataName, 'answer':answer, 'type':type, 'data_type':dataType});
						}
						if(section === 'functionality'){
								functionality.push({'subarea':subarea, 'field':dataName, 'answer':answer, 'type':type, 'data_type':dataType});
						}
						if(section === 'layout'){
							layout.push({'subarea':subarea, 'field':dataName, 'answer':answer, 'type':type, 'data_type':dataType});
						}
						if(section === "navigation"){
							navigation.push({'subarea':subarea, 'field':dataName, 'answer':answer, 'type':type, 'data_type':dataType});
						}
						if(section === 'search'){
							search.push({'field':dataName, 'answer':answer, 'type':type, 'data_type':dataType});
						}
						if(section === 'index'){
							indices.push({'subarea':subarea, 'field':dataName, 'answer':answer, 'type':type, 'data_type':dataType});
						}
					}
				}else if(type == 'text'){
					answer = myInput[i].value;
				}
			if(type !== 'radio'){
				if(section === 'jobinfo'){
					jobinfo.push({'field':dataName, 'answer':answer, 'type':type, 'data_type':dataType});
				}
				if(section === 'functionality'){
						functionality.push({'subarea':subarea, 'field':dataName, 'answer':answer, 'type':type, 'data_type':dataType});
				}
				if(section === 'layout'){
					layout.push({'subarea':subarea, 'field':dataName, 'answer':answer, 'type':type, 'data_type':dataType});
				}
				if(section === "navigation"){
					navigation.push({'subarea':subarea, 'field':dataName, 'answer':answer, 'type':type, 'data_type':dataType});
				}
				if(section === 'search'){
					search.push({'field':dataName, 'answer':answer, 'type':type, 'data_type':dataType});
				}
				if(section === 'index'){
					indices.push({'subarea':subarea, 'field':dataName, 'answer':answer, 'type':type, 'data_type':dataType});
				}
			}
		}
		Results.jobinfo = jobinfo;
		Results.functionality = functionality;
		Results.layout = layout;
		Results.navigation = navigation;
		Results.search = search;
		Results.indices = indices;
		displayFullResults(Results);
		return Results;
	}
	var displayFullResults = function(data){
		var output = document.getElementById('output');
		document.getElementById('dpp_proofing').style.display = 'none';
		output.style.display = 'block';
		output.scrollTop = 0;
		$('#qcList').css({'display':'none'});
		$('#altsList').css({'display':'block'});
		// JOB INFORMATION
		var jobInfoResults = '',
			jobInfoDisplay = document.getElementById('job');
		for(i=0;i<data.jobinfo.length;i++){
			jobInfoResults += '<p class="'+data.jobinfo[i]['type']+'"><span class="bold">'+data.jobinfo[i]['field']+'</span> '+data.jobinfo[i]['answer']+'</p>';
		}
		jobInfoDisplay.innerHTML = '<h2>Job Information</h2>'+jobInfoResults+ '<p><span class="bold"> Date: </span>'+ new Date()+'</p>';
		
		// FUNCTIONALITY
		var analyticsResults ='<h3>Analytics</h3>',
			accessResults='<h3>Access</h3>',
			ecommerceResults ='<h3>eCommerce</h3>'
			functionalityDisplay = document.getElementById('functionality');
		for(i=0;i<data.functionality.length;i++){
			
			if(data.functionality[i]['subarea'] === 'functionality'){
				siteLive = data.functionality[i]['answer'];
			}
			if(data.functionality[i]['subarea'] === 'analytics'){
				analyticsResults += '<p class="'+data.functionality[i]['type']+'"><span class="bold">'+data.functionality[i]['field']+'</span> '+data.functionality[i]['answer']+'</p>';
			}
			if(data.functionality[i]['subarea'] === 'access'){
				accessResults += '<p class="'+data.functionality[i]['type']+'"><span class="bold">'+data.functionality[i]['field']+'</span> '+data.functionality[i]['answer']+'</p>';
			}
			if(data.functionality[i]['subarea'] === 'ecommerce'){
				ecommerceResults += '<p class="'+data.functionality[i]['type']+'"><span class="bold">'+data.functionality[i]['field']+'</span> '+data.functionality[i]['answer']+'</p>';
			}
		}
		if(siteLive !== 'No'){
			functionalityDisplay.innerHTML = '<h2>Functionality</h2>'+analyticsResults+accessResults+ecommerceResults;
		}else{
			functionalityDisplay.innerHTML = "<h2>Functionality</h2><p>The site is not live. We are unable to check the Google Analytics, Access roles and eCommerce at this time.</p>"
		}
		
		// LAYOUT
		var bannerResults = '<h3>Banner</h3>', footerResults = '<h3>Footer</h3>', homepageResults = '<h3>Homepage</h3>',
			bannerDisplay = document.getElementById('banner'),
			homepageDisplay = document.getElementById('homepage'),
			footerDisplay = document.getElementById('footer');
		for(i=0;i<data.layout.length;i++){
			if(data.layout[i]['subarea'] === 'banner' && data.layout[i]['answer']){
				bannerResults += '<p class="'+data.layout[i]['type']+'"><span class="bold">'+data.layout[i]['field']+'</span> '+data.layout[i]['answer']+'</p>';
			}
			else if(data.layout[i]['subarea'] === 'footer' && data.layout[i]['answer']){
				footerResults += '<p class="'+data.layout[i]['type']+'"><span class="bold">'+data.layout[i]['field']+'</span> '+data.layout[i]['answer']+'</p>';
			}
			else if(data.layout[i]['subarea'] === 'homepage' && data.layout[i]['answer']){
				homepageResults += '<p class="'+data.layout[i]['type']+'"><span class="bold">'+data.layout[i]['field']+'</span> '+data.layout[i]['answer']+'</p>';
			}
		}
		bannerDisplay.innerHTML = '<h2>Layout</h2>'+bannerResults;
		homepageDisplay.innerHTML = homepageResults;
		footerDisplay.innerHTML = footerResults;
		
		// NAVIGATION
		var tnResults = '<h3>Top Navigation</h3>', 
			snResults = '<h3>Sidebar Navigation</h3>',
			tnDisplay = document.getElementById('tn'),
			snDisplay = document.getElementById('sn');
		for(i=0;i<data.navigation.length;i++){
			if(data.navigation[i]['subarea'] === 'tn' && data.navigation[i]['answer']){
				tnResults += '<p class="'+data.navigation[i]['type']+'"><span class="bold">'+data.navigation[i]['field']+'</span> '+data.navigation[i]['answer']+'</p>';
			}
			if(data.navigation[i]['subarea'] === 'sn' && data.navigation[i]['answer']){
				snResults += '<p class="'+data.navigation[i]['type']+'"><span class="bold">'+data.navigation[i]['field']+'</span> '+data.navigation[i]['answer']+'</p>';
			}
		}
		tnDisplay.innerHTML = '<h2>Navigation</h2>'+tnResults;
		snDisplay.innerHTML = snResults;
		// SEARCH
		var searchResults = '',
			searchDisplay = document.getElementById('search');
		for(i=0;i<data.search.length;i++){
			if(data.search[i]['answer']){
				searchResults += '<p class="'+data.search[i]['type']+'"><span class="bold">'+data.search[i]['field']+'</span> '+data.search[i]['answer']+'</p>';
			}
		}
		searchDisplay.innerHTML = '<h2>Search</h2>'+searchResults;

		//INDICES
		var indicesResults = '',
			indicesDisplay = document.getElementById('index');
			for(i=0;i<data.indices.length;i++){
				if(data.indices[i]['field'] === 'Title'){
					if(data.indices[i]['subarea'] === 'index'){
						indicesResults += '<div class="index-group"><h3>Index Title: '+data.indices[i]['answer']+'</h3>';
					}else {
						indicesResults += '<h3>Paper Name: '+data.indices[i]['answer']+'</h3>';
					}
				}else{
					if(data.indices[i]['subarea'] === 'index' && data.indices[i]['answer']){
						indicesResults += '<p class="'+data.indices[i]['type']+'"><span class="bold">'+data.indices[i]['field']+'</span> '+data.indices[i]['answer']+'</p>';
					}else{
						if(data.indices[i]['answer']){
							indicesResults += '<p class="'+data.indices[i]['type']+'"><span class="bold">'+data.indices[i]['field']+'</span> '+data.indices[i]['answer']+'</p>';
						}
					}
				}
			}
			indicesDisplay.innerHTML = '<h2>Indices</h2>'+indicesResults;
	}
	var showLiveSite = function(){
		if(document.getElementById('liveFunctionality').checked){
			document.getElementById('liveSite').style.display = 'block';
		}else{
			document.getElementById('liveSite').style.display = 'none';
		}
	}
	var displayAlts = function(){
		var results = dppForm(),
			banner_alts = '', footer_alts = '',
			top_navigation_alts = '', side_navigation_alts = '',
			search_alts = '',
			indices_alts = '',
			functionality_alts = '',
			siteLive = 'No',
			functionality = document.getElementById('functionality'),
			banner = document.getElementById('banner'),
			footer = document.getElementById('footer'),
			top_nav = document.getElementById('tn'),
			side_nav = document.getElementById('sn'),
			search = document.getElementById('search'),
			index = document.getElementById('index');
		
		for(var i=0;i<results.functionality.length;i++){
			siteLive = results.functionality[i]['answer'];
			if(results.functionality[i]['data_type'] === 'alts' && results.functionality[i]['answer']){
				functionality_alts += '<li>'+results.functionality[i]['answer']+'</li>';
			}
		}
		for(var i=0;i<results.layout.length;i++){
			if(results.layout[i]['data_type'] === 'alts' && results.layout[i]['answer']){
				if(results.layout[i]['subarea'] === 'banner'){
					banner_alts +=  '<li>'+results.layout[i]['answer']+'</li>';
				}
				if(results.layout[i]['subarea'] === 'footer'){
					footer_alts +=  '<li>'+results.layout[i]['answer']+'</li>';
				}
			}
		}
		for(var i=0;i<results.navigation.length;i++){
			if(results.navigation[i]['subarea'] === 'tn'){
				if(results.navigation[i]['data_type']==='alts' && results.navigation[i]['answer']){
					top_navigation_alts +=  '<li>'+results.navigation[i]['answer']+'</li>';
				}
			}
			if(results.navigation[i]['subarea'] === 'sn'){
				if(results.navigation[i]['data_type']==='alts' && results.navigation[i]['answer']){
					side_navigation_alts +=  '<li>'+results.navigation[i]['answer']+'</li>';
				}
			}
		}
		for(var i=0;i<results.search.length;i++){
			if(results.search[i]['data_type']==='alts' && results.search[i]['answer']){
				search_alts +=  '<li>'+results.search[i]['answer']+'</li>';
			}
		}
		for(var i=0;i<results.indices.length;i++){
			if(results.indices[i]['data_type']==='alts' && results.indices[i]['answer']){
				indices_alts +=  '<li>'+results.indices[i]['answer']+'</li>';
			}
		}

		if(siteLive !== 'No'){
			functionalityDisplay.innerHTML = '<ul class="plain-list">'+functionality_alts+'</ul>';
		}
		functionality.innerHTML = '<h3>Functionality</h3><ul class="plain-list">'+functionality_alts+'</ul>';
		banner.innerHTML = '<h3>Banner</h3><ul class="plain-list">'+banner_alts+'</ul>';
		footer.innerHTML = '<h3>Footer</h3><ul class="plain-list">'+footer_alts+'</ul>';
		top_nav.innerHTML = '<h3>Top Navigation</h3><ul class="plain-list">'+top_navigation_alts+'</ul>';
		side_nav.innerHTML = '<h3>Side Navigation</h3><ul class="plain-list">'+side_navigation_alts+'</ul>';
		search.innerHTML = '<ul class="plain-list">'+search_alts+'</ul>';
		index.innerHTML = '<ul class="plain-list">'+indices_alts+'</ul>';
		$('#altsList').css({'display':'none'});
		$('#qcList').css({'display':'block'});
	}

	var printForm = function(){
		document.getElementById('functionality').style.display = 'block';
		document.getElementById('banner').style.display = 'block';
		document.getElementById('footer').style.display = 'block';
		document.getElementById('tn').style.display = 'block';
		document.getElementById('sn').style.display = 'block';
		document.getElementById('search').style.display = 'block';
		document.getElementById('index').style.display = 'block';
		displayFullResults(dppForm());
	}
	var i = 1;
	var indexTemplate = function(){
		var source   = $("#index-template").html(),
		 	template = Handlebars.compile(source);
		 	
			$("#index-placeholder").append(template({number:i}));
			i++;
	}
	var paperTemplate = function(){
		var source   = $("#paper-template").html(),
			template = Handlebars.compile(source);

			$(".paper-placeholder").last().append(template({number:i}));
			i++;
	}
	var init = (function(){
		indexTemplate();
	})();
	myForm.addEventListener('click', dppForm, false);
	myForm.addEventListener('click', sendMail, false);
	document.getElementById('liveFunctionality').addEventListener('click', showLiveSite, false);
	document.getElementById('altsList').addEventListener('click', displayAlts, false);
	document.getElementById('qcList').addEventListener('click', printForm, false);


