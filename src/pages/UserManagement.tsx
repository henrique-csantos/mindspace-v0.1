import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/Dialog';
import { User, UserRole, Permission } from '../types';

const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Dr. Rafael Mendes',
    email: 'rafael.mendes@mindspace.com',
    role: 'admin',
    permissions: ['manage_users', 'view_financial', 'manage_appointments'],
    status: 'active',
    lastLogin: '2024-03-20T10:30:00Z'
  },
  {
    id: 'user-2',
    name: 'Dra. Ana Silva',
    email: 'ana.silva@mindspace.com',
    role: 'psychologist',
    permissions: ['manage_appointments', 'manage_consultation_notes'],
    status: 'active',
    psychologistId: 'psy-1',
    lastLogin: '2024-03-20T09:15:00Z'
  },
  {
    id: 'user-3',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@mindspace.com',
    role: 'receptionist',
    permissions: ['manage_appointments'],
    status: 'active',
    lastLogin: '2024-03-20T08:45:00Z'
  }
];

const availablePermissions: Permission[] = [
  'manage_users',
  'view_financial',
  'manage_appointments',
  'manage_patients',
  'manage_psychologists',
  'view_consultation_notes',
  'manage_consultation_notes',
  'view_dashboard',
  'manage_settings'
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [newUser, setNewUser] = useState<Partial<User>>({
    role: 'receptionist',
    status: 'active',
    permissions: []
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      const user: User = {
        id: `user-${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role as UserRole,
        permissions: newUser.permissions || [],
        status: 'active',
        lastLogin: new Date().toISOString()
      };

      setUsers([...users, user]);
      setIsAddUserModalOpen(false);
      setNewUser({
        role: 'receptionist',
        status: 'active',
        permissions: []
      });
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsAddUserModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roleLabels: Record<UserRole, string> = {
    admin: 'Administrador',
    psychologist: 'Psicólogo',
    receptionist: 'Recepcionista',
    financial: 'Financeiro'
  };

  const permissionLabels: Record<Permission, string> = {
    manage_users: 'Gerenciar Usuários',
    view_financial: 'Visualizar Financeiro',
    manage_appointments: 'Gerenciar Consultas',
    manage_patients: 'Gerenciar Pacientes',
    manage_psychologists: 'Gerenciar Psicólogos',
    view_consultation_notes: 'Visualizar Notas de Consulta',
    manage_consultation_notes: 'Gerenciar Notas de Consulta',
    view_dashboard: 'Visualizar Dashboard',
    manage_settings: 'Gerenciar Configurações'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gerenciamento de Usuários
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gerencie os usuários e suas permissões no sistema
          </p>
        </div>

        <Button
          icon={<Plus size={16} />}
          onClick={() => {
            setSelectedUser(null);
            setIsAddUserModalOpen(true);
          }}
        >
          Novo Usuário
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="search"
                placeholder="Buscar usuários..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4">Nome</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Função</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Último Acesso</th>
                  <th className="text-right py-3 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{roleLabels[user.role]}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}
                      >
                        {user.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(user.lastLogin || '').toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Edit2 size={16} />}
                        onClick={() => handleEditUser(user)}
                        className="mr-2"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 size={16} />}
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Excluir
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? 'Editar Usuário' : 'Novo Usuário'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:text-white"
                value={selectedUser?.name || newUser.name || ''}
                onChange={(e) =>
                  selectedUser
                    ? setSelectedUser({ ...selectedUser, name: e.target.value })
                    : setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:text-white"
                value={selectedUser?.email || newUser.email || ''}
                onChange={(e) =>
                  selectedUser
                    ? setSelectedUser({ ...selectedUser, email: e.target.value })
                    : setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Função
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:text-white"
                value={selectedUser?.role || newUser.role}
                onChange={(e) => {
                  const role = e.target.value as UserRole;
                  selectedUser
                    ? setSelectedUser({ ...selectedUser, role })
                    : setNewUser({ ...newUser, role });
                }}
              >
                <option value="admin">Administrador</option>
                <option value="psychologist">Psicólogo</option>
                <option value="receptionist">Recepcionista</option>
                <option value="financial">Financeiro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Permissões
              </label>
              <div className="space-y-2 mt-2">
                {availablePermissions.map((permission) => (
                  <label
                    key={permission}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={
                        selectedUser
                          ? selectedUser.permissions.includes(permission)
                          : newUser.permissions?.includes(permission)
                      }
                      onChange={(e) => {
                        const permissions = selectedUser
                          ? [...selectedUser.permissions]
                          : [...(newUser.permissions || [])];
                        
                        if (e.target.checked) {
                          permissions.push(permission);
                        } else {
                          const index = permissions.indexOf(permission);
                          if (index > -1) {
                            permissions.splice(index, 1);
                          }
                        }

                        selectedUser
                          ? setSelectedUser({ ...selectedUser, permissions })
                          : setNewUser({ ...newUser, permissions });
                      }}
                      className="rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {permissionLabels[permission]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsAddUserModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleAddUser}>
                {selectedUser ? 'Salvar Alterações' : 'Adicionar Usuário'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;