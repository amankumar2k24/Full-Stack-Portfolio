import { CreateStatsDto, UpdateStatsDto } from './dto/stats.dto';
import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    findAll(): Promise<import("../schemas/stats.schema").Stats[]>;
    findByKey(key: string): Promise<import("../schemas/stats.schema").Stats>;
    findAllAdmin(): Promise<import("../schemas/stats.schema").Stats[]>;
    findOne(id: string): Promise<import("../schemas/stats.schema").Stats>;
    create(createStatsDto: CreateStatsDto): Promise<import("../schemas/stats.schema").Stats>;
    update(id: string, updateStatsDto: UpdateStatsDto): Promise<import("../schemas/stats.schema").Stats>;
    toggleActive(id: string): Promise<import("../schemas/stats.schema").Stats>;
    softDelete(id: string): Promise<import("../schemas/stats.schema").Stats>;
    updateOrder(orderUpdates: {
        id: string;
        order: number;
    }[]): Promise<import("../schemas/stats.schema").Stats[]>;
    updateValueByKey(key: string, body: {
        value: string;
    }): Promise<import("../schemas/stats.schema").Stats>;
    remove(id: string): Promise<void>;
}
