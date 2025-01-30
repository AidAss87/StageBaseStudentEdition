
import { User } from "@/types/user";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { removeUser, updateUser } from "@/app/users/actions";
interface UserCardProps extends User {
  isVerified: boolean;
  getAllUsers: () => Promise<User[]>;
}

export default function UserCard({
  id,
  name,
  role,
  createdAt,
  updatedAt,
  image,
  email,
  isVerified,
  getAllUsers,
}: UserCardProps) {
  return (
    <Card className=" mx-auto shadow-lg rounded-lg overflow-hidden flex">
      <CardHeader className="flex items-center border-r-accent border-r-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-sm text-primary">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{role}</CardDescription>
          <p>ID: {id}</p>
          <p>Email: {email} </p>
          {isVerified ? (
            <p className="text-green-600">Подтверждена</p>
          ) : (
            <p className="text-red-600">Не подтверждена</p>
          )}
          <p>Account Created: {new Date(createdAt).toLocaleDateString()}</p>
          <p>Last Updated: {new Date(updatedAt).toLocaleDateString()}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4  border-l-accent border-l-2 ">
        <div className="mt-4 flex items-end gap-4">
          <div>
            <label
              htmlFor="role-select"
              className="block mb-2 text-sm font-medium text-primary"
            >
              Change Role:
            </label>
            <Select
              onValueChange={async (value: User["role"]) => {
                await updateUser(id, value);
              }}
              defaultValue={role}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="guest">Guest</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="stage1">Stage 1</SelectItem>
                <SelectItem value="stage2">Stage 2</SelectItem>
                <SelectItem value="stage3">Stage 3</SelectItem>
                <SelectItem value="stage4">Stage 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="destructive"
            onClick={async () => {
              const result = await removeUser(id);
              if (result.success) {
                getAllUsers();
              }
            }}
          >
            Delete User
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
