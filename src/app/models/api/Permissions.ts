
export interface Permissions {
    user_id: number;
    project_id: number;
    delete_file: boolean;
    deposit_file: boolean;
    create_post: boolean;
    manage_permissions: boolean;
    manage_project: boolean;
    manage_members: boolean;
    accessible_files: number[];
}