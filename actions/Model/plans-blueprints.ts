'use server'

import { CreatePlansBlueprintsSchema } from "@/components/projects/subpages/plans-blueprints/validation";
import prisma from "@/db/db"
import { uploadFileToS3 } from "@/lib/upload-file-s3";
import { revalidatePath } from "next/cache";
import { z } from "zod";


export const getPlansBlueprint = async (projectId: string) => {
    
    const project = await prisma.project.findUnique({
        where: { uuid: projectId },
    });

    if (!project) {
        return { error: 'Project not found' };
    }

    const response = await prisma.documents.findMany({
        where: {
            projectId: project?.id
        },
        orderBy: {
            createdAt: 'desc',
          },
    })

    return response;
}

export const createPlansBlueprint = async (values: z.infer<typeof CreatePlansBlueprintsSchema>) => {
    const validateFields = CreatePlansBlueprintsSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: 'Invalid fields' };
    }
    
    const {
        uuid,
        name,
        file,
        projectId,
        type
    } = values


    const project = await prisma.project.findUnique({
        where: { uuid: projectId },
    });

    if (!project) {
        return { error: 'Project not found' };
    }
    await prisma.documents.create({
        data: {
            name,
            file,
            type,
            projectId: project?.id
        }
    })


    revalidatePath(`/projects/${projectId}/plans-blueprints`);
    return {success: "File added successfully"}
}


export const deletePlansBlueprint = async (uuid: string) => {
    await prisma.documents.delete({
        where: {
            uuid: uuid,
        }
    })
    revalidatePath(`/projects/${uuid}/plans-blueprints`);
    return {success: "Successfully deleted"}
}