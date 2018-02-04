import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';


Template.Recipe.helpers({
	updateRecipe:function(){
		return this._id;
	}
});

Template.Recipe.events({
	'click .toogle-menu': function(){
		Meteor.call('toggleMenuItem',this._id,this.inMenu);
	},
	'click .fa-trash':function(){
		//console.log(this);
		Meteor.call('delete',this._id);
	},
	'click .fa-pencil':function(){
		//console.log(this);
		Session.set('editMode',!Session.get('editMode'));
	}
});