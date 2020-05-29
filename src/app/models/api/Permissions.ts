export interface Permissions {
    member_id: number;
    project_id: number;
    delete_file: boolean;
    deposit_file: boolean;
    create_post: boolean;
    manage_permissions: boolean;
    manage_project: boolean;
    manage_members: boolean;
}

export function getPermissionsNone(user_id: number, project_id: number): Permissions {
    return {
        member_id: user_id,
        project_id,
        delete_file: false,
        deposit_file: false,
        create_post: false,
        manage_permissions: false,
        manage_project: false,
        manage_members: false
    };
}