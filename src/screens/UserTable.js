import React, { useState, useEffect, useCallback } from 'react';
import Section from '@guestyci/foundation/legacy/Section';
import AddButton from '@guestyci/foundation/AddButton';

import Table, { Column } from '@guestyci/foundation/legacy/Table';
import {
  getEmptySelection,
  getSelectionOnAction,
} from '@guestyci/foundation/legacy/Table/tableUtility';
import Cell from '@guestyci/foundation/legacy/Table/Cell';
import HeaderCell from '@guestyci/foundation/legacy/Table/HeaderCell';
import FlatButton from '@guestyci/foundation/legacy/FlatButton';

import { sleep } from '@guestyci/foundation/utils/commonUtility';

import orderBy from 'lodash/orderBy';

import DateCell from '@guestyci/foundation/legacy/Table/DateCell';
import DateTimeCell from '@guestyci/foundation/legacy/Table/DateTimeCell';

// import data from '../../../__mocks__/tableData';

import Resource from '@guestyci/agni';

import TextField from '@guestyci/foundation/TextField';
import { Row } from '@guestyci/foundation/Layout';
import { ReactComponent as BtnTrash } from '@guestyci/foundation/icons/BtnTrash.svg';
import Icon from '@guestyci/foundation/Icon';

import axios from 'axios';
import { after } from 'lodash';

const data1 = [
  {
    _id: '1',
    id: {
      children: '12345tdgfbvm',
    },
    firstName: {
      children: 'John',
    },
    lastName: {
      children: 'Doe',
    },
    reportUrl: {
      children:
        'feature/5c9ca46f3da70f13f5cb2eec/pdf/8ec2ee446553816d82017c159872ef6b_Task_Batch_Editing.pdf',
    },
    listing: {
      href: 'listings/59ca00f463917d1c0005b2b1',
      title: 'listing name 1',
    },
    businessModel: {
      href: 'financial/business-models/1',
      target: '_blank',
      title: 'business model #1',
    },
    periodStartDate: {
      date: '2020-10-01T00:00:00.000Z',
    },
    periodEndDate: {
      date: '2020-11-29T00:00:00.000Z',
    },
    price: {
      currency: 'USD',
      value: 100,
    },
    tags: {
      tags: ['Email'],
    },
    user: {
      name: 'Frank Sinatra',
      img: 'https://i.pravatar.cc/150?u=1',
    },
    status: {
      status: 'PENDING',
    },
  },
  {
    _id: '2',
    id: {
      children: '12343tdgfbvm',
    },
    firstName: {
      children: 'Jonathan',
    },
    lastName: {
      children: 'Yehie',
    },
    reportUrl: {
      children:
        'feature/5c9ca46f3da70f13f5cb2eec/pdf/8ec2ee446553816d82017c159872ef6b_Task_Batch_Editing.pdf',
    },
    listing: {
      href: 'listings/59ca00f463917d1c0005b2b1',
      title: 'listing name 2',
    },
    businessModel: {
      href: 'financial/business-models/2',
      target: '_blank',
      title: 'business model #2',
    },
    periodEndDate: {
      date: null,
    },
    price: {
      currency: 'EUR',
      value: 20000000000,
    },
    tags: {
      tags: ['Email', 'Phone', 'Owners Portal'],
    },
    user: {
      name: 'Frank Sinatra',
    },
    status: {
      status: 'APPROVED',
    },
  },
  {
    _id: '3',
    id: {
      children: '43345tdgfbvm',
    },
    firstName: {
      children: 'Aram',
    },
    lastName: {
      children: 'Ben Shushan Erlich',
    },
    reportUrl: {
      children:
        'feature/5c9ca46f3da70f13f5cb2eec/pdf/8ec2ee446553816d82017c159872ef6b_Task_Batch_Editing.pdf',
    },
    listing: {
      href: 'listings/59ca00f463917d1c0005b2b1',
      title: 'listing name 3',
    },
    periodStartDate: {
      date: '2020-07-05T00:00:00.000Z',
    },
    periodEndDate: {
      date: '2020-11-15T00:00:00.000Z',
    },
    price: {
      currency: 'UAH',
      value: 300,
    },
    user: {
      img: 'https://i.pravatar.cc/150?u=1',
      name: 'John Doe',
    },
    status: {
      status: 'FLAGGED',
    },
  },
  {
    _id: '4',
    id: {
      children: '1234rgdgfbvm',
    },
    firstName: {
      children: 'Nik',
    },
    lastName: {
      children: 'Frank',
    },
    reportUrl: {
      children:
        'feature/5c9ca46f3da70f13f5cb2eec/pdf/8ec2ee446553816d82017c159872ef6b_Task_Batch_Editing.pdf',
    },
    listing: {
      href: 'listings/59ca00f463917d1c0005b2b1',
      title: 'listing name 2',
    },
    periodStartDate: {
      date: '2020-06-04T00:00:00.000Z',
    },
    periodEndDate: {
      date: '2020-08-29T00:00:00.000Z',
    },
    price: {
      currency: 'USD',
      value: 400,
    },
    tags: {
      tags: ['Email', 'Phone'],
    },
    user: {
      name: 'Frank Sinatra',
    },
    status: {
      status: 'ARCHIVED',
    },
  },
  {
    _id: '5',
    id: {
      children: '12095tdgfbvm',
    },
    firstName: {
      children: 'Gil',
    },
    lastName: {
      children: 'Tabak',
    },
    reportUrl: {
      children:
        'feature/5c9ca46f3da70f13f5cb2eec/pdf/8ec2ee446553816d82017c159872ef6b_Task_Batch_Editing.pdf',
    },
    listing: {
      href: 'listings/59ca00f463917d1c0005b2b1',
      title: 'listing name 2',
    },
    periodStartDate: {
      date: '2020-01-02T00:00:00.000Z',
    },
    periodEndDate: {
      date: '2020-12-19T00:00:00.000Z',
    },
    price: {
      currency: 'USD',
      value: 400,
    },
    user: {
      name: 'Frank Sinatra',
    },
    status: {
      status: 'REGENERATING',
    },
    actions: {
      isActionInProgress: true, // NOTE: this property will not come from data, this is used just for the demo sake
    },
  },
  {
    _id: '6',
    id: {
      children: '12095tdgfbvm',
    },
    firstName: {
      children: 'Gil',
    },
    lastName: {
      children: 'Tabak',
    },
    reportUrl: {
      children:
        'feature/5c9ca46f3da70f13f5cb2eec/pdf/8ec2ee446553816d82017c159872ef6b_Task_Batch_Editing.pdf',
    },
    listing: {
      href: 'listings/59ca00f463917d1c0005b2b1',
      title: 'listing name 2',
    },
    periodStartDate: {
      date: '2020-01-02T00:00:00.000Z',
    },
    periodEndDate: {
      date: '2020-12-19T00:00:00.000Z',
    },
    price: {
      currency: 'USD',
      value: 400,
    },
    user: {
      name: 'Gil Tabak',
      img: 'https://i.pravatar.cc/150?u=6',
    },
    status: {
      status: 'REGENERATION_FAILED',
    },
  },
  {
    _id: '7',
    id: {
      children: '12095tdgfbvm',
    },
    firstName: {
      children: 'Richard',
    },
    lastName: {
      children: 'Brook',
    },
    reportUrl: {
      children:
        'feature/5c9ca46f3da70f13f5cb2eec/pdf/8ec2ee446553816d82017c159872ef6b_Task_Batch_Editing.pdf',
    },
    listing: {
      href: 'listings/59ca00f463917d1c0005b2b1',
      title: 'listing name 7',
    },
    periodEndDate: {
      date: '2020-12-19T00:00:00.000Z',
    },
    user: {},
  },
  {
    _id: '8',
    id: {
      children: '12095tdgfbvm',
    },
    firstName: {
      children: 'Gil',
    },
    lastName: {
      children: 'Tabak',
    },
    reportUrl: {
      children:
        'feature/5c9ca46f3da70f13f5cb2eec/pdf/8ec2ee446553816d82017c159872ef6b_Task_Batch_Editing.pdf',
    },
    listing: {
      href: 'listings/59ca00f463917d1c0005b2b1',
      title: 'listing name 2',
    },
    periodStartDate: {
      date: '2020-01-02T00:00:00.000Z',
    },
    periodEndDate: {
      date: '2020-12-19T00:00:00.000Z',
    },
    price: {
      currency: 'USD',
      value: 400,
    },
    user: {
      name: 'Gil Tabak',
      img: 'https://i.pravatar.cc/150?u=6',
    },
    status: {
      status: 'REGENERATION_REQUIRED',
    },
  },
];

// console.log('data:', data);

const data2 = [
  {
    _id: '1',
    id: {
      children: '12345tdgfbvm',
    },
    firstName: {
      children: 'John',
    },
    lastName: {
      children: 'Doe',
    },
  },
];

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
    console.log('handleLoadMore');

    const addition = semiInfiniteData.slice(newSkip, newSkip + newPageSize);
    // console.log('newPageSize:', newPageSize)
    // console.log('newSkip:', newSkip)
    // console.log('addition:', addition)
    console.log('data: ', data);
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
    console.log('handleSort');
    setSortBy(newSortBy);

    const minusPrefix = newSortBy?.startsWith('-');
    console.log('minusPrefix:', minusPrefix);
    const direction = minusPrefix ? 'desc' : 'asc';
    console.log('direction:', direction);
    const id = minusPrefix ? newSortBy.substring(1) : sortBy;
    console.log('id:', id);

    setData(orderBy(rawData, `${id}.date`, direction));

    console.log('data:', data);
  }, []);

  useEffect(() => {
    console.log('useEffect');

    async function getGuests() {
      try {
        const response = await api.get('/users'); // will go to `${config.MAILER_URL}/users`
        console.log('response:', response)
        users = response.data.results;
        //  console.log('users:', users)
        // staging/production/staging5/preprod

        //  r.forEach(
        //    user=> {
        //    console.log('user:', user)

        //    arr.push({gilad:1,...user})
        //    }

        //  )

        for (let i = 0; i < users.length; i++) {
          //  console.log("users[i]: ", users[i] );

          const arrUser = Object.entries(users[i]);
          //  console.log('arrUser:', arrUser)

          //  firstName: {
          //   children: 'John',
          // },

          const bigObj = {};

          for (let j = 0; j < arrUser.length; j++) {
            const obj = {};
            // console.log("arrUser[j]: ",arrUser[j]);
            // console.log("arrUser[0]: ",arrUser[j][0]);
            // console.log("arrUser[1]: ",arrUser[j][1]);

            obj.children = arrUser[j][1];
            // console.log('obj:', obj)

            if (arrUser[j][0] === '_id') {
              bigObj.id = obj;

              bigObj._id = arrUser[j][1];
            } else {
              bigObj[arrUser[j][0]] = obj;
            }

            // console.log('bigObj:', bigObj)

            // arr.push( `${arrUser[j][0]}: {children: '${arrUser[j][1]}',}`)
          }
          // arr.push({gilad:1,...users[i]})
          arr.push({ ...bigObj });
          // arr.push({ _id: `${counter}`, ...bigObj });

          counter++;
        }

        //  setData(response.data.results)
        // let arr = makeDataForTable(users);
        console.log('arr: ', arr);



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
        console.log('error:', error);
      }
    }
    getGuests();
  }, [userDeleted]);

  const semiInfiniteData = [...Array(300)]
    .reduce((acc) => acc.concat(data), [])
    .map((e, index) => ({
      ...e,
      id: { children: index + 1 },
      _id: index + 1,
    }));

  console.log('semiInfiniteData:', semiInfiniteData);

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
    console.log('handleRowCheckChange');
    // console.log('action:', action);

    const selection = getSelectionOnAction({ rowSelection, action, data });
    // console.log('selection:', selection);
    setRowSelection(selection);
  };

  const deleteUser = async (userId) => {
    console.log('deleteUser');
    try {
      const response = await api.delete(`/users/${userId}`); // will go to `${config.MAILER_URL}/users`
      console.log('response:', response);
      // const data = response.data;
      // addToast.success('user was delete')
      setUserDeleted(true);
      // props.history.push('/');

      handleClearSelection();
    } catch (error) {
      console.log('error:', error);
      // addToast.danger("error deleting the user")
    }
  };

  const handleDelete = () => {
    console.log(rowSelection.items);

    if (window.confirm('Are you sure?')) {
      rowSelection.items.forEach((item) => deleteUser(item));
    }
  };

  const handleClearSelection = () => {
    console.log('handleClearSelection');
    setRowSelection(getEmptySelection());
  };

  const handleRowClick = (...args) => {
    console.log('handleRowClick', ...args);

    const rowData = { ...args };
    console.log('rowData:', rowData);
    console.log('rowData:', rowData[0].id.children);

    const userId = rowData[0].id.children;
    // console.log('args:', args.id)

    // props.history.push("www.google.com")

    props.history.push(`/user/edit/${userId}`);
  };

  return (
    <>
      {data && (
        <Section col className="bg-white">
          <Section gutter={2}>
            <AddButton
              onClick={() => props.history.push(`/user/add`)}
              text="Add User"
            />
          </Section>

          <Row spacing={4}>
            <FlatButton
              onClick={handleClearSelection}
              disabled={!selectionSize}
            >
              {`Unselect ${selectionSize || ''}`}
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

          {console.log('rowSelection: ', rowSelection)}
          <Table
            multiselect
            height={500}
            data={data}
            isLoading={isLoading}
            pageSize={pageSize}
            rowSelection={rowSelection}
            onCheckedRowsChange={handleRowCheckChange}
            onRowClick={handleRowClick}
            infiniteScrollOptions={{
              skip,
              scrollOffset,
              onLoadMore: handleLoadMore,
              totalCount: semiInfiniteData.length,
            }}
            sortBy={sortBy}
            onSort={handleSort}
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
            {/* <Column dataKey="email" width={width}>
              <HeaderCell id="email">Email</HeaderCell>
              <Cell />
            </Column> */}
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
