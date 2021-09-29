import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogPreprod,
  listBlogsPreprod,
} from "../../../actions/blogPreprodActions";
import {
  BLOG_DELETE_RESET,
  BLOG_DETAILS_RESET,
  POST_DELETE_RESET,
} from "../../../constants/blogConstants";

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

import Radio from "@guestyci/foundation/Radio";
import RadioGroup from "@guestyci/foundation/RadioGroup";

import { useToast } from "@guestyci/foundation/Toast";

export default function BlogListPreprodScreen(props) {
  const { addToast } = useToast();

  console.log("props:", props);
  const [rawData, setRawData] = useState();
  // const [data, setData] = useState();
  const [view, setView] = useState("all");

  let data;

  const [blogDeleted, setBlogDeleted] = useState(false);

  const [rowSelection, setRowSelection] = useState(getEmptySelection());
  const { allSelected, items, exceptItems } = rowSelection;

  const width = 200;
  // const pageSize = 25;
  // const scrollOffset = data ? data.length : 100;
  // const [isLoading, setIsLoading] = useState(false);
  // const [skip, setSkip] = useState(0);

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogList;
  // console.log("blogs:", blogs);
  data = blogs;

  const blogDelete = useSelector((state) => state.blogDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = blogDelete;

  const userData = useSelector((state) => state.userData);
  const {
    userInfoData,
    accountData,
    loading: loadingUserData,
    error: errorUserData,
  } = userData;

  const dispatch = useDispatch();

  useEffect(() => {
    if (errorDelete) {
      addToast.danger("error deleting the blog, only blog admin can delete the blog");

      dispatch({
        type: BLOG_DELETE_RESET,
      });
    } else if (successDelete) {
      addToast.success("blog was delete");
      dispatch({ type: BLOG_DELETE_RESET });
    }
    dispatch(listBlogsPreprod(view));
    // dispatch({
    //   type: BLOG_DETAILS_RESET,
    // });
  }, [dispatch, successDelete, errorDelete, view]);

  // const deleteHandler = (blog) => {
  //   console.log("blog:", blog);
  //   if (window.confirm("Are you sure?")) {
  //     dispatch(deleteBlog(blog._id));
  //   }
  // };

  // const classes = useStyles();

  // const selectionSize =
  //   allSelected && data.length > 0
  //     ? data.length - exceptItems.size
  //     : items.size;
  const selectionSize =
    view === "account" && data && data.length > 0 && items ? items.size : 0;

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

  const deleteBlogHandler = async (blogId) => {
    console.log("deleteBlogHandler");
    try {
      // const response = await api.delete(`/blogs/${blogId}`); // will go to `${config.MAILER_URL}/blogs`
      // console.log('response:', response);
      // const data = response.data;
      // addToast.success('blog was delete')
      // props.history.push('/');
      dispatch(deleteBlogPreprod(blogId));

      setBlogDeleted(true);

      handleClearSelection();
    } catch (error) {
      console.log("error:", error);
      addToast.danger("error deleting the blog");
    }
  };
  // useEffect(() => {
  //   dispatch({ type: POST_DELETE_RESET });
  //   dispatch({ type: BLOG_DELETE_RESET });
  // }, []);

  const handleDelete = () => {
    console.log("rowSelection.items: ", rowSelection.items);

    if (window.confirm("Are you sure?")) {
      rowSelection.items.forEach((item) => deleteBlogHandler(item));
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

    const blogId = rowData[0].id.children;
    // console.log('args:', args.id)

    // props.history.push("www.google.com")

    props.history.push(`/blog/preprod/edit/${blogId}`);
  };

  return (
    <>
      {/* {console.log("data:", data)} */}
      {loading && <Spinner size={80} strokeWidth={6} />}
      {error && (
        <StatusIndication variant="danger" text="error getting the data " />
      )}
      {userInfoData ? (
        <Section gutter={2}>
          {
            <AddButton
              onClick={() => props.history.push(`/blog/preprod/add`)}
              text="Add Blog"
            />
          }
        </Section>
      ) : (
        <NavLink
          to="/user/signin"
          // activeStyle={activeStyle}
          style={{ marginLeft: "20px" }}
          exact
        >
          sign in to create a new blog
        </NavLink>
      )}
      {data && (
        <Section col className="bg-white">
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

          {userInfoData && (
            <RadioGroup
              name="view"
              inline
              onChange={(e) => setView(e.target.value)}
              value={view}
            >
              <Radio value="account">Account Blogs</Radio>
              <Radio value="all">All Blogs</Radio>
            </RadioGroup>
          )}

          {console.log("rowSelection: ", rowSelection)}

          {view === "account" && (
            <Table
              multiselect
              height={500}
              data={blogs}
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
                <HeaderCell id="title">Blog Name</HeaderCell>
                <Cell />
              </Column>
              <Column dataKey="admin" width={width}>
                <HeaderCell id="admin">Blog Admin</HeaderCell>
                <Cell />
              </Column>
              <Column dataKey="email" width={width}>
                <HeaderCell id="email">Email</HeaderCell>
                <Cell />
              </Column>
              <Column dataKey="account" width={width}>
                <HeaderCell id="account">account</HeaderCell>
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
            <Table height={500} data={blogs}>
              {/* <Column align="left" dataKey="id" width={width} sortable>
                <HeaderCell id="id">Id</HeaderCell>
                <Cell />
              </Column> */}
              <Column dataKey="title" width={width}>
                <HeaderCell id="title">Blog Name</HeaderCell>
                <Cell />
              </Column>
              <Column dataKey="admin" width={width}>
                <HeaderCell id="admin">Blog Admin</HeaderCell>
                <Cell />
              </Column>
              <Column dataKey="email" width={width}>
                <HeaderCell id="email">Email</HeaderCell>
                <Cell />
              </Column>
              <Column dataKey="account" width={width}>
                <HeaderCell id="account">account</HeaderCell>
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
