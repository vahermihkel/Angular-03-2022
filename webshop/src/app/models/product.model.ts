export class Product {
    constructor(
        public id: number,
        public name: string,
        public imgSrc: string,
        public price: number,
        public category: string,
        public description: string,
        public isActive: boolean
    ) {}
}



// product: {id: number, name: string, price: number, imgSrc: string, category: string,
//       description: string, isActive: boolean} = getValueFromDb();

// product: Product = getValueFromDb();

// MODELS + PIPES
// 1. lühidus (kood palju lühem)
// 2. muutmine (kui teen ühe muutuse, läheb igalepoole)
// 3. kõik on samast liigist

// product: {id: number, name: string, price: number, imgSrc: string, category: string,
//       description: string, isActive: boolean} = getValueFromDb();
// product: Product = getValueFromDb();

// product: {id: number, name: string, country: string, content: string[],
//       description: string, isActive: boolean} = getValueFromDb();
// product: ProductExtra = getValueFromDb();