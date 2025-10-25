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
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const stats_schema_1 = require("../schemas/stats.schema");
let StatsService = class StatsService {
    constructor(statsModel) {
        this.statsModel = statsModel;
    }
    async findAll() {
        return this.statsModel.find({ isActive: true }).sort({ order: 1 }).exec();
    }
    async findAllAdmin() {
        return this.statsModel.find().sort({ order: 1 }).exec();
    }
    async findOne(id) {
        const stat = await this.statsModel.findById(id).exec();
        if (!stat) {
            throw new common_1.NotFoundException(`Stat with ID ${id} not found`);
        }
        return stat;
    }
    async findByKey(key) {
        const stat = await this.statsModel.findOne({ key }).exec();
        if (!stat) {
            throw new common_1.NotFoundException(`Stat with key ${key} not found`);
        }
        return stat;
    }
    async create(createStatsDto) {
        const existingStat = await this.statsModel.findOne({ key: createStatsDto.key }).exec();
        if (existingStat) {
            throw new common_1.BadRequestException(`Stat with key "${createStatsDto.key}" already exists`);
        }
        if (createStatsDto.order === undefined) {
            const maxOrder = await this.statsModel.findOne().sort({ order: -1 }).exec();
            createStatsDto.order = maxOrder ? maxOrder.order + 1 : 0;
        }
        const createdStat = new this.statsModel(createStatsDto);
        return createdStat.save();
    }
    async update(id, updateStatsDto) {
        if (updateStatsDto.key) {
            const existingStat = await this.statsModel.findOne({
                key: updateStatsDto.key,
                _id: { $ne: id }
            }).exec();
            if (existingStat) {
                throw new common_1.BadRequestException(`Stat with key "${updateStatsDto.key}" already exists`);
            }
        }
        const updatedStat = await this.statsModel.findByIdAndUpdate(id, updateStatsDto, { new: true, runValidators: true }).exec();
        if (!updatedStat) {
            throw new common_1.NotFoundException(`Stat with ID ${id} not found`);
        }
        return updatedStat;
    }
    async updateValueByKey(key, value) {
        const updatedStat = await this.statsModel.findOneAndUpdate({ key }, { value }, { new: true }).exec();
        if (!updatedStat) {
            throw new common_1.NotFoundException(`Stat with key ${key} not found`);
        }
        return updatedStat;
    }
    async softDelete(id) {
        const stat = await this.statsModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
        if (!stat) {
            throw new common_1.NotFoundException(`Stat with ID ${id} not found`);
        }
        return stat;
    }
    async remove(id) {
        const deletedStat = await this.statsModel.findByIdAndDelete(id).exec();
        if (!deletedStat) {
            throw new common_1.NotFoundException(`Stat with ID ${id} not found`);
        }
        return deletedStat;
    }
    async updateOrder(orderUpdates) {
        const updatePromises = orderUpdates.map(({ id, order }) => this.statsModel.findByIdAndUpdate(id, { order }, { new: true }).exec());
        const results = await Promise.all(updatePromises);
        return results.filter(result => result !== null);
    }
    async toggleActive(id) {
        const stat = await this.statsModel.findById(id).exec();
        if (!stat) {
            throw new common_1.NotFoundException(`Stat with ID ${id} not found`);
        }
        stat.isActive = !stat.isActive;
        return stat.save();
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(stats_schema_1.Stats.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StatsService);
//# sourceMappingURL=stats.service.js.map