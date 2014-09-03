(function(){
Template.__body__.__contentParts.push(Blaze.View('body_content_'+Template.__body__.__contentParts.length, (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("hello")), "\n	", Spacebars.include(view.lookupTemplate("map")) ];
})));
Meteor.startup(Template.__body__.__instantiate);

Template.__define__("hello", (function() {
  var view = this;
  return [ HTML.Raw("<h1>Hello World!</h1>\n		"), Blaze.View(function() {
    return Spacebars.mustache(view.lookup("greeting"));
  }), HTML.Raw('\n	<input type="button" value="Click">') ];
}));

Template.__define__("map", (function() {
  var view = this;
  return HTML.DIV({
    id: "map"
  }, "\n		", Blaze.Each(function() {
    return Spacebars.call(view.lookup("cells"));
  }, function() {
    return [ "\n			", HTML.DIV({
      "class": function() {
        return [ "cell ", Spacebars.mustache(view.lookup("mode")) ];
      },
      id: function() {
        return [ "cell_", Spacebars.mustache(view.lookup("x")), "_", Spacebars.mustache(view.lookup("y")) ];
      },
      title: function() {
        return [ Spacebars.mustache(view.lookup("x")), " ", Spacebars.mustache(view.lookup("y")) ];
      }
    }, "\n			", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("x"));
    }), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("y"));
    }), "\n			"), "\n		" ];
  }), "\n		\n	");
}));

})();
