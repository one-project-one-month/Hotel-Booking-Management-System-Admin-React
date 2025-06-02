import { Table, TableBody } from "@/components/ui/table";

import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState, type ChangeEvent } from "react";
import type { Username } from "@/utils/types/UserTypes/userTypes";
import PaginationTable from "@/components/shared/TablePagination/PaginationTable";
import TableUserHeader from "@/components/user/TableUserHeader";
import TableUserBody from "@/components/user/TableUserBody";
import UserInput from "@/components/user/UserInput";
import CustomLoading from "@/components/shared/Loading/Loading";
import { toast } from "sonner";

const User = () => {
  const { userQuery, deleteMutation } = useUser();
  const { isSuccess, isError, data: user, isLoading, error } = userQuery;
  const [filterUser, setFilterUser] = useState<Username[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;
  const pages: number[] = [];

  const prevClick = () => {
    if (currentPage > pages.length) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage(1);
    }
  };
  const nextClick = () => {
    if (currentPage !== pages.length) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage(1);
    }
  };

  for (let i = 1; i <= Math.ceil(filterUser.length / itemPerPage); i++) {
    pages.push(i);
  }

  function compare(a: Username, b: Username) {
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    return 0;
  }

  const mainData = filterUser.sort(compare);

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentUser = mainData.slice(startIndex, endIndex);

  const pageClick = (text: number) => {
    setCurrentPage(Number(text));
  };

  const deleteUser = (id: string) => {
    if (window.confirm()) {
      deleteMutation.mutate(id);
    }
  };

  useEffect(() => {
    if (isSuccess && user) {
      setFilterUser(user);
    }
  }, [user, isSuccess]);

  const navigate = useNavigate();

  const createUser = () => {
    navigate("/users/create");
  };

  const updateUser = (id: string) => {
    navigate(`/users/update/${id}`);
  };

  if (isLoading) {
    return <CustomLoading />;
  }

  if (isError) {
    return toast(`${error.message}`, {
      position: "top-center",
      style: {
        backgroundColor: "red",
        color: "white",
        border: "none",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
      },
    });
  }

  const userChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filter = user.filter((user: Username) => {
      return (
        user.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
    setFilterUser(filter);
  };

  return (
    <div>
      <UserInput userChange={userChange} createUser={createUser} />
      <div className="h-[calc(100vh-200px)] w-[81vw] overflow-auto rounded-md shadow-lg mt-[10px] px-[10px]">
        <Table>
          <TableUserHeader />
          <TableBody>
            {currentUser?.map((user: Username) => {
              return (
                <TableUserBody
                  user={user}
                  deleteUser={deleteUser}
                  updateUser={updateUser}
                  key={user.id}
                />
              );
            })}
          </TableBody>
        </Table>
        {currentUser.length === 0 && (
          <div className="flex justify-center items-center mt-[200px]">
            <p className="text-xl">No User found.</p>
          </div>
        )}
      </div>
      <div className="w-full mt-[10px] h-[60px] flex rounded-md shadow-lg">
        <PaginationTable
          prevClick={prevClick}
          pages={pages}
          currentPage={currentPage}
          nextClick={nextClick}
          pageClick={pageClick}
        />
      </div>
    </div>
  );
};

export default User;
