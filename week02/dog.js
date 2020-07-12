class Dog{
    constructor() {
        this.bitPeople = false;
    }

    bit() {
        this.bitPeople = true;
    }
}


let dog = new Dog();
let dog2 = new Dog();
console.log(dog == dog2)
console.log(dog.bitPeople)
dog.bit()
console.log(dog.bitPeople)