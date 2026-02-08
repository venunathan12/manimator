import { listProjects } from "$lib/util/listProjects.js";
import { json } from "@sveltejs/kit";

export async function GET({ request })
{
    let existingProjs = await listProjects();

    return json(existingProjs);
}
