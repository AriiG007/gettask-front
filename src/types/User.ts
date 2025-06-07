export interface User {
  id: string;
  name: string;
  email: string;
  permissions?: Permission[];
  is_validated?: boolean;
  role?: Role;
  team?: Team,
}

interface Permission{
  id: string;
  name: string;
  permission: string;
}

interface Role{
  id: string;
  name: string;
  description: string;
}

interface Team{
  id: string;
  name: string;
  description: string;
}
