import { AboutService } from './about.service';
import { UpdateAboutDto } from './dto/about.dto';
export declare class AboutController {
    private readonly aboutService;
    constructor(aboutService: AboutService);
    findOne(): Promise<import("../schemas/about.schema").About>;
    update(updateAboutDto: UpdateAboutDto): Promise<import("../schemas/about.schema").About>;
}
