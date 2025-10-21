import { Model } from 'mongoose';
import { Service } from '../schemas/service.schema';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
export declare class ServicesService {
    private serviceModel;
    constructor(serviceModel: Model<Service>);
    findAll(): Promise<Service[]>;
    create(createServiceDto: CreateServiceDto): Promise<Service>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service>;
    remove(id: string): Promise<Service>;
}
