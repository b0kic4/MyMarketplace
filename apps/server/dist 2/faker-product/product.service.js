"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const faker_1 = require("@faker-js/faker");
const prisma_service_1 = require("../prisma-service/prisma.service");
const common_2 = require("@nestjs/common");
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateFakeProduct() {
        common_2.Logger.log('generateFakeProduct called');
        const categoryImageMap = {
            Jewelry: 'Fashion',
            Clothing: 'Fashion',
            Shoes: 'Fashion',
            Outdoors: 'Nature',
            Beauty: 'People',
            Animal: 'Cats',
            Music: 'Technics',
            Movies: 'Nightlife',
            Electronics: 'Techics',
            Computers: 'Techics',
            Industrial: 'Technics',
        };
        const category = faker_1.faker.commerce.department();
        const imageUrlCategory = categoryImageMap[category] || 'Fashion';
        return {
            name: faker_1.faker.commerce.productName(),
            description: faker_1.faker.commerce.productDescription(),
            price: faker_1.faker.commerce.price({ min: 10, symbol: '$' }),
            category: faker_1.faker.commerce.department(),
            material: faker_1.faker.commerce.productMaterial(),
            adjective: faker_1.faker.commerce.productAdjective(),
            isbn: faker_1.faker.commerce.isbn(),
            imageUrl: faker_1.faker.image.urlLoremFlickr({
                category: imageUrlCategory,
                width: 1920,
                height: 1080,
            }),
        };
    }
    generateFakeProducts(count) {
        return Array(count)
            .fill(null)
            .map(() => this.generateFakeProduct());
    }
    async generateAndStoreFakeProducts(count) {
        const fakeProducts = this.generateFakeProducts(count);
        try {
            await this.prisma.product.createMany({
                data: fakeProducts,
            });
        }
        catch (error) {
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map