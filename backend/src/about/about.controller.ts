import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { AboutService } from './about.service';
import { UpdateAboutDto } from './dto/about.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('about')
export class AboutController {
    constructor(private readonly aboutService: AboutService) { }

    @Get()
    async findOne() {
        return this.aboutService.findOne();
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Body() updateAboutDto: UpdateAboutDto) {
        return this.aboutService.update(updateAboutDto);
    }
}