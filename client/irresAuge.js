var mapDep = new Deps.Dependency;
var palaceDep = new Deps.Dependency;
var mapcells = [];
var palaces = [];

var mapSize = 40;

//helper functions
var createCell = function (x, y) {
	return {
		x: x,
		y: y,
		visibleBy: [],
		palaces: [],
	};
}

var createPalace = function (owner, x, y, sight) {
	return {
		x: x,
		y: y,
		owner: owner,
		sight: sight,
	}
}

//create all the cells
for (var i = 0; i < mapSize ; i ++) {
	for (var j = 0; j < mapSize ; j ++) {
		mapcells.push(createCell(i, j))
	}
}

//create all the palaces
/*
palaces.push(createPalace( "1",  9,  9, 8));
palaces.push(createPalace( "2", 16, 21, 8));
palaces.push(createPalace( "3", 23, 33, 8));
palaces.push(createPalace( "4", 22,  7, 8));
palaces.push(createPalace( "5", 29, 19, 8));
palaces.push(createPalace( "6", 36, 31, 8));
palaces.push(createPalace( "7", 12, 36, 8));


palaces.push(createPalace( "8", 35,  0, 8));
palaces.push(createPalace( "9",  4, 38, 8));
palaces.push(createPalace("10", 37, 11, 8));
palaces.push(createPalace("11",  3, 23, 8));

palaceDep.changed();
*/
//calcualte what is visible
Deps.autorun(function() {
	palaceDep.depend();
	for (var mapI in mapcells) {
		var cell = mapcells[mapI];
		cell.palaces = [];
		cell.visibleBy = [];

		for (var palaceI in palaces) {
			var palace = palaces[palaceI];

			var maxDistance = mapSize - palace.sight;

			var dx = Math.abs(cell.x - palace.x);
			var dy = Math.abs(cell.y - palace.y);

			if (dx>=maxDistance) dx = mapSize-dx;
			if (dy>=maxDistance) dy = mapSize-dy;

			var distance = Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 0.5);
			
			if (cell.x === palace.x && cell.y === palace.y) {
				cell.palaces.push(palace);
			}

			if (distance <= palace.sight) {
				cell.visibleBy.push(palace)
			}
		}

		mapcells[mapI] = cell;
	}
	mapDep.changed();
});




// template map
Template.map.cells = function () {
	mapDep.depend();
	return mapcells;
}

Template.cell.title = function () {
	return (this.x+1) + ":" + (this.y+1)
	+ (this.palaces.length ? " -- palaces: "+(_.map(this.palaces, function (palace) {return palace.owner}).join(',')) : "")
	+ (this.visibleBy.length ? " -- visibleBy: "+(_.map(this.visibleBy, function (palace) {return palace.owner}).join(',')) : "");
}

Template.cell.position = function () {
	return "top: "+(this.y*20)+"px; left: "+(this.x*20)+"px;";
}

Template.cell.visibleCss = function () {
	if (this.palaces.length > 0) {
		return "background: green;"
	} else if (this.visibleBy.length == 1) {
		return "background: lightblue;";
	} else if (this.visibleBy.length > 1) {
		return "background: #0099FF;";
	} else {
		return "background: white;";
	}
}

Template.map.events({
	'click .cell': function (e,t) {
		palaces.push(createPalace("bob", this.x, this.y, 8));
		palaceDep.changed();
	},
});