import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Filter, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cupons } from "@/utils/dummy/cupon/cuponDummy.ts";
import { CreateCuponFormDialog } from "@/components/Cupon/CreateCuponFormDialog/CreateCuponFormDialog.tsx";
import { type ChangeEvent, useState } from "react";
import type { Cupon } from "@/utils/types/cuponTypes/cuponType.ts";
import CuponTableHeader from "@/components/Cupon/CuponTableHeader/CuponTableHeader.tsx";
import CuponTableRow from "@/components/Cupon/CuponTableRow/CuponTableRow.tsx";

const Cupon = () => {
  const [cuponsToBeShown, setCuponsToBeShown] = useState<Cupon[]>(cupons);

  const handleSearchCupon = (e: ChangeEvent<HTMLInputElement>) => {
    const searchedValue = e.target.value.toLowerCase();
    const filteredCupons = cupons.filter(
      (cupon) =>
        cupon.code.toLowerCase().includes(searchedValue) ||
        cupon.discount_pct.toString().toLowerCase().includes(searchedValue),
    );
    setCuponsToBeShown(filteredCupons);
  };
  return (
    <div>
      <div className=" flex  justify-between items-center rounded-md shadow-lg h-[60px] px-[1rem]">
        <h3 className="text-2xl font-semibold">Cupon Lists</h3>
        <div>
          <Input
            placeholder="Search by code or discount price ..."
            className="w-[500px]"
            onChange={handleSearchCupon}
          />
        </div>
        <div className="flex gap-5">
          <CreateCuponFormDialog />
          {/*<CreateNewButton onClick={handleClickCreate} />*/}
          <Button size="icon" className="cursor-pointer" variant="secondary">
            <Filter />
          </Button>
        </div>
      </div>
      <div className="h-[73vh] overflow-auto rounded-md shadow-lg mt-[10px] px-[10px] ">
        <Table>
          <CuponTableHeader />
          <TableBody>
            {cuponsToBeShown.map((cupon, index) => {
              return (
                <CuponTableRow
                  key={cupon.id}
                  cupon={cupon}
                  index={index}
                  setCuponsToBeShown={setCuponsToBeShown}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="w-full mt-[10px] h-[60px] flex rounded-md shadow-lg">
        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Cupon;
