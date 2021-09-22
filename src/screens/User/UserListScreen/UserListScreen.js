import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../../../actions/userActions";
import { USER_DETAILS_RESET } from "../../../constants/userConstants";

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

import Spinner from "@guestyci/foundation/Spinner";
import StatusIndication from "@guestyci/foundation/StatusIndication";

import Radio from "@guestyci/foundation/Radio";
import RadioGroup from "@guestyci/foundation/RadioGroup";

export default function UserListScreen(props) {
  // console.log('props:', props)
  const [rawData, setRawData] = useState();
  // const [data, setData] = useState();

  const [view, setView] = useState("all");

  let data;

  const [userDeleted, setUserDeleted] = useState(false);

  const [rowSelection, setRowSelection] = useState(getEmptySelection());
  const { allSelected, items, exceptItems } = rowSelection;

  const width = 200;
  // const pageSize = 25;
  // const scrollOffset = data ? data.length : 100;
  // const [isLoading, setIsLoading] = useState(false);
  // const [skip, setSkip] = useState(0);
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  // console.log("users:", users);
  data = users;
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const accountSignin = useSelector((state) => state.accountSignin);
  const { accountInfo, loadingAccount, errorAccount } = accountSignin;

  const dispatch = useDispatch();
  // let auth = "gilad";
  useEffect(() => {
    dispatch(listUsers(view));
    // dispatch({
    //   type: USER_DETAILS_RESET,
    // });
  }, [dispatch, successDelete, view]);

  // const deleteHandler = (user) => {
  //   console.log("user:", user);
  //   if (window.confirm("Are you sure?")) {
  //     dispatch(deleteUser(user._id));
  //   }
  // };

  // const classes = useStyles();

  // const selectionSize =
  //  view==="account" && allSelected && data.length > 0
  //     ? data.length - exceptItems.size
  //     : items.size;

  const selectionSize =
    view === "account" && allSelected && data && data.length > 0 && items
      ? items.size
      : 0;

  const handleRowCheckChange = (action) => {
    console.log("handleRowCheckChange");
    // console.log('action:', action);

    const selection = getSelectionOnAction({ rowSelection, action, data });
    console.log("rowSelection:", rowSelection);
    console.log("action:", action);
    console.log("data:", data);
    // console.log('selection:', selection);
    setRowSelection(selection);
  };

  const deleteUserHandler = async (userId) => {
    console.log("deleteUserHandler");
    try {
      // const response = await api.delete(`/users/${userId}`); // will go to `${config.MAILER_URL}/users`
      // console.log('response:', response);
      // const data = response.data;
      // addToast.success('user was delete')
      // props.history.push('/');
      dispatch(deleteUser(userId));

      setUserDeleted(true);

      handleClearSelection();
    } catch (error) {
      console.log("error:", error);
      // addToast.danger("error deleting the user")
    }
  };

  const handleDelete = () => {
    console.log("rowSelection.items: ", rowSelection.items);

    if (window.confirm("Are you sure?")) {
      rowSelection.items.forEach((item) => deleteUserHandler(item));
    }
  };

  const handleClearSelection = () => {
    console.log("handleClearSelection");
    setRowSelection(getEmptySelection());
  };

  const handleRowClick = (...args) => {
    console.log("handleRowClick", ...args);

    const rowData = { ...args };
    console.log("rowData:", rowData);
    console.log("rowData:", rowData[0].id.children);

    const userId = rowData[0].id.children;
    // console.log('args:', args.id)

    // props.history.push("www.google.com")

    props.history.push(`/user/edit/${userId}`);
  };

  return (
    <>
      {/* {console.log("data:", data)} */}
      {loading && <Spinner size={80} strokeWidth={6} />}
      {error && (
        <StatusIndication variant="danger" text="error getting the data " />
      )}

      {data && (
        <Section col className="bg-white">
          <Section gutter={2}>
            {view === "account" && (
              <AddButton
                onClick={() => props.history.push(`/user/add`)}
                text="Add User"
              />
            )}
          </Section>
          {view === "account" && selectionSize > 0 && (
            <Row spacing={4}>
              <FlatButton
                onClick={handleClearSelection}
                disabled={!selectionSize}
              >
                {`Unselect ${selectionSize || ""}`}
              </FlatButton>

              {selectionSize > 0 && (
                <>
                  <FlatButton type="error" onClick={handleDelete}>
                    <Row align="center" spacing={2}>
                      <Icon svg={BtnTrash} />
                      <TextField> Delete</TextField>
                    </Row>
                  </FlatButton>
                </>
              )}
            </Row>
          )}

          {accountInfo && (
            <RadioGroup
              name="view"
              inline
              onChange={(e) => setView(e.target.value)}
              value={view}
            >
              <Radio value="account">Account Users</Radio>
              <Radio value="all">All Users</Radio>
            </RadioGroup>
          )}

          {console.log("rowSelection: ", rowSelection)}
          {view === "account" && (
            <Table
              multiselect
              onRowClick={handleRowClick}
              height={500}
              data={users}
              // isLoading={isLoading}
              // pageSize={pageSize}
              rowSelection={rowSelection}
              onCheckedRowsChange={handleRowCheckChange}
              // infiniteScrollOptions={{
              //   skip,
              //   scrollOffset,
              //   onLoadMore: handleLoadMore,
              //   totalCount: semiInfiniteData.length,
              // }}
              // sortBy={sortBy}
              // onSort={handleSort}
            >
              {/* <Column align="left" dataKey="id" width={width} sortable >
                <HeaderCell id="id">Id</HeaderCell>
                <Cell />
              </Column> */}
              <Column dataKey="firstName" width={width} >
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

              <Column dataKey="createdAt" width={width}>
                <HeaderCell id="createdAt">created At</HeaderCell>
                <Cell />
              </Column>

              <Column dataKey="updatedAt" width={width}>
                <HeaderCell id="updatedAt">updated At</HeaderCell>
                <Cell />
              </Column>
              <Column dataKey="accountId" width={width}>
                <HeaderCell id="accountId">account</HeaderCell>
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
          )}
          {view === "all" && (
            <Table
              height={500}
              data={users}
              // isLoading={isLoading}
              // pageSize={pageSize}
              rowSelection={rowSelection}
              onCheckedRowsChange={handleRowCheckChange}
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

              <Column dataKey="createdAt" width={width}>
                <HeaderCell id="createdAt">created At</HeaderCell>
                <Cell />
              </Column>

              <Column dataKey="updatedAt" width={width}>
                <HeaderCell id="updatedAt">updated At</HeaderCell>
                <Cell />
              </Column>
              <Column dataKey="accountId" width={width}>
                <HeaderCell id="accountId">account</HeaderCell>
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
          )}
        </Section>
      )}
    </>
  );
}
