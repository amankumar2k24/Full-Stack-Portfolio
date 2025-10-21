import { ServicesService } from './services.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    findAll(): Promise<import("../schemas/service.schema").Service[]>;
    create(createServiceDto: CreateServiceDto): Promise<import("../schemas/service.schema").Service>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<import("../schemas/service.schema").Service>;
    remove(id: string): Promise<import("../schemas/service.schema").Service>;
}
