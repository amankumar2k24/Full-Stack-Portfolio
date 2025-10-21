import { Model } from 'mongoose';
import { About, AboutDocument } from '../schemas/about.schema';
import { CreateAboutDto, UpdateAboutDto } from './dto/about.dto';
export declare class AboutService {
    private aboutModel;
    constructor(aboutModel: Model<AboutDocument>);
    findOne(): Promise<About>;
    create(createAboutDto: CreateAboutDto): Promise<About>;
    update(updateAboutDto: UpdateAboutDto): Promise<About>;
}
