import { Character } from './../src/js/character.js';
import { exportAllDeclaration } from '@babel/types';

describe('Character Object', () => {
  test('should create a new character object with called', () => {
    var character = new Character();
    expect(character).toEqual({ user1: {}, user2: {}, taken: [], turnCount: 1 })
  });
});

describe('get user', () => {
  var character = new Character();

  test('should return user1 when turn count is odd', () => {
    character.turnCount = 1;
    expect(character.getUser()).toEqual('user1');
  });

  test('This should return user2 when turn count is even', () => {
    character.turnCount = 2;
    expect(character.getUser()).toEqual('user2');
  });
});

describe('advance turn', () => {
  var character = new Character();
  character.turnCount = 1
  test('Should advance turncount to 2', () => {
    expect(character.advanceTurn()).toEqual(2);
  });
});

describe('pick golden girl', () => {
  let character = new Character();

  test('should place blanche object in charater.user1', () => {
    character.pickGoldenGirl(0);
    var blanche = { id: 0, name: "Blanche Devereaux", hp: 65, armor: 35, magic: 10, img: '' }
    expect(character.user1).toEqual(blanche);
  });

  test('should check this.taken array to make sure the user selected golden girl hasnt already been selected', () => {

    character.taken = ["Blanche Devereaux"];
    expect(character.pickGoldenGirl(0)).toBe('This Golden Girl has been taken');
  });


  test('should place user selected golden girl name in character.taken array', () => {
    character.taken = []
    character.pickGoldenGirl(0);
    expect(character.taken).toEqual(["Blanche Devereaux"]);
  });

  test('pick golden girl for player2',() => {
    character.turnCount = 2;
    character.pickGoldenGirl(1);
    var sophia = { id: 1, name: "Sophia Petrillo", hp: 65, armor: 35, magic: 10, img: '' }
    expect(character.user2).toEqual(sophia);
  })

})