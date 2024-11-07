import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IUsers, UserRoleEnum } from '@/interfaces/users.interface';
import CommonLoading from '@/components/common/loading';
import ManageUserDialog from '@/components/dashboard/dashboard-users/dialog/manage-user-dialog';

const tableHeader = [
  { label: 'รหัสผู้ใช้', value: 'migrationDocumentId' },
  { label: 'ชื่อผู้ใช้', value: 'username' },
  { label: 'อีเมล', value: 'email' },
  { label: 'บทบาท', value: 'role' },
  { label: 'ประเภท', value: 'type' },
  { label: 'การจัดการ', value: 'action' },
];

interface IProps {
  users: IUsers[];
  isLoading: boolean;
}

const UsersTableHeader = () => (
  <TableHeader>
    <TableRow>
      {tableHeader.map((header) => (
        <TableHead key={header.value}>{header.label}</TableHead>
      ))}
    </TableRow>
  </TableHeader>
);

const UsersTableData = ({ users, isLoading }: IProps) => {
  return (
    <div>
      <Table>
        <UsersTableHeader />
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={tableHeader.length} className="text-center">
                <CommonLoading />
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.migrationDocumentId}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role || UserRoleEnum.USER}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>
                  <ManageUserDialog user={user} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTableData;
