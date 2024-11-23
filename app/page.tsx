"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  address: { city: string };
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error(error);
        setUsers([]);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearch(search);
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(search)
    );
    setFilteredUsers(filteredUsers);
  };

  const hasSearch = search.length > 0;

  const usersInDisplay = hasSearch ? filteredUsers : users;

  return (
    <>
      <Input type="search" label="Search" onChange={handleSearch} />
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ADDRESS</TableColumn>
        </TableHeader>
        <TableBody>
          {usersInDisplay.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
