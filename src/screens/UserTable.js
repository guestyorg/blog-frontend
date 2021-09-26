import React, { useState, useEffect, useCallback } from "react";
import Section from "@guestyci/foundation/legacy/Section";
import AddButton from "@guestyci/foundation/AddButton";

import Table, { Column } from "@guestyci/foundation/legacy/Table";
import {
  getEmptySelection,
  getSelectionOnAction,
} from "@guestyci/foundation/legacy/Table/tableUtility";
import Cell from "@guestyci/foundation/legacy/Table/Cell";
import HeaderCell from "@guestyci/foundation/legacy/Table/HeaderCell";
import FlatButton from "@guestyci/foundation/legacy/FlatButton";

import { sleep } from "@guestyci/foundation/utils/commonUtility";

import orderBy from "lodash/orderBy";

import DateCell from "@guestyci/foundation/legacy/Table/DateCell";
import DateTimeCell from "@guestyci/foundation/legacy/Table/DateTimeCell";

// import data from '../../../__mocks__/tableData';

import Resource from "@guestyci/agni";

import TextField from "@guestyci/foundation/TextField";
import { Row } from "@guestyci/foundation/Layout";
import { ReactComponent as BtnTrash } from "@guestyci/foundation/icons/BtnTrash.svg";
import Icon from "@guestyci/foundation/Icon";

import axios from "axios";
import { after } from "lodash";
import { makeDataForTable } from "../utils";

const UserTable = (props) => {
  // console.log('props:', props)
  const { api, env, config } = Resource.create();
  const [rawData, setRawData] = useState();
  const [data, setData] = useState();

  let counter = 1;
  const arr = [];
  let res1;
  let users;

  // infint-scroll-table
  const width = 200;
  const pageSize = 25;
  const scrollOffset = data ? data.length : 100;
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);

  const handleLoadMore = useCallback(async (newSkip, newPageSize) => {
    console.log("handleLoadMore");

    const addition = semiInfiniteData.slice(newSkip, newSkip + newPageSize);
    // console.log('newPageSize:', newPageSize)
    // console.log('newSkip:', newSkip)
    // console.log('addition:', addition)
    console.log("data: ", data);
    setIsLoading(true);
    await sleep(400);
    setSkip(newSkip);
    setData((prev) => [...(prev || []), ...addition]);
    setIsLoading(false);
  }, []);

  // sortable table
  const [sortBy, setSortBy] = useState();

  const [userDeleted, setUserDeleted] = useState(false);
  const handleSort = useCallback((newSortBy) => {
    console.log("handleSort");
    setSortBy(newSortBy);

    const minusPrefix = newSortBy?.startsWith("-");
    console.log("minusPrefix:", minusPrefix);
    const direction = minusPrefix ? "desc" : "asc";
    console.log("direction:", direction);
    const id = minusPrefix ? newSortBy.substring(1) : sortBy;
    console.log("id:", id);

    setData(orderBy(rawData, `${id}.date`, direction));

    console.log("data:", data);
  }, []);

  useEffect(() => {
    console.log("useEffect");

    async function getUsers() {
      try {
        // const response1 = await api.get("/accounts/me"); // will go to `${config.MAILER_URL}/users`
        // console.log("response1:", response1);

        const response = await api.get("/users"); // will go to `${config.MAILER_URL}/users`
        console.log("response:", response);
        users = response.data.results;
        //  console.log('users:', users)
        // staging/production/staging5/preprod

        //  r.forEach(
        //    user=> {
        //    console.log('user:', user)

        //    arr.push({gilad:1,...user})
        //    }

        //  )
/////////////////////////////////////////////////////////////////////////////////////////////
        // for (let i = 0; i < users.length; i++) {
        //   //  console.log("users[i]: ", users[i] );

        //   const arrUser = Object.entries(users[i]);
        //   //  console.log('arrUser:', arrUser)

        //   //  firstName: {
        //   //   children: 'John',
        //   // },

        //   const bigObj = {};

        //   for (let j = 0; j < arrUser.length; j++) {
        //     const obj = {};
        //     // console.log("arrUser[j]: ",arrUser[j]);
        //     // console.log("arrUser[0]: ",arrUser[j][0]);
        //     // console.log("arrUser[1]: ",arrUser[j][1]);

        //     obj.children = arrUser[j][1];
        //     // console.log('obj:', obj)

        //     if (arrUser[j][0] === "_id") {
        //       bigObj.id = obj;

        //       bigObj._id = arrUser[j][1];
        //     } else {
        //       bigObj[arrUser[j][0]] = obj;
        //     }

        //     // console.log('bigObj:', bigObj)

        //     // arr.push( `${arrUser[j][0]}: {children: '${arrUser[j][1]}',}`)
        //   }
        //   // arr.push({gilad:1,...users[i]})
        //   arr.push({ ...bigObj });
        //   // arr.push({ _id: `${counter}`, ...bigObj });

        //   counter++;
        // }



        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        //  setData(response.data.results)
        let arr = makeDataForTable(users);
        console.log("arr: ", arr);

        setData(arr);

        // const response1= await axios.get("https://api.guesty.com/api/v2/guests",  {
        //   auth: {
        //     username: "88ed11eb4b951e3e239bdfb11b4d6a0a",
        //     password: "f1f74044be21d90c5d0880162994e236yy"
        //   }
        // }

        // );

        //  res1= response1.data.results
        //  console.log('res1:', res1)

        // handleLoadMore(0, pageSize);
      } catch (error) {
        console.log("error:", error);
      }
    }
    getUsers();
  }, [userDeleted]);

  const semiInfiniteData = [...Array(300)]
    .reduce((acc) => acc.concat(data), [])
    .map((e, index) => ({
      ...e,
      id: { children: index + 1 },
      _id: index + 1,
    }));

  // console.log("semiInfiniteData:", semiInfiniteData);

  // useEffect(() => {
  //   console.log('handleLoadMore')
  //   handleLoadMore(0, pageSize);
  // }, []);

  // multi-select-table
  const [rowSelection, setRowSelection] = useState(getEmptySelection());
  const { allSelected, items, exceptItems } = rowSelection;
  // console.log('exceptItems:', exceptItems);
  // console.log('items:', items);
  // console.log('allSelected:', allSelected);

  const selectionSize =
    allSelected && arr.length > 0 ? arr.length - exceptItems.size : items.size;

  const handleRowCheckChange = (action) => {
    console.log("handleRowCheckChange");
    // console.log('action:', action);

    const selection = getSelectionOnAction({ rowSelection, action, data });
    // console.log('selection:', selection);
    setRowSelection(selection);
  };

  const deleteUser = async (userId) => {
    console.log("deleteUser");
    try {
      const response = await api.delete(`/users/${userId}`); // will go to `${config.MAILER_URL}/users`
      console.log("response:", response);
      // const data = response.data;
      // addToast.success('user was delete')
      setUserDeleted(true);
      // props.history.push('/');

      handleClearSelection();
    } catch (error) {
      console.log("error:", error);
      // addToast.danger("error deleting the user")
    }
  };

  const handleDelete = () => {
    console.log("rowSelection.items: ",rowSelection.items);

    if (window.confirm("Are you sure?")) {
      rowSelection.items.forEach((item) => deleteUser(item));
    }
  };

  const handleClearSelection = () => {
    console.log("handleClearSelection");
    setRowSelection(getEmptySelection());
  };

  const handleRowClick = (...args) => {
    console.log("handleRowClick", ...args);

    const rowData = { ...args };
    // console.log("rowData:", rowData);
    console.log("rowData:", rowData[0].id.children);

    const userId = rowData[0].id.children;
    // console.log('args:', args.id)

    // props.history.push("www.google.com")

    props.history.push(`/user/edit/${userId}/preprod`);
  };

  return (
    <>
      {data && (
        <Section col className="bg-white">
          <Section gutter={2}>
            <AddButton
              onClick={() => props.history.push(`/user/add/preprod`)}
              text="Add User"
            />
          </Section>

          <Row spacing={4}>
            {selectionSize > 0 && (
              <>
                {" "}
                <FlatButton
                  onClick={handleClearSelection}
                  disabled={!selectionSize}
                >
                  {`Unselect ${selectionSize || ""}`}
                </FlatButton>
                <FlatButton type="error" onClick={handleDelete}>
                  <Row align="center" spacing={2}>
                    <Icon svg={BtnTrash} />
                    <TextField> Delete</TextField>
                  </Row>
                </FlatButton>
              </>
            )}
          </Row>

          {console.log("rowSelection: ", rowSelection)}
          <Table
            multiselect
            height={500}
            data={data}
            isLoading={isLoading}
            pageSize={pageSize}
            rowSelection={rowSelection}
            onCheckedRowsChange={handleRowCheckChange}
            onRowClick={handleRowClick}
            // infiniteScrollOptions={{
            //   skip,
            //   scrollOffset,
            //   onLoadMore: handleLoadMore,
            //   totalCount: semiInfiniteData.length,
            // }}
            // sortBy={sortBy}
            // onSort={handleSort}
          >
            {/* <Column align="left" dataKey="id" width={width} sortable>
              <HeaderCell id="id">Id</HeaderCell>
              <Cell />
            </Column> */}
            <Column dataKey="firstName" width={width}>
              <HeaderCell id="firstname">First name</HeaderCell>
              <Cell />
            </Column>
            <Column dataKey="lastName" width={width}>
              <HeaderCell id="lastname">Last name</HeaderCell>
              <Cell />
            </Column>
            <Column dataKey="email" width={width}>
              <HeaderCell id="email">Email</HeaderCell>
              <Cell />
            </Column>
            {/* <Column dataKey="periodStartDate" width={width} sortable>
              <HeaderCell id="startdate">Date Cell</HeaderCell>
              <DateCell />
            </Column>
            <Column dataKey="periodEndDate" width={width} sortable>
              <HeaderCell id="enddate">DateTime Cell</HeaderCell>
              <DateTimeCell />
            </Column> */}
          </Table>
        </Section>
      )}
    </>
  );
};
export default UserTable;
