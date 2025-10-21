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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const about_schema_1 = require("../schemas/about.schema");
let AboutService = class AboutService {
    constructor(aboutModel) {
        this.aboutModel = aboutModel;
    }
    async findOne() {
        return this.aboutModel.findOne().exec();
    }
    async create(createAboutDto) {
        const createdAbout = new this.aboutModel(createAboutDto);
        return createdAbout.save();
    }
    async update(updateAboutDto) {
        const existingAbout = await this.aboutModel.findOne();
        if (existingAbout) {
            return this.aboutModel.findByIdAndUpdate(existingAbout._id, updateAboutDto, { new: true });
        }
        else {
            const createdAbout = new this.aboutModel(updateAboutDto);
            return createdAbout.save();
        }
    }
};
exports.AboutService = AboutService;
exports.AboutService = AboutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(about_schema_1.About.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AboutService);
//# sourceMappingURL=about.service.js.map