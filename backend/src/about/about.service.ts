import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About, AboutDocument } from '../schemas/about.schema';
import { CreateAboutDto, UpdateAboutDto } from './dto/about.dto';

@Injectable()
export class AboutService {
    constructor(
        @InjectModel(About.name) private aboutModel: Model<AboutDocument>,
    ) { }

    async findOne(): Promise<About> {
        return this.aboutModel.findOne().exec();
    }

    async create(createAboutDto: CreateAboutDto): Promise<About> {
        const createdAbout = new this.aboutModel(createAboutDto);
        return createdAbout.save();
    }

    async update(updateAboutDto: UpdateAboutDto): Promise<About> {
        const existingAbout = await this.aboutModel.findOne();
        if (existingAbout) {
            return this.aboutModel.findByIdAndUpdate(
                existingAbout._id,
                updateAboutDto,
                { new: true },
            );
        } else {
            const createdAbout = new this.aboutModel(updateAboutDto);
            return createdAbout.save();
        }
    }
}