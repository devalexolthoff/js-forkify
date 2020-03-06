 import uniqid from 'uniqid'
 export default class ShoppingList {
     constructor() {
         this.items = [];
     }
     addItem(count, unit, ingredient){
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        // Good practice to return
        return item
     }
     deleteItem(id){
         const index = this.items.findIndex(el => el.id === id)
         // Splice mutates, slice doesn't
         // splice(1,1) is index, how many
         // slice(1,1) is start and end, returns nothing
         this.items.splice(index,1)
     }
     updateCount(id,newCount){
         this.items.find(el => el.id === id).count = newCount
     }
 }