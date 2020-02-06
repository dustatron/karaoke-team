export class Battle {
    constructor(character, inventory) {
        this.state = 0;
        this.character = character;
        this.inventory = inventory
        
    }

    updateInventory(action, testItem){
        let that = this;
        let timesByAmount = this.inventory.items.length;
        let newItem; 

        if (action === "hold") {
            that.character.user1.hp +=5;
            return "hold"
        } else if (action === "draw"){
            //for testing of random number
            if(testItem){
               newItem = that.writeToFreeItem(testItem);
               that.dropItems(newItem);
            } else {
                newItem = that.writeToFreeItem(Math.floor(Math.random() * timesByAmount));
                that.dropItems(newItem);
            }
        } else {
            return "Error on draw"
        }
    };

    runAttack(action){
        //check action.
        //if is 'hold' add 5 point to HP
        //advanceTurn()

        //if attack is 'attack' do math.
        //update user totals.
        //check user is still alive.
        //advanceTurn()
    }

    writeToFreeItem(index){
        let that = this;
        if(this.inventory.items[index].id === 'none') {
            that.inventory.items[index].id = that.character.getUser();
            return that.inventory.items[index].id;
        } else {
            // let newIndex = index + 1;
            // writeToFreeItem(newIndex);

            return 'Item has user';
        }
    }

    dropItems(newItem){
        for (let i = 0; i < this.inventory.items.length; i++) {
            let item = this.inventory.items[i];
            if (item.id === newItem.id && item.name !== newItem.name) {
                item.id = "none";
            }
        }
    }

}