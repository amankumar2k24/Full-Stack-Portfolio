import { Model } from 'mongoose';
import { Stats } from '../schemas/stats.schema';
import { CreateStatsDto, UpdateStatsDto } from './dto/stats.dto';
export declare class StatsService {
    private statsModel;
    constructor(statsModel: Model<Stats>);
    findAll(): Promise<Stats[]>;
    findAllAdmin(): Promise<Stats[]>;
    findOne(id: string): Promise<Stats>;
    findByKey(key: string): Promise<Stats>;
    create(createStatsDto: CreateStatsDto): Promise<Stats>;
    update(id: string, updateStatsDto: UpdateStatsDto): Promise<Stats>;
    updateValueByKey(key: string, value: string): Promise<Stats>;
    softDelete(id: string): Promise<Stats>;
    remove(id: string): Promise<Stats>;
    updateOrder(orderUpdates: {
        id: string;
        order: number;
    }[]): Promise<Stats[]>;
    toggleActive(id: string): Promise<Stats>;
}
