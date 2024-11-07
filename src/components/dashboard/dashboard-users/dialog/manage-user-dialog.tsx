import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TbUserEdit } from 'react-icons/tb';
import { IUsers, UserRoleEnum } from '@/interfaces/users.interface';

const roleOptions = [
  { label: UserRoleEnum.ADMIN, value: UserRoleEnum.ADMIN },
  { label: UserRoleEnum.EDITER, value: UserRoleEnum.EDITER },
  { label: UserRoleEnum.PUBLISHER, value: UserRoleEnum.PUBLISHER },
  { label: UserRoleEnum.USER, value: UserRoleEnum.USER },
];

interface IProps {
  user: IUsers;
}

const ManageUserDialog = ({ user }: IProps) => {
  const [selectedRole, setSelectedRole] = useState(user.role);

  const handleRoleChange = (value: UserRoleEnum) => {
    setSelectedRole(value);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <TbUserEdit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>จัดการผู้ใช้</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Email
              </Label>
              <Input
                id="name"
                value={user.email}
                readOnly
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={user.username}
                readOnly
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select value={selectedRole} onValueChange={handleRoleChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">บันทึกการเปลี่ยนแปลง</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUserDialog;
