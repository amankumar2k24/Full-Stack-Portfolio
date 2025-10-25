import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stats } from '../schemas/stats.schema';
import { CreateStatsDto, UpdateStatsDto } from './dto/stats.dto';

@Injectable()
export class StatsService {
    constructor(
        @InjectModel(Stats.name) private statsModel: Model<Stats>
    ) { }

    // Public endpoint - only active stats
    async findAll(): Promise<Stats[]> {
        return this.statsModel.find({ isActive: true }).sort({ order: 1 }).exec();
    }

    // Admin endpoint - all stats
    async findAllAdmin(): Promise<Stats[]> {
        return this.statsModel.find().sort({ order: 1 }).exec();
    }

    // Get single stat by ID
    async findOne(id: string): Promise<Stats> {
        const stat = await this.statsModel.findById(id).exec();
        if (!stat) {
            throw new NotFoundException(`Stat with ID ${id} not found`);
        }
        return stat;
    }

    // Get stat by key
    async findByKey(key: string): Promise<Stats> {
        const stat = await this.statsModel.findOne({ key }).exec();
        if (!stat) {
            throw new NotFoundException(`Stat with key ${key} not found`);
        }
        return stat;
    }

    // Create with auto-order assignment
    async create(createStatsDto: CreateStatsDto): Promise<Stats> {
        // Check if key already exists
        const existingStat = await this.statsModel.findOne({ key: createStatsDto.key }).exec();
        if (existingStat) {
            throw new BadRequestException(`Stat with key "${createStatsDto.key}" already exists`);
        }

        // Auto-assign order if not provided
        if (createStatsDto.order === undefined) {
            const maxOrder = await this.statsModel.findOne().sort({ order: -1 }).exec();
            createStatsDto.order = maxOrder ? maxOrder.order + 1 : 0;
        }

        const createdStat = new this.statsModel(createStatsDto);
        return createdStat.save();
    }

    // Update with validation
    async update(id: string, updateStatsDto: UpdateStatsDto): Promise<Stats> {
        // If updating key, check for duplicates
        if (updateStatsDto.key) {
            const existingStat = await this.statsModel.findOne({
                key: updateStatsDto.key,
                _id: { $ne: id }
            }).exec();
            if (existingStat) {
                throw new BadRequestException(`Stat with key "${updateStatsDto.key}" already exists`);
            }
        }

        const updatedStat = await this.statsModel.findByIdAndUpdate(
            id,
            updateStatsDto,
            { new: true, runValidators: true }
        ).exec();

        if (!updatedStat) {
            throw new NotFoundException(`Stat with ID ${id} not found`);
        }

        return updatedStat;
    }

    // Update stat value by key (useful for auto-calculated stats)
    async updateValueByKey(key: string, value: string): Promise<Stats> {
        const updatedStat = await this.statsModel.findOneAndUpdate(
            { key },
            { value },
            { new: true }
        ).exec();

        if (!updatedStat) {
            throw new NotFoundException(`Stat with key ${key} not found`);
        }

        return updatedStat;
    }

    // Soft delete (set isActive to false)
    async softDelete(id: string): Promise<Stats> {
        const stat = await this.statsModel.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        ).exec();

        if (!stat) {
            throw new NotFoundException(`Stat with ID ${id} not found`);
        }

        return stat;
    }

    // Hard delete
    async remove(id: string): Promise<Stats> {
        const deletedStat = await this.statsModel.findByIdAndDelete(id).exec();
        if (!deletedStat) {
            throw new NotFoundException(`Stat with ID ${id} not found`);
        }
        return deletedStat;
    }

    // Bulk update order
    async updateOrder(orderUpdates: { id: string; order: number }[]): Promise<Stats[]> {
        const updatePromises = orderUpdates.map(({ id, order }) =>
            this.statsModel.findByIdAndUpdate(id, { order }, { new: true }).exec()
        );

        const results = await Promise.all(updatePromises);
        return results.filter(result => result !== null);
    }

    // Toggle active status
    async toggleActive(id: string): Promise<Stats> {
        const stat = await this.statsModel.findById(id).exec();
        if (!stat) {
            throw new NotFoundException(`Stat with ID ${id} not found`);
        }

        stat.isActive = !stat.isActive;
        return stat.save();
    }
}