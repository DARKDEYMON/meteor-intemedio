import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Recipes = new Mongo.Collection('recipes');

Recipes.allow({
	insert: function(userId, doc){
		return !!userId
	},
	update: function(userId, doc){
		return !!userId
	}
});

Ingredient = new SimpleSchema({
	name: {
		type: String,
		label: "Nombre"
	},
	amount: {
		type: String
	}
});

RecipesSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Nombre"
	},
	desc: {
		type: String,
		label: "Descripcion"
	},
	ingredients: {
		type: [Ingredient]
	},
	inMenu: {
		type: Boolean,
		defaultValue: false,
		optional: true,
		autoform: {
			type:"hidden"
		}
	},
	author: {
		type: String,
		label: "Autor",
		autoValue: function(){
			return this.userId
		},
		autoform: {
			type:"hidden"
		}
	},
	createAt: {
		type: Date,
		label: "Create At",
		autoValue: function(){
			return new Date()
		},
		autoform: {
			type:"hidden"
		}
	}
});

Meteor.methods({
	toggleMenuItem:function(id,currentState){
		Recipes.update(id,{
			$set:{
				inMenu: !currentState
			}
		});
	},
	deleteRecipe: function(id){
		Recipes.remove(id);
	}
})

Recipes.attachSchema(RecipesSchema);