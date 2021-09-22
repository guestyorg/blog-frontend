import React, { useState, useEffect } from 'react';

import Section from '@guestyci/foundation/Section';
import Table, { Column } from '@guestyci/foundation/Table';
import {
  getEmptySelection,
  getSelectionOnAction,
} from '@guestyci/foundation/Table/tableUtility';
import Cell from '@guestyci/foundation/Table/Cell';
import HeaderCell from '@guestyci/foundation/Table/HeaderCell';
import FlatButton from '@guestyci/foundation/FlatButton';













import Resource from '@guestyci/agni';

const TableExample1 = () => {
  const [isLoading, setIsLoading] = useState(false);
   const { api, env, config } = Resource.create();

   let res;
  useEffect(
    () => {
      async function getGuests() {
        const response= await api.get('/tasks'); // will go to `${config.MAILER_URL}/users`
        console.log(response.data.results); // staging/production/staging5/preprod
        res= response.data.results
      }
      getGuests();
    },
    [],
  );

  // const data = [{name: 'aaa'}, { lname: 'bbb'}]


  const data = [{name: 'a', lname:'b',id:"a"}, {name: 'c', lname:'d',id:"b"}]
  // const tableColumnAdapter = useColumnAdapter({
  //   viewColumns: view.columns,
  //   configColumns: config.columns,
  // });
  return (
    < >
      <Section col className="bg-white">
        <Table
          multiselect
          data={data}
        >
          <Column align="left" dataKey="name">
            <HeaderCell id="name">name</HeaderCell>
            <Cell />
          </Column>
          <Column dataKey="lname">
            <HeaderCell id="lname">lname</HeaderCell>
            <Cell />
          </Column>
        </Table>
      </Section>
      <h1>fdsfdsfd</h1>
    </>
  );
};








export default TableExample1;