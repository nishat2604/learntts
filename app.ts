console.log("your first  code ");

function add(n1: number, n2: number) {
  return n1 + n2;
}
const number1 = 5;
const number2 = 7;
let result: number;
result = add(number1, number2);
console.log(result);

function AddHandler(num: number, num1: number, cb: (res: number) => void) {
  result = num + num1;
  cb(result);
}

AddHandler(number1, number2, () => {
  console.log(result);
});

const hobbies = ["hiike", "chess"];
const myhobbies = ["Cycling", ...hobbies];

const multinumber = (...numbers: number[]) => {

  return numbers.reduce((curresult, currentvalue) => {
    return curresult + currentvalue;
  }, 0);
};

const addnums = multinumber(2, 5, 5, 5, 7.9);

console.log(addnums);

// class Department {
//   // name:string
//  // constructor(private n: string, public employee: string[]) {
//     // this.name=n;
//   //}
//   addemployee(str: string) {
//     //this.n=str;
//     this.employee.push(str);
//   }
//   describe(this:any) {
//     console.log("depart :", this.n, this.employee);
//   }
// }

// var obj = new Department("A", []);
// obj.addemployee("nis");
// obj.addemployee("hjn");
// obj.addemployee("sam");
// obj.describe();

/// Interface

interface Bird {
  type: "bird";
  flyingSpeed: number;
}
interface Horse {
  type: "horse";
  runningspeed1: number;
}

type Animal = Horse | Bird;
function GetSpeed(animal: Animal) {
  console.log("Moving animal", animal.type);

  let speed;
  if (animal.type == "bird") {
    speed = animal.flyingSpeed;
  }
  if (animal.type == "horse") {
  }
  console.log("Moving speed", speed);
}

GetSpeed({ type: "bird", flyingSpeed: 1000 });

//Generic Type

// class GenricType<T> {
//   num: T;
//   gadd: (a: T, B: T) => T;
// }

// let ab = new GenricType<number>();
// ab.num = 8;
// ab.gadd = function (a, b) {
//   return a + b;
// };

//console.log(ab.gadd(6, 9));

/// Decorator to  text  require and other annotation
function Logger(logString: string) {
    console.log('LOGGER FACTORY');
    return function(constructor: Function) {
      console.log(logString);
      console.log(constructor);
    };
  }
  
  function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    return function<T extends { new (...args: any[]): { name: string } }>(
      originalConstructor: T
    ) {
      return class extends originalConstructor {
        constructor(..._: any[]) {
          super();
          console.log('Rendering template');
          const hookEl = document.getElementById(hookId);
          if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = this.name;
          }
        }
      };
    };
  }
  
  // @Logger('LOGGING - PERSON')
  @Logger('LOGGING')
  @WithTemplate('<h1>My Person Object</h1>', 'app')
  class Person {
    name = 'Max';
  
    constructor() {
      console.log('Creating person object...');
    }
  }
  
  const pers = new Person();
  
  console.log(pers);
  
  // ---
  
  function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertyName);
  }
  
  function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
  }
  
  function Log3(
    target: any,
    name: string | Symbol,
    descriptor: PropertyDescriptor
  ) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
  }
  
  function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
  }
  
  class Product {
    @Log
    title: string;
    private _price: number;
  
    @Log2
    set price(val: number) {
      if (val > 0) {
        this._price = val;
      } else {
        throw new Error('Invalid price - should be positive!');
      }
    }
  
    constructor(t: string, p: number) {
      this.title = t;
      this._price = p;
    }
  
    @Log3
    getPriceWithTax(@Log4 tax: number) {
      return this._price * (1 + tax);
    }
  }
  
  const p1 = new Product('Book', 19);
  const p2 = new Product('Book 2', 29);
  
  function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      }
    };
    return adjDescriptor;
  }
  
  class Printer {
    message = 'This works!';
  
    @Autobind
    showMessage() {
      console.log(this.message);
    }
  }
  
  const p = new Printer();
  p.showMessage();
  
  const button = document.querySelector('button')!;
  button.addEventListener('click', p.showMessage);
  
  // ---
  
  interface ValidatorConfig {
    [property: string]: {
      [validatableProp: string]: string[]; // ['required', 'positive']
    };
  }
  
  const registeredValidators: ValidatorConfig = {};
  
  function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: ['required']
    };
  }
  //
  
  function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: ['positive']
    };
  }
  
  function validate(obj: any) {
  
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
      return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
      for (const validator of objValidatorConfig[prop]) {
        switch (validator) {
          case 'required':
            isValid = isValid && !!obj[prop];
            break;
          case 'positive':
            isValid = isValid && obj[prop] > 0;
            break;
        }
      }
    }
    return isValid;
  }
  
  class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;
  
    constructor(t: string, p: number) {
      this.title = t;
      this.price = p;
    }
  }

  
  
  const courseForm = document.querySelector('form')!;
  courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;
  
    const title = titleEl.value;
    const price = +priceEl.value;
  
    const createdCourse = new Course(title, price);
  
    if (!validate(createdCourse)) {
      alert('Invalid input, please try again!');
      return;
    }
    console.log(createdCourse);
  });
  