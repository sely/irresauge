
Template.hello.greeting = function () {
	return "Welcome to irresAuge.";
};

Template.hello.events({
	'click input': function () {
	// template data, if any, is available in 'this'
	if (typeof console !== 'undefined')
		console.log("You pressed the button");
	}
});


// template map
Template.map.cells = function () {
	return mapcells;
}

Template.map.events({
	'click .cellstatus_n': function (e,t) {

	},
);

mapcells = [];

width = 40;
height = 40;

//sight = 8;


var createCell = function (i, j) {
	return {
		x: j + 1,
		y: i + 1,
		mode: 0,
		status: 'n',
		player: [],
	};
} 

for (var i = 0; i < height ; i ++) {
	for (var j = 0; j < width ; j ++) {
		mapcells.push(createCell(i, j))
	}
}

