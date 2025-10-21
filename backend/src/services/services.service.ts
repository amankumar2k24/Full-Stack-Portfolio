import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from '../schemas/service.schema';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Injectable()
export class ServicesService {
    constructor(
        @InjectModel(Service.name) private serviceModel: Model<Service>
    ) { }

    async findAll(): Promise<Service[]> {
        return this.serviceModel.find({ isActive: true }).sort({ order: 1 }).exec();
    }

    async create(createServiceDto: CreateServiceDto): Promise<Service> {
        const createdService = new this.serviceModel(createServiceDto);
        return createdService.save();
    }

    async update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
        return this.serviceModel.findByIdAndUpdate(id, updateServiceDto, { new: true }).exec();
    }

    async remove(id: string): Promise<Service> {
        return this.serviceModel.findByIdAndDelete(id).exec();
    }
}