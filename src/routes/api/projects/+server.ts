import { listProjects, createProject, deleteProject } from "$lib/util/manageProjects.js";
import { json } from "@sveltejs/kit";

export async function GET({ request })
{
    let existingProjs = await listProjects();

    return json(existingProjs);
}

export async function POST({ request })
{
    let { projectName } = await request.json();
    if (projectName == null || typeof projectName !== 'string') return json({}, { status: 400 });

    let projectCreationStatus = await createProject(projectName);
    
    return json({}, { status: projectCreationStatus ? 201 : 400 });
}

export async function DELETE({ request })
{
    let { projectName } = await request.json();
    if (projectName == null || typeof projectName !== 'string') return json({}, { status: 400 });

    let projectDeletionStatus = await deleteProject(projectName);
    
    return json({}, { status: projectDeletionStatus ? 201 : 400 });
}
