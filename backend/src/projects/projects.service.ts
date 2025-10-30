import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../schemas/project.schema';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    ) { }

    async findAll(): Promise<Project[]> {
        return this.projectModel.find().sort({ order: 1, createdAt: 1 }).exec();
    }

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        // Get the highest order value and increment by 1
        const lastProject = await this.projectModel.findOne().sort({ order: -1 }).exec();
        const order = lastProject ? lastProject.order + 1 : 0;

        const createdProject = new this.projectModel({
            ...createProjectDto,
            order
        });
        return createdProject.save();
    }

    async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
        return this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true });
    }

    async remove(id: string): Promise<void> {
        await this.projectModel.findByIdAndDelete(id);
    }

    async reorder(projectIds: string[]): Promise<Project[]> {
        // Update the order of each project based on the array index
        const updatePromises = projectIds.map((id, index) =>
            this.projectModel.findByIdAndUpdate(id, { order: index }, { new: true })
        );

        await Promise.all(updatePromises);
        return this.findAll();
    }
}