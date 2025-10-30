import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto, ReorderProjectsDto } from './dto/project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): Promise<import("../schemas/project.schema").Project[]>;
    create(createProjectDto: CreateProjectDto): Promise<import("../schemas/project.schema").Project>;
    reorder(reorderDto: ReorderProjectsDto): Promise<import("../schemas/project.schema").Project[]>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<import("../schemas/project.schema").Project>;
    remove(id: string): Promise<void>;
}
