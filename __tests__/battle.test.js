import { Battle } from './../src/js/battle.js';
import { exportAllDeclaration } from '@babel/types';
import { Character } from './../src/js/character.js';
import { Inventory } from './../src/js/inventory.js';


describe('Battle Object', () => {
  test('should create a new battle object', () => {
    var battle = new Battle();
    expect(battle).toEqual({ state: 0 })
  });
});

describe('update inventory', () => {
  var inventory = new Inventory();
  var character = new Character();
  var battle = new Battle(character, inventory);

  test('should return hold', () => {
    expect(battle.updateInventory("hold")).toEqual("hold")
  });

  test('should return user1s health increased by 5 hp',() => {
    character.user1 = { id: 1, name: "Sophia Petrillo", hp: 65, armor: 35, magic: 10, img: '' }
    battle.updateInventory("hold");
    expect(character.user1.hp).toEqual(70);
  });

  test('should update users item when draw is passed', () => {
    battle.updateInventory("draw", 1);
    expect(inventory.items[1].id).toEqual('user1');
  });

  test('should clear items user had on last turn when draw is passed in', () => {
    inventory.items[0].id = 'user1';
    battle.updateInventory("draw", 1);
    expect(inventory.items[0].id).toEqual('user1');
  });
});

describe('write to free item', () => {
  var inventory = new Inventory();
  var character = new Character();
  var battle = new Battle(character, inventory);

  test('should add user1 to a random items id in inventory', () => {
    battle.writeToFreeItem(1);
    expect(inventory.items[1].id).toEqual('user1');
  });

  test('should not write to an item if a user has it', () => {
    expect(battle.writeToFreeItem(1)).toEqual('Item has user');
  });

});

describe('drop items', () => {
  var inventory = new Inventory();
  var character = new Character();
  var battle = new Battle(character, inventory);

  inventory.items[0].id = 'user1';
  inventory.items[1].id = 'user1';

  test('should remove user id from item 1', () => {
    let newItem = inventory.items[0];
    battle.dropItems(newItem);
    expect(inventory.items[1].id).toEqual('none');
  });


});