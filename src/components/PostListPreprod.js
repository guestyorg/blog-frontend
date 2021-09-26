import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
// import { deletePost, listPosts } from "../../../actions/postActions";
// import { POST_DETAILS_RESET } from "../../../constants/postConstants";

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
import { NavLink } from "react-router-dom";
import { deletePostPreprod } from "../actions/blogActions";
import { POST_DELETE_RESET } from "../constants/blogConstants";

import { useToast } from "@guestyci/foundation/Toast";
import { makeDataForTable } from "../utils";

export default function PostList(props) {
  console.log("PostListprops:", props);
  const { addToast } = useToast();

  const { blogData, blogAdmin } = props;
  // console.log('blogAdmin:', blogAdmin)
  // console.log("blogId:", blogId);

  // console.log("blogData:", blogData);

  let data;

  if (blogData) {
    let posts = blogData.posts;

    data = makeDataForTable(posts);
    // console.log("dataaaaaaaa===========================:", data);
  }
  const [rawData, setRawData] = useState();
  // const [data, setData] = useState();

  // let data = arr;

  const [postDeleted, setPostDeleted] = useState(false);

  const [rowSelection, setRowSelection] = useState(getEmptySelection());
  const { allSelected, items, exceptItems } = rowSelection;

  const width = 200;
  // const pageSize = 25;
  // const scrollOffset = data ? data.length : 100;
  // const [isLoading, setIsLoading] = useState(false);
  // const [skip, setSkip] = useState(0);
  // const postList = useSelector((state) => state.postList);
  // const { loading, error, posts } = postList;
  // // console.log("posts:", posts);
  // data = posts;
  // const postDelete = useSelector((state) => state.postDelete);
  // const {
  //   loading: loadingDelete,
  //   error: errorDelete,
  //   success: successDelete,
  // } = postDelete;

  const userData = useSelector((state) => state.userData);
  const { userInfoData, loadingAccount, errorAccount } = userData;

  const dispatch = useDispatch();

  const selectionSize =
    allSelected && data.length > 0
      ? data.length - exceptItems.size
      : items.size;

  const handleRowCheckChange = (action) => {
    console.log("handleRowCheckChange");
    // console.log('action:', action);

    const selection = getSelectionOnAction({ rowSelection, action, data });
    console.log("rowSelection before :", rowSelection);
    console.log("action:", action);
    console.log("data:", data);
    // console.log('selection:', selection);
    setRowSelection(selection);

  };

  const deletePostHandler = async (postId) => {
    console.log("deletePostHandler");
    try {
      // const response = await api.delete(`/posts/${postId}`); // will go to `${config.MAILER_URL}/posts`
      // console.log('response:', response);
      // const data = response.data;
      // addToast.success('post was delete')
      // props.history.push('/');

      dispatch(deletePostPreprod(postId, blogData._id));

      setPostDeleted(true);

      handleClearSelection();
    } catch (error) {
      console.log("error:", error);
      // addToast.danger("error deleting the post")
    }
  };

  const handleDelete = () => {
    console.log("rowSelection.items: ", rowSelection.items);

    if (window.confirm("Are you sure?")) {
      rowSelection.items.forEach((item) => deletePostHandler(item));
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

    const postId = rowData[0].id.children;
    // console.log('args:', args.id)

    // props.history.push("www.google.com");

    props.history.push(`/${blogData._id}/post/${postId}/view/preprod`);
  };

  return (
    <>
      {/* {console.log("data:", data)}
      {loading && <Spinner size={80} strokeWidth={6} />}
      {error && (
        <StatusIndication variant="danger" text="error getting the data " />
      )} */}

      {data && (
        <Section col className="bg-white" style={{ width: "900px" }}>
          <h1>posts:</h1>

          {userInfoData ? (
            <Section gutter={2}>
              {blogData && console.log("blogData._id: ", blogData._id)}
              <AddButton
                onClick={() =>
                  props.history.push(`/blog/${blogData._id}/post/add/preprod`)
                }
                text="Add Post"
              />
            </Section>
          ) : (
            <NavLink
              to="/user/signin"
              // activeStyle={activeStyle}
              style={{ marginLeft: "20px" }}
              exact
            >
              sign in to create a new post
            </NavLink>
          )}

          {/* {console.log("rowSelection: ", rowSelection)} */}

          {blogAdmin ? (
            <>
              {selectionSize > 0 && (
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
              <Table
                multiselect
                height={500}
                data={data}
                // isLoading={isLoading}
                // pageSize={pageSize}
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
                <Column dataKey="title" width={width}>
                  <HeaderCell id="title">Title</HeaderCell>
                  <Cell />
                </Column>
                <Column dataKey="content" width={width}>
                  <HeaderCell id="content"> Content Preview</HeaderCell>
                  <Cell />
                </Column>
                <Column dataKey="author" width={width}>
                  <HeaderCell id="author"> Author</HeaderCell>
                  <Cell />
                </Column>
                <Column dataKey="email" width={width}>
                  <HeaderCell id="email">Email</HeaderCell>
                  <Cell />
                </Column>
                {/* <Column dataKey="account" width={width}>
                  <HeaderCell id="account">Account</HeaderCell>
                  <Cell />
                </Column> */}
                <Column dataKey="createdAt" width={width}>
                  <HeaderCell id="createdAt">created At</HeaderCell>
                  <Cell />
                </Column>

                <Column dataKey="updatedAt" width={width}>
                  <HeaderCell id="updatedAt">updated At</HeaderCell>
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
            </>
          ) : (
            <>
              {" "}
              <Table
                height={500}
                data={data}
                // isLoading={isLoading}
                // pageSize={pageSize}

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
                <Column dataKey="title" width={width}>
                  <HeaderCell id="title">Title</HeaderCell>
                  <Cell />
                </Column>
                <Column dataKey="content" width={width}>
                  <HeaderCell id="content"> Content</HeaderCell>
                  <Cell />
                </Column>
                <Column dataKey="author" width={width}>
                  <HeaderCell id="author"> Author</HeaderCell>
                  <Cell />
                </Column>
                <Column dataKey="email" width={width}>
                  <HeaderCell id="email">Email</HeaderCell>
                  <Cell />
                </Column>
                {/* <Column dataKey="account" width={width}>
                  <HeaderCell id="account">Account</HeaderCell>
                  <Cell />
                </Column> */}
                <Column dataKey="createdAt" width={width}>
                  <HeaderCell id="createdAt">created At</HeaderCell>
                  <Cell />
                </Column>

                <Column dataKey="updatedAt" width={width}>
                  <HeaderCell id="updatedAt">updated At</HeaderCell>
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
            </>
          )}
        </Section>
      )}
    </>
  );
}
