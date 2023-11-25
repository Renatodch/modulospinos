"use client";
import { deleteUserById } from "@/controllers/user.controller";
import { TOAST_USER_DELETE_SUCCESS, User } from "@/model/types";
import { Button, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "sonner";
import UserForm from "./userForm";

const UserList = ({ users }: { users: User[] }) => {
  const router = useRouter();
  const [onDelete, setOnDelete] = useState<boolean>(false);
  const [deletedIndex, setDeletedIndex] = useState<number | null>(null);
  const handleDelete = async (id: number) => {
    setDeletedIndex(id);
    setOnDelete(true);
    await deleteUserById(id);
    setOnDelete(false);
    setDeletedIndex(null);
    toast.success(TOAST_USER_DELETE_SUCCESS);
    router.refresh();
  };

  return (
    <Table.Root className="w-full">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Nombres Completos</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Modificar</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Borrar</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {users.map((user) => {
          return (
            <Table.Row key={user.id}>
              <Table.RowHeaderCell width={100}>{user.id}</Table.RowHeaderCell>
              <Table.Cell width={300}>{user.name}</Table.Cell>
              <Table.Cell width={250}>{user.email}</Table.Cell>
              <Table.Cell width={100}>
                <UserForm target={user} />
              </Table.Cell>
              <Table.Cell width={100}>
                <Button
                  disabled={onDelete && user.id === deletedIndex}
                  onClick={() => handleDelete(user.id)}
                  color="red"
                  size="3"
                >
                  <AiFillDelete />
                </Button>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

export default UserList;
